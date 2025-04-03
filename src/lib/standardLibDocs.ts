export const cosmoStandardLibrary = `
## Cosmo Standard Library Functions

These functions are built into the Cosmo interpreter and are available globally.

### \`add(a, b)\`

* **Purpose:** Calculates the sum of two numbers.
* **Parameters:**
    * \`a\` (\`Number\`): The first number operand.
    * \`b\` (\`Number\`): The second number operand.
* **Returns:** (\`Number\`) The result of \`a\` plus \`b\`.
* **Errors:** Throws a \`RuntimeError\` if either \`a\` or \`b\` is not a number.
* **Example:**
    \`\`\`cosmo
    create result = add(15, 7.5);
    output(result); // Outputs: 22.5
    \`\`\`

### \`sqrt(x)\`

* **Purpose:** Calculates the non-negative square root of a number.
* **Parameters:**
    * \`x\` (\`Number\`): The number whose square root is to be calculated. Must be zero or positive.
* **Returns:** (\`Number\`) The square root of \`x\`.
* **Errors:**
    * Throws a \`RuntimeError\` if \`x\` is not a number.
    * Throws a \`RuntimeError\` if \`x\` is a negative number.
* **Example:**
    \`\`\`cosmo
    create root = sqrt(81);
    output(root); // Outputs: 9

    create root_decimal = sqrt(2);
    output(root_decimal); // Outputs: 1.41421356...
    \`\`\`

### \`clock()\`

* **Purpose:** Returns the current system time as the number of seconds elapsed since the Unix epoch (00:00:00 UTC on 1 January 1970).
* **Parameters:** None.
* **Returns:** (\`Number\`) The current time in seconds, potentially including fractions of a second.
* **Errors:** None.
* **Example:**
    \`\`\`cosmo
    output("Current time (seconds since epoch):");
    create now = clock();
    output(now); // Outputs a large number like 1743480637.123
    \`\`\`
### \`random()\`
* **Purpose:** Returns a pseudo-random floating-point number between 0 (inclusive) and 1 (exclusive).
* **Parameters:** None.
* **Returns:** (\`Number\`) A random number in the range [0, 1).
* **Errors:** None.
* **Example:** \`create rand_val = random(); output(rand_val); // e.g., 0.72345...\`
`;