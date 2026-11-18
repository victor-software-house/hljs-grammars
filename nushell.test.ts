import { expect, test } from "bun:test";
import hljs from "highlight.js/lib/core";
import nushell from "./nushell.js";

hljs.registerLanguage("nushell", nushell);
const sample = await Bun.file(new URL("testdata/nushell.nu", import.meta.url)).text();
const html = hljs.highlight(sample, { language: "nushell" }).value;

/** Each token of the sample and the scope highlight.js gives it. */
const expected: [scope: string, text: string][] = [
  ["comment", "# Copy the working tree into target/template."],
  ["keyword", "const"],
  ["string", "&quot;target/template&quot;"],
  ["keyword", "export"],
  ["keyword", "def"],
  ["title function_", "copy"],
  ["type", "path"],
  ["attr", "--ref"],
  ["type", "string"],
  ["type", "record"],
  ["keyword", "if"],
  ["variable", "$file"],
  ["literal", "null"],
  ["number", "12kb"],
  ["number", "0x1f"],
  ["built_in", "rm"],
  ["attr", "-rf"],
  ["built_in", "split"],
  ["keyword", "where"],
  ["keyword", "and"],
  ["title function_", "^tar"],
  ["attr", "--null"],
  ["built_in", "print"],
  ["number", "3sec"],
  ["string", "r#&#x27;raw &#x27;quoted&#x27; text&#x27;#"],
  ["literal", "true"],
];

for (const [scope, text] of expected)
  test(`${text} is ${scope}`, () => expect(html).toContain(`<span class="hljs-${scope}">${text}</span>`));

test("the alias nu resolves to the grammar", () => expect(hljs.getLanguage("nu")?.name).toBe("Nushell"));

test("the interpolated string holds its subexpression", () =>
  expect(html).toMatch(/<span class="hljs-string">\$&quot;copied <span class="hljs-subst">\(/));
