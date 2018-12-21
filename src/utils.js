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

module.exports = { toFirstLetterUppercase }
