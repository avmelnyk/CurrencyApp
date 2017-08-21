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

module.exports = Organization;