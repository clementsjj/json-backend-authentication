var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  const signUPInfo = req.body;
  userController
    .signUp(signUpInfo)
    .then(user => {
      res.status(200).json({
        data: user
      });
    })
    .catch(err => {
      const status = err.status;
      const message = err.message;
      res.status(statusCode).json({
        message: message
      });
    });
});

module.exports = router;
