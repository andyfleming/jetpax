use std::process::Command;

pub fn run() {
    println!("Init command");

    let output = Command::new("ls")
        .args(&["-l", "-a", "-h"])
        .output()
        .expect("ls command failed to start");

    println!("Command stdout: {}", String::from_utf8(output.stdout).unwrap());

    // If init, write the JSON file


//    Command::new("ls")
//        .arg("-l")
//        .arg("-a")
//        .spawn()
//        .expect("ls command failed to start");
}