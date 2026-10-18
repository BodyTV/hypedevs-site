/* =====================================================================
   Body & Zunye — site config
   Edit currency / links / services / complexity here.
   No other file needs changing.
   ===================================================================== */
window.SITE = {
  currency: "€",
  range: 0.25,                 // estimate spread (±25%)
  discord: {
    guildId: "",               // optional: server id (widget enabled) for exact counts
    invite: "hypedevs",
    url: "https://dsc.gg/hypedevs"
  },
  email: "hello@bodyandzunye.dev",

  services: [
    {
      id: "bot", icon: "bot", label: "Discord bots", tag: "Most popular",
      sub: "Moderation, tickets, economy, music",
      desc: "Custom bots built around your server — slash commands, buttons, automations and dashboards.",
      features: ["Slash commands & buttons", "Moderation and logging", "Ticket and role systems", "Clean, documented code"],
      one: 60
    },
    {
      id: "plugin", icon: "plug", label: "Minecraft plugins", tag: "",
      sub: "Java · Paper / Spigot / Folia",
      desc: "Custom gameplay, items, economy or minigames for your Minecraft server, written in modern Java.",
      features: ["Paper / Spigot support", "YAML configurable", "Permissions & commands", "Profiled for performance"],
      one: 80
    },
    {
      id: "skript", icon: "script", label: "Skript", tag: "Fastest",
      sub: "Server scripts & commands",
      desc: "Fast and affordable scripting when you do not need a compiled plugin.",
      features: ["Custom commands", "Events & rewards", "GUI menus", "Easy for you to edit later"],
      one: 30
    },
    {
      id: "mod", icon: "cube", label: "Minecraft mods", tag: "",
      sub: "Fabric / Forge / NeoForge",
      desc: "Custom blocks, items and mechanics for a modded game or server.",
      features: ["Fabric / Forge", "Custom items & blocks", "Server & client", "Tested before delivery"],
      one: 150
    }
  ],

  complexity: [
    { id: "s", label: "Simple", mult: 1, hint: "A focused feature" },
    { id: "m", label: "Standard", mult: 1.6, hint: "Several systems" },
    { id: "a", label: "Advanced", mult: 2.5, hint: "Large, complex build" }
  ]
};
