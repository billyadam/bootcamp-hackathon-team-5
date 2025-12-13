module contracts::nft;
use std::string::String;
use contracts::collection::Collection;
use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;

/// Nft
public struct Nft has key {
    id: UID,
    name: String,
    desc: String,
    img_link: String,
    collection_id: ID,
}

/// Public fun to mint a Nft
public fun mint_nft(name: String, desc: String, img_link: String, collection_id: ID, ctx: &mut TxContext): Nft {
    Nft {
        id: object::new(ctx),
        name,
        desc,
        img_link,
        collection_id
    }
}

public fun transfer_nft_to_owner(nft: Nft, ctx: &mut TxContext) {
    transfer::transfer(nft, ctx.sender())
}