use super::super::api_client;

pub fn run() {
    let status = if api_client::server_is_online() { "online" } else { "offline" };
    println!("The server is {}.", status);
}
