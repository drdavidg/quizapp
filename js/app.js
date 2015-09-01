$(document).ready(function() {
	var results = {
		question: []
	};

	var activeQuestion = function() { //ask Ryan about what i'm trying to do here, and why i'm getting errors that this function isn't defined
		return results.question.length;
	};


	timeRemaining();
	var initialWidth = $('.meter > span').width();
	function timeRemaining(initialWidth) {
		startTimer(9);
		$('.meter > span').width(initialWidth);
		$('.meter > span').each(function() {
		  $(this)
		    // .data('origWidth', $(this).width())
		     .width('origWidth')
		    .animate({
					width: 0
		    }, 10000);
		});

	}
	var timer;
	function startTimer(x) {
		 timer = setInterval(function() {
			if (x >= 0) {
				$('.secondsleft').text(x);
				x--;
			}
			else {
				recordResult(activeQuestion());
				setScoreboard();
				clearInterval(timer);
			}
		}, 1000);
	}
	function stopTimer() {
		$('.meter > span').stop();
		clearInterval(timer);
	}

	var trivia = {
		questions: ["What is Bran unable to do due to his injuries?", "Where is Theon Greyjoy tasked with raiding using only one ship by his father?", "As Maester Luwin is dying, he tells Osha to take Rickon and Bran Stark to " ],
		choices: [["Sleep","Archery","Walk","Eat"],["Villages along the Stony Shore","Coastal towns of Bear Island","Ports along Blazewater Bay","Cape Kraken"],["Riverrun to find their mother","the Wall to find their brother Jon","Rivverun to find Rob", "King's Landing to find Arya and Sansa","find Benjen Stark north of the Wall"]],
		answer: ["Walk","Villages along the Stony Shore","the Wall to find their brother Jon"]
	};

	var trivia2 = [
		{
			prompt: "What is Bran unable to do due to his injuries?",
			choices: ["Sleep","Archery","Walk","Eat"],
			answer: "Walk"
		},
		{
			prompt: "Where is Theon Greyjoy tasked with raiding using only one ship by his father?",
			choice: ["Villages along the Stony Shore","Coastal towns of Bear Island","Ports along Blazewater Bay","Cape Kraken"],
			answer: "Villages along the Stony Shore"
		}
	];
// trivia2[0]
// trivia2[1]["prompt"]

	var setQuestion = function(qnumber) {
		$('.question').text(trivia.questions[qnumber]);
	};

	setQuestion(0);

	var setChoices = function(mchoice) {
		var mchoices = trivia.choices[mchoice];
		for (var z = 0; z < mchoices.length; z++) {
			$('.multiplechoices div.q' + (z+1) + ' button').text(mchoices[z]);
			$('.multiplechoices div.q' + (z+1) + ' button').removeClass('hider');
			$('.multiplechoices div.q' + (z+1) + ' button').removeClass('incorrect').removeClass('correct');
		}
	};
	setChoices(activeQuestion());

	$('.qcontent').on('click', '.multiplechoices div > button', function(event) { //listen for answer choice clicks
		event.preventDefault();
		/* Act on the event */
		var buttoncolor = recordResult(activeQuestion(), $(this).text());
		$( this ).addClass(buttoncolor);

		setScoreboard();
		stopTimer();
		//should calculate # of points earned and update?
		//**DONE** mark question wrong if timer runs out
		//move to next question after some delay or notice given to user
		//DONE-if they chose wrong, make the button they chose red.  and make correct answer green.  after a pause wipe all noncorrect answers away.  also disable the buttons.
	});

	var nextQuestion = function() {
		//hide question, all answers, picture.  the make new ones appear.  exit and enter with some sort of jquery animation
		//have separate function that increments to the next question
		setQuestion(activeQuestion());
		setChoices(activeQuestion());
		$('.qimage > img').prop('src', 'img/' + (activeQuestion()+1)  +'.jpg ');
		$('.multiplechoices div > button').prop('disabled', false);
		$('.secondsleft').text(10);		//set timer to 10
		timeRemaining(initialWidth);
	};

	var setButtons = function(choice) {

		$('.multiplechoices div > button').prop('disabled', true);

		setTimeout(function() {
			setCorrect(results.question.length);
		}, 500);
		setTimeout(function() {
			hideIncorrect();
		}, 1800);
		setTimeout(function() {
			hideIncorrectChoice();
		}, 1900);
		setTimeout(function() {
			nextQuestion();
		}, 3000);


		function setCorrect(active) {
			$('.multiplechoices div > button').each(function(index){

					if (($( this ).text()) === (trivia.answer[(active-1)])) {
						$( this ).addClass('correct');
					}
			});
		}
		function hideIncorrectChoice() {
			$('.multiplechoices div > button').each(function(index){
				if ($( this ).text() === choice) {
					$( this ).addClass('hider');
				}
			});
		}
		function hideIncorrect() {
			$('.multiplechoices div > button').each(function(index){
				if (($( this ).text() !== trivia.answer[activeQuestion()]) && ($( this ).text() !== choice)) {
					$( this ).addClass('hider');
				}
			});
		}

	};
	var score = 0;
	var calcScore = function(addToScore) {
		//rules: 15 points per correct answer
		//-1 every 2 sec it takes to answer
		addToScore = parseInt(addToScore, 10);
		console.log("score is " + score);
		console.log("score is type " + typeof(score) );
		console.log("addToScore is type " + typeof(addToScore) );
		//score = parseInt(score, 10);

		score = score + addToScore;
		if (!(isNaN(addToScore))) { //ASKRYAN do i have to do this?  is there a way to make the argument default to be a number?
			//score += addToScore;
		}
		else {
			console.log("addToScore isn'ta  number!!");
		}

		console.log("score is " + score);
		//score += (($('.playerscore').text())/2);
		$('.playerscore').text(score);
	};
	calcScore();

	var recordResult = function(q, a) {
		setButtons(a);
		if (a === trivia.answer[q]) {
			results.question[q] = true;  //**DONE** change this to booleans
			calcScore(10);
			return;
		}
		else {
			results.question[q] = false;
			return "incorrect";
		}
	};
	var setImage = function() {
		$('.qimage > img').prop('src', 'img/' + (activeQuestion()+1)  +'.jpg ');
	};
	setImage();

	var setScoreboard = function() {
		var arrLength = results.question.length;
			$('i').each(function(index){
				if (results.question[index] === false) {
					$( this ).addClass('wronganswer fa-times-circle-o')
					.removeClass('fa-circle-o')
					.siblings('span').hide(); //**DONE** instead of remove, maybe use .empty() so I can restart the quiz
				}
				else if (results.question[index]) {
					$( this ).addClass('fa-check-circle-o rightanswer')
						.removeClass('fa-circle-o')
						.siblings('span').remove();
				}
				else if (index === arrLength) {
					$( this ).addClass('currentquestion');
				}
			});
	};

});
