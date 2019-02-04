export default function decodeBase64(input: string) {
    return Buffer.from(input, 'base64').toString()
}
