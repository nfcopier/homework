%option noyywrap

%{
    #include <iostream>
    #include <stdlib.h>
    #include <string.h>
    #include "parser.tab.h"
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

NUMERIC_CONSTANT                "-"?(0|(0x))?({HEX_DIGIT})+
CHARACTER_CONSTANT              "'"(.|(\\[[:print:]]))"'"
STRING_CONSTANT                 \"(\\.|[^\\"])*\"

COMMENT                         \$.*\n
NEW_LINE                        \n

WHITESPACE                      [[:blank:]]+

CATCHALL                        .

%%

{ARRAY}                         { return ARRAY_KEYWORD; }
{BEGIN}                         { return BEGIN_KEYWORD; }
{CHR}                           { return CHR_KEYWORD; }
{CONST}                         { return CONST_KEYWORD; }
{DO}                            { return DO_KEYWORD; }
{DOWNTO}                        { return DOWNTO_KEYWORD; }
{ELSE}                          { return ELSE_KEYWORD; }
{ELSEIF}                        { return ELSEIF_KEYWORD; }
{END}                           { return END_KEYWORD; }
{FOR}                           { return FOR_KEYWORD; }
{FORWARD}                       { return FORWARD_KEYWORD; }
{FUNCTION}                      { return FUNCTION_KEYWORD; }
{IF}                            { return IF_KEYWORD; }
{OF}                            { return OF_KEYWORD; }
{ORD}                           { return ORD_KEYWORD; }
{PRED}                          { return PRED_KEYWORD; }
{PROCEDURE}                     { return PROCEDURE_KEYWORD; }
{READ}                          { return READ_KEYWORD; }
{RECORD}                        { return RECORD_KEYWORD; }
{REF}                           { return REFERENCE_KEYWORD; }
{REPEAT}                        { return REPEAT_KEYWORD; }
{RETURN}                        { return RETURN_KEYWORD; }
{STOP}                          { return STOP_KEYWORD; }
{SUCC}                          { return SUCC_KEYWORD; }
{THEN}                          { return THEN_KEYWORD; }
{TO}                            { return TO_KEYWORD; }
{TYPE}                          { return TYPE_KEYWORD; }
{UNTIL}                         { return UNTIL_KEYWORD; }
{VAR}                           { return VARIABLE_KEYWORD; }
{WHILE}                         { return WHILE_KEYWORD; }
{WRITE}                         { return WRITE_KEYWORD; }

{IDENTIFIER}                    { yylval.stringValue = strdup(yytext); return IDENTIFIER; }
{NUMERIC_CONSTANT}              { yylval.intValue = atoi(yytext); return NUMERIC_CONSTANT; }
{CHARACTER_CONSTANT}            { yylval.stringValue = strdup(yytext); return CHARACTER_CONSTANT; }
{STRING_CONSTANT}               { yylval.stringValue = strdup(yytext); return STRING_CONSTANT; }

"."                             { return DOT_OPERATOR; }
";"                             { return STATEMENT_TERMINATOR; }
":"                             { return COLON; }
"["                             { return OPENING_BRACKET; }
"]"                             { return CLOSING_BRACKET; }
"("                             { return OPENING_PARENTHESIS; }
")"                             { return CLOSING_PARENTHESIS; }
":="                            { return ASSIGNMENT_OPERATOR; }
","                             { return COMMA; }


"|"                             { return OR_OPERATOR; }
"&"                             { return AND_OPERATOR; }
"~"                             { return NOT_OPERATOR; }
"="                             { return EQUALS_SIGN; }
"<>"                            { return NON_EQUIVALENCE_OPERATOR; }
"<"                             { return LESS_THAN_OPERATOR; }
"<="                            { return LESS_EQUAL_OPERATOR; }
">"                             { return GREATER_THAN_OPERATOR; }
">="                            { return GREATER_EQUAL_OPERATOR; }
"+"                             { return PLUS_SIGN; }
"-"                             { return MINUS_SIGN; }
"*"                             { return MULTIPLY_SIGN; }
"/"                             { return DIVIDE_SIGN; }
"%"                             { return MODULO_SIGN; }

{COMMENT}                       {}
{NEWLINE}                       {}
{WHITESPACE}                    {}
{CATCHALL}                      { std::cout << "Lexical error: Unrecognized rule \"" << yytext << "\"; line" << yylineno << std::endl; }

%%

int main() {
    yyparse();
    std::cout << "Line Count:\t" << yylineno << std::endl;
    return 0;
}
