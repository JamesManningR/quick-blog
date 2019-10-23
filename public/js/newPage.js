function checkPasswordMatch() {
	var password = $("#password").val();
	var confirmPassword = $("#passwordConfirm").val();

	if (password != confirmPassword) {
		$("#passwordConfirm").addClass('noMatch');
		$("#userSubmit").addClass('noClick');;
	} else {
		$("#passwordConfirm").removeClass('noMatch');
		$("#userSubmit").removeClass('noClick');
	}
}

$("#password, #passwordConfirm").keyup(checkPasswordMatch);

$("#editAvatar").click(function (event) {
	$('#imageUpload').fadeIn();
});

$("#imageUpload i").click(function (event) {
	$('#imageUpload').fadeOut();
});

$(".modalCreator").on("click", function (event) {
	$(this).hide();
	$(".modal.createNew").fadeIn();
	$("#nameEntry").select();
});

$(".addBio, #editBio").on("click", function (event) {
	$(".editBioWrapper").hide();
	$("#bioForm").fadeIn();
	$("#bioText").select();
});

$("#bioCancel").on("click", function (event) {
	$("#bioForm").hide();
	$(".editBioWrapper").fadeIn();
});

$("input[id='nameEntry']").keypress(function (event) {
	if (event.which === 13 && $(this).val() != "") {
		$(".modal form").submit;
	}
});

$(".statusSelector").one('change', function (event) {
	$('#statusChange button').fadeIn();
});
