# Hope//Punk Roll20 Pregens

A free community pregen pack for the **Hope//Punk** tabletop RPG by RavensDagger, intended for use with the public Hope//Punk character sheet on Roll20.

This pack provides 20 ready-to-play pregenerated characters, one for each premade Background. No Custom Background pregen is included.

## What is included

```text
data/
  hopepunk_pregens.json

portraits/
  Character portrait images

tokens/
  Character token images

roll20/
  hopepunk_roll20_pregen_importer.js

INSTALL.md
  Roll20 installation and asset-linking instructions
```

## What the importer does

The Roll20 importer creates the pregen character sheets and writes the bundled sheet attributes, including:

```text
movement_speed
armour_N_trait_1..4
cyberware_N_trait_1..4
```

It also supports linking uploaded Roll20 graphics to character avatars and default tokens.

## Main Roll20 commands

```text
!hopepunk-pregens --help
!hopepunk-pregens --dry-run
!hopepunk-pregens --import
!hopepunk-pregens --overwrite

!hopepunk-pregens --link-selected-portraits --dry-run
!hopepunk-pregens --link-selected-portraits

!hopepunk-pregens --link-selected-tokens --dry-run
!hopepunk-pregens --link-selected-tokens

!hopepunk-pregens --link-selected-assets --dry-run
!hopepunk-pregens --link-selected-assets
```

## Naming convention

The importer creates character entries as:

```text
Name (Background)
```

Examples:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
```

This makes pregen selection easier for players. After a player chooses a character, the GM or player can rename the character and remove the Background suffix if desired.

## Player control

Imported pregens are visible to all players by default, but are not controlled by anyone until the GM assigns control.

After a player chooses a pregen, open that character sheet and set **Can Be Edited & Controlled By** to that player.

## Repository notes

The JSON file under `data/` is source/reference data. The current Roll20 importer embeds the pregen data directly, so moving `data/hopepunk_pregens.json` does not break the importer already pasted into Roll20.

If the JSON is edited, regenerate or update the importer so the embedded data matches the source file.

## Status

The current canonical Roll20 script is:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

Old patch/add-on scripts are no longer needed if the current combined importer is used.
