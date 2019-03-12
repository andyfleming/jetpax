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

    // TODO: Check if workspace.jpx.json already exists

    // TODO: If not, walk through creation
    /*
    // If not, prompt for a name
    // Default to the directory (like how npm init does)
    const parentDirectory = path.basename(process.cwd())
    const name = await getInput('What would you like to name your workspace?', parentDirectory)

    fs.writeFileSync('./workspace.jpx.json', JSON.stringify({
        name,
    }))

    console.log()
    console.log(chalk.green('workspace.jpx.json created'))
    */

    // TODO: offer to register workspace

    // TODO: if yes, send a command to register it based on the cwd

    // TODO: handle workspace already registered error
    // TODO: handle other error

}
