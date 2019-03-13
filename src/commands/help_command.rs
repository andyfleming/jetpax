extern crate colored;

use colored::*;

fn println_on_black(msg: &str) {
    println!("{}", msg.on_hex_color(0x000000));
}


pub fn run() {
    println!();
    println_on_black("                                                                          ");
    println_on_black(
        &format!(
            "    {} {} {}                                                           ",
            "J E".hex_color(0xFEC908),
            "T P".hex_color(0xF9A619),
            "A X".hex_color(0xF25822)
        )
    );
    println_on_black(&format!(
        "    {}                                                       ",
        "C O M M A N D S".hex_color(0xFFFFFF)
    ));
    println_on_black("                                                                          ");
    println_on_black(
        &format!(
            "    {}           {}                                 ",
            "up".hex_color(0xFEC908),
            "Starts the Jetpax server".hex_color(0xF9A619)
        )
    );
    println_on_black(
        &format!(
            "    {}         {}                                  ",
            "down".hex_color(0xFEC908),
            "Stops the Jetpax server".hex_color(0xF9A619)
        )
    );
    println_on_black(
        &format!(
            "    {}       {}                 ",
            "status".hex_color(0xFEC908),
            "Displays the status of the Jetpax server".hex_color(0xF9A619)
        )
    );
//    logOnBlack(`    ${chalk.hex('#FEC908')('status')}       ${chalk.hex('#F9A619')(`Displays the status of the Jetpax server_support`)}`)
//    logOnBlack(`    ${chalk.hex('#FEC908')('logs')}         ${chalk.hex('#F9A619')(`Tails the Jetpax server_support logs`)}`)
    println_on_black("                                                                          ");
    println_on_black(
        &format!(
            "    {}         {}       ",
            "init".hex_color(0xFEC908),
            "Initializes a workspace (in the current directory)".hex_color(0xF9A619)
        )
    );
    println_on_black(
        &format!(
            "    {}     {}                                    ",
            "register".hex_color(0xFEC908),
            "Registers a workspace".hex_color(0xF9A619)
        )
    );
    println_on_black(
        &format!(
            "    {}   {}                                  ",
            "deregister".hex_color(0xFEC908),
            "Deregisters a workspace".hex_color(0xF9A619)
        )
    );
    println_on_black("                                                                          ");
//    logOnBlack(`    ${chalk.hex('#FEC908')('ui')}           ${chalk.hex('#F9A619')(`Opens the Jetpax dashboard`)}`)
    println_on_black(
        &format!(
            "    {}          {}                  ",
            "web".hex_color(0xFEC908),
            "Opens the Jetpax dashboard in a browser".hex_color(0xF9A619)
        )
    );
    println_on_black("                                                                          ");
    println_on_black(
        &format!(
            "    {}      {}       ",
            "version".hex_color(0xFEC908),
            "Displays the currently installed version of Jetpax".hex_color(0xF9A619)
        )
    );
    println_on_black(
        &format!(
            "    {}         {}                              ",
            "help".hex_color(0xFEC908),
            "Displays a list of commands".hex_color(0xF9A619)
        )
    );
    println_on_black("                                                                          ");
    println!();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn command_runs() {
        run()
    }
}
