if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const Discord = require("discord.js");
const Bot = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
const fs = require("fs");
const keepAlive = require("./server");
Bot.commands = new Discord.Collection();
const greetings = ["ahoj", "zdar", "čus", "cus"];

Bot.on("ready", () => {
	console.log(`Logged as: ${Bot.user.tag}`);

	fs.readdir("./commands", (error, files) => {
		if (error) return console.log(error);

		let jsFiles = files.filter((f) => f.split(".").pop() == "js");

		if (jsFiles.length == 0) return console.log("I couldn't find any commands!");

		jsFiles.forEach((file) => {
			let props = require(`./commands/${file}`);
			Bot.commands.set(props.help.name, props);
		});

		console.log(jsFiles);
	});
});

Bot.on("message", (message) => {
	const userHastag = message.author.tag.split("#")[1];
	const prefix = "!";
	const messageArray = message.content.split(" ");
	const cmd = messageArray[0].slice(prefix.length);
	const cmd_args = messageArray.slice(1);
	console.log(userHastag);
	if (message.author.bot) return;
	if (userHastag != "5551" && message.content.startsWith(prefix)) {
		console.log(`Sorry ${message.author.tag} but you are not able to use my commands!`);
		message.channel.send(`Sorry ${message.author.tag} but you are not able to use my commands!`);
	} else {
		greetings.forEach((greeting) => {
			if (message.content.toLowerCase().startsWith(greeting)) {
				const member = message.mentions.members.first();
				message.channel.send(`Zdarec ${message.author.username}`);
			}
		});
	}

	if (!message.content.startsWith(prefix)) return;

	const commandFile = Bot.commands.get(cmd);
	if (commandFile) {
		commandFile.run(Bot, message, cmd_args);
	}
});

keepAlive();
Bot.login(BOT_TOKEN);
