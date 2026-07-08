#!/usr/bin/env bash
# Refreshes the static prompt-library snapshot in _data/prompts/ from the CMS.
# Run this whenever prompts change in ai-prompt-book-content, then commit.
set -euo pipefail
cd "$(dirname "$0")/.."

BASE="https://nitinkanade.github.io/ai-prompt-book-content"
mkdir -p _data/prompts

curl -sf "$BASE/categories.json" -o _data/prompts/categories.json

python - << 'EOF'
import json, urllib.request
cats = json.load(open('_data/prompts/categories.json', encoding='utf-8'))
for c in cats:
    slug = c['slug']
    url = f"https://nitinkanade.github.io/ai-prompt-book-content/{slug}.json"
    urllib.request.urlretrieve(url, f"_data/prompts/{slug}.json")
    print(f"updated {slug}.json ({c['promptCount']} prompts)")
print("NOTE: if a NEW category was added, also create prompts/<slug>.md (copy an existing one).")
EOF
