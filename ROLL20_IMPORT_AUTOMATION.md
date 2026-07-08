# Hope//Punk Roll20 import automation v0.7

v0.7 fixes armour and cyberware trait selectors.

## What changed

The v0.6 importer wrote `armour_N_traits` and `cyberware_N_traits` summary fields. The visible Roll20 sheet uses four individual select attributes for each armour/cyberware entry, matching the weapon pattern:

- `armour_1_trait_1` through `armour_1_trait_4`
- `cyberware_1_trait_1` through `cyberware_1_trait_4`

v0.7 writes those individual select attributes.

## For an existing v0.6 import

Keep only this patch script active:

`hopepunk_roll20_armour_cyberware_trait_patch_v0_7.js`

Then run in chat:

```text
!hopepunk-pregens-trait-patch
```

## For a clean/full update

Keep only this full importer active:

`hopepunk_roll20_pregen_importer_v0_7.js`

Then run:

```text
!hopepunk-pregens --overwrite
```

## Notes

Weapons already had `weapon_N_trait_1..4`, so v0.7 only changes armour and cyberware. Non-trait effect text such as `Sabotage +1` or once-per-combat movement text is intentionally not placed into a trait selector; those remain in active bonuses, Bio/GM notes, or item notes.
