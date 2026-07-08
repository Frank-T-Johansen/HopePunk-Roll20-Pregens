# Hope//Punk Roll20 Pregens — Installation Guide

This guide explains how to install the Hope//Punk pregen pack in Roll20.

## 1. Download the repository

### Option A: GitHub ZIP

1. Open the GitHub repository.
2. Click **Code**.
3. Click **Download ZIP**.
4. Extract the ZIP locally.
5. Open the extracted folder.

The correct module root is the folder that directly contains:

```text
README.md
INSTALL.md
data/
portraits/
tokens/
roll20/
```

### Option B: Git clone

```bash
git clone https://github.com/Frank-T-Johansen/HopePunk-Roll20-Pregens.git
cd HopePunk-Roll20-Pregens
```

## 2. Confirm repository layout

Expected layout:

```text
data/
  hopepunk_pregens.json

portraits/
  *.png

tokens/
  *.png

roll20/
  hopepunk_roll20_pregen_importer.js
```

The importer contains embedded pregen data. The `data/hopepunk_pregens.json` file is useful for review, source control, and future regeneration, but Roll20 does not read it directly.

## 3. Install the Roll20 importer

Open this file locally:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

In Roll20:

1. Open the Hope//Punk game.
2. Open **Game Settings**.
3. Open **Mod Scripts** / **API Scripts**.
4. Create a new script.
5. Paste the full contents of `hopepunk_roll20_pregen_importer.js`.
6. Save the script.

After saving, Roll20 should report that the script loaded.

## 4. Import the pregens

In Roll20 chat, run:

```text
!hopepunk-pregens --dry-run
```

This shows what would be imported.

If it looks correct, run:

```text
!hopepunk-pregens --import
```

To refresh existing pregen sheets after updating the importer:

```text
!hopepunk-pregens --overwrite
```

The importer creates characters named like:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
```

The Background suffix is intentional. It helps players browse the pregens.

## 5. Upload portraits and tokens

Upload the actual image files through the Roll20 Art Library.

Use:

```text
portraits/
tokens/
```

Do not copy images from GitHub browser previews. Upload the local files from the extracted repository.

## 6. Create staging pages

Create one or two temporary Roll20 pages:

```text
Asset Staging - Pregen Portraits
Asset Staging - Pregen Tokens
```

These are utility pages used only for linking images to character sheets.

## 7. Stage portrait graphics

1. Open `Asset Staging - Pregen Portraits`.
2. Drag uploaded portrait images from the Art Library onto the tabletop.
3. Rename placed graphics so their names match the character names.

Good names:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
Cass Vega (Washed Up Rocker)
```

The importer accepts some simpler aliases, such as the character's plain name, but exact names are safest.

## 8. Link portraits

Select the staged portrait graphics.

Dry run first:

```text
!hopepunk-pregens --link-selected-portraits --dry-run
```

If the matches are correct:

```text
!hopepunk-pregens --link-selected-portraits
```

To replace existing avatars:

```text
!hopepunk-pregens --link-selected-portraits --overwrite
```

## 9. Stage token graphics

1. Open `Asset Staging - Pregen Tokens`.
2. Drag uploaded token images from the Art Library onto the tabletop.
3. Rename placed graphics so their names match the character names.

Use the same naming style as for portraits.

## 10. Link default tokens

Select the staged token graphics.

Dry run first:

```text
!hopepunk-pregens --link-selected-tokens --dry-run
```

If the matches are correct:

```text
!hopepunk-pregens --link-selected-tokens
```

To replace existing default tokens:

```text
!hopepunk-pregens --link-selected-tokens --overwrite
```

## 11. Combined linking option

If the same staged image should be used as both portrait and default token:

```text
!hopepunk-pregens --link-selected-assets --dry-run
!hopepunk-pregens --link-selected-assets
```

The cleaner setup is usually:

```text
portraits/ -> --link-selected-portraits
tokens/    -> --link-selected-tokens
```

## 12. Assign player control

Pregens are visible to all players, but nobody controls them by default.

After a player chooses a pregen:

1. Open the character sheet as GM.
2. Set **Can Be Edited & Controlled By** to that player.
3. Optionally rename the character and remove the Background suffix.
4. Optionally move the character into a player-character folder.

## 13. Updating an existing Roll20 game

If you update the importer script in Roll20, use:

```text
!hopepunk-pregens --overwrite
```

This refreshes the character sheet attributes from the embedded data.

If you also want to replace portraits or default tokens, rerun the relevant linking command with `--overwrite`:

```text
!hopepunk-pregens --link-selected-portraits --overwrite
!hopepunk-pregens --link-selected-tokens --overwrite
```

## 14. Troubleshooting

### The command does nothing

Check that the importer is installed as a Roll20 Mod/API script and that the script sandbox is running.

### Characters imported, but portraits are missing

Roll20 scripts cannot upload local images. Upload portraits manually first, drag them onto a staging page, select them, then run the linking command.

### A graphic says "No match"

Rename the placed graphic to match the character entry, for example:

```text
Marcus Vale (Bounty Hunter)
```

Then run the dry-run command again.

### Default tokens are wrong or old

Run the token linking command with `--overwrite`:

```text
!hopepunk-pregens --link-selected-tokens --overwrite
```

### I moved `hopepunk_pregens.json` into `data/`

That is fine. The importer embeds the data directly. Only regeneration/update tooling needs to know where the JSON source file lives.
