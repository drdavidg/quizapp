$(document).ready(function() {
	timeRemaining();
	function timeRemaining() {
		$(".meter > span").each(function() {
		  $(this)
		    .data("origWidth", $(this).width())
		    .width("origWidth")
		    .animate({
		      // width: $(this).data("origWidth") // or + "%" if fluid
					width: 0
		    }, 10000);
		});
	//make time left tick downwards.
	var x = 9;
	setInterval(function() {
		if (x >= 0) {
			$('.secondsleft').text(x);
			x--;
		}
		else return;
	}, 1000);

}


});
