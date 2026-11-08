const DISCORD_CLIENT_ID = "1524834746486489300";
const DISCORD_BOT_PERMISSIONS = "277025410048";

const inviteUrl = new URL("https://discord.com/api/oauth2/authorize");
inviteUrl.searchParams.set("client_id", DISCORD_CLIENT_ID);
inviteUrl.searchParams.set("permissions", DISCORD_BOT_PERMISSIONS);
inviteUrl.searchParams.set("scope", "bot applications.commands");

export const BOT_INVITE_URL = inviteUrl.toString();
