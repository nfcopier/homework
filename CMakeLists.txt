cmake_minimum_required(VERSION 3.4.3)
project(Compiler)


ADD_CUSTOM_COMMAND(
        COMMAND "flex" -o $(CMAKE_SOURCE_DIR)/lex.yy.c ${CMAKE_SOURCE_DIR}/scanner.l
        OUTPUT ${CMAKE_SOURCE_DIR}/lex.yy.c)
ADD_CUSTOM_COMMAND(
        COMMAND "bison" -o ${CMAKE_SOURCE_DIR}/parser.tab.cpp -d ${CMAKE_SOURCE_DIR}/parser.ypp
        OUTPUT ${CMAKE_SOURCE_DIR}/parser.tab.hpp ${CMAKE_SOURCE_DIR}/parser.tab.cpp)
SET_SOURCE_FILES_PROPERTIES(${CMAKE_SOURCE_DIR}/parser.tab.hpp GENERATED)
SET_SOURCE_FILES_PROPERTIES(${CMAKE_SOURCE_DIR}/parser.tab.cpp GENERATED)
SET_SOURCE_FILES_PROPERTIES(${CMAKE_SOURCE_DIR}/lex.yy.c GENERATED)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
SET_SOURCE_FILES_PROPERTIES(${CMAKE_SOURCE_DIR}/lex.yy.c PROPERTIES LANGUAGE CXX)

set(SOURCE_FILES SymbolTable.cpp lex.yy.c parser.tab.cpp SymbolTable.cpp ParserInterface.cpp NumericLiteral.cpp CharacterLiteral.cpp Encoder.cpp ExpressionInRegister.cpp Variable.cpp WhileStatement.cpp StatementController.cpp RepeatStatement.cpp IfChain.cpp FunctionDefinition.cpp FunctionDefinition.h FunctionController.cpp FunctionController.h ParameterDeclaration.cpp ParameterDeclaration.h Parameter.cpp Parameter.h ConstantController.cpp ConstantController.h)
add_executable(Compiler ${SOURCE_FILES})