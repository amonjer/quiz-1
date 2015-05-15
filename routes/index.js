var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var app = express();
//app.set('port', (process.env.PORT));


//app.listen(app.get('port'), function() {
//  console.log("Node app is running on port:" + app.get('port'))
//})
/* GET home page. */
router.get('/', function(req, res) {  
  res.render('index', { title: 'Quiz', errors: [] });
});

/* GET authors page. */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Autores', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definicion de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesion
router.get('/logout', sessionController.destroy); //destruir sesion
/* GET question page. */
//router.get('/quizes/question', quizController.question);

/* GET answer page. */
//router.get('/quizes/answer', quizController.answer);

//Definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;


