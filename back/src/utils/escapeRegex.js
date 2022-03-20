/** Escape regex special characters.
 *
 * @param {String} str - String you want to escape.
 * @returns {String} pattern
 *
 * This function is the one suggested in this MDN page:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
 * However, don't expect it to work perfectly.
 * There will always be corner cases.
 * Some patterns might fail, so brace for the consequences.
 *
 * @todo This function is not used because substring search hasn't been
 *  implemented yet.
 */
function escapeRegex(str) {
    // $& means the whole matched string
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default escapeRegex;
