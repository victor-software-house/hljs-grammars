# hljs-grammars

highlight.js 11 grammars, one CommonJS module per language at the root, loaded by plain highlight.js and by Claude Code's plugin field `syntaxHighlighting.hljsLanguages`.

## Rules

1. A grammar is `<language-id>.js`, exports a `LanguageFn` with `module.exports`, and carries the JSDoc type `import("highlight.js").LanguageFn`.
2. It depends on nothing but the `hljs` argument, since consumers load the file alone.
3. Keep highlight.js at the version Claude Code bundles (11.11.1), so a grammar behaves as it does there.
4. Use scopes Claude Code colours: `keyword`, `built_in`, `literal`, `type`, `number`, `string`, `comment`, `attr`, `title.function`, `meta`, `subst`, `variable`.
5. Every regular expression must run in linear time: no nested quantifiers over the same characters.
6. Each grammar has a `testdata/<language>.*` sample and a test listing each token's expected scope.
7. Consumers pin a file by commit and digest, so never rewrite pushed history.

## Tasks

| Task | What it does |
|:--|:--|
| `mise run test` | `bun test` |
| `mise run typecheck` | `bun check` |
