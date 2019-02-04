import decodeBase64 from './decodeBase64'

export default function decodeBase64ObjectValues(object: {[key: string]: string}) {
    return Object.keys(object).reduce((previousValue, key) => {
        return {
            ...previousValue,
            [key]: decodeBase64(object[key]),
        }
    }, {})
}
