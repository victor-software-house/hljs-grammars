# hljs-grammars

[highlight.js](https://highlightjs.org) 11 grammars for languages it does not ship.  
Each grammar is one CommonJS module at the repository root, named after its language id.

| File | Language | Aliases |
|:--|:--|:--|
| `nushell.js` | [Nushell](https://www.nushell.sh) | `nu` |

## Use with highlight.js

```js
const hljs = require("highlight.js/lib/core");
hljs.registerLanguage("nushell", require("./nushell.js"));
```

## Use in a Claude Code plugin

Claude Code plugins declare extra grammars in `.claude-plugin/plugin.json`.  
Pin the file to a commit and its SHA-384 digest:

```json
{
  "syntaxHighlighting": {
    "hljsLanguages": [
      {
        "id": "nushell",
        "remote": "github:victor-software-house/hljs-grammars@<commit>#nushell.js",
        "integrity": "sha384-<digest>"
      }
    ]
  }
}
```

The digest of a file at a commit:

```sh
curl -fsSL https://raw.githubusercontent.com/victor-software-house/hljs-grammars/<commit>/nushell.js | openssl dgst -sha384 -binary | openssl base64 -A
```

## Development

`mise run test` highlights each `testdata/` sample and checks the scope of each token.  
`mise run typecheck` type-checks the grammars against highlight.js's types.
