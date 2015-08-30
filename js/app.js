$(document).ready(function() {
	timeRemaining();
	function timeRemaining() {
		$('.meter > span').each(function() {
		  $(this)
		    .data('origWidth', $(this).width())
		    .width('origWidth')
		    .animate({
					width: 0
		    }, 10000);
		});
	startTimer(9);
	}
	var timer;
	function startTimer(x) {
		 timer = setInterval(function() {
			if (x >= 0) {
				$('.secondsleft').text(x);
				x--;
			}
			else {
				//mark question wrong here
				recordResult(0);
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
		questions: ["What is Bran unable to do due to his injuries?", "Where is Theon Greyjoy tasked with raiding using only one ship by his father?" ],
		choices: [["Sleep","Archery","Walk","Eat"],["Villages along the Stony Shore","Coastal towns of Bear Island","Ports along Blazewater Bay","Cape Kraken"]],
		answer: ["Walk","Villages along the Stony Shore"]
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
		}
	};
	setChoices(0);

	$('.qcontent').on('click', '.multiplechoices div > button', function(event) { //listen for answer choice clicks
		event.preventDefault();
		/* Act on the event */
		var buttoncolor = recordResult(0, $(this).text());
		$( this ).addClass(buttoncolor);

		setScoreboard();
		stopTimer();
		//should calculate # of points earned and update?
		//**TODO** mark question wrong if timer runs out
		//move to next question after some delay or notice given to user
		//DONE-if they chose wrong, make the button they chose red.  and make correct answer green.  after a pause wipe all noncorrect answers away.  also disable the buttons.
	});
	var setButtons = function(choice) {

		$('.multiplechoices div > button').prop('disabled', true);

		setTimeout(function() {
			setCorrect();
		}, 500);
		setTimeout(function() {
			hideIncorrect();
		}, 1800);
		setTimeout(function() {
			hideIncorrectChoice();
		}, 1900);

		function setCorrect() {
			$('.multiplechoices div > button').each(function(index){
					if (($( this ).text()) === (trivia.answer[0])) {
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
				if (($( this ).text() !== trivia.answer[0]) && ($( this ).text() !== choice)) {
					$( this ).addClass('hider');
				}
			});
		}

	};

	var recordResult = function(q, a) {
		setButtons(a);
		if (a === trivia.answer[q]) {
			results.question[q] = true;  //**DONE** change this to booleans
			return;
		}
		else {
			results.question[q] = false;
			return "incorrect";
		}
	};

	var results = {
		question: []
	};

	var setScoreboard = function() {
		var arrLength = results.question.length;
			$('i').each(function(index){
				if (results.question[index] === false) {
					$( this ).addClass('wronganswer fa-times-circle-o')
					.removeClass('fa-circle-o')
					.siblings('span').empty(); //**DONE** instead of remove, maybe use .empty() so I can restart the quiz
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
