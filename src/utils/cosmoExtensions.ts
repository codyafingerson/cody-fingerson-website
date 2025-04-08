import { autocompletion } from "@codemirror/autocomplete";
import { StreamLanguage } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const cosmoLanguage = StreamLanguage.define<{ inComment: boolean }>({

    startState: () => ({
        inComment: false
    }),

    token: (stream, state) => {
        if (state.inComment) {
            stream.match(/^(?:[^*]|\*(?!\/))*/);
            if (stream.match("*/")) {
                state.inComment = false;
            }
            return "comment";

        }

        if (stream.eatSpace()) return null;

        if (stream.match("//")) {
            stream.skipToEnd();
            return "comment";

        }

        if (stream.match("/*")) {
            state.inComment = true;
            return "comment";
        }

        if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
            return "number";
        }

        if (stream.match(/^"([^"\\]|\\.)*"/)) {
            return "string";
        }

        if (stream.match(/^(create|func|if|else|while|for|output|null|and|or|not)\b/)) {
            return "keyword";
        }

        if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
            return "variableName";
        }

        if (stream.match(/^(==|!=|>=|<=|>|<|\+|-|\*|\/|%|=|\(|\)|\{|\}|;|,)/)) {
            return "operator";
        }

        stream.next();

        return null;
    },

    tokenTable: {
        number: tags.number,
        string: tags.string,
        keyword: tags.keyword,
        variableName: tags.variableName,
        operator: tags.operator,
        comment: tags.comment,
        bool: tags.bool,
        bracket: tags.bracket,
        paren: tags.paren,
        squareBracket: tags.squareBracket,
        brace: tags.brace,
        className: tags.className,
        function: tags.function(tags.variableName),
        functionName: tags.function(tags.variableName),

    },
    languageData: {
        commentTokens: { line: "//", block: { open: "/*", close: "*/" } }
    }

});

function customCompletion(context: any) {
    let word = context.matchBefore(/\w*/);

    if (!word || (word.from === word.to && !context.explicit)) return null;

    return {
        from: word.from,
        to: word.to,
        options: [
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
            { label: "true", type: "bool" },
            { label: "false", type: "bool" },
        ]
    };
}

const cosmoExtension = [
    cosmoLanguage,
    autocompletion({
        override: [customCompletion],
    }),

];

export default cosmoExtension;