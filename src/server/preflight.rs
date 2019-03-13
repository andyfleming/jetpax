use std::process::Command;

pub fn run() {
    // handle startup concerns like ~/.jetpax directory existence
    Command::new("mkdir")
        .arg("-p")
        .arg("~/.jetpax")
        .spawn()
        .expect("~/.jetpax/ directory creation failed.");
}
