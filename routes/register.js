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
    return db.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [fName, lName, email, password])
      .then(response => {
        let userEmail = response.rows[0].email;
        req.session["userEmail"] = userEmail;
        res.redirect("/");
      })
      .catch(e => res.send(e));
  });

  return router;
};
