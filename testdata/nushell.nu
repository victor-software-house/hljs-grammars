#!/usr/bin/env nu
# Copy the working tree into target/template.
const source = "target/template"

export def --env copy [dst: path, --ref: string, --data: record = {}] -> list<string> {
  let file = if $file == null { [] } else { [--data-file $file] }
  let size = 12kb + 0x1f
  rm -rf $source
  git ls-files -z --cached | split row (char nul) | where {|f| $f != "" and ($f | path exists) }
  ^tar --null -T - -cf -
  print $"copied ($dst | path expand) in 3sec"
  sleep 3sec
  r#'raw 'quoted' text'#
  true
}
