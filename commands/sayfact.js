const fetch = require("node-fetch");

exports.run = async (bot, message, args) => {
	console.log(args);
	console.log(args.length);
	if (args.length < 1) return message.channel.send("Please choose **Fact Category**: `Numbers`, `NASA`, `Coming Soon...`");

	const category = args[0].toLowerCase();

	try {
		var type = args[1].toLowerCase();
	} catch (e) {
		return message.channel.send("Please choose from **Fact Type**: `Default`, `Asteroids`");
	}

	switch (category) {
		case "nasa":
			setTimeout(() => {
				message.channel.send("Wait a moment... I am trying to find best NASA fact!");
			}, 1000);
			setTimeout(() => {
				if (type === "default") {
					fetch("https://api.nasa.gov/planetary/apod?api_key=TaDQG8mugBykYJOsFfHms6JIilpM5hrZc1068aXc")
						.then((request) => request.json())
						.then((data) => {
							console.log(data);
							message.channel.send("**Title:** " + data.title);
							message.channel.send(data.url);
							message.channel.send(data.explanation);
						});
				} else if (type === "asteroids") {
					try {
						var start_date = new Date(args[2]).toISOString().split("T")[0];
					} catch (e) {
						return message.channel.send("Please enter the start date in format `YYYY-MM-DD`!");
					}
					fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&api_key=TaDQG8mugBykYJOsFfHms6JIilpM5hrZc1068aXc`)
						.then((request) => request.json())
						.then((data) => console.log(data));
				}
			}, 2000);

			break;
	}
};

exports.help = {
	name: "sayfact",
};
