/* =====================================================================
   SITE CONFIG - edit this file to change prices and settings.
   Upload it together with the other files. No other file needs changes.
   ===================================================================== */

var PRICES={
 currency:'€',          // symbol shown before every price
 range:0,               // estimate spread: 0 = exact price, 0.25 = shows price -25% to +25%

 // One entry per service. "p" = price per level: s = Basic, m = Standard, a = Advanced.
 // Change a number, a name, or the feature list. Delete an entry to remove it.
 items:[
  {id:'bot',   icon:'🤖',label:'Discord bot',     sub:'Commands, moderation, tickets',
   desc:'Moderation, tickets, music, economy and custom commands, built around your server.',
   feat:['Slash commands and buttons','Moderation and logging','Ticket and role systems','Clean, documented code'],
   p:{s:10,m:15,a:25}},
  {id:'plugin',icon:'⛏️',label:'Minecraft plugin',sub:'Java, Paper/Spigot',
   desc:'Custom gameplay, items, economy or minigames for your Minecraft server.',
   feat:['Paper / Spigot support','Configurable with YAML files','Permissions and commands','Clean, documented code'],
   p:{s:5,m:10,a:20}},
  {id:'skript',icon:'📜',label:'Skript',          sub:'Server scripts and commands',
   desc:'Fast and affordable scripts when you do not need a full plugin.',
   feat:['Custom commands','Events and rewards','GUI menus','Easy for you to edit later'],
   p:{s:1,m:5,a:10}},
  {id:'mod',   icon:'🧩',label:'Mod',             sub:'Custom Minecraft mod',
   desc:'Custom blocks, items and mechanics for a modded game or server.',
   feat:['Fabric / Forge','Custom items and blocks','Server and client support','Tested before delivery'],
   p:{s:10,m:20,a:30}}
 ],

 // Complexity levels (labels only; prices are set per service above in "p").
 cx:[
  {id:'s',label:'Basic'},
  {id:'m',label:'Standard'},
  {id:'a',label:'Advanced'}
 ]
};

/* Discord live widget. Set guildId (Server ID, widget enabled in server settings)
   for the most reliable counts, or leave it empty to use the invite code. */
var DISCORD={guildId:'',invite:'hypedevs',url:'http://dsc.gg/hypedevs'};
