var models = require('../models/models.js');

//
exports.favs = function(req,res,next){

console.log("favoritos");
    if(req.quizes){
    	quizes = req.quizes;
    	req.quizes = quizes;
    	next();
    } else {
      
	if(req.session.user){
		req.session.user.favs = [];
		console.log("user id: " + req.session.user.id);
		models.favourites.findAll({where: {UserId: Number(req.session.user.id)}}
			).then(function(quizes) {
			console.log("then");
			if(quizes){
				for (index in quizes){
					    console.log("quiz id: " + quizes[index].dataValues.QuizId);
						req.session.user.favs.push(quizes[index].dataValues.QuizId);
				     	
				}
		    }
		   
		    
		}).then(function(){
			next();
		})
	} else {
		next();
	}

	}

}



// PUT /user/:userId/favourites/:quizId
exports.fav = function(req,res){
	console.log("fav");
    var quiz = req.quiz;
	//console.log(req.quiz.id);
	//req.session.user.addQuiz(req.quiz);
	req.user.addQuiz(quiz).then(function(){
		req.session.user.favs = [];
		models.favourites.findAll({where: {UserId: Number(req.session.user.id)}}
			).then(function(quizes) {

			console.log("then");
			if(quizes){
				for (index in quizes){
					    console.log("quiz id: " + quizes[index].dataValues.QuizId);
						req.session.user.favs.push(quizes[index].dataValues.QuizId);
				     	
				}
		    }
		   
		    
		}).then(function(){
			models.Quiz.findAll().then(function(quizes) {
		   		 //res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		   		 req.quizes=quizes;
		   		 res.redirect('/quizes');
	  		})
		})
	})
	/*.then(function(){
		req.user.hasQuiz(quiz).then(function(result){
			console.log("añadido");
		})
	})*/


	
    

	
}
 //DELETE /user/:userId/favourites/:quizId
exports.unFav = function(req,res){
	console.log("fav");
    var quiz = req.quiz;
	//console.log(req.quiz.id);
	//req.session.user.addQuiz(req.quiz);

	req.user.removeQuiz(quiz).then(function(){
		req.session.user.favs = [];
		models.favourites.findAll({where: {UserId: Number(req.session.user.id)}}
			).then(function(quizes) {

			console.log("then");
			if(quizes){
				for (index in quizes){
					    console.log("quiz id: " + quizes[index].dataValues.QuizId);
						req.session.user.favs.push(quizes[index].dataValues.QuizId);
				     	
				}
		    }
		   
		    
		}).then(function(){
			models.Quiz.findAll().then(function(quizes) {
		   		// res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		   		 req.quizes=quizes;
		   		 res.redirect('/quizes');
	  		})
		})
	})

	/*
	console.log("unfav");
	var quiz = req.quiz;

	req.user.removeQuiz(quiz);
	console.log("remove");
	
	next();
	*/

}

// GET user/:userId/favourites
exports.favoritos = function(req,res){
	var favs = [];
	models.favourites.findAll({where: {UserId: Number(req.user.id)}}
			).then(function(quizes) {
				
				for (index in quizes){
					console.log(quizes);
					favs.push(quizes[index]);
				}
			
		   
		    
		}).then(function(){
			models.Quiz.findAll().then(function(qzs){
				var qs = [];
				for(index in qzs){
					for(var t=0;t<favs.length;t++){
						if(qzs[index].id===favs[t].QuizId){
							qs.push(qzs[index]);
						}
					}
				}
				res.render('user/favourites', {qs: qs, errors: []});

			})
		})


}
