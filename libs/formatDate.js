//Create leading zeros for display
//String: The string of numbers to be added to
//Size: The amound of significant zeors in the mantisa
function leadingZeros(string, size) {
	while (string.length < (size || 2)) {
		string = "0" + string;
	}
	return string;
}

module.exports = {
	default: function (logText, logDate) {
		//Get the date------------------------------------------
		//Get the individual elements of the date and make sure they have 2 significant figures
		var hours = leadingZeros(logDate.getHours().toString(), 2);
		var minutes = leadingZeros(logDate.getMinutes().toString(), 2);
		var seconds = leadingZeros(logDate.getSeconds().toString(), 2);
		var time = `${hours}:${minutes}:${seconds}`; //

		//Assemble the date and the text------------------------
		var resText = `[${time}] ${logText}`;
		return resText;
	},
	
	toDateAndTime: function (logDate) {
		var monthNames = [
			"January", "February", "March",
      	"April", "May", "June", "July",
      	"August", "September", "October",
      	"November", "December"
		]

		var H = leadingZeros(logDate.getHours().toString(), 2);
		var M = leadingZeros(logDate.getMinutes().toString(), 2);
		
		var dd = logDate.getDate();
 		var mm = monthNames[logDate.getMonth()];
 		var yyyy = logDate.getFullYear();
		
		var returnDate = `${dd} ${mm} ${yyyy} [${H}:${M}]`
		return returnDate;
	}
}
