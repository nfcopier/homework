%{
#include <iostream>

extern unsigned int yylineno;

int yylex(void);
void yyerror(const char* error) {
    std::cerr << error << " on line: " << yylineno << std::endl;
}
%}

%union {
    int intValue;
    char* stringValue;
    char charValue;
}

%token DOT_OPERATOR
%token STATEMENT_TERMINATOR
%token COLON
%token OPENING_BRACKET
%token CLOSING_BRACKET
%token OPENING_PARENTHESIS
%token CLOSING_PARENTHESIS
%token ASSIGNMENT_OPERATOR
%token COMMA

%token CONST_KEYWORD
%token TYPE_KEYWORD
%token RECORD_KEYWORD
%token END_KEYWORD
%token ARRAY_KEYWORD
%token OF_KEYWORD
%token VARIABLE_KEYWORD
%token PROCEDURE_KEYWORD
%token FORWARD_KEYWORD
%token FUNCTION_KEYWORD
%token REFERENCE_KEYWORD
%token BEGIN_KEYWORD
%token IF_KEYWORD
%token THEN_KEYWORD
%token ELSEIF_KEYWORD
%token ELSE_KEYWORD
%token WHILE_KEYWORD
%token DO_KEYWORD
%token REPEAT_KEYWORD
%token UNTIL_KEYWORD
%token FOR_KEYWORD
%token TO_KEYWORD
%token DOWNTO_KEYWORD
%token STOP_KEYWORD
%token RETURN_KEYWORD
%token READ_KEYWORD
%token WRITE_KEYWORD

%left OR_OPERATOR
%right AND_OPERATOR
%right NOT_OPERATOR
%nonassoc
    EQUALS_SIGN
    NON_EQUIVALENCE_OPERATOR
    LESS_THAN_OPERATOR
    LESS_EQUAL_OPERATOR
    GREATER_THAN_OPERATOR
    GREATER_EQUAL_OPERATOR
%left
    PLUS_SIGN
    MINUS_SIGN
%left
    MULTIPLY_SIGN
    DIVIDE_SIGN
    MODULO_SIGN
%right UNARY_MINUS

%token CHR_KEYWORD
%token ORD_KEYWORD
%token PRED_KEYWORD
%token SUCC_KEYWORD

%token IDENTIFIER
%token NUMERIC_CONSTANT
%token STRING_CONSTANT
%token CHARACTER_CONSTANT
%start program

%%

program:
    constant_declaration_list_maybe
    type_declaration_list_maybe
    variable_declaration_list_maybe
    call_definition_list_maybe
    block
    DOT_OPERATOR
;

constant_declaration_list_maybe:
    %empty
|   CONST_KEYWORD
    constant_declaration_list
;

constant_declaration_list:
    constant_declaration
|   constant_declaration_list
    constant_declaration
;

constant_declaration:
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
    EQUALS_SIGN
    expression
    STATEMENT_TERMINATOR
;

type_declaration_list_maybe:
    %empty
|   TYPE_KEYWORD
    type_declaration_list
;

type_declaration_list:
    type_declaration
|   type_declaration_list
    type_declaration
;

type_declaration:
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
    EQUALS_SIGN
    type
    STATEMENT_TERMINATOR
;

type:
    IDENTIFIER
|   record_type
|   array_type
;

record_type:
    RECORD_KEYWORD
    identifiers_by_type_list_maybe
    END_KEYWORD
;

identifiers_by_type_list_maybe:
    %empty
|   identifiers_by_type_list
;

array_type:
    ARRAY_KEYWORD
    OPENING_BRACKET
    expression
    COLON
    expression
    CLOSING_BRACKET
    OF_KEYWORD
    type
;

variable_declaration_list_maybe:
    %empty
|   VARIABLE_KEYWORD
    identifiers_by_type_list
;

identifiers_by_type_list:
    identifiers_by_type
|   identifiers_by_type_list
    identifiers_by_type
;

identifiers_by_type:
    identifier_list
    COLON
    type
    STATEMENT_TERMINATOR
;

identifier_list:
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
|   identifier_list
    COMMA
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
;

call_definition_list_maybe:
    %empty
|   call_definition_list
;

call_definition_list:
    call_definition
|   call_definition_list
    call_definition
;

call_definition:
    procedure_declaration
|   function_declaration
;

procedure_declaration:
    PROCEDURE_KEYWORD
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
    OPENING_PARENTHESIS
    parameter_list_maybe
    CLOSING_PARENTHESIS
    STATEMENT_TERMINATOR
    function_body
    STATEMENT_TERMINATOR
;

function_declaration:
    FUNCTION_KEYWORD
    IDENTIFIER
    { std::cout << "Line" << yylineno << "\tIdentifier: " << yylval.stringValue << std::endl; }
    OPENING_PARENTHESIS
    parameter_list_maybe
    CLOSING_PARENTHESIS
    COLON
    type
    STATEMENT_TERMINATOR
    function_body
    STATEMENT_TERMINATOR
;

parameter_list_maybe:
    %empty
|   parameter_declaration_list
;

parameter_declaration_list:
    parameter_declaration
|   parameter_declaration_list
    STATEMENT_TERMINATOR
    parameter_declaration
;

parameter_declaration:
    var_or_ref_keyword
    identifier_list
    COLON
    type
;

var_or_ref_keyword:
    %empty
|   VARIABLE_KEYWORD
|   REFERENCE_KEYWORD

function_body:
    FORWARD_KEYWORD
|   body
;

body:
    constant_declaration_list_maybe
    type_declaration_list_maybe
    variable_declaration_list_maybe
    block
;

block:
    BEGIN_KEYWORD
    statement_sequence
    END_KEYWORD
;

statement_sequence:
    statement
|   statement_sequence
    STATEMENT_TERMINATOR
    statement
;

statement:
    assignment
|   if_statement
|   while_statement
|   repeat_statement
|   for_statement
|   stop_statement
|   return_statement
|   read_statement
|   write_statement
|   procedure_call
|   null_statement
;

assignment:
    l_value
    ASSIGNMENT_OPERATOR
    expression
;

if_statement:
    IF_KEYWORD
    expression
    THEN_KEYWORD
    statement_sequence
    else_sequence_maybe
    END_KEYWORD
;

else_sequence_maybe:
    %empty
|   else_if_sequence_maybe
    else_declaration
;

else_if_sequence_maybe:
    %empty
|   else_if_sequence
;

else_if_sequence:
    else_if_declaration
|
    else_if_sequence
    else_if_declaration
;

else_if_declaration:
    ELSEIF_KEYWORD
    expression
    THEN_KEYWORD
    statement_sequence
;

else_declaration:
    ELSE_KEYWORD
    statement_sequence
;

while_statement:
    WHILE_KEYWORD
    expression
    DO_KEYWORD
    statement_sequence
    END_KEYWORD
;

repeat_statement:
    REPEAT_KEYWORD
    statement_sequence
    UNTIL_KEYWORD
    expression
;

for_statement:
    FOR_KEYWORD
    assignment
    to_or_downto
    expression
    DO_KEYWORD
    statement_sequence
    END_KEYWORD
;

to_or_downto:
    TO_KEYWORD
|   DOWNTO_KEYWORD
;

stop_statement:
    STOP_KEYWORD
;

return_statement:
    RETURN_KEYWORD
    expression
|   RETURN_KEYWORD
;

read_statement:
    READ_KEYWORD
    OPENING_PARENTHESIS
    l_value_list
    CLOSING_PARENTHESIS
;

l_value_list:
    l_value
|   l_value_list
    COMMA
    l_value
;

write_statement:
    WRITE_KEYWORD
    OPENING_PARENTHESIS
    parameters
    CLOSING_PARENTHESIS
;

null_statement:
    %empty
;

expression:
    or_expression
|   and_expression
|   equivalence
|   non_equivalence
|   less_than_comparison
|   less_equal_comparison
|   greater_than_comparison
|   greater_equal_comparison
|   addition
|   subtraction
|   multiplication
|   division
|   modulo_division
|   not_expression
|   negation
|   parenthetic_expression
|   procedure_call
|   character_cast
|   ordinal_cast
|   predecessor
|   successor
|   l_value

or_expression:
    expression
    OR_OPERATOR
    expression
;
and_expression:
    expression
    AND_OPERATOR
    expression
;
equivalence:
    expression
    EQUALS_SIGN
    expression
;
non_equivalence:
    expression
    NON_EQUIVALENCE_OPERATOR
    expression
;
less_than_comparison:
    expression
    LESS_THAN_OPERATOR
    expression
;
less_equal_comparison:
    expression
    LESS_EQUAL_OPERATOR
    expression
;
greater_than_comparison:
    expression
    GREATER_THAN_OPERATOR
    expression
;
greater_equal_comparison:
    expression
    GREATER_EQUAL_OPERATOR
    expression
;
addition:
    expression
    PLUS_SIGN
    expression
;
subtraction:
    expression
    MINUS_SIGN
    expression
;
multiplication:
    expression
    MULTIPLY_SIGN
    expression
;
division:
    expression
    DIVIDE_SIGN
    expression
;
modulo_division:
    expression
    MODULO_SIGN
    expression
;
not_expression:
    NOT_OPERATOR
    expression
;
negation:
    MINUS_SIGN %prec UNARY_MINUS
    expression
;

parenthetic_expression:
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
;

procedure_call:
    IDENTIFIER
    { std::cout << "Identifier: " << yylval.stringValue << std::endl; }
    OPENING_PARENTHESIS
    parameters
    CLOSING_PARENTHESIS
;

parameters:
    expression
|   parameters
    COMMA
    expression
;

character_cast:
    CHR_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
;

ordinal_cast:
    ORD_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
;

predecessor:
    PRED_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
;

successor:
    SUCC_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
;

l_value:
    NUMERIC_CONSTANT
    { std::cout << " int_l_value: " << yylval.intValue; }
|   CHARACTER_CONSTANT
    { std::cout << " char_l_value" << yylval.stringValue; }
|   STRING_CONSTANT
    { std::cout << " string_l_value: " << yylval.stringValue; }
|   IDENTIFIER
    { std::cout << " id_l_value: " << yylval.stringValue; }
    l_value_access_list_maybe
;

l_value_access_list_maybe:
    %empty
|   l_value_access_list
;

l_value_access_list:
    l_value_access
|   l_value_access_list
    l_value_access
;

l_value_access:
    property_access
|   index_access
;

property_access:
    DOT_OPERATOR
    IDENTIFIER
;

index_access:
    OPENING_BRACKET
    expression
    CLOSING_BRACKET
;

%%