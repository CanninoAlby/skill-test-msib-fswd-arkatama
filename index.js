const mysql = require('mysql');
const readline = require('readline');
require('dotenv').config();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter data in the format NAMA USIA KOTA: ', (answer) => {
    let name = '';
    let words = answer.split(' ');
    let counter=0;
    for (counter; counter < words.length; ++counter) {
        if (!isNaN(words[counter][0])) {
            break;
        }
        name += words[counter] + ' ';
    }
    name = name.trim().toUpperCase();
    let city = words.pop().toUpperCase();
    let age = parseInt(words.slice(counter).join(' ').replace(/tahun|thn|th/i, ''));

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