use std::process;

#[get("/api/pid")]
pub fn handle() -> String {
    format!("{}", process::id())
}
