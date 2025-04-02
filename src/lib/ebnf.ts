export const cosmoEBNF = `
### Program Structure

\`\`\`ebnf
program ::= { declaration };
\`\`\`

### Declarations

\`\`\`ebnf
declaration ::= variable_declaration
              | function_declaration
              | statement;
\`\`\`

### Variable Declaration

\`\`\`ebnf
variable_declaration ::= "create" identifier [ "=" expression ] ";";
\`\`\`

### Function Declaration

\`\`\`ebnf
function_declaration ::= "func" identifier "(" [ parameter_list ] ")" block;
\`\`\`

### Parameter List

\`\`\`ebnf
parameter_list ::= identifier { "," identifier };
\`\`\`

## Statements

\`\`\`ebnf
statement ::= expression_statement
            | output_statement
            | if_statement
            | while_statement
            | for_statement
            | return_statement
            | block;
\`\`\`

### Expression Statement

\`\`\`ebnf
expression_statement ::= expression ";";
\`\`\`

### Output Statement

\`\`\`ebnf
output_statement ::= "output" "(" expression ")" ";"
\`\`\`

### If Statement

\`\`\`ebnf
if_statement ::= "if" "(" expression ")" block [ "else" block ];
\`\`\`

### While Statement

\`\`\`ebnf
while_statement ::= "while" "(" expression ")" block;
\`\`\`

### For Statement

\`\`\`ebnf
for_statement ::= "for" "(" [ for_initializer ] ";" [ expression ] ";" [ expression ] ")" block;
\`\`\`

### Return Statement

\`\`\`ebnf
return_statement ::= "return" [ expression ] ";";
\`\`\`

### Block

\`\`\`ebnf
block ::= "{" { declaration } "}";
\`\`\`

## For Loop Initializer

\`\`\`ebnf
for_initializer ::= variable_declaration
                  | expression_statement
                  | /* empty */;
\`\`\`

## Expressions

\`\`\`ebnf
expression ::= assignment;
assignment ::= logical_or [ "=" assignment ];
logical_or ::= logical_and { "or" logical_and };
logical_and ::= equality { "and" equality };
equality ::= comparison { ( "==" | "!=" ) comparison };
comparison ::= term { ( ">" | ">=" | "<" | "<=" ) term };
term ::= factor { ( "+" | "-" ) factor };
factor ::= unary { ( "*" | "/" | "%" ) unary };
\`\`\`

### Unary Operators

\`\`\`ebnf
unary ::= ( "-" | "not" | "!" ) unary
        | call;
\`\`\`

### Function Calls

\`\`\`ebnf
call ::= primary { "(" [ argument_list ] ")" };
\`\`\`

### Argument List

\`\`\`ebnf
argument_list ::= expression { "," expression };
\`\`\`

### Primary Expressions

\`\`\`ebnf
primary ::= identifier
          | number
          | string
          | "true"
          | "false"
          | "null"
          | "(" expression ")";
\`\`\`

## Tokens

\`\`\`ebnf
identifier ::= IDENTIFIER;
number ::= NUMBER;
string ::= STRING;
\`\`\`

### Lexical Tokens

\`\`\`ebnf
IDENTIFIER ::= /[a-zA-Z_][a-zA-Z0-9_]*/;
NUMBER ::= /[0-9]+(\\.[0-9]+)?/;
STRING ::= /"([^"\\\\]|\\\\.)*"/;
\`\`\`

## Reserved Keywords

\`\`\`ebnf
reserved_keywords ::= "create" | "func" | "return" | "if" | "else" | "while" | "for"
                    | "output" | "true" | "false" | "null" | "and" | "or" | "not";
\`\`\`
`;