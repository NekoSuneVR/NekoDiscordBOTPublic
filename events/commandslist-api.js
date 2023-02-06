const client = require("../index");

const express = require('express')
const app = express()
const https = require('https'),
http = require('http');
const port = 3310;
const { readFileSync } = require("fs");

client.on("ready", async () => {

  app.get('/', (req, res) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.send("BOT COMMANDS API ON");
	})

  app.get('/commandslist', (req, res) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.contentType('application/json; charset=utf-8');
     res.send(JSON.stringify(client.slashCommands));
	})
 
 http.createServer(app)
     .listen(port);

});
