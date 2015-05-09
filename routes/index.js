var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var app = express();
//app.set('port', (process.env.PORT));


//app.listen(app.get('port'), function() {
//  console.log("Node app is running on port:" + app.get('port'))
//})
/* GET home page. */
router.get('/', function(req, res) {
   
  res.render('index', { title: 'Quiz' });
});

/* GET authors page. */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Autores' });
});

/* GET question page. */
//router.get('/quizes/question', quizController.question);

/* GET answer page. */
//router.get('/quizes/answer', quizController.answer);

//Definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;


