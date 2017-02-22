%option noyywrap

%{
    #include <iostream>
    #include <string.h>
    #include "parser.tab.hpp"
    typedef yy::parser::token Token;
    #undef YY_DECL
    #define YY_DECL int yylex(yy::parser::semantic_type* const yylval)
%}

%option yylineno

OCTAL_DIGIT                     [0-7]
DIGIT                           [0-9]
LETTER                          [a-zA-Z]
HEX_DIGIT                       [0-9a-fA-F]
UNDERSCORE                      "_"
NEWLINE                         \n

ARRAY                           (array)|(ARRAY)
BEGIN                           (begin)|(BEGIN)
CHR                             (chr)|(CHR)
CONST                           (const)|(CONST)
DO                              (do)|(DO)
DOWNTO                          (downto)|(DOWNTO)
ELSE                            (else)|(ELSE)
ELSEIF                          (elseif)|(ELSEIF)
END                             (end)|(END)
FOR                             (for)|(FOR)
FORWARD                         (forward)|(FORWARD)
FUNCTION                        (function)|(FUNCTION)
IF                              (if)|(IF)
OF                              (of)|(OF)
ORD                             (ord)|(ORD)
PRED                            (pred)|(PRED)
PROCEDURE                       (procedure)|(PROCEDURE)
READ                            (read)|(READ)
RECORD                          (record)|(RECORD)
REF                             (ref)|(REF)
REPEAT                          (repeat)|(REPEAT)
RETURN                          (return)|(RETURN)
STOP                            (stop)|(STOP)
SUCC                            (succ)|(SUCC)
THEN                            (then)|(THEN)
TO                              (to)|(TO)
TYPE                            (type)|(TYPE)
UNTIL                           (until)|(UNTIL)
VAR                             (var)|(VAR)
WHILE                           (while)|(WHILE)
WRITE                           (write)|(WRITE)

IDENTIFIER                      {LETTER}({UNDERSCORE}|{DIGIT}|{LETTER})*

NUMERIC_LITERAL                "-"?(0|(0x))?({HEX_DIGIT})+
CHARACTER_LITERAL              "'"(.|(\\[[:print:]]))"'"
STRING_LITERAL                 \"(\\.|[^\\"])*\"

COMMENT                         \$.*\n
NEW_LINE                        \n

WHITESPACE                      [[:blank:]]+

CATCHALL                        .

%%

{ARRAY}                         { return Token::ARRAY_KEYWORD; }
{BEGIN}                         { return Token::BEGIN_KEYWORD; }
{CHR}                           { return Token::CHR_KEYWORD; }
{CONST}                         { return Token::CONST_KEYWORD; }
{DO}                            { return Token::DO_KEYWORD; }
{DOWNTO}                        { return Token::DOWNTO_KEYWORD; }
{ELSE}                          { return Token::ELSE_KEYWORD; }
{ELSEIF}                        { return Token::ELSEIF_KEYWORD; }
{END}                           { return Token::END_KEYWORD; }
{FOR}                           { return Token::FOR_KEYWORD; }
{FORWARD}                       { return Token::FORWARD_KEYWORD; }
{FUNCTION}                      { return Token::FUNCTION_KEYWORD; }
{IF}                            { return Token::IF_KEYWORD; }
{OF}                            { return Token::OF_KEYWORD; }
{ORD}                           { return Token::ORD_KEYWORD; }
{PRED}                          { return Token::PRED_KEYWORD; }
{PROCEDURE}                     { return Token::PROCEDURE_KEYWORD; }
{READ}                          { return Token::READ_KEYWORD; }
{RECORD}                        { return Token::RECORD_KEYWORD; }
{REF}                           { return Token::REFERENCE_KEYWORD; }
{REPEAT}                        { return Token::REPEAT_KEYWORD; }
{RETURN}                        { return Token::RETURN_KEYWORD; }
{STOP}                          { return Token::STOP_KEYWORD; }
{SUCC}                          { return Token::SUCC_KEYWORD; }
{THEN}                          { return Token::THEN_KEYWORD; }
{TO}                            { return Token::TO_KEYWORD; }
{TYPE}                          { return Token::TYPE_KEYWORD; }
{UNTIL}                         { return Token::UNTIL_KEYWORD; }
{VAR}                           { return Token::VARIABLE_KEYWORD; }
{WHILE}                         { return Token::WHILE_KEYWORD; }
{WRITE}                         { return Token::WRITE_KEYWORD; }

{IDENTIFIER}                    { yylval->build<char*>(yytext); return Token::IDENTIFIER; }
{NUMERIC_LITERAL}              { yylval->build<int>(atoi(yytext)); return Token::NUMERIC_LITERAL; }
{CHARACTER_LITERAL}            { yylval->build<char>(yytext[0]); return Token::CHARACTER_LITERAL; }
{STRING_LITERAL}               { yylval->build<char*>(yytext); return Token::STRING_LITERAL; }

"."                             { return Token::DOT_OPERATOR; }
";"                             { return Token::STATEMENT_TERMINATOR; }
":"                             { return Token::COLON; }
"["                             { return Token::OPENING_BRACKET; }
"]"                             { return Token::CLOSING_BRACKET; }
"("                             { return Token::OPENING_PARENTHESIS; }
")"                             { return Token::CLOSING_PARENTHESIS; }
":="                            { return Token::ASSIGNMENT_OPERATOR; }
","                             { return Token::COMMA; }


"|"                             { return Token::OR_OPERATOR; }
"&"                             { return Token::AND_OPERATOR; }
"~"                             { return Token::NOT_OPERATOR; }
"="                             { return Token::EQUALS_SIGN; }
"<>"                            { return Token::NON_EQUIVALENCE_OPERATOR; }
"<"                             { return Token::LESS_THAN_OPERATOR; }
"<="                            { return Token::LESS_EQUAL_OPERATOR; }
">"                             { return Token::GREATER_THAN_OPERATOR; }
">="                            { return Token::GREATER_EQUAL_OPERATOR; }
"+"                             { return Token::PLUS_SIGN; }
"-"                             { return Token::MINUS_SIGN; }
"*"                             { return Token::MULTIPLY_SIGN; }
"/"                             { return Token::DIVIDE_SIGN; }
"%"                             { return Token::MODULO_SIGN; }

{COMMENT}                       {}
{NEWLINE}                       {}
{WHITESPACE}                    {}
{CATCHALL}                      { std::cout << "Lexical error: Unrecognized rule \"" << yytext << "\"; line" << yylineno << std::endl; }

%%

int main() {
    yy::parser parser;
    parser.parse();
    std::cout << "Line Count:\t" << yylineno << std::endl;
    return 0;
}
