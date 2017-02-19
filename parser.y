%{ #include <iostream> %}

%token DOT_OPERATOR
%token CONST_KEYWORD
%token IDENTIFIER
%token STATEMENT_TERMINATOR
%token TYPE_KEYWORD
%token RECORD_KEYWORD
%token COLON
%token END_KEYWORD
%token ARRAY_KEYWORD
%token OPENING_BRACKET
%token CLOSING_BRACKET
%token OF_KEYWORD
%token VARIABLE_KEYWORD
%token PROCEDURE_KEYWORD
%token OPENING_PARENTHESIS
%token CLOSING_PARENTHESIS
%token FORWARD_KEYWORD
%token FUNCTION_KEYWORD
%token REFERENCE_KEYWORD
%token BEGIN_KEYWORD
%token ASSIGNMENT_OPERATOR
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
%token COMMA
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

%start program

%%

program:
    constant_declaration_list_maybe
    type_declaration_list_maybe
    variable_declaration_list_maybe
    call_definition_list_maybe
    block
    DOT_OPERATOR
    { std::cout << "program" << std::endl; }
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
    EQUALS_SIGN
    expression
    STATEMENT_TERMINATOR
    { std::cout << "constant_declaration" << std::endl; }
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
    EQUALS_SIGN
    type
    STATEMENT_TERMINATOR
    { std::cout << "type_declaration" << std::endl; }
;

type:
    IDENTIFIER
|   record_type
|   array_type
    { std::cout << "type" << std::endl; }
;

record_type:
    RECORD_KEYWORD
    identifiers_by_type_list_maybe
    END_KEYWORD
    { std::cout << "record_type" << std::endl; }
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
    { std::cout << "array_type" << std::endl; }
;

variable_declaration_list_maybe:
    %empty
|   VARIABLE_KEYWORD
    identifiers_by_type
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
|   identifier_list
    COMMA
    IDENTIFIER
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
    OPENING_PARENTHESIS
    parameter_list_maybe
    CLOSING_PARENTHESIS
    STATEMENT_TERMINATOR
    function_body
    STATEMENT_TERMINATOR
    { std::cout << "procedure_declaration" << std::endl; }
;

function_declaration:
    FUNCTION_KEYWORD
    IDENTIFIER
    OPENING_PARENTHESIS
    parameter_list_maybe
    CLOSING_PARENTHESIS
    COLON
    type
    STATEMENT_TERMINATOR
    function_body
    STATEMENT_TERMINATOR
    { std::cout << "function_declaration" << std::endl; }
;

parameter_list_maybe:
    %empty
|   parameter_declaration_list
    { std::cout << "parameter_list" << std::endl; }
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
    { std::cout << "parameter_declaration" << std::endl; }
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
    { std::cout << "body" << std::endl; }
;

block:
    BEGIN_KEYWORD
    statement_sequence
    END_KEYWORD
    { std::cout << "block" << std::endl; }
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
    { std::cout << "assignment" << std::endl; }
;

if_statement:
    IF_KEYWORD
    expression
    THEN_KEYWORD
    statement_sequence
    else_sequence_maybe
    END_KEYWORD
    { std::cout << "if_statement" << std::endl; }
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
    { std::cout << "while_statement" << std::endl; }
;

repeat_statement:
    REPEAT_KEYWORD
    statement_sequence
    UNTIL_KEYWORD
    expression
    { std::cout << "repeat_statement" << std::endl; }
;

for_statement:
    FOR_KEYWORD
    IDENTIFIER
    ASSIGNMENT_OPERATOR
    expression
    to_or_downto
    expression
    DO_KEYWORD
    statement_sequence
    END_KEYWORD
    { std::cout << "for_statement" << std::endl; }
;

to_or_downto:
    TO_KEYWORD
|   DOWNTO_KEYWORD
;

stop_statement:
    STOP_KEYWORD
    { std::cout << "stop_statement" << std::endl; }
;

return_statement:
    RETURN_KEYWORD
    expression
|   RETURN_KEYWORD
    { std::cout << "return_statement" << std::endl; }
;

read_statement:
    READ_KEYWORD
    OPENING_PARENTHESIS
    l_value_list
    CLOSING_PARENTHESIS
    { std::cout << "read_statement" << std::endl; }
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
    { std::cout << "write_statement" << std::endl; }
;

null_statement:
    %empty
    { std::cout << "null_statement" << std::endl; }
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
    { std::cout << "boolean_or" << std::endl; }
;
and_expression:
    expression
    AND_OPERATOR
    expression
    { std::cout << "boolean_and" << std::endl; }
;
equivalence:
    expression
    EQUALS_SIGN
    expression
    { std::cout << "equivalence" << std::endl; }
;
non_equivalence:
    expression
    NON_EQUIVALENCE_OPERATOR
    expression
    { std::cout << "non_equivalence" << std::endl; }
;
less_than_comparison:
    expression
    LESS_THAN_OPERATOR
    expression
    { std::cout << "less_than_comparison" << std::endl; }
;
less_equal_comparison:
    expression
    LESS_EQUAL_OPERATOR
    expression
    { std::cout << "less_equal_comparison" << std::endl; }
;
greater_than_comparison:
    expression
    GREATER_THAN_OPERATOR
    expression
    { std::cout << "greater_than_comparison" << std::endl; }
;
greater_equal_comparison:
    expression
    GREATER_EQUAL_OPERATOR
    expression
    { std::cout << "greater_equal_comparison" << std::endl; }
;
addition:
    expression
    PLUS_SIGN
    expression
    { std::cout << "addition" << std::endl; }
;
subtraction:
    expression
    MINUS_SIGN
    expression
    { std::cout << "subtraction" << std::endl; }
;
multiplication:
    expression
    MULTIPLY_SIGN
    expression
    { std::cout << "multiplication" << std::endl; }
;
division:
    expression
    DIVIDE_SIGN
    expression
    { std::cout << "division" << std::endl; }
;
modulo_division:
    expression
    MODULO_SIGN
    expression
    { std::cout << "modulo_division" << std::endl; }
;
not_expression:
    NOT_OPERATOR
    expression
    { std::cout << "boolean_not" << std::endl; }
;
negation:
    MINUS_SIGN %prec UNARY_MINUS
    expression
    { std::cout << "negation" << std::endl; }
;

parenthetic_expression:
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
    { std::cout << "parenthetic_expression" << std::endl; }
;

procedure_call:
    IDENTIFIER
    OPENING_PARENTHESIS
    parameters
    CLOSING_PARENTHESIS
    { std::cout << "procedure_call" << std::endl; }
;

parameters:
    expression
|   parameters
    COMMA
    expression
    { std::cout << "parameters" << std::endl; }
;

character_cast:
    CHR_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
    { std::cout << "character_cast" << std::endl; }
;

ordinal_cast:
    ORD_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
    { std::cout << "ordinal_cast" << std::endl; }
;

predecessor:
    PRED_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
    { std::cout << "predecessor" << std::endl; }
;

successor:
    SUCC_KEYWORD
    OPENING_PARENTHESIS
    expression
    CLOSING_PARENTHESIS
    { std::cout << "successor" << std::endl; }
;

l_value:
    IDENTIFIER
    l_value_access_list_maybe
    { std::cout << "l_value" << std::endl; }
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