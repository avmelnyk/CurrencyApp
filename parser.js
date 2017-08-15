function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://localhost:8080/currency-cash.json");
if (request){
    request.onload = function(){
        var myObj = JSON.parse(this.responseText);
        document.getElementById("sourceId").innerHTML = myObj.organizations[0].title;
        console.log(myObj.organizations[0].title)
    };
    request.send();
}

