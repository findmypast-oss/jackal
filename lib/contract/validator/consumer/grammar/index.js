// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "consumer$ebnf$1", "symbols": [/[a-z0-9_]/]},
    {"name": "consumer$ebnf$1", "symbols": ["consumer$ebnf$1", /[a-z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "consumer", "symbols": ["consumer$ebnf$1"]}
]
  , ParserStart: "consumer"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
