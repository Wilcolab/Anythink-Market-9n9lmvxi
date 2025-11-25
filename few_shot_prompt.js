function toCamelCase(str) {
    return str
        .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Replace hyphens, underscores, and spaces followed by a character
        .replace(/^[A-Z]/, (char) => char.toLowerCase()); // Lowercase the first character
}

// Example usage:
console.log(toCamelCase("first name")); // firstName
console.log(toCamelCase("user_id")); // userId
console.log(toCamelCase("SCREEN_NAME")); // screenName
console.log(toCamelCase("mobile-number")); // mobileNumber