# Roll20 Import Guide: Hope//Punk Pregens

## 1. Install the importer

Open this file from the repository:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

In Roll20:

1. Open the game.
2. Open **Game Settings / Mod Scripts / API Scripts**.
3. Create a new script.
4. Paste the full importer script.
5. Save.

## 2. Import character sheets

Dry-run first:

```text
!hopepunk-pregens --dry-run
```

Then import:

```text
!hopepunk-pregens --import
```

To refresh existing pregens after an importer/data update:

```text
!hopepunk-pregens --overwrite
```

The importer creates characters named like:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
```

That makes player selection easier. After choosing, a player can rename the sheet and remove the parenthesized Background.

## 3. Optional handouts

Handouts are not imported by default. To create player-facing pregen handouts:

```text
!hopepunk-pregens --handouts
```

To refresh them:

```text
!hopepunk-pregens --handouts --overwrite
```

## 4. Upload portraits and tokens

Upload image files through the Roll20 Art Library from your repository folders:

```text
portraits/
tokens/
```

Upload the actual image files. Do not copy/paste images from GitHub browser previews.

## 5. Stage portraits and tokens

Create two Roll20 utility pages:

```text
Asset Staging - Pregen Portraits
Asset Staging - Pregen Tokens
```

Drag the uploaded images onto the matching staging page.

Good staged graphic names:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
Cass Vega (Washed Up Rocker)
```

The linker also accepts simpler names such as `Marcus Vale`, but exact names are safer.

## 6. Link portraits

Select all staged portrait graphics, then run:

```text
!hopepunk-pregens --link-selected-portraits --dry-run
!hopepunk-pregens --link-selected-portraits
```

To replace existing avatars:

```text
!hopepunk-pregens --link-selected-portraits --overwrite
```

## 7. Link default tokens

Select all staged token graphics, then run:

```text
!hopepunk-pregens --link-selected-tokens --dry-run
!hopepunk-pregens --link-selected-tokens
```

To replace existing default tokens:

```text
!hopepunk-pregens --link-selected-tokens --overwrite
```

## 8. Combined asset linking

If one staged image should serve as both avatar and default token:

```text
!hopepunk-pregens --link-selected-assets --dry-run
!hopepunk-pregens --link-selected-assets
```

The cleaner setup is usually:

```text
portraits/ -> --link-selected-portraits
tokens/    -> --link-selected-tokens
```

## 9. Player control

Imported pregens are visible to all players by default, but not controlled by anyone. After a player chooses a pregen:

1. Open the character as GM.
2. Assign that player in **Can Be Edited & Controlled By**.
3. Optionally rename the character and remove the Background suffix.
