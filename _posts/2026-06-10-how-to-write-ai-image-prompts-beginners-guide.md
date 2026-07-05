---
title: "How to Write AI Image Prompts: The Complete Beginner's Guide"
description: "Learn how to write effective AI image prompts from scratch. A practical beginner's guide covering prompt structure, style keywords, negative prompts, and common mistakes for Midjourney, DALL-E, and Stable Diffusion."
category: Guide
image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsv80qxvQW98-rtdwjgPKmollt-4dpDqyMDfKSIdM2yBA27JRSijq9S11rEcKCfrAFMnJECBjpH-FtEfmhEPkBsU25a3b0MlhVmbDMxy2nBHLOFq1c0DcVkTx14uH6Af7DgV_YijjFnLB7UV4oVKZ2y1jL0Gsef6fLcfhenntmgDbFn9WNCrdIJodDzxgVMORHwJhkFE1wLJXhk9HKXSbVLhPYT6D-xAGYUjVe6FqA1zGqFq-8IWUeIg"
image_alt: "Luminous glowing digital neural network stream visualizing an AI generating an image from a text prompt"
---

If you've ever typed "a cool dragon" into an AI image generator and gotten a disappointing result, this guide is for you. Writing effective prompts isn't magic — it's a repeatable structure anyone can learn in an afternoon.

## The Anatomy of a Great Prompt

Every strong image prompt answers four questions, in roughly this order:

1. **Subject** — Who or what is in the image? Be specific: "a weathered lighthouse keeper in his 60s" beats "an old man."
2. **Setting & Action** — Where are they, and what's happening? "standing on a cliff edge at dawn, holding a brass lantern."
3. **Style & Medium** — How should it look? "oil painting," "35mm film photograph," "Studio Ghibli style," "3D render."
4. **Technical modifiers** — Lighting, composition, quality: "golden hour, shallow depth of field, highly detailed."

Put together:

> `A weathered lighthouse keeper in his 60s standing on a cliff edge at dawn, holding a brass lantern, 35mm film photograph, golden hour lighting, shallow depth of field, highly detailed`

## Style Keywords Do the Heavy Lifting

The single fastest way to improve your results is a strong style vocabulary. A few reliable families:

- **Photography:** "portrait photography," "macro shot," "drone view," "long exposure"
- **Art movements:** "impressionist," "art deco," "ukiyo-e," "vaporwave"
- **Render engines:** "Unreal Engine 5," "octane render," "isometric 3D"
- **Artists & studios:** "in the style of Studio Ghibli," "Pixar style character"

Don't stack ten styles in one prompt — pick one dominant style and one or two supporting modifiers.

## Negative Prompts: Say What You Don't Want

Stable Diffusion and several other tools support negative prompts — a second field listing things to avoid: `blurry, extra fingers, watermark, low quality, deformed hands`. In Midjourney, use the `--no` parameter: `--no text, watermark`.

## Common Beginner Mistakes

- **Too vague.** "Beautiful landscape" gives the model nothing to work with.
- **Too long.** Past ~60 words, most models start ignoring details. Prioritize.
- **Contradictions.** "Minimalist detailed baroque" confuses the model. Pick a lane.
- **Ignoring aspect ratio.** A phone wallpaper needs `--ar 9:16`; a banner needs `--ar 16:9`.

## The Shortcut: Start From Tested Prompts

The fastest way to learn prompt structure is to study prompts that already work. That's exactly what the AI Prompt Book app is for — hundreds of tested prompts organized by style, each with a preview image. Copy one, run it, then tweak one element at a time (subject, lighting, style) and watch how the output changes. You'll internalize the structure in a week of casual experimenting.

Once you're comfortable, dive into advanced techniques like [cinematic lighting control]({{ '/blog/mastering-midjourney-cinematic-lighting/' | relative_url }}).
