import { getContract } from "thirdweb";
import { client } from "@/app/client";
import{ polygonAmoy}  from "thirdweb/chains";
export const nftCollectionContractAddress = '0xD6C45d58488E2323C585737b673DA18D780153F9';

export const contract = getContract({
client: client,
chain: polygonAmoy,
address: nftCollectionContractAddress,
})