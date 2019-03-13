use std::process;

mod jetpax_home;
mod database;

pub fn run() -> Result<(), String> {

    // Create home directory if it doesn't already exist
    jetpax_home::create()?;

    // Create the sqlite database (if it doesn't already exist) and run migrations
    database::create_and_migrate()?;

    Ok(())
}
