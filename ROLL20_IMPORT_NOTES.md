# Hope//Punk Roll20 Import Notes v0.1

This pack contains canonical pregen data plus a Roll20 attribute manifest.

Files:
- `hopepunk_pregens_v0_1.json`: full pregen source data.
- `hopepunk_roll20_attributes_v0_1.json`: flat attributes suitable for an API/import script.
- `hopepunk_sheet_attribute_map_v0_1.csv`: field-to-attribute mapping.
- `handouts_markdown/`: one player-facing handout per pregen.

Current status:
- Character name, background, background ability, level, money, skill levels and proficiencies are mapped.
- Gear is stored as structured text. Detailed weapon/armour/cyberware stat-row mapping is deliberately left for the next pass, because it requires matching Background gear to Civilian Gear entries and then filling weapon/armour/cyberware sections.
- Samurai handle is blank in the Roll20 attributes because these pregens begin as civilians.

Suggested next pass:
1. Extract Civilian Gear pages 79–90 into a gear catalogue.
2. Map each Background weapon/armour/aug to a mechanical base item.
3. Fill Roll20 weapon/armour/cyberware slots.
4. Generate a Roll20 API script or ChatSetAttr-compatible command blocks.
