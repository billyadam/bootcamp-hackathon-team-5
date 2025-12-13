module contracts::version;
use sui::package::Publisher;

public struct Version has key {
    id: UID,
    version: u64
}

const EInvalidVersion: u64 = 0;
const EInvalidPublisher: u64 = 1;

const VERSION: u64 = 1;

fun init(ctx: &mut TxContext) {
    transfer::share_object(Version { id: object::new(ctx), version: VERSION })
}

public fun migrate(publisher: &Publisher, version: &mut Version) {
    assert!(publisher.from_package<Version>(), EInvalidPublisher);
    version.version = VERSION
}

/// Function checking that the package-version matches the `Version` object.
public fun check_is_valid(self: &Version) {
    assert!(self.version == VERSION, EInvalidVersion);
}