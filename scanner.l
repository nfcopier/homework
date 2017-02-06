%option noyywrap

%{
    #include <iostream>

    unsigned int currentLine = 1;
%}

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

DECLARATION_KEYWORD             {ARRAY}|{CONST}|{FUNCTION}|{PROCEDURE}|{RECORD}|{REF}|{TYPE}|{VAR}|{OF}
LOOP_KEYWORD                    {DO}|{DOWNTO}|{FOR}|{REPEAT}|{STOP}|{TO}|{WHILE}
BRANCH_KEYWORD                  {ELSE}|{ELSEIF}|{IF}|{THEN}|{RETURN}
BLOCK_KEYWORD                   {BEGIN}|{END}
MISC_KEYWORD                    {CHR}|{FORWARD}|{ORD}|{PRED}|{READ}|{SUCC}|{WRITE}
KEYWORD                         {DECLARATION_KEYWORD}|{LOOP_KEYWORD}|{BRANCH_KEYWORD}|{BLOCK_KEYWORD}

ARITHMETIC_OPERATOR             "+"|"-"|"*"|"/"|"%"
BOOLEAN_OPERATOR                "&"|"|"|"~"|"="|"<"|"<>"|"<="|">"|">="
GROUPING_OPERATOR               ","|":"|"("|")"|"["|"]"
MISC_OPERATOR                   ";"|":="|"."
OPERATOR                        {ARITHMETIC_OPERATOR}|{BOOLEAN_OPERATOR}|{GROUPING_OPERATOR}|{MISC_OPERATOR}

NUMERIC_CONSTANT                "-"?(0|(0x))?({HEX_DIGIT})+
CHARACTER_CONSTANT              "'"(.|(\\[[:print:]]))"'"
STRING_CONSTANT                 \"(\\.|[^\\"])*\"
CONSTANT                        {NUMERIC_CONSTANT}|{CHARACTER_CONSTANT}|{STRING_CONSTANT}

IDENTIFIER                      {LETTER}({UNDERSCORE}|{DIGIT}|{LETTER})*

COMMENT                         \$.*\n

WHITESPACE                      [[:blank:]]+

CATCHALL                        .

%%

{KEYWORD}                       { std::cout << "KEYWORD:\t" << yytext << std::endl; }
{OPERATOR}                      { std::cout << "OPERATOR:\t" << yytext << std::endl; }
{CONSTANT}                      { std::cout << "CONSTANT:\t" << yytext << std::endl; }
{IDENTIFIER}                    { std::cout << "IDENTIFIER:\t" << yytext << std::endl; }
{COMMENT}|{NEWLINE}             { currentLine++; }
{WHITESPACE}                    {}
{CATCHALL}                      { std::cout << "Lexical error: Unrecognized rule \"" << yytext << "\"; line" << currentLine << std::endl; }

%%

int main() {
    yylex();
    std::cout << "Line Count:\t" << currentLine << std::endl;
    return 0;
}
