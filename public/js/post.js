//ENTER pressed within the text box
$('#newLogText').keypress(function (event) {
	if (event.which === 13 && $(this).val() != "") {
		//Post to database--------------------------------------
		$.ajax({
			data: {
				text: $(this).val(),
				postID: $(".postTitle").attr('id')
			},
			method: "POST",
			success: function (res) {
				$('#newLogText').val("");
				
				var appendText = `<li class="log" id='${res.id}'><p><span class='delete'><i class='fa fa-trash'></i></span>${res.text} </p></li>`
				
				$("ul").append(appendText);
			},
			error: function (error) {
				console.log('Error' + error);
			}
		});
	}
});

//Delete a project
$(".deletePost").on("click", function (event) {
	$(this).closest(".post").fadeOut(200, function () {
		$(this).remove();
	})
	event.stopPropagation();
	var postID = $(this).closest('.post').attr('id');
	$.ajax({
		url: window.location.pathname + "/posts/" + postID,
		type: "DELETE",
		data: {
			_method: 'delete'
		},
		success: function (res) {
			console.log(res);
		},
		error: function (err) {
			console.log(`Error: ${err}`)
		}
	});
});

//Delete a project
$(".deleteProject").on("click", function (event) {
	$(this).closest(".project").fadeOut(200, function () {
		$(this).remove();
	})
	event.stopPropagation();
	var projectID = $(this).closest('.project').attr('id');
	$.ajax({
		url: "../project/" + projectID,
		type: "DELETE",
		data: {
			_method: 'delete'
		},
		success: function (res) {
			console.log(res);
		},
		error: function (err) {
			console.log(`Error: ${err}`)
		}
	});
});


//Delete a log
$(".log").on("click", ".delete", function (event) {
	$(this).closest("li").fadeOut(200, function () {
		$(this).remove();
	});
	event.stopPropagation();
	var logID = $(this).closest('li').attr('id');
	$.ajax({
		url: window.location.pathname + "/" + logID,
		type: "DELETE",
		data: {
			_method: 'delete'
		},
		success: function (res) {
			console.log(res);
		},
		error: function (err) {
			console.log(`Error: ${err}`);
		}
	});
});

//Click the clipboard button
$(".fa-clipboard-list").click(function () {
	/* Get the text field */
	var copyElements = document.querySelectorAll("li");
	console.log(copyElements);
	var copyText = getText(copyElements);
	console.log(copyText);

	/* Copy the text inside the text field */
	copyTextToClipboard(copyText);
});

//Create leading zeros for display
//String: The string of numbers to be added to
//Size: The amound of significant zeors in the mantisa
function leadingZeros(string, size) {
	while (string.length < (size || 2)) {
		string = "0" + string;
	}
	return string;
}

function getText(inputObject) {
	var allLogs = "";
	for (var i = 0; i < inputObject.length; i++) {
		allLogs += inputObject[i].innerText + "\n";
	};
	return allLogs;
}

//Thanks to Emil Devantie Brockdorff for this function.
function copyTextToClipboard(text) {
	//Create a temporary text box for copying
	var textArea = document.createElement("textarea");
	//Make it invisible/ Out of the web view
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = 0;
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	//Copy the text
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}
	//Remove the copy box
	document.body.removeChild(textArea);
}
