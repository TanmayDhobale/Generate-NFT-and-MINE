import { client } from "@/app/client";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

type NFTCollectionProps = {
    nfts: NFT[];
    className?: string;
};

export const NFTCollection = ({ nfts, className }: NFTCollectionProps) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <h3 className="text-2xl font-bold mb-6 text-purple-600">AI Generations:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg">
                {nfts.map((nft) => (
                    <div key={nft.id} className="p-2 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <MediaRenderer
                            client={client}
                            src={nft.metadata.image}
                            className="w-full h-auto object-cover object-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};