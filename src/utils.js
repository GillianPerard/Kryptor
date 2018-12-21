/**
 * Function to uppercase the first letter of a text
 * @param text The text to uppercase the first letter
 */
const toFirstLetterUppercase = text => {
    if (!text || !isNaN(text)) {
        return text
    }
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Function to catch the error a quit the program with the appropriate status code
 * @param cmd The command to run
 */
const returnStatus = cmd => {
    try {
        cmd()
        return 0
    } catch (error) {
        console.log('Error:', error.message)
        return -1
    }
}

module.exports = { returnStatus, toFirstLetterUppercase }
