extern crate colored;

use colored::*;

pub fn print_err_message(msg: &str) {
        println!("{}", msg.red());
}
