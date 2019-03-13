use std::process;
use super::super::api_client;

pub fn run() {
    if !api_client::server_is_online() {
        println!("The server is not running.");
        process::exit(0);
    }

    let pid = api_client::get_server_pid().unwrap_or_else(|message| {
        println!("Server PID could not be retrieved. Error: {}", message);
        process::exit(1)

    });

    // Kill pid
    process::Command::new("kill")
        .arg(format!("{}", pid))
        .spawn()
        .expect(&format!("Killing the server process (PID {}) failed.", pid));

}
