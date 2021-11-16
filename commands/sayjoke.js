const fetch = require("node-fetch");

exports.run = async (bot, message, args) => {
	let prevJoke = "";
	message.channel.send("Okay... I'm glad to hear it!");
	const url = `https://v2.jokeapi.dev/joke/${message.channel.name === "vtipy-18" ? "Miscellaneous,Dark,Pun?" : "Any?safe-mode&"}type=single`;

	fetch(url)
		.then((result) => result.json())
		.then((data) => {
			setTimeout(() => {
				message.channel.send("Wait a moment... I'am trying to find a good joke!");
			}, 1000);

			if (prevJoke !== data.joke) {
				setTimeout(() => {
					message.channel.send("Oh... I found this one! 😄");
					message.channel.send("**Category: " + data.category + "**");
				}, 2000);
				setTimeout(() => {
					message.channel.send("_" + data.joke + "_");
				}, 2500);
			} else {
				setTimeout(() => {
					message.channel.send("I am sorry, but I didn't find any good joke 😔");
					message.channel.send("Try it after a while");
				}, 2000);
			}
		});
};

exports.help = {
	name: "sayjoke",
};
