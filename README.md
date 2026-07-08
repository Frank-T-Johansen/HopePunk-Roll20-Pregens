# Hope//Punk Roll20 Pregens

Free community pregen pack for the Hope//Punk tabletop RPG by RavensDagger, for use with the public Hope//Punk character sheet on Roll20.

This pack contains 20 ready-to-play pregenerated characters, one for each premade Background. No Custom Background pregen is included.

## Contents

```text
data/
  hopepunk_pregens.json

portraits/
  portrait images

tokens/
  token images

roll20/
  hopepunk_roll20_pregen_importer.js

INSTALL.md
  Roll20 installation and asset-linking guide
```

## Current Roll20 script

Use only:

```text
roll20/hopepunk_roll20_pregen_importer.js
```

The importer creates/updates pregen character sheets, writes sheet attributes including movement and armour/cyberware trait selector fields, links portraits, links default tokens, and can name unnamed staged graphics.

## Main commands

```text
!hopepunk-pregens --help
!hopepunk-pregens --dry-run
!hopepunk-pregens --import
!hopepunk-pregens --overwrite

!hopepunk-pregens --name-selected --dry-run
!hopepunk-pregens --name-selected

!hopepunk-pregens --link-selected-portraits --dry-run
!hopepunk-pregens --link-selected-portraits

!hopepunk-pregens --link-selected-tokens --dry-run
!hopepunk-pregens --link-selected-tokens
```

See `INSTALL.md` for the full workflow.
