import { SuiClient } from "@mysten/sui/client";
// import { ENV } from "./env";
export const suiClient = new SuiClient({
    url: "https://rpc.devnet.sui.io:443",
});
