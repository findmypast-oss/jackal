joi                 -> "Joi." type globalModifier

type                -> booleanType | dateType | numberType | stringType

# .insensitive([enabled]) option not supported for boolean
booleanType         -> "boolean()" | ( booleanType dot booleanTruthy ) | ( booleanType dot booleanFalsy )

booleanTruthy       -> "truthy(" truthyFalsyParam ")"
booleanFalsy        -> "falsy(" truthyFalsyParam ")"
booleanInsensitive  -> "insensitive(" ( "true" | "false" ):? ")"

truthyFalsyParam    -> truthyFalsyValues | truthyFalsyArray
truthyFalsyArray    -> "[" truthyFalsyValues ( ", " truthyFalsyValues ):* "]"
truthyFalsyValues   -> string | integer | float | null | undefined

# unordered date modifiers not supported yet
dateType            -> "date()" ( dot dateMin ):? ( dot dateMax ):? ( dot ( dateIso | dateTimestamp ) ):?

dateMin             -> "min('" date "')"
dateMax             -> "max('" date "')"
dateIso             -> "iso()"
dateTimestamp       -> "timestamp('" ( "unix" | "javascript" ) "')"

date                -> "now" | integer | iso8601
iso8601             -> iso8601DatePart ( "T" iso8601TimePart ):?
iso8601DatePart     -> year "-" month "-" day
iso8601TimePart     -> hour ":" minute ":" second

year                -> ( "000" [1-9] ) | ( "00" [1-9] [0-9] ) | ( "0" [1-9] [0-9] [0-9] ) | ( [1-9] [0-9] [0-9] [0-9] )
month               -> ( "0" [1-9] ) | ( "1" [0-2] )
day                 -> ( "0" [1-9] ) | ( [1-2] [0-9] ) | ( "3" [01] )

hour                -> ( [01] [0-9] ) | ( "2" [0-3] )
minute              -> [0-5] [0-9]
second              -> [0-5] [0-9]

# unordered number modifiers not supported yet
numberType          -> "number()" ( dot ( numMin | numGreater ) ):? ( dot ( numMax | numLess ) ):? ( dot ( numInteger | numPrecision ) ):? ( dot numMultiple ):? ( dot ( numPositive | numNegative ) ):?

numMin              -> "min(" ( integer | float ) ")"
numMax              -> "max(" ( integer | float ) ")"
numGreater          -> "greater(" ( integer | float ) ")"
numLess             -> "less(" ( integer | float ) ")"
numInteger          -> "integer()"
numPrecision        -> "precision(" integer ")"
numMultiple         -> "multiple(" integer ")"
numPositive         -> "positive()"
numNegative         -> "negative()"

# unordered string modifiers not supported yet
stringType          -> "string()" ( dot strInsensitive ):? ( ( ( dot strMin ):? ( dot strMax ( dot strTruncate ):? ):? ) | ( dot strLength ):? ):? ( dot ( strCreditCard | strAlphaNum | strToken | strEmail | strIp | strUri | strGuid | strHex | strBase64 | strHostname | strLowerCase | strUpperCase | strIsoDate ) ):? ( dot strRegex ):? ( dot strReplace ):? ( dot strTrim ):?

strInsensitive      -> "insensitive()"
strMin              -> "min(" integer ( ", " strEncoding ):? ")"
strMax              -> "max(" integer ( ", " strEncoding ):? ")"
strTruncate         -> "truncate(" ( "true" | "false" ):? ")"
strCreditCard       -> "creditCard()"
strLength           -> "length(" integer ( ", " strEncoding ):? ")"
strRegex            -> "regex(" strRegexPattern ( ", " strRegexParam ):? ")"
strReplace          -> "replace(" strRegexPattern ", " string ")"
strAlphaNum         -> "alphanum()"
strToken            -> "token()"
# email options not suuported yet
strEmail            -> "email()"
strIp               -> "ip(" ( strIpOptions ):? ")"
# uri options not supported yet
strUri              -> "uri()"
# guid options not supported yet
strGuid             -> "guid()"
strHex              -> "hex()"
strBase64           -> "base64()"
strHostname         -> "hostname()"
strLowerCase        -> "lowercase()"
strUpperCase        -> "uppercase()"
strTrim             -> "trim()"
strIsoDate          -> "isoDate()"

strEncoding         -> "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"

strRegexPattern     -> "/" [\x00-\x7f] "/" ( strRegexFlags ):*
strRegexFlags       -> "i" | "g" | "m"
strRegexParam       -> strRegexName | strRegexOptions
strRegexName        -> string
strRegexOptions     -> "{ name: " string ", invert: " ( "true" | "false" ) " }"

strIpOptions        -> "{ " ( strIpVersionParam | ( strIpVersionParam ", " strIpCidrParam ) | strIpCidrParam ) " }"
strIpVersionParam   -> "version: [ " strIpVersion ( ", " strIpVersion ):* " ]"
strIpVersion        -> "'ipv4'" | "'ipv6'" | "'ipvfuture'"
strIpCidrParam      -> "cidr: " ( "'optional'" | "'required'" | "'forbidden'" )

globalModifier      -> ( ( dot allow ):* | ( dot ( valid | invalid ) ):* ):? ( dot ( required | optional | forbidden ) ):?

allow               -> "allow(" globalParam ")"
valid               -> "valid(" globalParam ")"
invalid             -> "invalid(" globalParam ")"
required            -> "required()"
optional            -> "optional()"
forbidden           -> "forbidden()"

globalParam         -> globalArray | ( globalValue ( ", " globalValue ):* )
globalArray         -> "[ " globalValue ( ", " globalValue ):* " ]"
globalValue         -> string | integer | float | null | undefined

string              -> "'" ( printableAscii | specials ):* "'"
integer             -> [0-9] | ( [1-9] [0-9]:+ )
float               -> integer "." [0-9]:+
null                -> "null"
undefined           -> "undefined"
dot                 -> "."

printableAscii      -> [\x20-\x7e]
specials            -> [\x09-\x0A\x0D]
