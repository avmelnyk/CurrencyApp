var http = require('http');
var request = require("request")
var express = require('express');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var Databases = require('./database');
var Organization = require('./organization');
var url = "http://resources.finance.ua/ua/public/currency-cash.json";
var organizations;
var organizationsInDB;
let newDb = new Databases("DB");

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
		organizations = body.organizations;

	}
	var db = new sqlite3.Database('./db/CurrencyApp.db');
	
	for (i = 0; i < organizations.length; i++) {
		if(organizations[i].currencies.USD != undefined) {
			newDb.addOrg(db, organizations[i], body);
		};
	} 
	db.each("SELECT id AS id, title as title, usd_ask as ask, usd_bid as bid FROM organizations", function(err, row) {
      console.log(row.id + ": " + row.title + " " + row.ask  + " " + row.bid);
			
	});
	db.close();
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	res.write("<table>")
	res.write("<tr><td>Організація</td><td>Продажа</td><td>Покупка</td></tr>");
	for (i = 0; i < organizations.length; i++) {
		try{
				res.write('<tr>');
				res.write('<td>' + organizations[i].title + '</td>');
				res.write('<td>' + organizations[i].currencies.USD.ask + '</td>');
				res.write('<td>' + organizations[i].currencies.USD.bid + '</td>');
				res.write("</tr>");
		}
		catch(e){
			console.log(organizations[i].title);
   			console.log(" Exception \n",e)	
		}
	}	
	res.write("</table>")
    res.end();
}).listen(8080);
