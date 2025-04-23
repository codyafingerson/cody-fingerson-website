import { autocompletion } from "@codemirror/autocomplete";
import { StreamLanguage } from "@codemirror/language";
import { tags } from "@lezer/highlight";

/**
 * Defines the syntax highlighting rules for the Cosmo language using CodeMirror's StreamLanguage.
 * It handles comments (single-line and multi-line), numbers, strings, keywords,
 * variable names, and operators.
 */
const cosmoLanguage = StreamLanguage.define<{ inComment: boolean }>({
    startState: () => ({
        inComment: false
    }),

    /**
     * Tokenizes the input stream based on the current state.
     * @param stream The character stream.
     * @param state The current parsing state.
     * @returns The token type string or null if no token is recognized.
     */
    token: (stream, state) => {
        // Handle multi-line comments
        if (state.inComment) {
            stream.match(/^(?:[^*]|\*(?!\/))*/); // Match anything that isn't '*/'
            if (stream.match("*/")) {
                state.inComment = false; // End of comment found
            }
            return "comment";
        }

        // Ignore whitespace
        if (stream.eatSpace()) return null;

        // Handle single-line comments
        if (stream.match("//")) {
            stream.skipToEnd(); // Skip the rest of the line
            return "comment";
        }

        // Handle start of multi-line comments
        if (stream.match("/*")) {
            state.inComment = true;
            return "comment";
        }

        // Handle numbers (integers and floats)
        if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
            return "number";
        }

        // Handle strings (double-quoted with escape characters)
        if (stream.match(/^"([^"\\]|\\.)*"/)) {
            return "string";
        }

        // Handle keywords
        if (stream.match(/^(create|func|if|else|while|for|output|null|and|or|not)\b/)) {
            return "keyword";
        }

        // Handle variable names (identifiers)
        if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
            return "variableName";
        }

        // Handle operators and punctuation
        if (stream.match(/^(==|!=|>=|<=|>|<|\+|-|\*|\/|%|=|\(|\)|\{|\}|;|,)/)) {
            return "operator";
        }

        // Consume the next character if none of the rules matched
        stream.next();

        return null; // No specific token type
    },

    // Maps token types returned by the `token` function to Lezer highlight tags.
    tokenTable: {
        number: tags.number,
        string: tags.string,
        keyword: tags.keyword,
        variableName: tags.variableName,
        operator: tags.operator,
        comment: tags.comment,
        bool: tags.bool,
        // Common punctuation/grouping symbols
        bracket: tags.bracket,
        paren: tags.paren,
        squareBracket: tags.squareBracket,
        brace: tags.brace,
        // Potential future mappings
        className: tags.className,
        function: tags.function(tags.variableName),
        functionName: tags.function(tags.variableName),
    },
    // Defines comment syntax for features like comment toggling.
    languageData: {
        commentTokens: { line: "//", block: { open: "/*", close: "*/" } }
    }
});

/**
 * Provides custom autocompletion suggestions for the Cosmo language.
 * It suggests keywords and boolean literals based on the word preceding the cursor.
 * @param context The autocompletion context provided by CodeMirror.
 * @returns An object containing the completion options or null if no suggestions are applicable.
 */
function customCompletion(context: any) {
    // Match the word before the cursor
    let word = context.matchBefore(/\w*/);

    // If no word is found or the completion is not explicitly requested for an empty match, return null
    if (!word || (word.from === word.to && !context.explicit)) return null;

    // Return the list of completion options
    return {
        from: word.from, // Start position of the word being completed
        to: word.to,     // End position of the word being completed
        options: [
            // Keywords
            { label: "create", type: "keyword" },
            { label: "func", type: "keyword" },
            { label: "return", type: "keyword" },
            { label: "if", type: "keyword" },
            { label: "else", type: "keyword" },
            { label: "while", type: "keyword" },
            { label: "for", type: "keyword" },
            { label: "output", type: "keyword" },
            { label: "null", type: "keyword" },
            { label: "and", type: "keyword" },
            { label: "or", type: "keyword" },
            { label: "not", type: "keyword" },
            // Boolean literals
            { label: "true", type: "bool" },
            { label: "false", type: "bool" },
        ]
    };
}

/**
 * An array containing the CodeMirror extensions for the Cosmo language.
 * This includes the language definition (syntax highlighting) and autocompletion.
 */
const cosmoExtension = [
    cosmoLanguage, // The language definition
    autocompletion({ // Enable autocompletion
        override: [customCompletion], // Use the custom completion source
    }),
];

export default cosmoExtension;