module contracts::nft;
use std::string::String;
use contracts::collection::Collection;
use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;
use contracts::version::Version;

/// Nft
public struct Nft has key {
    id: UID,
    name: String,
    desc: String,
    img_link: String,
    collection_id: ID,
}

/// Public fun to mint a Nft
public fun mint_nft(version: &Version, name: String, desc: String, img_link: String, collection_id: ID, ctx: &mut TxContext): Nft {
    version.check_is_valid();
    Nft {
        id: object::new(ctx),
        name,
        desc,
        img_link,
        collection_id
    }
}

public fun transfer_nft_to_owner(version: &Version, nft: Nft, ctx: &mut TxContext) {
    version.check_is_valid();
    transfer::transfer(nft, ctx.sender())
}