function Organization(id, title, usd_ask, usd_bid){
    this.ID = id;
    this.title = title;
    this.usd_ask = usd_ask;
    this.usd_bid = usd_bid;
}

Organization.prototype.toString = function organizationToString(){
    var ret = 'ID ' + this.ID + ', title ' + this.title + ', USD_ask = ' + this.usd_ask + ', USD_bid = ' + this.usd_bid;
    return ret;
}

Organization.prototype.showOrganization =function showOrganization(){
    document.getElementById("organization_title").innerHTML = org.title;
    document.getElementById("usd_ask").innerHTML = org.usd_ask;
    document.getElementById("usd_bid").innerHTML = org.usd_bid;
}

var org = new Organization(123, "Bank", 26, 30);

org.showOrganization()
console.log(org.toString());