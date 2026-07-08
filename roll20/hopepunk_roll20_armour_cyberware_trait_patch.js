/*
Hope//Punk Armour/Cyberware Trait Patch v0.7
Patch-only script for existing v0.6 imports.
It sets armour_N_trait_1..4 and cyberware_N_trait_1..4 on the 20 premade Background pregens.
Command: !hopepunk-pregens-trait-patch
*/
var HopePunkPregenTraitPatch = HopePunkPregenTraitPatch || (function () {
    'use strict';
    var VERSION = '0.7';
    var PATCH = [{"name":"Marcus Vale","background":"Bounty Hunter","attributes":{"armour_1_trait_1":"MEDIUM","armour_1_trait_2":"N/A","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","armour_2_trait_1":"LIGHT","armour_2_trait_2":"ACCESSORY","armour_2_trait_3":"N/A","armour_2_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"SENSOR","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Lena Cross","background":"Cat Burglar","attributes":{"armour_1_trait_1":"LIGHT","armour_1_trait_2":"NEAR-SILENT","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"HACKING ENABLED","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"N/A","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}},{"name":"Adrian Holt","background":"Corporate Security","attributes":{"armour_1_trait_1":"HEAVY","armour_1_trait_2":"N/A","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Nika Voss","background":"Cyber-Junkie","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"HACKING ENABLED","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Salim Reyes","background":"Desert Courier","attributes":{"armour_1_trait_1":"LIGHT","armour_1_trait_2":"N/A","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Dana Kaur","background":"Ex-Military","attributes":{"armour_1_trait_1":"MEDIUM","armour_1_trait_2":"N/A","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"N/A","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}},{"name":"Milo Rask","background":"Gambler on the Run","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Rosa Tan","background":"Grease Monkey","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"HACKING ENABLED","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Jax Morrow","background":"Gutter Rat Orphan","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"HACKING ENABLED","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"N/A","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}},{"name":"Ilya Novak","background":"Mesh Hacker","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"HACKING ENABLED","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}},{"name":"Talia Cruz","background":"Pilot","attributes":{"armour_1_trait_1":"LIGHT","armour_1_trait_2":"N/A","armour_1_trait_3":"N/A","armour_1_trait_4":"N/A","cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Emi Laurent","background":"Piss-Poor Artist","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Kenji Park","background":"Samurai Otaku","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Petra Vance","background":"Scavenger","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Noor Bellamy","background":"Student Dropout","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A"}},{"name":"Tomasz Iversen","background":"Underground Fighter","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"SENSOR","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"N/A","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}},{"name":"Cass Vega","background":"Washed Up Rocker","attributes":{"cyberware_1_trait_1":"CYBERWARE","cyberware_1_trait_2":"N/A","cyberware_1_trait_3":"N/A","cyberware_1_trait_4":"N/A","cyberware_2_trait_1":"CYBERWARE","cyberware_2_trait_2":"SENSOR","cyberware_2_trait_3":"N/A","cyberware_2_trait_4":"N/A"}}];
    var send = function (msg) { sendChat('Hope//Punk Trait Patch', '/w gm ' + msg); };
    var esc = function (s) { s = (s === undefined || s === null) ? '' : String(s); return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var findCharacterByName = function (name) { var found = findObjs({ _type: 'character', name: name }); return found && found.length ? found[0] : null; };
    var setAttr = function (character, name, value) {
        var existing = findObjs({ _type: 'attribute', characterid: character.id, name: name });
        if (existing && existing.length) { existing[0].set('current', value); return existing[0]; }
        return createObj('attribute', { characterid: character.id, name: name, current: value });
    };
    var run = function () {
        var updated = 0, missing = [];
        PATCH.forEach(function (p) {
            var ch = findCharacterByName(p.name);
            if (!ch) { missing.push(p.name); return; }
            Object.keys(p.attributes || {}).forEach(function (key) { setAttr(ch, key, p.attributes[key]); });
            updated += 1;
        });
        send('Armour/cyberware trait patch v' + VERSION + ' finished. Updated ' + updated + ' characters.' + (missing.length ? '<br>Missing: ' + missing.map(esc).join(', ') : ''));
    };
    on('chat:message', function (msg) {
        if (msg.type !== 'api' || msg.content.indexOf('!hopepunk-pregens-trait-patch') !== 0) { return; }
        run();
    });
    on('ready', function () { send('Hope//Punk Armour/Cyberware Trait Patch v' + VERSION + ' loaded. Use <code>!hopepunk-pregens-trait-patch</code>.'); });
    return { version: VERSION };
}());
