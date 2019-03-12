use std::process;
use daemonize::Daemonize;
use super::super::server::handlers;
use rocket_contrib::serve::StaticFiles;

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

    rocket::ignite()
        .mount("/", StaticFiles::from("ui/build"))
        .mount("/", routes![
            handlers::online::handle,
            handlers::pid::handle,
            handlers::ui::index,
            handlers::ui::assets,
        ])
        .register(catchers![handlers::ui::rewrite_to_index])
        .launch();
}
