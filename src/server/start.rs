use std::process;
use daemonize::Daemonize;
use super::super::server::handlers;
use rocket_contrib::serve::StaticFiles;
use rocket::State;
use std::sync::{Mutex, Arc, RwLock};
use core::borrow::Borrow;

#[derive(Debug)]
struct SystemState {
    count: RwLock<u32>
}

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


pub fn start(run_in_background: bool) {
    // TODO: handle startup concerns like ~/.jetpax directory existence

    if run_in_background {
        println!("Starting server as daemon...");

        let home_dir = match dirs::home_dir() {
            Some(path) => path.display().to_string(),
            None => {
                println!("Error getting the home dir.");
                process::exit(1)
            },
        };

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

    rocket::ignite()
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
