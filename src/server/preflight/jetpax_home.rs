use dirs;
use std::process::Command;

pub fn get() -> Result<String, String> {
    let home_dir = match dirs::home_dir() {
        Some(path) => path.display().to_string(),
        None => {
            return Err("Error getting the home dir.".to_owned())
        },
    };

    Ok(format!("{}/.jetpax", home_dir))
}

pub fn create() -> Result<(), String> {
    let command = Command::new("mkdir")
        .arg("-p")
        .arg(get()?)
        .spawn();

    match command {
        Ok(_child) => Ok(()),
        Err(_e) => Err("~/.jetpax/ directory creation failed.".to_owned())
    }
}
