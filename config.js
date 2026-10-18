/* =====================================================================
   SITE CONFIG - edit this file to change prices and settings.
   Upload it together with the other files. No other file needs changes.
   ===================================================================== */

var PRICES={
 currency:'€',          // symbol shown before every price
 range:0.25,            // estimate spread: 0.25 = shows price -25% to +25%

 // One entry per service. "one" = starting price (one-time).
 // Change a number, a name, or the feature list. Delete an entry to remove it.
 items:[
  {id:'bot',   icon:'🤖',label:'Discord bot',     sub:'Commands, moderation, tickets',
   desc:'Moderation, tickets, music, economy and custom commands, built around your server.',
   feat:['Slash commands and buttons','Moderation and logging','Ticket and role systems','Clean, documented code'],
   one:60},
  {id:'plugin',icon:'⛏️',label:'Minecraft plugin',sub:'Java, Paper/Spigot',
   desc:'Custom gameplay, items, economy or minigames for your Minecraft server.',
   feat:['Paper / Spigot support','Configurable with YAML files','Permissions and commands','Clean, documented code'],
   one:80},
  {id:'skript',icon:'📜',label:'Skript',          sub:'Server scripts and commands',
   desc:'Fast and affordable scripts when you do not need a full plugin.',
   feat:['Custom commands','Events and rewards','GUI menus','Easy for you to edit later'],
   one:30},
  {id:'mod',   icon:'🧩',label:'Mod',             sub:'Custom Minecraft mod',
   desc:'Custom blocks, items and mechanics for a modded game or server.',
   feat:['Fabric / Forge','Custom items and blocks','Server and client support','Tested before delivery'],
   one:150}
 ],

 // Complexity levels. "mult" multiplies the starting price (1 = x1, 1.6 = +60%).
 cx:[
  {id:'s',label:'Simple',  mult:1},
  {id:'m',label:'Standard',mult:1.6},
  {id:'a',label:'Advanced',mult:2.5}
 ]
};

/* Discord live widget. Set guildId (Server ID, widget enabled in server settings)
   for the most reliable counts, or leave it empty to use the invite code. */
var DISCORD={guildId:'',invite:'hypedevs',url:'http://dsc.gg/hypedevs'};
