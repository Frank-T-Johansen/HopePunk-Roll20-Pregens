# Hope//Punk Roll20 Pregens — INSTALL

This guide installs the Hope//Punk pregen pack into a Roll20 game.

## Current canonical script

Use only this script:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

Do not also load old helper scripts such as:

```text
hopepunk_roll20_pregen_asset_linker.js
hopepunk_roll20_pregen_staging_namer.js
hopepunk_roll20_armour_cyberware_trait_patch.js
```

Those workflows are now integrated into the main importer.

## Repository layout

Expected layout:

```text
README.md
INSTALL.md

data/
  hopepunk_pregens.json

portraits/
  *.png or *.jpg

tokens/
  *.png

roll20/
  hopepunk_roll20_pregen_importer.js
```

The JSON file under `data/` is source/reference data. The Roll20 importer embeds the current pregen data directly, so Roll20 does not read `data/hopepunk_pregens.json` at runtime.

If the JSON is edited later, regenerate or update the importer so the embedded data matches the JSON source.

## Install the importer

1. Open the Roll20 game.
2. Open **Game Settings**.
3. Open **Mod Scripts** / **API Scripts**.
4. Create or open the Hope//Punk pregen importer script.
5. Paste the full contents of:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

6. Save.
7. Restart the API sandbox.

Test:

```text
!hopepunk-pregens --help
```

The help output should mention:

```text
--name-selected
--link-selected-portraits
--link-selected-tokens
--token-size
--keep-token-size
```

## Import character sheets

Run:

```text
!hopepunk-pregens --dry-run
```

If it looks correct:

```text
!hopepunk-pregens --import
```

To refresh existing sheets after updating the importer:

```text
!hopepunk-pregens --overwrite
```

The importer creates characters named like:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
```

The Background suffix is intentional. It makes pregen selection easier. Players can rename their chosen character afterward.

## Journal folder placement

The importer currently does **not** place characters into the Roll20 `Pregens` folder automatically.

After import, move the generated pregen characters manually into the `Pregens` folder in the Journal.

This is a Roll20 Journal organization step. It does not affect character sheet data, portraits, or default tokens.

Recommended Journal layout:

```text
Pregens
Characters
NPCs
```

Move these generated entries into `Pregens`:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
...
Cass Vega (Washed Up Rocker)
```

## Upload and stage portraits

Roll20 Art Library folder handling is unreliable for bulk uploads. Use staging pages as the reliable organization method.

Create a Roll20 page:

```text
Asset Staging - Pregen Portraits
```

On that page:

1. Select the **TOKENS** layer.
2. Drag the portrait image files from your local `portraits/` folder directly onto the tabletop/canvas.
3. Select the placed portrait graphics.

If Roll20 created unnamed graphics, run:

```text
!hopepunk-pregens --name-selected --dry-run
```

Check that the proposed order is correct. The order is top-to-bottom, then left-to-right.

If it is correct:

```text
!hopepunk-pregens --name-selected
```

Then link portraits:

```text
!hopepunk-pregens --link-selected-portraits --dry-run
!hopepunk-pregens --link-selected-portraits
```

To replace existing avatars:

```text
!hopepunk-pregens --link-selected-portraits --overwrite
```

## Upload and stage tokens

Create a Roll20 page:

```text
Asset Staging - Pregen Tokens
```

On that page:

1. Select the **TOKENS** layer.
2. Drag the token image files from your local `tokens/` folder directly onto the tabletop/canvas.
3. Select the placed token graphics.

If Roll20 created unnamed graphics, run:

```text
!hopepunk-pregens --name-selected --dry-run
```

If the proposed order is correct:

```text
!hopepunk-pregens --name-selected
```

Then link default tokens:

```text
!hopepunk-pregens --link-selected-tokens --dry-run
!hopepunk-pregens --link-selected-tokens
```

By default, linked default tokens are normalized to one Roll20 grid cell:

```text
70 × 70 px
```

To explicitly set one-cell tokens:

```text
!hopepunk-pregens --link-selected-tokens --overwrite --token-size 70
```

To make two-cell tokens:

```text
!hopepunk-pregens --link-selected-tokens --overwrite --token-size 140
```

To preserve the staged token size instead:

```text
!hopepunk-pregens --link-selected-tokens --overwrite --keep-token-size
```

## Testing default tokens

After token linking:

1. Delete any old test token already on the map.
2. Drag a pregen character from the Journal onto a normal map page.
3. Confirm the dropped token is one grid cell and uses the token art.

Existing placed tokens do not automatically update when a character's default token changes. Drag a fresh token from the Journal after relinking.

## Combined asset linking

If the same selected graphics should be both portrait and default token:

```text
!hopepunk-pregens --link-selected-assets --dry-run
!hopepunk-pregens --link-selected-assets
```

The cleaner workflow is usually:

```text
portraits/ -> --link-selected-portraits
tokens/    -> --link-selected-tokens
```

## Assign player control

Imported pregens are visible to all players, but are not controlled by anyone by default.

After a player chooses a pregen:

1. Open the character sheet as GM.
2. Set **Can Be Edited & Controlled By** to that player.
3. Optionally rename the character and remove the Background suffix.
4. Optionally move the character from `Pregens` to an active player-character folder.

## Troubleshooting

### `!hopepunk-pregens --help` gives no output

Open the Roll20 API output console. The script probably crashed. Fix the error, save the script, and restart the API sandbox.

### Asset linking says `No match: (unnamed graphic)`

The staged graphics have no Roll20 object names.

Run:

```text
!hopepunk-pregens --name-selected --dry-run
!hopepunk-pregens --name-selected
```

Then retry linking.

### Tokens are too large

Use the current importer and relink tokens:

```text
!hopepunk-pregens --link-selected-tokens --overwrite --token-size 70
```

Then delete old placed test tokens and drag fresh ones from the Journal.

### Portraits are large PNGs

Large portrait PNGs can be converted to JPG before upload to reduce load for older laptops. Keep tokens as PNG if they use transparency.
