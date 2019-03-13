use crate::api_client;
use crate::server::handlers;
use crate::server::preflight;
use daemonize::Daemonize;
use rocket::config::{Config, Environment, Value};
use rocket_contrib::database;
use rocket_contrib::databases::diesel;
use rocket::State;
use std::collections::HashMap;
use std::process;
use std::fs::File;
use std::sync::RwLock;

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

    println!("Database URL: {}", format!("{}/.jetpax/db.sqlite", home_dir));

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

    // Check if server is already running. If so, exit.
    if api_client::server_is_online() {
        println!("The server is already online.");
        process::exit(0);
    }

    // Handle startup concerns with preflight
    preflight::run().unwrap_or_else(|e| {
        println!("Error running startup preflight. Error: {}", e);
        process::exit(1)
    });

    let home_dir = match dirs::home_dir() {
        Some(path) => path.display().to_string(),
        None => {
            println!("Error getting the home dir.");
            process::exit(1)
        },
    };

    if run_in_background {
        println!("Starting server as daemon...");

        let stdout = File::create(&format!("{}/.jetpax/server_daemon.out", home_dir)).unwrap_or_else(|e| {
            eprintln!("Log file could not be created. Error: {}", e);
            process::exit(1)
        });
        let stderr = File::create(&format!("{}/.jetpax/server_daemon.err", home_dir)).unwrap_or_else(|e| {
            eprintln!("Log file could not be created. Error: {}", e);
            process::exit(1)
        });

        Daemonize::new()
            .pid_file(&format!("{}/.jetpax/server_daemon.pid", home_dir))
            .working_directory(&format!("{}/.jetpax/", home_dir))
            .umask(0o000)
//            .user("andyfleming")
//            .group("staff")
            .stdout(stdout)
            .stderr(stderr)
            .start()
            .unwrap_or_else(|e| {
                eprintln!("Process could not start as daemon! Error: {}", e);
                process::exit(1)
            });

    } else {
        println!("Starting server (in foreground)...");
    }

    let state = SystemState::new();
    let config = get_config(&home_dir);

    rocket::custom(config)
        .attach(MainDbConn::fairing())
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
