import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../../lib/suiClient";
import { getSigner } from "./getSigner";


const PACKAGE_ID = "0x90f9389a56443b7faf2014a7541c6937f2c6146f32c8801cc1fbbb5b040e96af"
const USER_SECRET_KEY = "ADmdOyr41DlR6qUhKOvSLmrvyc6BigHt0a7rrJUzgdwW"

export const createCollection =
  async (
    name: string,
    description: string,
    img_link: string,
    price: Number,
    max_supply: Number,
    duration: Number,
    max_per_wallet: Number,
  ): Promise<SuiTransactionBlockResponse> => {
    console.log("masuk")
    const tx = new Transaction()

    const collection = tx.moveCall({
      target: `${PACKAGE_ID}::collection::mint_collection`,
      arguments: [tx.pure.string(name),
                  tx.pure.string(description),
                  tx.pure.string(img_link),
                  tx.pure.u64(price.toString()),
                  tx.pure.u16(Number(max_supply.toString())),
                  tx.pure.u16(Number(duration.toString())),
                  tx.pure.u8(Number(max_per_wallet.toString())),]
    })
    console.log(collection.Result)

    tx.moveCall({
      target: `${PACKAGE_ID}::collection::transfer_collection_to_owner`,
      arguments: [collection]
    })
    
    return suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: getSigner({secretKey: USER_SECRET_KEY}),
      options: {
          showEffects: true,
          showObjectChanges: true,
      }
    })
  };