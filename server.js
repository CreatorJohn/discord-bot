if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;

server.all("/", (req, res) => {
	res.send("Your Bot is alive!");
});

/**
 * @description This function creates server and constantly pings your bot to keep it alive
 */
function keepAlive() {
	server.listen(PORT, () => console.log("Server is running!"));
}

module.exports = keepAlive;
