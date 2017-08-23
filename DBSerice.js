var sqlite3 = require('sqlite3').verbose();


function DBService(name){
    this.name  = name;
    var db;
    this.report_id = null;
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
};
DBService.prototype.saveReport = function saveReport(report) {
    var report_date = report.date;
    var reportStmt =  db.prepare("INSERT INTO reports(report_date) VALUES (?)");
        try{
            reportStmt.run( report.date);
            reportStmt.finalize();
        }
        catch(e){
            console.log(e);
        }

    var getReport_idStmt = ("SELECT report_id  FROM reports  WHERE report_date  = ?");
          db.get(getReport_idStmt, [report_date], function (err, result) {
            if (err) throw err;
                this.report_id = result.report_id;
        });

    var organizations = report.organizations;
    for (i = 0; i < organizations.length; i++) {
        if(organizations[i].currencies.USD !== undefined) {
            var organizationStmt =  db.prepare("INSERT INTO organizations VALUES (?, ?, ?, ?,?)");
            try{
                organizationStmt.run(organizations[i].id, organizations[i].title, organizations[i].currencies.USD.ask, organizations[i].currencies.USD.bid, this.report_id);
                organizationStmt.finalize();
            }
            catch(e){
                console.log(e);
            }
        }
    }
};

module.exports = DBService;
