const VERSION: &'static str = env!("CARGO_PKG_VERSION");

pub fn run() {
    println!("Jetpax v{}", VERSION)
}
