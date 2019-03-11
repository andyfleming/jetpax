use super::super::server::start;

pub fn run(args: &Vec<String>) {
    let run_in_background = !args.contains(&"--foreground".to_string());

    start::start(run_in_background)
}
