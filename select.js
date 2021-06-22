const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    },
});
router.get('/', (req, res) => {
    db.raw('select avg(fill_rate) as fill_rate, avg(normal_capacity) as normal_capacity, name, EXTRACT(year from date) as year from barrage2 group by name, EXTRACT(YEAR from date);')
   
            .then((data) => {
            console.log(data);
            //res.json(data);
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        });
            
});
module.exports = router;