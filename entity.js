var sqlite3 = require('sqlite3').verbose();
var db =  new sqlite3.Database('../DB/CurrencyAppDB');

db.serialize(function() {
  db.run("CREATE TABLE if not exists reports (info TEXT)");
  var stmt =  db.prepare("INSERT INTO reports VALUES (?)");
    stmt.run("new report");
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM reports", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();