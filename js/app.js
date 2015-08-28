$(document).ready(function() {
	timeRemaining();
	function timeRemaining() {
		$('.meter > span').each(function() {
		  $(this)
		    .data('origWidth', $(this).width())
		    .width('origWidth')
		    .animate({
		      // width: $(this).data("origWidth") // or + "%" if fluid
					width: 0
		    }, 10000);
		});
	//make time left tick downwards.
	startTimer(9);
	}
	var stop = true;
	function startTimer(x) {
		var timer = setInterval(function() {
			if (x >= 0 && stop) {
				$('.secondsleft').text(x);
				x--;
			}
			else clearInterval(timer);
		}, 1000);
	}
	function stopTimer() {
		$('.meter > span').stop();
		stop = false;
	}

	var trivia = {
		questions: ["What is Bran unable to do due to his injuries?", "Where is Theon Greyjoy tasked with raiding using only one ship by his father?" ],
		choices: [["Sleep","Archery","Walk","Eat"],["Villages along the Stony Shore","Coastal towns of Bear Island","Ports along Blazewater Bay","Cape Kraken"]],
		answer: ["Walk","Villages along the Stony Shore"]
	};

	var setQuestion = function(qnumber) {
		$('.question').text(trivia.questions[qnumber]);
	};

	setQuestion(0);

	var setChoices = function(m) {
		$('.multiplechoices div.q1 button').text(trivia.choices[m][0]);
		$('.multiplechoices div.q2 button').text(trivia.choices[m][1]);
		$('.multiplechoices div.q3 button').text(trivia.choices[m][2]);
		$('.multiplechoices div.q4 button').text(trivia.choices[m][3]);
	};
	setChoices(0);

	$('.qcontent').on('click', '.multiplechoices div > button', function(event) { //listen for answer choice clicks
		event.preventDefault();
		/* Act on the event */
		var buttoncolor = recordResult(0, $(this).text());
		$( this ).addClass(buttoncolor);

		displayResults();
		stopTimer();
		//should calculate # of points earned and update?
		//move to next question after some delay or notice given to user
		//if they chose wrong, make the button they chose red.  and make correct answer green.  after a pause wipe all noncorrect answers away.  also disable the buttons.
	});
	var resultButtons = function(choice) {

		$('.multiplechoices div > button').prop('disabled', true);

		setTimeout(function() { //couldn't find a better way to time the button hiding sequences
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
						console.log("correct answer");
					}
			});
		}
		function hideIncorrectChoice() {
			$('.multiplechoices div > button').each(function(index){
				if ($( this ).text() === choice) {
					$( this ).addClass('hider');
					console.log("hider incorrect choice");
				}
			});
		}
		function hideIncorrect() {
			$('.multiplechoices div > button').each(function(index){
				if (($( this ).text() !== trivia.answer[0]) && ($( this ).text() !== choice)) {
					$( this ).addClass('hider'); //learned that using display:hidden removes the element and makes other elements in the DOM move.  visibility: hidden doesn't move other DOM elements
					console.log("hider incorrect non- choice");
				}
			});
		}

	};

	var recordResult = function(q, a) {
		resultButtons(a);
		if (a === trivia.answer[q]) {
			results.question[q] = 1;
			return;
		}
		else {
			results.question[q] = 0;
			return "incorrect";
		}
	};

	var results = {
		question: []
	};

	var displayResults = function() {
		var arrLength = results.question.length;
			$('i').each(function(index){
				if (results.question[index] === 0) {
					$( this ).addClass('wronganswer fa-times-circle-o')
					.removeClass('fa-circle-o')
					.siblings('span').remove();
				}
				else if (results.question[index] === 1) {
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
