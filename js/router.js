function viewRouter(view) {
	sec_landing.classList.add("d-none");
	sec_quiz.classList.add("d-none");
	switch (view) {
		case "landing":
			sec_landing.classList.remove("d-none");
			break;
		case "quiz":
			sec_quiz.classList.remove("d-none");
			break;
		default:
			console.log("Error router...");
			break;
	}
}
