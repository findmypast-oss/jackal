// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "name$string$1", "symbols": [{"literal":" "}, {"literal":"|"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "name", "symbols": ["api", "name$string$1", "provider"]},
    {"name": "api$ebnf$1", "symbols": [/[a-z0-9-_]/]},
    {"name": "api$ebnf$1", "symbols": ["api$ebnf$1", /[a-z0-9-_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "api", "symbols": ["api$ebnf$1"]},
    {"name": "provider$ebnf$1", "symbols": [/[a-z0-9-_]/]},
    {"name": "provider$ebnf$1", "symbols": ["provider$ebnf$1", /[a-z0-9-_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "provider", "symbols": ["provider$ebnf$1"]}
]
  , ParserStart: "name"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
