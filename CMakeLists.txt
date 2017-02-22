cmake_minimum_required(VERSION 3.6)
project(Compiler)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(SOURCE_FILES SymbolTable.cpp SymbolTable.h Symbol.h ParserInterface.cpp ParserInterface.h IdentifierList.h Literal.h IExpression.h NumericLiteral.h StringLiteral.h CharacterLiteral.h Variable.h ExpressionInRegister.h BooleanLiteral.h NumericLiteral.cpp CharacterLiteral.cpp Variable.cpp)
add_executable(Compiler ${SOURCE_FILES})