import getTimeInMilliseconds from "./getTimeInMilliseconds"

export default function startTimer() {
    const start = getTimeInMilliseconds()

    return function getDuration() {
        return getTimeInMilliseconds() - start
    }
}
