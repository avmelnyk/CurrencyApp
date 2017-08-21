var sqlite3 = require('sqlite3').verbose();

function Databases(name){
	this.name  = name;
}
	Databases.prototype.connect = function connectToDB() {
		var db = new sqlite3.Database('./db/CurrencyApp.db');
		return db;
	}

	Databases.prototype.addOrg = function addOrganization(db, organization, report) {
		db.serialize(function(err, row) {
		if (err) {
				throw err;
			}
	db.run("CREATE TABLE if not exists organizations (id TEXT PRIMARY KEY, `title`	CHAR(50), `usd_ask`	INTEGER, `usd_bid`	INTEGER,`report_id`	INTEGER NOT NULL," +
		"FOREIGN KEY (report_id) REFERENCES reports(report_id))");
	db.run("CREATE TABLE if not exists reports (`report_id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , `report_date` INTEGER)");
	var reportStmt =  db.prepare("INSERT INTO reports(report_date) VALUES (?)");
            try{
                reportStmt.run( report.date);
                reportStmt.finalize();
            }
            catch(e){
                console.log(e);
            }

	var stmt =  db.prepare("INSERT INTO organizations VALUES (?, ?, ?, ?,?)");
		try{
			stmt.run(organization.id, organization.title, organization.currencies.USD.ask, organization.currencies.USD.bid, report.date );
			stmt.finalize();
		   }
		catch(e){
			console.log(e);		
		}
	});
		
	};
	Databases.prototype.closeConnection = function closeConnection() {
		this.closeConnection;
	}
	

	Databases.prototype.selectAllReports = function selectAllReports() {
		var db = new sqlite3.Database('./db/CurrencyApp.db');
		db.each("SELECT id AS id, title as title FROM organizations", function(err, row) {
			if (err) {
				throw err;
			}
      	console.log(row.id + ": " + row.title);
  		});
		db.close();
	 };

module.exports = Databases;

	
			 