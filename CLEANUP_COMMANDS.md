# Suggested cleanup commands

To reduce the repository to only README.md and INSTALL.md at the root:

```bash
git rm CHANGELOG.md
git rm PREGEN_ASSET_LINKING_ADDON.md
git rm ROLL20_IMPORT_AUTOMATION.md
git rm ROLL20_IMPORT_GUIDE.md
git rm ROLL20_IMPORT_NOTES.md

cat > README.md < /path/to/new/README.md
cat > INSTALL.md < /path/to/new/INSTALL.md

git add README.md INSTALL.md
git commit -m "Consolidate documentation"
```

If the patch notes/files are still only historical and no longer needed:

```bash
git rm data/hopepunk_armour_cyberware_trait_patch.csv
git rm data/hopepunk_armour_cyberware_trait_patch.md
git commit -m "Remove obsolete patch documentation"
```

Keep them only if you want archival/reference material in the repo.
