import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { ENV } from "../env"
import { getAddress } from "./getAddress";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";

/**
 * Builds, signs, and executes a transaction for:
 * * minting a Hero NFT: use the `package_id::hero::mint_hero` function
 * * minting a Sword NFT: use the `package_id::blacksmith::new_sword` function
 * * attaching the Sword to the Hero: use the `package_id::hero::equip_sword` function
 * * transferring the Hero to the signer
 */
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
    const tx = new Transaction()


    
    const collection = tx.moveCall({
      target: `${ENV.PACKAGE_ID}::collection::mint_collection`,
      arguments: [tx.pure.string(name),
                  tx.pure.string(description),
                  tx.pure.string(img_link),
                  tx.pure.u64(price.toString()),
                  tx.pure.u16(Number(max_supply.toString())),
                  tx.pure.u16(Number(duration.toString())),
                  tx.pure.u8(Number(max_per_wallet.toString())),]
    })

    tx.moveCall({
      target: `${ENV.PACKAGE_ID}::collection::transfer_collection_to_owner`,
      arguments: [collection]
    })


    


    
    return suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: getSigner({secretKey: ENV.USER_SECRET_KEY}),
      options: {
          showEffects: true,
          showObjectChanges: true,
      }
    })
  };