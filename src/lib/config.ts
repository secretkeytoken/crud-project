import { clusterApiUrl } from "@solana/web3.js";
import { IS_PRODUCTION } from "./utils";

const appConfig = {
  appTitle: "AgroTree Ledger",
  appDescription:
    "Central hub for maintaining consistency and keeping the team aligned on technical aspects of AgroTree Ledger.",
  appCreator: "@agrotreeledger",
  appBaseUrl: IS_PRODUCTION
    ? new URL(`https://${process.env.NEXT_PUBLIC_HOST}`)
    : new URL(`http://localhost:${process.env.PORT || 3005}`),
  endpointRpc:
    "https://devnet-rpc.shyft.to/?api_key=037o0cpTSD8FBXv7" ||
    clusterApiUrl("devnet"),
};

export default appConfig;
