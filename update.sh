#!/bin/bash
find components app -type f -name "*.tsx" | xargs sed -i '' \
  -e 's/bg-\[#0D0D0D\]/bg-bg/g' \
  -e 's/bg-\[#151515\]/bg-surface/g' \
  -e 's/text-\[#F2F2F2\]/text-primary/g' \
  -e 's/text-\[#888888\]/text-secondary/g' \
  -e 's/text-\[#888\]/text-secondary/g' \
  -e 's/text-\[#555\]/text-secondary/g' \
  -e 's/text-\[#111111\]/text-primary/g' \
  -e 's/border-\[#1F1F1F\]/border-border/g' \
  -e 's/border-\[#2A2A2A\]/border-border/g' \
  -e 's/from-\[#151515\]/from-surface/g' \
  -e 's/via-\[#0D0D0D\]/via-bg/g' \
  -e 's/to-\[#1A1A0A\]/to-bg/g'
