module contracts::Nft;
use sui::string::String;
use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;

/// Nft
public struct Nft has key, store {
    id: UID,
    name: String,
    desc: String,
    img_link: String,
}

// /// Anyone can mint a Nft
// public fun mint_Nft(ctx: &mut TxContext): Hero {
//     Nft {
//         id: object::new(ctx),
//         name: name,
//         desc: desc,
//         img_link: img_link,
//     }
// }



// public fun health(self: &Hero): u64 {
//     self.health
// }

// public fun stamina(self: &Hero): u64 {
//     self.stamina
// }

// /// Returns the sword the hero has equipped.
// /// Aborts if it does not exists
// public fun sword(self: &Hero): &Sword {
//     dof::borrow(&self.id, b"sword")
// }

// /// Generic add dynamic object field to the hero.
// fun add_dof<T: key + store>(self: &mut Hero, name: String, value: T) {
//     dof::add(&mut self.id, name, value)
// }

// #[test_only]
// public fun uid_mut_for_testing(self: &mut Hero): &mut UID {
//     &mut self.id
// }