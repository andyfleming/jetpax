#![feature(proc_macro_hygiene, decl_macro)]
extern crate daemonize;
extern crate diesel;
extern crate dirs;
extern crate reqwest;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rust_embed;
#[macro_use] extern crate serde;
#[macro_use] extern crate serde_json;

mod api_client;
mod commands;
mod output;
mod server;

use std::{env, process};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("No sub-command found");
        process::exit(0);
    }

    // Capture the sub-command (and convert aliases)
    let sub_command = match args[1].as_ref() {
        "--help" => "help",
        "--version" => "version",
        other => &other
    };

    // Route command
    match sub_command {
        "down" => commands::down_command::run(),
        "init" => commands::init_command::run(),
        "up" => commands::up_command::run(&args),
        "help" => commands::help_command::run(),
        "version" => commands::version_command::run(),
        "web" => commands::web_command::run(),
        other => output::print_err_message(&format!("Command \"{}\" not found.", other))
    }
}
