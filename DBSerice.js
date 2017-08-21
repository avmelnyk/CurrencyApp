var sqlite3 = require('sqlite3').verbose();

function DBService(name){
    this.name  = name;
    var db;
}

DBService.prototype.connectToDB = function connectToDB() {
     db = new sqlite3.Database('./db/CurrencyApp.db');
     console.log("Connected to DB");
};

DBService.prototype.closeDBConnection = function closeDBConnection() {
    db.close();
    console.log("Connection to DB closed");
};
DBService.prototype.createTables = function createTables() {
    db.run("CREATE TABLE if not exists reports (`report_id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , `report_date` INTEGER)");
    console.log("Table reports created");
    db.run("CREATE TABLE if not exists organizations (id TEXT PRIMARY KEY, `title`	CHAR(50), `usd_ask`	INTEGER, `usd_bid`	INTEGER,`report_id`	INTEGER NOT NULL," +
        "FOREIGN KEY (report_id) REFERENCES reports(report_id))");
    console.log("Table organizations created");
}

module.exports = DBService;