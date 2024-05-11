import { ConnectButton, ConnectEmbed } from "thirdweb/react";

import { client } from "./client";
import Nftgenerator from "./components/nftgenerator";
export default function Home() {
  return (
<>

<h1 className=" 
text-5xl text-center text-white font-bold mt-10
">MAKE YOUR OWN NFT BY AI </h1>
  <div className="
  flex -mr-42 justify-center mt-10 
  ">
 <ConnectEmbed className="w-full h-auto 
  mt-10  
 " client={client} />
 <Nftgenerator />
  </div>


 
</>
  );
}
