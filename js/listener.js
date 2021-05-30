btn_start.addEventListener("click", function () {
	username = input_username.value;
	viewRouter("quiz");
});
btn_submit.addEventListener("click", function () {
	console.log("Click event - btn_submit");
	setAnswer();
});
btn_previous.addEventListener("click", function () {
	console.log("Click event - btn_previous");
	setQuestionPrevious();
});
btn_hint.addEventListener("click", function () {
	console.log("Click event - btn_hint");
	openHint();
});
btn_next.addEventListener("click", function () {
	console.log("Click event - btn_next");
	setQuestionNext();
});
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM fully loaded and parsed");
	//getDatabase();
	// Example for API Fetch asynchronous request to get JSON
	console.table(array_questions);
	console.table(array_answers);
	viewRouter("landing");
	initializeQuestion(counter);
});
