const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.isNew) {
      res.render("register");
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 12);
    let checkQuery = `SELECT * FROM users WHERE email = $1;`
    return db.query(checkQuery, [email])
    .then(response => {
      if (response.rows.length !== 0) {
        res.send("The email address entered already has an account.")
      } else {
        let insertQuery = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING *;`
        return db.query(insertQuery, [fName, lName, email, password])
        .then(response => {
          let userEmail = response.rows[0].email;
          req.session["userEmail"] = userEmail;
          res.redirect("/");
        })
        .catch(() => res.send("Something went wrong while entering new user into database."));
      }
    })
    .catch(() => res.send("Something went wrong while checking if email address already exists in the database."));
  });

  return router;
};
