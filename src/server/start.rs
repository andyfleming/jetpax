use std::process;
use daemonize::Daemonize;
use super::super::server::handlers;
use rocket_contrib::serve::StaticFiles;
use rocket::State;
use std::sync::{Mutex, Arc, RwLock};
use rocket_contrib::databases::diesel;
use rocket_contrib::database;
use std::collections::HashMap;
use rocket::config::{Config, Environment, Value};

#[derive(Debug)]
struct SystemState {
    count: RwLock<u32>
}

#[database("main_db")]
struct MainDbConn(diesel::SqliteConnection);

impl SystemState {
    fn new() -> SystemState {
        SystemState {
            count: RwLock::new(0)
        }
    }

    fn increment(&mut self) {
        let mut count = self.count.write().unwrap();
        *count += 1;
    }
}

#[get("/api/count")]
fn get_count(state: State<SystemState>) -> String {
    format!("Current count: {}", state.count.read().unwrap())
}

#[get("/api/inc")]
fn increment_count(state: State<SystemState>) -> String {
    let mut count = state.count.write().unwrap();
    *count += 1;
    format!("Incremented Count")
}

#[get("/api/workspaces")]
fn get_workspaces(conn: MainDbConn) -> String {
    String::from("Hello")
}

fn get_dbs_config(home_dir: &str) -> HashMap<&str, Value> {
    let mut database_config = HashMap::new();
    let mut databases = HashMap::new();

    database_config.insert("url", Value::from(format!("{}/.jetpax/db.sqlite", home_dir)));
    databases.insert("main_db", Value::from(database_config));

    return databases;
}

#[cfg(debug_assertions)]
fn get_config(home_dir: &str) -> Config {
    return Config::build(Environment::Development)
        .port(8777)
        .extra("databases", get_dbs_config(home_dir))
        .finalize()
        .unwrap();
}

#[cfg(not(debug_assertions))]
fn get_config(home_dir: &str) -> Config {
    return Config::build(Environment::Production)
        .port(8777)
        .extra("databases", get_dbs_config(home_dir))
        .finalize()
        .unwrap();
}

pub fn start(run_in_background: bool) {
    // TODO: handle startup concerns like ~/.jetpax directory existence

    let home_dir = match dirs::home_dir() {
        Some(path) => path.display().to_string(),
        None => {
            println!("Error getting the home dir.");
            process::exit(1)
        },
    };

    if run_in_background {
        println!("Starting server as daemon...");



        let daemonize = Daemonize::new()
            .working_directory(&format!("{}/.jetpax/", home_dir));

        match daemonize.start() {
            Ok(_) => println!("Process successfully daemonized."),
            Err(e) => {
                eprintln!("Process could not start as daemon! Error: {}", e);
                process::exit(1)
            },
        }

    } else {
        println!("Starting server (in foreground)...");
    }

    let state = SystemState::new();

    let config = get_config(&home_dir);


    rocket::custom(config)
        .attach(MainDbConn::fairing())
        .mount("/", StaticFiles::from("ui/build"))
        .mount("/", routes![
            handlers::online::handle,
            handlers::pid::handle,
            handlers::ui::index,
            handlers::ui::assets,
            get_count,
            increment_count,
        ])
        .manage(state)
        .register(catchers![handlers::ui::rewrite_to_index])
        .launch();
}
