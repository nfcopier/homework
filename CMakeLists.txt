cmake_minimum_required(VERSION 3.4.3)
project(Compiler)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
SET_SOURCE_FILES_PROPERTIES(lex.yy.c PROPERTIES LANGUAGE CXX)

set(SOURCE_FILES SymbolTable.cpp parser.tab.cpp SymbolTable.cpp ParserInterface.cpp NumericLiteral.cpp CharacterLiteral.cpp lex.yy.c Encoder.cpp Encoder.h ExpressionInRegister.cpp Variable.cpp WhileStatement.cpp StatementController.cpp RepeatStatement.cpp)
add_executable(Compiler ${SOURCE_FILES})