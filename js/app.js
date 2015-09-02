$(document).ready(function() {
	var quiz = [
		{
			prompt: "What is Bran unable to do due to his injuries?",
			choices: ["Sleep","Archery","Walk","Eat"],
			answer: "Walk",
		},
		{
			prompt: "Where is Theon Greyjoy tasked with raiding using only one ship by his father?",
			choices: ["Villages along the Stony Shore","Coastal towns of Bear Island","Ports along Blazewater Bay","Cape Kraken"],
			answer: "Villages along the Stony Shore"
		},
		{
			prompt: "As Maester Luwin is dying, he tells Osha to take Rickon and Bran Stark to",
			choices: ["Riverrun to find their mother","the Wall to find their brother Jon","Rivverun to find Rob", "King's Landing to find Arya and Sansa","find Benjen Stark north of the Wall"],
			answer: "the Wall to find their brother Jon"
		},
		{
			prompt: "What does Arya earn after she helped the Hound in the fight with Polliver's men?",
			choices: ["Horse","Armor","Chicken","Freedom"],
			answer: "Horse"
		},
		{
			prompt: "Who does Robb Stark send to make an alliance with Balon Greyjoy?",
			choices: ["Catelyn","Bran","Lord Umber","Theon"],
			answer: "Theon"
		},
		{
			prompt: "Which city is Ser Loras Tyrell the heir to?",
			choices: ["Riverrun","King's Landing","Highgarden","Winterfell"],
			answer: "Highgarden"
		},
		{
			prompt: "Who does Sansa beg to light a candle for her in Winterfell?",
			choices: ["Theon","Podrick","Brienne","Roose"],
			answer: "Theon"
		},
		{
			prompt: "What is the number of Lord Commanders that have served when Jon is elected?",
			choices: ["292","731","31","997"],
			answer: "997"
		},
		{
			prompt: "What does Bronn save Jaime from being killed by?",
			choices: ["Jaguar","Boar","Rats","Snake"],
			answer: "Snake"
		},
		{
			prompt: "Who says the name of the episode in 'The Wars To Come'?",
			choices: ["Mance","Daenerys","Tyrion","Sam"],
			answer: "Mance"
		}
	];

	var gotTrivia = {
		activeQuestion: function() {
			var answeredQuestions = 0;
				for (var r = 0; r < quiz.length; r++) {
					if (quiz[r].result !== undefined) answeredQuestions++;
				}
				if (answeredQuestions === quiz.length || quiz.length === undefined ) {
					return false;
				}
			return answeredQuestions;
		},
		timeRemaining: function() {
			var initialWidth = $(window).width();
			gotTrivia.startTimer(9);
			$('.meter > span').width(initialWidth);
			$('.meter > span').each(function() {
				$(this)
					 .width('origWidth')
					.animate({
						width: 0
					}, 10000);
			});
		},
		startTimer: function(x) {
				 timer = setInterval(function() {
					if (x >= 0) {
						$('.secondsleft').text(x);
						x--;
					}
					else {
						gotTrivia.recordResult(gotTrivia.activeQuestion());
						gotTrivia.setScoreboard();
						clearInterval(timer);
					}
				}, 1000);
			},
			stopTimer: function() {
				$('.meter > span').stop();
				clearInterval(timer);
			},
			setQuestion: function(qnumber) {
				if (qnumber !== false) $('.question').text(quiz[qnumber].prompt);
			},
			setChoices: function(mchoice) {
				if (mchoice !== false) {
					var mchoices = quiz[mchoice].choices;
					for (var z = 0; z < mchoices.length; z++) {
						$('.multiplechoices div.q' + (z+1) + ' button').text(mchoices[z]);
						$('.multiplechoices div.q' + (z+1) + ' button').removeClass('hider');
						$('.multiplechoices div.q' + (z+1) + ' button').removeClass('incorrect').removeClass('correct');
					}
				}
			},
			setButtons: function(choice) {
				$('.multiplechoices div > button').prop('disabled', true);
				setTimeout(function() {
					setCorrect(gotTrivia.activeQuestion());
				}, 500);
				setTimeout(function() {
					hideIncorrect(gotTrivia.activeQuestion());
				}, 1800);
				setTimeout(function() {
					hideIncorrectChoice(gotTrivia.activeQuestion());
				}, 1900);
				setTimeout(function() {
					gotTrivia.nextQuestion(gotTrivia.activeQuestion());
				}, 3000);

				function setCorrect(active) {
					$('.multiplechoices div > button').each(function(index){
						if ((active) && (($( this ).text()) === quiz[(gotTrivia.activeQuestion()-1)].answer)) {
								$( this ).addClass('correct');
							}
					});
				}
				function hideIncorrectChoice(active) {
					$('.multiplechoices div > button').each(function(index){
						if ((active) && ($( this ).text() === choice)) {
							$( this ).addClass('hider');
						}
					});
				}
				function hideIncorrect(active) {
					$('.multiplechoices div > button').each(function(index){
						if ((active) && ($( this ).text() !== quiz[gotTrivia.activeQuestion()].answer) && ($( this ).text() !== choice)) {
							$( this ).addClass('hider');
						}
					});
				}
			},
			calcScore: function(result) {
				//rules: 10 points per correct answer; 2 extra points if answered in <5 second
				if (result) {
					score += 10;
					var secondsPoints = parseInt($('.secondsleft').text(), 10);
					if (secondsPoints > 5) {
						score += 2;
					}
					$('.playerscore').text(score);
				}
				$('.playerscore').text(score);
			},
			recordResult: function(q,a) {
				gotTrivia.setButtons(a);
				if (a === quiz[q].answer) {
					quiz[q].result = true;  //**DONE** change this to booleans
					gotTrivia.calcScore(true);
					return;
				}
				else {
					quiz[q].result = false;
					return "incorrect";
				}
			},
			setImage: function() {
				$('.qimage > img').prop('src', 'img/' + (gotTrivia.activeQuestion()+1)  +'.jpg ');
			},
			setScoreboard: function() {
					var numberCorrect = 0;
					$('i').each(function(index){
						if (quiz[index].result === undefined) {
							$( this ).addClass('unanswered fa-circle-o')
							.removeClass('wronganswer currentquestion rightanswer')
							.siblings('span').show(); //**DONE** instead of remove, maybe use .empty() so I can restart the quiz
						}
						if (quiz[index].result === false) {
							$( this ).addClass('wronganswer fa-times-circle-o')
							.removeClass('fa-circle-o')
							.siblings('span').hide(); //**DONE** instead of remove, maybe use .empty() so I can restart the quiz
						}
						else if (quiz[index].result) {
							$( this ).addClass('fa-check-circle-o rightanswer')
								.removeClass('fa-circle-o currentquestion')
								.siblings('span').hide();
							numberCorrect++;
						}
						else if (index === gotTrivia.activeQuestion()) {
							$( this ).addClass('currentquestion');
						}
					});
					return numberCorrect;
			},
			nextQuestion: function(q){
				if (!q) {
					gotTrivia.finalScore();
					return;
				}
				gotTrivia.setQuestion(gotTrivia.activeQuestion());
				gotTrivia.setChoices(gotTrivia.activeQuestion());
				$('.qimage > img').prop('src', 'img/' + (gotTrivia.activeQuestion()+1)  +'.jpg ');
				$('.multiplechoices div > button').prop('disabled', false);
				$('.secondsleft').text(10);		//set timer to 10
				gotTrivia.timeRemaining();
			},
			finalScore: function() {
				$('body').children().toggle(); //hide everything on the page
				$('.finalscoreboard > div').addClass('finalstats youranswers');
				$('.topcontent').show();
				$('.timeleftbox').hide();
				$('.playerbox').children().hide();
				$('.finalscoreboard').children().removeClass('hider');
				if (gotTrivia.setScoreboard() < 5) {
					$('.finalstats').text(gotTrivia.setScoreboard() + "/" + quiz.length);
					$('.resultsgif').show();
					$('.finalstats').addClass('wronganswer');
					$('.resultsgif').prop('src', 'img/youknownothing3.gif');
				}
				else {
					$('.finalstats').text(gotTrivia.setScoreboard() + "/" + quiz.length + " questions correct.  Keep that mind sharp.");
					$('.resultsgif').show();
					$('.finalstats').addClass('rightanswer');
					$('.resultsgif').prop('src', 'img/tyrionsmart.gif').prop('width', '75%');
				}
				$('.topcontent').on('click', '.answersbox', function(event) {
					event.preventDefault();
					console.log('answers box clicked')					;
					$('body').children().toggle();
					$('.finalscoreboard').hide();
					 $('.topcontent').show();
					$('.timeleftbox').show();
					$('.playerbox').children().show();
					gotTrivia.resetQuiz();
					gotTrivia.initQuiz();
				});
			},
			initClickWatch: function() {
				$('.qcontent').on('click', '.multiplechoices div > button', function(event) { //listen for answer choice clicks
					event.preventDefault();
					var buttoncolor = gotTrivia.recordResult(gotTrivia.activeQuestion(), $(this).text());
					$( this ).addClass(buttoncolor);
					gotTrivia.setScoreboard();
					gotTrivia.stopTimer();
				});
			},
			initQuiz: function() {
  			gotTrivia.initClickWatch();
				gotTrivia.timeRemaining();
				gotTrivia.setQuestion(gotTrivia.activeQuestion());
				gotTrivia.setChoices(gotTrivia.activeQuestion());
				gotTrivia.setImage();
				gotTrivia.setScoreboard();
				gotTrivia.calcScore();
			},
			resetQuiz: function() {
				//clear results answers. then initQuiz().  i think that should do it?
				for (var t in quiz) {
					quiz[t].result = undefined;
				}
				$('.multiplechoices div > button').prop('disabled', false).removeClass('correct incorrect');

				score = 0;
				$('.playerscore').text(score);
			}
	};

	var score = 0;  //RYAN: where can i set this variable, is this the correct place to do so? if i don't set it, i get NaN error

	gotTrivia.initQuiz();
});
