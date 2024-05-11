"use client";

import React, { use, useState } from "react";
import { ConnectButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";

const nftgenerator = () => {
  const account = useActiveAccount();
  const [imageprompt, setImageprompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMining, setIsMining] = useState(false);

  if (account) {
    return (
      <>
        <div
          className=" 
text-5xl text-center text-white font-bold mt-10"
        >
          <ConnectButton client={client} />
          <div>
            {generatedImage ? (
              <>
                <MediaRenderer
                  client={client}
                  src={generatedImage}
                  className="w-full h-auto mt-10"
                />
              </>
            ) : (
              <>
                {" "}
                <div
                  className="
   width:300px;
    height:300px;
    border:1px solid #000;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    flex-direction:column;
    
 "
                >
                  <p>
                    {isGenerating
                      ? "Generating NFT..."
                      : "Click the button and write the prompt to generate NFT"}
                  </p>
                </div>
              </>
            )}
          </div>
          <div>
          <form action="">
          { ! isMining || ! isGenerating ? ( 
          <>
          <input type="text" placeholder=" enter a prompt " value={imageprompt}
           onChange={(e)=> setGeneratedImage(e.target.value)} />
           <button  className=" cursor-pointer
              mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
           " type="submit" disabled={ isGenerating || isMining || !imageprompt} > 
            {isGenerating ? "Generating NFT..."
            : isMining ? "Mining..." 
            : "Generate NFT and Mine"
            }
           </button>
           </>
          ) : (
          <>
         <button 
            className=" cursor-pointer
                mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=> setGeneratedImage("")}
        >
            Generate Another NFT
          </button>
          </>
          )}
          </form>
          </div>
        </div>
      </>
    );
  }
};

export default nftgenerator;
