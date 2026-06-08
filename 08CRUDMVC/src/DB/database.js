const mysql = require('mysq12');

const poll = mysql.createPoll({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    databse: 'practicacrud',
    waitForConnection: 'true',
    ConnectionLimit: 10,
    queueLimit: 0
});

//la esportamos para poder usarla
module.exports = pool.promise();