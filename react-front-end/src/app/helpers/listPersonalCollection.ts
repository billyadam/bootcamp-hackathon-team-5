import { PaginatedObjectsResponse } from "@mysten/sui/client";
import { suiClient } from "../../lib/suiClient";
import { getAddress } from "./getAddress";

const PACKAGE_ID = "0x90f9389a56443b7faf2014a7541c6937f2c6146f32c8801cc1fbbb5b040e96af"
const USER_SECRET_KEY = "ADmdOyr41DlR6qUhKOvSLmrvyc6BigHt0a7rrJUzgdwW"

export const listPersonalCollection =
    async (): Promise<PaginatedObjectsResponse> => {

        // let collectionArr = []
        let nextCursor = null
        // let hasNextPage = true

        const address = getAddress({ secretKey: USER_SECRET_KEY })

        const collections = await suiClient.getOwnedObjects({ 
            owner: address,
            filter: {
                StructType: `${PACKAGE_ID}::collection::Collection`
            },
            options: {
                showContent: true,
            },
            cursor: nextCursor
        })

        // console.log(registry)

        return collections
    }