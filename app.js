var http = require('http');
var request = require("request")

var url = "http://resources.finance.ua/ua/public/currency-cash.json";
var organizations;

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
		organizations = body.organizations;
        console.log(body.sourceId);
       
    }
})

http.createServer(function (req, res) {
	
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	res.write("<table>")
	for (i = 0; i < organizations.length; i++) {
		try{
			var USD_ask = organizations[i].currencies.USD.ask;
			var USD_bid = organizations[i].currencies.USD.bid;
			res.write('<tr>')
			res.write('<td>' + organizations[i].title + '</td>');
			res.write('<td>' + USD_ask + '</td>');
			res.write('<td>' + USD_bid + '</td>');
			res.write('<td>' + organizations[i].phone + '</td>');
			res.write("</tr>")
		}
		catch(e){
			console.log(organizations[i].title);
   			console.log(" Exception \n",e)
			
		}
		
	}
	res.write("</table>")
    res.end();
}).listen(8080);



