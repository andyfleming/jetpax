export default function wait(milliseconds: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}
