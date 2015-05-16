var models = require('../models/models.js');


exports.show = function(req,res) {
	var npreg = 0;
	var ncom = 0;
	models.Quiz.findAll().then(function(quizes){
		npreg = quizes.length;

		models.Comment.findAll().then(function(comments){
			ncom = comments.length;
			console.log(npreg);

			var comentadas = new Array();
			var comentada = 1;
			models.Comment.findAll().then(function(comments){
			console.log("Comments.length= " + comments.length);
			for (var i=0;i<comments.length; i++){
				console.log(comments[i].QuizId);
				for(var j=0;j<comentadas.length; j++){
					if(comments[i].QuizId===comentadas[j].QuizId){
						comentada =0;
					}
				}
            	console.log("a");
				if(comentada===1){
					comentadas.push(comments[i]);
				}
				comentada =1;

			}

			var con = comentadas.length;
			var sin = npreg - con;
			res.render('stats/index.ejs', {npreg: npreg, ncom: ncom, con: con, sin:sin, errors: [] });
			})
			
		})
	
	})

		
}



