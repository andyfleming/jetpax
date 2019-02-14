export default function getTimeInMilliseconds() {
    const [seconds, nanoseconds] = process.hrtime()
    const totalNanoseconds = (seconds * 1e9) + nanoseconds

    return totalNanoseconds / 1e6
}
