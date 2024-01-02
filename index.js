const mysql = require('mysql');
const readline = require('readline');
require('dotenv').config();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter data in the format NAMA USIA KOTA: ', (answer) => {
    let name = '';
    let words = answer.replace(/tahun|thn|th/i, '').split(' ');
    words = words.filter(word => word !== "");
    let counter=0;
    for (counter; counter < words.length; ++counter) {
        if (!isNaN(words[counter][0])) {
            break;
        }
        name += words[counter] + ' ';
    }
    name = name.trim().toUpperCase();
    let city = words.slice(counter+1).join(' ').toUpperCase();
    let age = parseInt(words.slice(counter));

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect();

    const post = { NAME: name, AGE: age, CITY: city, CREATED_AT: new Date() };
    const query = connection.query('INSERT INTO users SET ?', post, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    connection.end();
    rl.close();
});