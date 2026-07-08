# Hope//Punk Pregen Asset Linking Add-on

This add-on script links uploaded Roll20 graphics to pregen character sheets created by the existing importer.

## Install

Install your existing pregen importer first and import the characters:

```text
!hopepunk-pregens --import
```

Then install this add-on as another Roll20 Mod/API script:

```text
roll20/hopepunk_roll20_pregen_asset_linker.js
```

## Upload images

Upload files from:

```text
portraits/
tokens/
```

through the Roll20 Art Library.

## Stage graphics

Create pages:

```text
Asset Staging - Pregen Portraits
Asset Staging - Pregen Tokens
```

Drag uploaded images onto the correct page.

Good graphic names:

```text
Marcus Vale (Bounty Hunter)
Lena Cross (Cat Burglar)
Nika Voss (Cyber-Junkie)
Cass Vega (Washed Up Rocker)
```

## Link portraits

Select staged portrait graphics:

```text
!hopepunk-pregen-assets --link-selected-portraits --dry-run
!hopepunk-pregen-assets --link-selected-portraits
```

## Link default tokens

Select staged token graphics:

```text
!hopepunk-pregen-assets --link-selected-tokens --dry-run
!hopepunk-pregen-assets --link-selected-tokens
```

## Replace existing links

Add `--overwrite`:

```text
!hopepunk-pregen-assets --link-selected-portraits --overwrite
!hopepunk-pregen-assets --link-selected-tokens --overwrite
```
