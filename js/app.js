$(document).ready(function() {


	$(".meter > span").each(function() {
	  $(this)
	    .data("origWidth", $(this).width())
	    .width(0)
	    .animate({
	      width: $(this).data("origWidth") // or + "%" if fluid
	    }, 2000);
	});


});
