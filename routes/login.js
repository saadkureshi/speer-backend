const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.isNew) {
      res.render("login");
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    return db.query(`
      SELECT * FROM users
      WHERE email = $1;
    `, [email])
      .then(response => {
        if (response.rows[0]) {
          if (bcrypt.compareSync(password, response.rows[0].password)) {
            let userEmail = response.rows[0].email;
            req.session["userEmail"] = userEmail;
            res.redirect("/");
          } else {
            res.send("The password you have entered is incorrect.");
          }
        } else {
          res.send("There is no account associated with this email address.")
        }
        return response.rows[0] ? response.rows[0] : null;
      })
      .catch(e => {
        res.send(e);
      });
  });

  return router;
};
