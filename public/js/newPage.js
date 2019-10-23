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

//Show the upload image modal
$("#editAvatar").click(function (event) {
	$('#imageUpload').fadeIn();
});

//Hide the upload image modal
$("#imageUpload i").click(function (event) {
	$('#imageUpload').fadeOut();
});

//New project button - Hides the button and shows: create new 'form'
$("#newProject").on("click", function (event) {
	$(this).hide();
	$(".createNew").fadeIn();
	$("#nameEntry").select();
});

//Show Bio Modal
$(".addBio, #editBio").on("click", function (event) {
	$(".editBioWrapper").hide();
	$("#bioForm").fadeIn();
	$("#bioText").select();
});

//Hide Bio Modal
$("#bioCancel").on("click", function (event) {
	$("#bioForm").hide();
	$(".editBioWrapper").fadeIn();
});

//Pressing enter on create project form submits the create new project form
$("input[id='nameEntry']").keypress(function (event) {
	if (event.which === 13 && $(this).val() != "") {
		$(".modal form").submit;
	}
});

//
$(".statusSelector").on('change', function (event) {
	$('#statusChange button').fadeIn();
});
