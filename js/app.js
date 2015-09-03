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

	var answers = [];
	var gotTrivia = {
		currQ: 0, //refactor all code to use this counter
		score: 0,
		timePerQ: 10,
		timeRemaining: function() {
			$('.secondsleft').text(this.timePerQ);		//set timer to 10
			this.startTimer(((this.timePerQ)-1));

			$('.meter > span').width($(window).width());
			$('.meter > span').each(function() {
				$(this)
					 .width($(window).width())
					.animate({
						width: 0
					}, (gotTrivia.timePerQ*1000));

			});
			console.log("does it get here");
		},
		startTimer: function(x) {
				 timer = setInterval(function() {
					if (x >= 0) {
						$('.secondsleft').text(x);
						x--;
					}
					else {
						gotTrivia.recordResult(false);
						clearInterval(timer);
						gotTrivia.nextQuestion();
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
		setChoices: function() {
			$('.multiplechoices div > button').prop('disabled', false).removeClass('correct incorrect');
				for (var z = 0; z < quiz[this.currQ].choices.length; z++) {
					$('.multiplechoices div.q' + z + ' button').text(quiz[this.currQ].choices[z]);
					$('.multiplechoices div.q' + z + ' button').removeClass('hider');
					$('.multiplechoices div.q' + z + ' button').removeClass('incorrect').removeClass('correct');
				}
		},
		setClicked: function(a) {
			$('.multiplechoices div > button').prop('disabled', true);
			if ($(a).text() === quiz[this.currQ].answer) {
				$( a ).addClass('correct');
			}
			else $( a ).addClass('incorrect');
		},
		setButtons: function(a) {
			setTimeout(function() { // marks the correct choice; only matters if the correct choice wasn't already selected
				setCorrect();
			}, 500);
			setTimeout(function() { // hide the unselected && incorrect choices
				hideIncorrect(a);
			}, 1300);
			setTimeout(function() { // hide the selected && incorrect choice
				hideIncorrectChoice(a);
			}, 1900);
			setTimeout(function() {
				gotTrivia.nextQuestion();
			}, 3000);

			function setCorrect() {
				$('.multiplechoices div > button').each(function(index){
					if ($(this).text() === quiz[gotTrivia.currQ].answer) {
							$( this ).addClass('correct');
							return;
						}
				});
			}
			function hideIncorrectChoice(a) {
				$('.multiplechoices div > button').each(function(index){
					if ($(a).text() === $(this).text()) {
						$( this ).addClass('hider');
					}
				});
			}
			function hideIncorrect(a) {
				$('.multiplechoices div > button').each(function(index){
					if ($( this ).text() !== $(a).text() && ($(this).text() !== quiz[gotTrivia.currQ].answer)) {
						$( this ).addClass('hider');
					}
				});
			}
		},
		calcScore: function(result) {
			//rules: 10 points per correct answer; 2 extra points if answered in <5 second
			if (result) {
				this.score += 10;
				var secondsPoints = parseInt($('.secondsleft').text(), 10);
				if (secondsPoints > 5) {
					this.score += 2;
				}
			}
			$('.playerscore').text(this.score);
		},
		recordResult: function(a) { //TODO can store results in a separate array.  will make it esier to clear that array to reset the quiz
			if ((a === true) || ($(a).text() === quiz[this.currQ].answer)) {
				answers[this.currQ] = true;
				this.calcScore(true);
				this.setScoreboard(true);
			}
			else {
				this.setScoreboard(false);
				answers[this.currQ] = false;
			}
		},
		setImage: function() {
			$('.qimage > img').prop('src', 'img/' + ((this.currQ)+1)  +'.jpg ');
		},
		setScoreboard: function(selection) {//use gotTrivia.currQ to just change the one the user is on, so wouldn't require a loop
			$('i').eq(this.currQ).addClass('currentquestion');
			if (selection) {
				$( 'i' ).eq(this.currQ).addClass('fa-check-circle-o rightanswer')
					.removeClass('fa-circle-o currentquestion')
					.siblings('span').hide();
			}
			else if (selection === false) {
				$( 'i' ).eq(this.currQ).addClass('wronganswer fa-times-circle-o')
					.removeClass('fa-circle-o currentquestion')
					.siblings('span').hide();
			}
		},
		nextQuestion: function(q){


			console.log("current question is: " + this.currQ + " length of quiz[] is " + quiz.length);
			if ((this.currQ) < quiz.length) {
				this.setScoreboard();
				this.currQ++;
				this.setQuestion(this.currQ);
				this.setChoices(this.currQ);
				this.setImage();
				this.timeRemaining();
			}
			else {
				gotTrivia.finalScore();
			}

		},
		finalScore: function() {
			$('body').children().toggle(); //hide everything on the page
			$('.finalscoreboard > div').addClass('finalstats youranswers');
			$('.topcontent').show();
			$('button.resetbutton').show();
			$('.timeleftbox').hide();
			$('.playerbox').children().hide();
			$('.finalscoreboard').children().removeClass('hider');
			if (this.score < 5) {
				$('.finalstats').text("Your total score:" + this.score);
				$('.resultsgif').show();
				$('.finalstats').addClass('wronganswer');
				$('.resultsgif').prop('src', 'img/youknownothing3.gif');
			}
			else {
				$('.finalstats').text("Your total score:" + this.score + " Keep that mind sharp.");
				$('.resultsgif').show();
				$('.finalstats').addClass('rightanswer');
				$('.resultsgif').prop('src', 'img/tyrionsmart.gif').prop('width', '75%');
			}
			$('.topcontent').on('click', 'button.resetbutton', function(event) {
				event.preventDefault();
				console.log('resetbutton was clicked')					;
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
				gotTrivia.recordResult(this);
				gotTrivia.setClicked(this);
				gotTrivia.setButtons(this);
				gotTrivia.stopTimer();
			});
		},
		initQuiz: function() {
			gotTrivia.initClickWatch();
			gotTrivia.timeRemaining();
			gotTrivia.setQuestion(this.currQ);
			gotTrivia.setChoices(this.currQ);
			gotTrivia.setImage();
			gotTrivia.setScoreboard();
			gotTrivia.calcScore();
		},
		resetQuiz: function() {
			answers = [];
			this.currQ = 0;
			this.score = 0;
		}
	};

	gotTrivia.initQuiz();

});
