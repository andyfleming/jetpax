use crate::server::preflight::jetpax_home;
use rocket_contrib::databases::diesel;
use rocket_contrib::databases::diesel::prelude::*;

pub fn create_and_migrate() -> Result<(), String> {
    let database_url = format!("{}/db.sqlite", jetpax_home::get()?);
    let result = SqliteConnection::establish(&database_url);

    if result.is_err() {
        return Err("Could not set up sqlite database file/connection.".to_owned())
    }

    let conn = result.unwrap();

    // run any migrations needed for the database
    embed_migrations!();
    //embedded_migrations::run(&conn);
    embedded_migrations::run_with_output(&conn, &mut std::io::stdout());

    Ok(())
}
