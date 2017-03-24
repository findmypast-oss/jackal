expr            -> array | object | statement

array           -> "[" _ ( expr ( "," _ expr ):* ):? _ "]"
object          -> "{" _ ( kvp ( "," _ kvp ):* ):? _ "}"

kvp             -> key _ ":" _ expr
key             -> "'" printableAscii:* "'"

statement       -> "'" ( mod ):? ( boolean | date | number | string ) ( allow ):? "'"

mod             -> "!" | "?"

boolean         -> "boolean"
date            -> "date" | "date_iso"
number          -> "real" | "integer"
string          -> "string" | "string_email" | "string_guid"

allow           -> "(" allowTerm ")"
allowTerm       -> ( bool | num | str | UNDEFINED | NULL ) ( "," _ ( bool | num | str | UNDEFINED | NULL ) ):*

bool            -> "true" | "false"
num             -> sign:? ( int | float )
str             -> "'" ( printableAscii | special ):* "'"
NULL            -> "NULL"
UNDEFINED       -> "UNDEFINED"

sign            -> "+" | "-"
int             -> [0-9] | ( [1-9] [0-9]:+ )
float           -> int "." int

printableAscii  -> [\x20-\x7e]
special         -> [\x09\x0a\x0d]
_               -> [\x09\x20]:?
