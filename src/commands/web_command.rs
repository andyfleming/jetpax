use webbrowser;
use super::super::output::print_err_message;

pub fn run() {
    if webbrowser::open("http://localhost:8777").is_ok() {
        println!("Opened UI in browser successfully.")
    } else {
        print_err_message("Failed to open in browser.")
    }
}
