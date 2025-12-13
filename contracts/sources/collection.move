
/// Module: contracts
module contracts::collection;
use std::string::String;
use sui::package;
use sui::display;

public struct COLLECTION has drop {}
public struct Collection has key, store {
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
        b"{name} - Big and Friendly".to_string(),
    ];
    let mut display = display::new_with_fields<Collection>(&publisher, keys, values, ctx);
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions


