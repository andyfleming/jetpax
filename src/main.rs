#![feature(proc_macro_hygiene, decl_macro)]

extern crate daemonize;
extern crate dirs;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rust_embed;

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

    let sub_command = args[1].clone();

    // Route command
    match sub_command.as_ref() {
        "down" => commands::down_command::run(),
        "init" => commands::init_command::run(),
        "up" => commands::up_command::run(&args),
        "help" => commands::help_command::run(),
        "version" => commands::version_command::run(),
        other => output::print_err_message(&format!("Command \"{}\" not found.", other))
    }
}
