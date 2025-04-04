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
* **Example:**
    \`\`\`cosmo
    create rand_val = random();
    output(rand_val); // e.g., 0.72345...
    \`\`\`

### \`abs(x)\`
* **Purpose:** Returns the absolute (non-negative) value of a number.
* **Parameters:**
    * \`x\` (\`Number\`): The number to evaluate.
* **Returns:** (\`Number\`) The absolute value of \`x\`.
* **Errors:** Throws a \`RuntimeError\` if \`x\` is not a number.
* **Example:**
    \`\`\`cosmo
    create result = abs(-42);
    output(result); // Outputs: 42
    \`\`\`

### \`substring(s, start, end)\`
* **Purpose:** Returns a substring from a given string, starting at index \`start\` and ending before index \`end\`.
* **Parameters:**
    * \`s\` (\`String\`): The original string.
    * \`start\` (\`Number\`): The starting index (inclusive).
    * \`end\` (\`Number\`): The ending index (exclusive).
* **Returns:** (\`String\`) A substring extracted from \`s\`.
* **Errors:** 
    * Throws a \`RuntimeError\` if \`s\` is not a string.
    * Throws a \`RuntimeError\` if \`start\` or \`end\` is not a number.
* **Example:**
    \`\`\`cosmo
    create name = "CosmoLang";
    create short = substring(name, 0, 5);
    output(short); // Outputs: "Cosmo"
    \`\`\`

### \`length(value)\`
* **Purpose:** Returns the length of a string or list.
* **Parameters:**
    * \`value\` (\`String\` or \`List\`): The value to check.
* **Returns:** (\`Number\`) The number of elements or characters.
* **Errors:** Throws a \`RuntimeError\` if \`value\` is neither a string nor a list.
* **Example:**
    \`\`\`cosmo
    create word = "Cosmo";
    create len = length(word);
    output(len); // Outputs: 5
    \`\`\`

### \`typeof(value)\`
* **Purpose:** Returns the type name of a given value as a string.
* **Parameters:**
    * \`value\` (Any): The value to inspect.
* **Returns:** (\`String\`) The type of \`value\` (e.g., "Number", "String", "List", "Boolean", etc.).
* **Errors:** None.
* **Example:**
    \`\`\`cosmo
    create val = 3.14;
    output(typeOf(val)); // Outputs: "Number"
    \`\`\`
`;
