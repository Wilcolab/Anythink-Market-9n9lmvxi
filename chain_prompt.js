function toKebabCase(input) {
    return input
        .toLowerCase() // Convert to lowercase
        .replace(/[\s_]+/g, '-'); // Replace spaces and underscores with hyphens
}

// Example usage
console.log(toKebabCase("Hello World")); // Output: hello-world
console.log(toKebabCase("This_is_a_test")); // Output: this-is-a-test