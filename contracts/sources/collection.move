
/// Module: contracts
module contracts::collection;
use std::string::String;
use sui::package;
use sui::display;
use contracts::nft::Nft;

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

public struct CollectionRegistry has key {
    id: UID,
    list: vector<ID>,
}

fun init(otw: COLLECTION, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);

    let registry = CollectionRegistry {
        id: object::new(ctx),
        list: vector::empty(),
    };
    transfer::share_object(registry);

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

public fun register_collection(collection: &Collection, registry: &mut CollectionRegistry) {
    registry.list.push_back(object::id(collection))
}

public fun transfer_collection_to_owner(col: Collection, ctx: &mut TxContext) {
    transfer::transfer(col, ctx.sender())
}

public fun mint_nft_from_collection(collection: &Collection,ctx: &mut TxContext): Nft {
    contracts::nft::mint_nft (
        collection.name,
        collection.description,
        collection.img_link,
        object::id(collection),
        ctx
    )
}

public fun list_all_collections(registry: &CollectionRegistry, ctx: &mut TxContext) {
    //TODO
}