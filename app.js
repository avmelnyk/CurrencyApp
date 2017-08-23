var http = require('http');
var request = require("request");
var express = require('express');
var fs = require('fs');
var DbSevice = require('./DBSerice');
var Organization = require('./organization');
var url = "http://resources.finance.ua/ua/public/currency-cash.json";

var dbSevice = new DbSevice("DB");
var report;

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
		organizations = body.organizations;
		report = body;
        dbSevice.connectToDB();
        dbSevice.createTables();
    	dbSevice.saveReport(report);
		dbSevice.closeDBConnection();
	}
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
