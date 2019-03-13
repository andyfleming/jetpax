use std::env;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use std::process;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Workspace {
    name: String,
}

pub fn write_workspace_file(config: &Workspace) -> std::io::Result<()> {
    let json = match serde_json::to_string(&config) {
        Ok(json) => json,
        Err(e) => {
            println!("Error encoding JSON to write workspace config file.");
            process::exit(1)
        }
    };

    let mut file = File::create("workspace.jpx.json")?;
    file.write_all(&json.into_bytes())?;
    Ok(())
}

pub fn run() {
    // Check if workspace.jpx.json already exists
    if !Path::new("workspace.jpx.json").exists() {
        let config = Workspace {
            name: String::from("Example"),
        };

        match write_workspace_file(&config) {
            Ok(()) => {}
            Err(e) => {
                println!("workspace.jpx.json could not be written");
                process::exit(1)
            }
        }

        println!("workspace.jpx.json successfully created")
    } else {
        println!("Workspace already initialized. (workspace.jpx.json found)")
    }

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
    if false {
        let current_dir = match env::current_dir() {
            Ok(path) => path.display().to_string(),
            Err(e) => {
                println!("Error getting the home dir.");
                process::exit(1)
            },
        };
    }

    // TODO: if yes, send a command to register it based on the cwd

    // TODO: handle workspace already registered error
    // TODO: handle other error

}
