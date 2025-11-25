/**
 * Converts a string to camelCase format.
 * 
 * Replaces all non-alphanumeric characters with spaces, splits the string into words,
 * and formats them as camelCase (first word lowercase, subsequent words capitalized).
 * 
 * @function camelCase
 * @param {string} str - The input string to convert
 * @returns {string} The camelCase formatted string, or 'error' if input is invalid
 * 
 * @example
 * camelCase("good_boy");      // Returns: "goodBoy"
 * camelCase("good-boy");      // Returns: "goodBoy"
 * camelCase("good boy");      // Returns: "goodBoy"
 * camelCase("good@boy!");     // Returns: "goodBoy"
 * camelCase(1234);            // Returns: "error"
 * camelCase(null);            // Returns: "error"
 * 
 * @throws {string} Returns 'error' string if input is not a valid string type
 */

/**
 * Converts a string to dot.case format.
 * 
 * Normalizes all non-alphanumeric characters to spaces, removes leading/trailing whitespace,
 * splits into words, filters empty values, and joins them with dots in lowercase.
 * 
 * @function dotCase
 * @param {string} str - The input string to convert
 * @returns {string} The dot.case formatted string, or 'error' if input is invalid
 * 
 * @example
 * dotCase("Hello World");     // Returns: "hello.world"
 * dotCase("foo-Bar_baz");     // Returns: "foo.bar.baz"
 * dotCase("user@domain!123"); // Returns: "user.domain.123"
 * dotCase(42);                // Returns: "error"
 * 
 * @throws {string} Returns 'error' string if input is not a valid string type
 */

function camelCase(str) {
    if (typeof str !== 'string' || str === null || str === undefined) {
        return 'error';
    }

    return str
        .replace(/[^a-zA-Z0-9]+/g, ' ') // Replace all non-alphanumeric characters with spaces
        .split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// Example usage:
console.log(camelCase("good_boy")); // Output: goodBoy
console.log(camelCase("good-boy")); // Output: goodBoy
console.log(camelCase("good boy"));  // Output: goodBoy
console.log(camelCase("good@boy!"));  // Output: goodBoy
console.log(camelCase(1234));       // Output: error
console.log(camelCase(null));       // Output: error

function dotCase(str) {
    if (typeof str !== 'string' || str === null || str === undefined) {
        return 'error';
    }

    return str
        .replace(/[^a-zA-Z0-9]+/g, ' ') // normalize non-alphanumerics to spaces
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.toLowerCase())
        .join('.');
}

// Example usage:
console.log(dotCase("Hello World"));     // hello.world
console.log(dotCase("foo-Bar_baz"));     // foo.bar.baz
console.log(dotCase("user@domain!123")); // user.domain.123
console.log(dotCase(42));                // error