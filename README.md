# autodruid3_5
autodruid3_5 is a project that automates the D&D 3.5 edition druid class's wild shape class feature. It leverages the Roll20 API to provide a push-button amenity that changes a Roll20 character's token artwork and game statistics to bring them in line with the approximately 100 animal, plant, and elemental creatures that are available in the Core Rules for 3.5e.

This project is incompatible with the currently-existing Roll20 character sheets for D&D 3.5e. Instead, it sets character attributes to be manipulated via a collection of preassembled API commands, chat menus, and roll templates.

## Dependencies
Autodruid 3_5 relies on the following dependencies
1. A paid Roll20 Pro account.    
1. The ChatSetAttr mod, available as a 1-click install from the Mod Library<br/>or via GitHub at https://github.com/roll20/roll20-api-scripts/blob/master/ChatSetAttr/ChatSetAttr.js
1. Token-Mod, also available as a 1-click install from the Mod Library or via<br/>GitHub at https://github.com/Roll20/roll20-api-scripts/tree/master/TokenMod
1. The Delay mod, from https://app.roll20.net/forum/post/6533907/script-delay/?pagenum=1.<br/>I have included this script in the Autodruid 3_5 repository as delay.js. Full credit to MyRoll20Stuffs,<br/>a. k. a. Kastion the Scriptomancer. I have been unable to contact them to obtain permission.
1. The OnMyTurn mod, from https://app.roll20.net/forum/permalink/6612955/. I have<br/>included this script in the Autodruid 3_5 repository as dependencies/OnMyTurn.js. Full credit and gratitude to TheAaron for his generous permission.
