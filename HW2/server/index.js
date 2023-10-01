const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "alicehu20030307",
  database: "idea_share3",
});

app.post("/create", (req, res) => {
  const user_id = req.body.user_id;
  const gender = req.body.gender;
  const education = req.body.education;

  db.query(
    "INSERT INTO profile (user_id, gender, education) VALUES (?, ?, ?)",
    [user_id, gender, education], // 更新为正确的列名和表名
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Values Inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
