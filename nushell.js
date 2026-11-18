/**
 * Nushell grammar for highlight.js 11 (https://www.nushell.sh).
 *
 * Keywords and built-in commands come from `help commands` in Nushell 0.117.0: the keyword
 * commands with the parser's operators, and the first word of each built-in command, so
 * `str join` and `path exists` both colour as built-ins.
 *
 * Load it as a highlight.js language module: `hljs.registerLanguage("nushell", require("./nushell.js"))`.
 */
/** @type {import("highlight.js").LanguageFn} */
module.exports = function nushell(hljs) {
  const KEYWORDS = {
    $pattern: "[A-Za-z_][\\w-]*",
    keyword: [
      "alias", "and", "bit-and", "bit-or", "bit-shl", "bit-shr", "bit-xor", "break", "catch",
      "collect", "const", "continue", "def", "else", "ends-with", "export", "export-env", "extern",
      "for", "has", "hide", "if", "in", "let", "like", "loop", "match", "mod", "module", "mut",
      "not", "not-has", "not-in", "not-like", "or", "overlay", "plugin", "return", "run", "source",
      "source-env", "starts-with", "try", "type", "use", "where", "while", "xor",
    ],
    literal: ["true", "false", "null"],
    built_in: [
      "abbr", "all", "ansi", "any", "append", "ast", "attr", "bits", "bytes", "cal", "cd", "char",
      "chunk-by", "chunks", "clear", "columns", "combinations", "commandline", "compact",
      "complete", "config", "cp", "date", "debug", "decode", "default", "describe", "detect",
      "difference", "do", "drop", "du", "each", "echo", "encode", "enumerate", "error", "every",
      "exec", "exit", "explain", "explore", "fill", "find", "first", "flatten", "format", "from",
      "generate", "get", "glob", "grid", "group-by", "hash", "headers", "help", "hide-env",
      "histogram", "history", "http", "idx", "ignore", "input", "insert", "inspect", "interleave",
      "intersect", "into", "is-admin", "is-empty", "is-not-empty", "is-redirected", "is-terminal",
      "items", "job", "join", "keybindings", "kill", "last", "length", "lines", "load-env", "ls",
      "math", "matrix", "merge", "metadata", "mkdir", "mktemp", "move", "mv", "nu-check",
      "nu-highlight", "open", "panic", "par-each", "parse", "path", "peek", "permutations", "port",
      "prepend", "print", "ps", "query", "random", "record", "reduce", "reject", "rename",
      "reverse", "rm", "roll", "rotate", "run-external", "run-internal", "save", "schema", "scope",
      "select", "semver", "seq", "shuffle", "skip", "sleep", "slice", "sort", "sort-by", "split",
      "start", "stor", "str", "sys", "table", "take", "tee", "term", "timeit", "to", "touch",
      "transpose", "tui", "tutor", "ulimit", "umask", "uname", "union", "uniq", "uniq-by", "unlet",
      "update", "upsert", "url", "values", "version", "view", "watch", "which", "whoami", "window",
      "with-env", "wrap", "zip",
    ],
  };

  const VARIABLE = { scope: "variable", match: /\$[A-Za-z_][\w-]*/ };
  const NUMBER = {
    scope: "number",
    match:
      /\b(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?(?:ns|us|ms|sec|min|hr|day|wk|b|kb|mb|gb|tb|pb|eb|kib|mib|gib|tib|pib|eib)?)\b/,
  };
  const FLAG = { scope: "attr", match: /(?<=[\s(\[])--?[A-Za-z][\w-]*/ };
  const EXTERNAL = { scope: "title.function", match: /\^[\w./~+-]+/ };
  const TYPE = {
    scope: "type",
    match:
      /(?<=(?::|->|<|,)\s*)(?:any|binary|bool|cell-path|closure|datetime|directory|duration|error|filesize|float|glob|int|list|nothing|number|oneof|path|range|record|string|table)\b/,
  };

  const SUBEXPRESSION = { scope: "subst", begin: /\(/, end: /\)/, keywords: KEYWORDS, contains: [] };
  const STRINGS = [
    hljs.END_SAME_AS_BEGIN({ scope: "string", begin: /r(#+)'/, end: /'(#+)/ }),
    { scope: "string", begin: /\$"/, end: /"/, contains: [hljs.BACKSLASH_ESCAPE, SUBEXPRESSION] },
    { scope: "string", begin: /\$'/, end: /'/, contains: [SUBEXPRESSION] },
    { scope: "string", begin: /"/, end: /"/, contains: [hljs.BACKSLASH_ESCAPE] },
    { scope: "string", begin: /'/, end: /'/ },
    { scope: "string", begin: /`/, end: /`/ },
  ];
  const DEFINITION = {
    match: [/\b(?:def|extern)\b/, /(?:\s+--[\w-]+)*\s+/, /"[^"\n]*"|'[^'\n]*'|[A-Za-z_][\w-]*/],
    scope: { 1: "keyword", 3: "title.function" },
  };
  const COMMENT = hljs.COMMENT(/#/, /$/);

  const EXPRESSIONS = [...STRINGS, COMMENT, DEFINITION, VARIABLE, FLAG, EXTERNAL, TYPE, NUMBER];
  SUBEXPRESSION.contains = [...EXPRESSIONS, SUBEXPRESSION];

  return {
    name: "Nushell",
    aliases: ["nu"],
    keywords: KEYWORDS,
    contains: [...EXPRESSIONS, SUBEXPRESSION],
  };
};
