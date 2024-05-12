import { ConnectButton, ConnectEmbed } from "thirdweb/react";
import { client } from "./client";
import { chain } from "./chain";
import { AIGenerate } from "./components/allNFT";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex flex-col items-center justify-center py-10">
            <div className="max-w-4xl w-full px-4 bg-white rounded-lg shadow-xl">
                <div className="py-8 px-6">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-purple-600">AI NFT Generator</h1>
                        <ConnectButton
                            client={client}
                            chain={chain}
                         
                        />
                    </header>
                    <ConnectEmbed
                        client={client}
                        chain={chain}
                        className="mb-8 bg-gray-100 rounded-lg shadow-md p-4"
                    />
                    <AIGenerate />
                </div>
            </div>
        </div>
    );
}