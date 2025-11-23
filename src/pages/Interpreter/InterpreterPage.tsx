/**
 * This page provides in-application documentation for the Cosmo interpreter.
 * It includes sections describing the overall program structure, declarations,
 * statements, expressions/operators, values/types, and a brief standard library.
 * The content is mainly textual, demonstrating various Cosmo-specific features.
 */
export default function InterpreterPage() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Cosmo Interpreter Documentation
                </h1>
                <hr className="border-gray-300 dark:border-gray-600" />
            </header>

            {/* Program Structure */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Program Structure</h2>
                <p className="mb-4">
                    A Cosmo program consists of a series of <em>declarations</em>. Declarations include variables,
                    functions, and statements. Programs are structured using blocks, which are enclosed in curly braces{' '}
                    <span className="font-mono">{'{}'}</span>.
                </p>
                <hr className="border-gray-300 dark:border-gray-600 mb-6" />
            </section>

            {/* Declarations */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Declarations</h2>
                <ul className="list-inside space-y-4">
                    <li>
                        <p className="font-semibold">Variable Declaration</p>
                        <p>
                            You can declare a variable using the <span className="font-mono">create</span> keyword
                            followed by an identifier. You can optionally assign it a value.
                        </p>
                        <div className="mt-2">
                            <p className="font-semibold">Example:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                                <code>{`create x = 10;`}</code>
                            </pre>
                        </div>
                    </li>
                    <li>
                        <p className="font-semibold">Function Declaration</p>
                        <p>
                            Functions are defined using the <span className="font-mono">func</span> keyword, followed by
                            the name, optional parameters inside parentheses, and a block of code.
                        </p>
                        <div className="mt-2">
                            <p className="font-semibold">Example:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                                <code>{`func greet(name) {
  output("Hello " + name);
}`}</code>
                            </pre>
                        </div>
                    </li>
                    <li>
                        <p className="font-semibold">Statements</p>
                        <p>
                            These include expressions, control flow statements (like if, while, for), and output/return
                            blocks.
                        </p>
                    </li>
                </ul>
                <hr className="border-gray-300 dark:border-gray-600 my-6" />
            </section>

            {/* Statements */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Statements</h2>
                <ul className="list-inside space-y-4">
                    <li>
                        <p className="font-semibold">Expression Statement</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`x = x + 1;`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Output Statement</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`output("Hello, world!");`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">If Statement</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`if (x > 10) {
  output("Too big");
} else {
  output("OK");
}`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">While Loop</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`while (x < 10) {
  x = x + 1;
}`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">For Loop</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`for (create i = 0; i < 5; i = i + 1) {
  output(i);
}`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Return Statement</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`return 42;`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Block</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`{
  create a = 1;
  output(a);
}`}</code>
                        </pre>
                    </li>
                </ul>
                <hr className="border-gray-300 dark:border-gray-600 my-6" />
            </section>

            {/* Expressions and Operators */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Expressions and Operators</h2>
                <ul className="list-inside space-y-4">
                    <li>
                        <p className="font-semibold">Assignment</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`x = 5;`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Logical Operators</p>
                        <p>
                            - Use <span className="font-mono">or</span>, <span className="font-mono">and</span> for
                            combining boolean expressions.
                            <br />- Use <span className="font-mono">{'!'}</span> or{' '}
                            <span className="font-mono">not</span> for negation.
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`if (a > 0 and b > 0) { ... }`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Comparison Operators</p>
                        <p>
                            - Use <span className="font-mono">==</span>, <span className="font-mono">!=</span>,{' '}
                            <span className="font-mono">{'>'}</span>, <span className="font-mono">{'>='}</span>,{' '}
                            <span className="font-mono">{'<'}</span>, and <span className="font-mono">{'<='}</span>.
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`if (x != y) { ... }`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Arithmetic Operators</p>
                        <p>
                            - Use <span className="font-mono">+</span>, <span className="font-mono">-</span>,{' '}
                            <span className="font-mono">*</span>, <span className="font-mono">/</span>, and{' '}
                            <span className="font-mono">%</span>.
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create total = a + b * 2;`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Unary Operators</p>
                        <p>
                            - Use <span className="font-mono">-x</span>, <span className="font-mono">!x</span>, or{' '}
                            <span className="font-mono">not x</span>.
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`x = -y;`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Function Calls</p>
                        <p>Use parentheses to call a function with arguments.</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`greet("Cosmo");`}</code>
                        </pre>
                    </li>
                    <li>
                        <p className="font-semibold">Primary Expressions</p>
                        <p>
                            These include variables, literals (numbers, strings), booleans, nulls, or grouped
                            expressions in parentheses.
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create x = (3 + 5) * 2;`}</code>
                        </pre>
                    </li>
                </ul>
                <hr className="border-gray-300 dark:border-gray-600 my-6" />
            </section>

            {/* Values and Types */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Values and Types</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Identifiers:</strong> Names for variables/functions. They start with a letter or
                        underscore.
                    </li>
                    <li>
                        <strong>Numbers:</strong> Integer or floating-point values.
                    </li>
                    <li>
                        <strong>Strings:</strong> Enclosed in double quotes. Supports escaping.
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`"Hello, \\"world\\""`}</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Booleans:</strong> Use <span className="font-mono">true</span> or{' '}
                        <span className="font-mono">false</span>.
                    </li>
                    <li>
                        <strong>Null:</strong> Represents "no value".
                    </li>
                    <li>
                        <strong>Reserved Keywords:</strong>{' '}
                        <span className="font-mono">
                            create, func, return, if, else, while, for, output, true, false, null, and, or, not
                        </span>
                    </li>
                </ul>
                <hr className="border-gray-300 dark:border-gray-600 my-6" />
            </section>

            {/* Cosmo Standard Library */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cosmo Standard Library</h2>
                <p className="mb-4">These functions are globally available for use in your Cosmo programs.</p>

                <div className="space-y-6">
                    {/* add() function */}
                    <div>
                        <h3 className="text-xl font-semibold">add(a, b)</h3>
                        <p>
                            <strong>Purpose:</strong> Calculates the sum of two numbers.
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> Throws if either <span className="font-mono">a</span> or{' '}
                            <span className="font-mono">b</span> is not a number.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create result = add(15, 7.5);
output(result); // Outputs: 22.5`}</code>
                        </pre>
                    </div>

                    {/* sqrt() function */}
                    <div>
                        <h3 className="text-xl font-semibold">sqrt(x)</h3>
                        <p>
                            <strong>Purpose:</strong> Returns the square root of a number (must be ≥ 0).
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> Throws if <span className="font-mono">x</span> is not a number or
                            is negative.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create root = sqrt(81);
output(root); // Outputs: 9

create root_decimal = sqrt(2);
output(root_decimal); // Outputs: 1.41421356...`}</code>
                        </pre>
                    </div>

                    {/* clock() function */}
                    <div>
                        <h3 className="text-xl font-semibold">clock()</h3>
                        <p>
                            <strong>Purpose:</strong> Gets the current system time (seconds since the Unix epoch).
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> None.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`output("Current time (seconds since epoch):");
create now = clock();
output(now);`}</code>
                        </pre>
                    </div>

                    {/* random() function */}
                    <div>
                        <h3 className="text-xl font-semibold">random()</h3>
                        <p>
                            <strong>Purpose:</strong> Returns a random number in the range [0, 1).
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> None.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create rand_val = random();
output(rand_val);`}</code>
                        </pre>
                    </div>

                    {/* abs() function */}
                    <div>
                        <h3 className="text-xl font-semibold">abs(x)</h3>
                        <p>
                            <strong>Purpose:</strong> Gets the absolute value of a number.
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> Throws if <span className="font-mono">x</span> is not a number.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create result = abs(-42);
output(result); // Outputs: 42`}</code>
                        </pre>
                    </div>

                    {/* substring() function */}
                    <div>
                        <h3 className="text-xl font-semibold">substring(s, start, end)</h3>
                        <p>
                            <strong>Purpose:</strong> Extracts a substring from a string.
                        </p>
                        <p>
                            <strong>Returns:</strong> A string.
                        </p>
                        <p>
                            <strong>Errors:</strong> Throws if inputs are of the wrong type.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create name = "CosmoLang";
create short = substring(name, 0, 5);
output(short); // Outputs: "Cosmo"`}</code>
                        </pre>
                    </div>

                    {/* length() function */}
                    <div>
                        <h3 className="text-xl font-semibold">length(value)</h3>
                        <p>
                            <strong>Purpose:</strong> Gets the length of a string or list.
                        </p>
                        <p>
                            <strong>Returns:</strong> A number.
                        </p>
                        <p>
                            <strong>Errors:</strong> Throws if <span className="font-mono">value</span> is neither a
                            string nor a list.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create word = "Cosmo";
create len = length(word);
output(len); // Outputs: 5`}</code>
                        </pre>
                    </div>

                    {/* typeOf() function */}
                    <div>
                        <h3 className="text-xl font-semibold">typeof(value)</h3>
                        <p>
                            <strong>Purpose:</strong> Returns the type of a value as a string (e.g., "Number",
                            "String").
                        </p>
                        <p>
                            <strong>Returns:</strong> A string.
                        </p>
                        <p>
                            <strong>Errors:</strong> None.
                        </p>
                        <p>
                            <strong>Example:</strong>
                        </p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <code>{`create val = 3.14;
output(typeof(val)); // Outputs: "Number"`}</code>
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    )
}
