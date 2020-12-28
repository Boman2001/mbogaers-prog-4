#!/bin/bash

head -n2 "new/index.yaml" > "swagger.yaml"
sed 's/^/  /' "new/info/index.yaml" >> "swagger.yaml"
head -n13 "new/index.yaml" | tail -n+4 >> "swagger.yaml"
sed 's/^/  /' "new/tags/index.yaml" >> "swagger.yaml"
head -n21 "new/index.yaml" | tail -n+15 >> "swagger.yaml"

while read PAD; do
  echo "$PAD"
  sed 's/^/  /' "$PAD" >> "swagger.yaml"
  echo -e '\n' >> "swagger.yaml"
done < <(find ./new/paths/* -type f -name '*.yaml' | grep -v 'index\.yaml')

head -n35 "new/index.yaml" | tail -n+23 >> "swagger.yaml"

while read DEF; do
  if [[ $DEF == *':'* ]]; then
    NAME="$DEF"
    echo "$NAME"
  else
    echo -e "\n\n  $NAME" >> "swagger.yaml"
    sed 's/^/    /' "$DEF" >> "swagger.yaml"
  fi
done < <(egrep -v '^\s*$|#' new/definitions/index.yaml | sed 's/^.*\$ref: //' | sed 's/\\/\//g' | sed 's/^\//\.\/new\//')



