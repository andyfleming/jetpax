#[get("/api/online")]
pub fn handle() -> &'static str {
    "Jetpax Server API Online"
}
