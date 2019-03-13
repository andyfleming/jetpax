use reqwest;
use std::error;

pub fn server_is_online() -> bool {
    let response = reqwest::get("http://localhost:8777/api/online");

    if response.is_err() {
        return false
    }

    let body = response.unwrap().text();

    match body {
        Ok(body) => body == "Jetpax Server API Online",
        Err(e) => false
    }
}

pub fn get_server_pid() -> Result<u32, String> {
    let response = reqwest::get("http://localhost:8777/api/pid");

    if response.is_err() {
        return Err("Request for PID failed".to_owned())
    }

    let body = response.unwrap().text();

    if body.is_err() {
        return Err("Response body parsing failed.".to_owned())
    }

    let pid = body.unwrap().parse::<u32>();

    if pid.is_err() {
        return Err("PID parsing failed.".to_owned())
    }

    Ok(pid.unwrap())
}
