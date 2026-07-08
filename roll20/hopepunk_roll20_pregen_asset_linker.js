/*
Hope//Punk Roll20 Pregen Asset Linker

Companion script for the Hope//Punk Roll20 pregen pack.

Use this with the existing pregen importer if that importer creates the 20
pregen character sheets but does not yet link portraits/default tokens.

Commands:
  !hopepunk-pregen-assets --help
  !hopepunk-pregen-assets --link-selected-portraits --dry-run
  !hopepunk-pregen-assets --link-selected-portraits
  !hopepunk-pregen-assets --link-selected-tokens --dry-run
  !hopepunk-pregen-assets --link-selected-tokens
  !hopepunk-pregen-assets --link-selected-assets --dry-run
  !hopepunk-pregen-assets --link-selected-assets

Workflow:
  1. Run the main importer first:
       !hopepunk-pregens --import
  2. Upload portrait/token images to Roll20.
  3. Drag them onto a staging page.
  4. Rename placed graphics to match the character names.
  5. Select the staged graphics.
  6. Run the relevant command below.

This script does not upload images. Roll20 Mod/API scripts can only use images
that already exist as Roll20 graphics on the tabletop.
*/

var HopePunkPregenAssetLinker = HopePunkPregenAssetLinker || (function () {
  'use strict';

  var VERSION = 'stable';

  var PREGENS = [
    { name: 'Marcus Vale', background: 'Bounty Hunter', handle: 'Tagger' },
    { name: 'Lena Cross', background: 'Cat Burglar', handle: 'Slip' },
    { name: 'Adrian Holt', background: 'Corporate Security', handle: '' },
    { name: 'Nika Voss', background: 'Cyber-Junkie', handle: 'Glitch' },
    { name: 'Salim Reyes', background: 'Desert Courier', handle: 'Dust' },
    { name: 'Dana Kaur', background: 'Ex-Military', handle: 'Sarge' },
    { name: 'Milo Rask', background: 'Gambler on the Run', handle: 'Lucky' },
    { name: 'Rosa Tan', background: 'Grease Monkey', handle: 'Spanner' },
    { name: 'Jax Morrow', background: 'Gutter Rat Orphan', handle: 'Scraps' },
    { name: 'Ilya Novak', background: 'Mesh Hacker', handle: 'Ghostline' },
    { name: 'Talia Cruz', background: 'Pilot', handle: 'Vector' },
    { name: 'Emi Laurent', background: 'Piss-Poor Artist', handle: 'Smudge' },
    { name: 'Jonah Mirek', background: 'Religious Fanatic', handle: 'Witness' },
    { name: 'Dr. Mira Sayegh', background: 'Rogue Surgeon', handle: 'Needle' },
    { name: 'Kenji Park', background: 'Samurai Otaku', handle: '' },
    { name: 'Petra Vance', background: 'Scavenger', handle: 'Rummage' },
    { name: 'Noor Bellamy', background: 'Student Dropout', handle: 'Late Fee' },
    { name: 'Elise Ward', background: 'Test Subject', handle: 'Batch 7' },
    { name: 'Tomasz “Toma” Iversen', background: 'Underground Fighter', handle: 'Brick' },
    { name: 'Cass Vega', background: 'Washed Up Rocker', handle: 'Static Cass' }
  ];

  var send = function (msg) {
    sendChat('Hope//Punk Pregen Asset Linker', '/w gm ' + msg);
  };

  var esc = function (s) {
    s = (s === undefined || s === null) ? '' : String(s);
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  var fullName = function (p) {
    return p.name + ' (' + p.background + ')';
  };

  var normalize = function (s) {
    return String(s || '')
      .toLowerCase()
      .replace(/\.(png|jpg|jpeg|webp)$/i, '')
      .replace(/[“”]/g, '"')
      .replace(/[’]/g, "'")
      .replace(/\bportrait\b/g, ' ')
      .replace(/\btoken\b/g, ' ')
      .replace(/\bpregen\b/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  var alternateKeys = function (p) {
    var keys = {};
    keys[normalize(fullName(p))] = true;
    keys[normalize(p.name)] = true;
    keys[normalize(p.name + ' ' + p.background)] = true;
    keys[normalize(p.name + ' - ' + p.background)] = true;
    if (p.handle) {
      keys[normalize(p.handle)] = true;
      keys[normalize(p.name + ' ' + p.handle)] = true;
    }
    return Object.keys(keys);
  };

  var mapByGraphicName = function () {
    var map = {};
    PREGENS.forEach(function (p) {
      alternateKeys(p).forEach(function (k) {
        map[k] = p;
      });
    });
    return map;
  };

  var findCharacterByName = function (name) {
    var found = findObjs({ _type: 'character', name: name });
    return found && found.length ? found[0] : null;
  };

  var findPregenCharacter = function (p) {
    return findCharacterByName(fullName(p)) || findCharacterByName(p.name);
  };

  var selectedGraphics = function (msg) {
    if (!msg.selected || !msg.selected.length) {
      return [];
    }
    return msg.selected.map(function (sel) {
      return getObj(sel._type, sel._id);
    }).filter(function (obj) {
      return obj && obj.get && obj.get('_type') === 'graphic';
    });
  };

  var tokenImgsrc = function (graphic) {
    var src = graphic.get('imgsrc') || '';
    if (!src) {
      return '';
    }
    return src.replace(/\/max\//, '/thumb/').replace(/\/med\//, '/thumb/');
  };

  var defaultTokenJSON = function (graphic, character) {
    return JSON.stringify({
      imgsrc: tokenImgsrc(graphic),
      name: graphic.get('name') || character.get('name'),
      represents: character.id,
      width: graphic.get('width'),
      height: graphic.get('height'),
      bar1_value: graphic.get('bar1_value') || '',
      bar1_max: graphic.get('bar1_max') || '',
      bar2_value: graphic.get('bar2_value') || '',
      bar2_max: graphic.get('bar2_max') || '',
      bar3_value: graphic.get('bar3_value') || '',
      bar3_max: graphic.get('bar3_max') || '',
      aura1_radius: graphic.get('aura1_radius') || '',
      aura1_color: graphic.get('aura1_color') || '#FFFF99',
      aura1_square: graphic.get('aura1_square') || false,
      aura2_radius: graphic.get('aura2_radius') || '',
      aura2_color: graphic.get('aura2_color') || '#59E594',
      aura2_square: graphic.get('aura2_square') || false,
      showname: graphic.get('showname') || false,
      showplayers_name: graphic.get('showplayers_name') || false,
      showplayers_bar1: graphic.get('showplayers_bar1') || false,
      showplayers_bar2: graphic.get('showplayers_bar2') || false,
      showplayers_bar3: graphic.get('showplayers_bar3') || false,
      playersedit_name: graphic.get('playersedit_name') || false,
      playersedit_bar1: graphic.get('playersedit_bar1') || false,
      playersedit_bar2: graphic.get('playersedit_bar2') || false,
      playersedit_bar3: graphic.get('playersedit_bar3') || false,
      light_radius: graphic.get('light_radius') || '',
      light_dimradius: graphic.get('light_dimradius') || '',
      light_otherplayers: graphic.get('light_otherplayers') || false
    });
  };

  var link = function (msg, mode, overwrite, dryRun) {
    var graphics = selectedGraphics(msg);
    if (!graphics.length) {
      send('No selected graphics. Select staged portrait/token images first.');
      return;
    }

    var byName = mapByGraphicName();
    var lines = [];

    graphics.forEach(function (g) {
      var graphicName = g.get('name') || '';
      var key = normalize(graphicName);
      var pregen = byName[key];

      if (!pregen) {
        lines.push('No match: ' + esc(graphicName || '(unnamed graphic)'));
        return;
      }

      var ch = findPregenCharacter(pregen);
      if (!ch) {
        lines.push('No character found for ' + esc(fullName(pregen)) + '. Run `!hopepunk-pregens --import` first.');
        return;
      }

      var src = tokenImgsrc(g);
      if (!src) {
        lines.push('No Roll20 image source on graphic: ' + esc(graphicName));
        return;
      }

      var changes = [];

      if (mode === 'portraits' || mode === 'assets') {
        if (!ch.get('avatar') || overwrite) {
          if (!dryRun) {
            ch.set('avatar', src);
          }
          changes.push('avatar');
        } else {
          changes.push('avatar skipped');
        }
      }

      if (mode === 'tokens' || mode === 'assets') {
        if (!ch.get('defaulttoken') || overwrite) {
          if (!dryRun) {
            g.set('represents', ch.id);
            ch.set('defaulttoken', defaultTokenJSON(g, ch));
          }
          changes.push('default token');
        } else {
          changes.push('default token skipped');
        }
      }

      lines.push(
        esc(graphicName || '(unnamed graphic)') +
        ' -> ' +
        esc(ch.get('name')) +
        ': ' +
        (dryRun ? 'would set ' : 'set ') +
        esc(changes.join(', '))
      );
    });

    send((dryRun ? 'Dry run:' : 'Done:') + '<br>' + lines.join('<br>'));
  };

  var help = function () {
    send(
      'Hope//Punk Pregen Asset Linker v' + esc(VERSION) + '<br>' +
      '`!hopepunk-pregen-assets --link-selected-portraits --dry-run`<br>' +
      '`!hopepunk-pregen-assets --link-selected-portraits`<br>' +
      '`!hopepunk-pregen-assets --link-selected-tokens --dry-run`<br>' +
      '`!hopepunk-pregen-assets --link-selected-tokens`<br>' +
      '`!hopepunk-pregen-assets --link-selected-assets --dry-run`<br>' +
      '`!hopepunk-pregen-assets --link-selected-assets`<br>' +
      'Add `--overwrite` to replace existing avatars/default tokens.'
    );
  };

  on('chat:message', function (msg) {
    if (msg.type !== 'api' || msg.content.indexOf('!hopepunk-pregen-assets') !== 0) {
      return;
    }

    var content = msg.content || '';
    var overwrite = content.indexOf('--overwrite') !== -1;
    var dry = content.indexOf('--dry-run') !== -1;

    if (content.indexOf('--help') !== -1) {
      help();
      return;
    }

    if (content.indexOf('--link-selected-portraits') !== -1) {
      link(msg, 'portraits', overwrite, dry);
      return;
    }

    if (content.indexOf('--link-selected-tokens') !== -1) {
      link(msg, 'tokens', overwrite, dry);
      return;
    }

    if (content.indexOf('--link-selected-assets') !== -1) {
      link(msg, 'assets', overwrite, dry);
      return;
    }

    help();
  });

  on('ready', function () {
    send('Hope//Punk Pregen Asset Linker v' + VERSION + ' loaded.');
  });

  return { version: VERSION };
}());
