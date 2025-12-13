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
}

/// Public fun to mint a Nft
public fun mint_nft(name: String, desc: String, img_link: String ,ctx: &mut TxContext): Nft {
    Nft {
        id: object::new(ctx),
        name: name,
        desc: desc,
        img_link: img_link,
    }
}

public fun transfer_nft_to_owner(nft: Nft, ctx: &mut TxContext) {
    transfer::transfer(nft, ctx.sender())
}