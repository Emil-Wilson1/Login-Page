var express = require("express");
const nocache = require("nocache");
var router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "admin123"
}
router.use(nocache());

router.get("/", (req, res) => {
  if (req.session.user){
    res.redirect("/dashboard");
  } else {
    res.render("base", { title: "Login System" });
  }
});




router.post("/login", (req, res) => {
  if (req.body.email !== credential.email) {
    res.render("base", { logout: "Invalid Email" });
  } else if (req.body.password !== credential.password) {
    res.render("base", { logout: "Invalid Password" });
  } else {
    if (req.body.email === credential.email && req.body.password === credential.password) 
    {
      req.session.user = credential;
      res.redirect("/dashboard");
    }
  }
});


// route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user.email })

    //res.redirect("/route/dashboard");
  } else {
    //res.send('Unauthorized user!!!!');
    res.redirect("/");
  }
})



// route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error")
    } else {
      res.render('base', { title: "Express", logout: "logout Successfully...!" })
    }
  })
})

module.exports = router;





