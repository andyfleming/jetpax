export default function encodeBase64(input: string) {
    return Buffer.from(input).toString('base64')
}
