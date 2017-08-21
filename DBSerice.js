var sqlite3 = require('sqlite3').verbose();

function DBService(name){
    this.name  = name;
    var db;
}

DBService.prototype.connectToDB = function connectToDB() {
     db = new sqlite3.Database('./db/CurrencyApp.db');
    console.log("Connected to DB");
};

module.exports = DBService;