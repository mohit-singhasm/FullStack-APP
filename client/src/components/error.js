const errorMsg = (obj) => {
    const key = Object.keys(obj)
    if (key.includes('extraDetails')) {
        return 'extraDetails'
    } else {
        return key[0]
    }
}


export default errorMsg;