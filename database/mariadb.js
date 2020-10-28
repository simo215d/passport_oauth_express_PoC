const mariadb = require('mariadb');

/*const pool = mariadb.createPool({
     host: '0.0.0.0', 
     port: 32770,
     user:'root', 
     password: 'pwd123',
     connectionLimit: 5
});*/

mariadb.createConnection({host: '0.0.0.0', port:32770, database:'passporttest1', user: 'root', password: 'pwd123'})
    .then(conn => {
      conn.query("select * from users")
        .then(result => {
          console.log(result); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => { 
          //handle query error
          console.log('query error');
        });
    })
    .catch(err => {
      //handle connection error
      console.log('connection error');
});