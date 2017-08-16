function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
        console.log(xhr.getAllResponseHeaders);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://resources.finance.ua/ua/public/currency-cash.json");
var sourseID;
if (request){
    request.onload = function(){
        var myObj = JSON.parse(this.responseText);
        var text;
        for (i = 0; i < myObj.organizations.length; i++) {
                    text += "|" + myObj.organizations[i].title + "| " + myObj.organizations[0].currencies.USD.ask + "<br>";
        }
        document.getElementById("demo").innerHTML = text;
        document.getElementById("sourceId").innerHTML = myObj.organizations[0].title;
        console.log(myObj.organizations[0].title)
    };
    request.send();
}
