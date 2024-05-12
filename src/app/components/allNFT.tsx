'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
import { upload } from "thirdweb/storage";
import { NFTCollection } from "./nftgenerator";
import { getNFTs } from "thirdweb/extensions/erc721";
import { contract } from "../utils/contract";

export const AIGenerate = () => {
    const account = useActiveAccount();
    const [imagePrompt, setImagePrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

    const { data: nfts, refetch: refetchNFTs } = useReadContract(
        getNFTs,
        {
            contract: contract,
        }
    );

    const handleGenerateAndMint = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            console.log("Generating image");
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imagePrompt
                }),
            });

            console.log("Generated image");
            if(!res.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await res.json();

            setImagePrompt("");

            console.log("Minting NFT");
            const imageBlob = await fetch(data.data[0].url).then((res) => res.blob());

            const file = new File([imageBlob], "image.png", { type: "image/png" });
            const imageUri = await upload({
                client: client,
                files: [file],
            });

            if (!imageUri) {
                throw new Error("Error uploading image to IPFS");
            }
            setGeneratedImage(imageUri);
            setIsGenerating(false);
            setIsMinting(true);
            const mintRes = await fetch("/api/mint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nftImage: imageUri,
                    address: account?.address || "",
                }),
            });

            if(!mintRes.ok) {
                throw new Error("Failed to mint NFT");
            }

            alert("NFT minted successfully");
        } catch (error) {
            console.error(error);
        } finally {
            setIsMinting(false);
            refetchNFTs();
        }
    };

    if(account) {
        return (
            <div className="flex flex-col items-center py-10 bg-purple-100">
                <div className="max-w-xl w-full mx-auto">
                    <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                        {generatedImage ? (
                            <MediaRenderer
                                client={client}
                                src={generatedImage}
                                className="w-full h-80 object-cover object-center"
                            />
                        ) : (
                            <div className="w-full h-80 flex justify-center items-center bg-gray-100">
                                <p className="text-gray-500">
                                    {isGenerating ? "Generating image..." : "No image generated"}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <form onSubmit={handleGenerateAndMint} className="flex flex-col items-center">
                            {!generatedImage || isMinting ? (
                                <div className="flex flex-col items-center w-full">
                                    <input 
                                        type="text" 
                                        placeholder="Enter image prompt..."
                                        value={imagePrompt}
                                        onChange={(e) => setImagePrompt(e.target.value)}
                                        className="py-3 px-4 w-full rounded-lg shadow-sm border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!imagePrompt || isGenerating || isMinting}
                                        className={`py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ${!imagePrompt || isGenerating || isMinting ? 'bg-purple-300 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'}`}
                                    >{isGenerating ? "Generating..." : isMinting ? "Minting..." : "Generate and Mint"}</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setGeneratedImage("")}
                                    className="py-3 px-6 rounded-lg shadow-md bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
                                >Generate Another NFT</button>
                            )}
                        </form>
                    </div>
                </div>
                <NFTCollection 
                    nfts={nfts || []}
                    className="mt-10"
                />
            </div>
        );
    }
};