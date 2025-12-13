
/// Module: contracts
module contracts::collection;
use std::string::String;
use sui::package;
use sui::display;

public struct COLLECTION has drop {}
public struct Collection has key {
    id: UID,
    name: String,
    description: String,
    img_link: String,
    price: u64, 
    max_supply: u16,
    duration: u16,
    max_per_wallet: u8
}

fun init(otw: COLLECTION, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        b"name".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
    ];
    let values = vector[
        b"{name}".to_string(),
        b"{img_link}".to_string(),
        b"{description}".to_string(),
    ];
    let mut display = display::new_with_fields<Collection>(&publisher, keys, values, ctx);
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}
public fun mint_collection(
    name: String,
    description: String,
    img_link: String,
    price: u64, 
    max_supply: u16,
    duration: u16,
    max_per_wallet: u8,
    ctx: &mut TxContext): Collection {
    Collection {
        id: object::new(ctx),
        name,
        description,
        img_link,
        price,
        max_supply,
        duration,
        max_per_wallet,
    }
}

public fun transfer_collection_to_owner(col: Collection, ctx: &mut TxContext) {
    transfer::transfer(col, ctx.sender())
}



