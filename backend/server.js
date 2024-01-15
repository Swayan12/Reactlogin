const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Swayan@270598",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body.values;
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];
    console.log("Received request with values:", values);

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Inserted into the database:', data);
        return res.json({
            success: true,
            message: 'User registered successfully',
            insertId: data.insertId
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body.values;
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const values = [email, password];
    console.log("Received request with values:", values);

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});



app.listen(8081, () => {
    console.log("listening");
})
