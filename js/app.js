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
		var choice = $( this ).text();
		recordResult(0, choice);
		setResults();
		//should stop timer here somehow
		stopTimer();
		//should calculate # of points earned and update?
		//move to next question after some delay or notice given to user

	});

	var recordResult = function(q, a) {
		if (a === trivia.answer[q]) {
			results.question[q] = 1;
		}
		else {
			results.question[q] = 0;
		}
	};

	var results = {
		question: []
	};

	var setResults = function() {
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
