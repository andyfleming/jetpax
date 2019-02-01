import jetpaxHome from "../../Common/jetpaxHome"
import fs from "fs"
import {execSync} from "child_process"

// Create the home folder if it hasn't already been created
if (!fs.existsSync(jetpaxHome)) {

    // Make sure the directory exists first too, to be safe
    execSync(`mkdir -p ${jetpaxHome}`)
}
