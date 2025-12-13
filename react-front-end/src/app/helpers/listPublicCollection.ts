import { SuiObjectResponse } from "@mysten/sui/client";
import { suiClient } from "../../lib/suiClient";

// const PACKAGE_ID = "0x90f9389a56443b7faf2014a7541c6937f2c6146f32c8801cc1fbbb5b040e96af"
// const USER_SECRET_KEY = "ADmdOyr41DlR6qUhKOvSLmrvyc6BigHt0a7rrJUzgdwW"
const REGISTRY_ID = "0x7f5678d5626a21dbe0840a99de02bb5a33833f17156176f73adc9672127e6f35"

export const listPublicCollection =
    async (): Promise<SuiObjectResponse> => {

        const registry = await suiClient.getObject({ 
            id: REGISTRY_ID,
            options: {
                showContent: true,
            }
        })
        console.log(registry)

        // const collectionIds = registry.data?

        // const collections = await suiClient.get        
        

        return {} as SuiObjectResponse
    }