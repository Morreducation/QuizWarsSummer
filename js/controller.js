function getAnswer() {
	var response;
	if (input_1.checked == true) {
		response = input_1.value;
	} else {
		response = input_2.value;
	}
	return response;
}

function evaluateAnswer(response) {
	var evaluation;
	if (response == array_questions[counter].answer_key) {
		evaluation = "correct";
	} else {
		evaluation = "incorrect";
	}
	return evaluation;
}

function setAnswer() {
	array_answers[counter] = {
		username: username,
		answer: getAnswer(),
		evaluation: evaluateAnswer(getAnswer()),
		hint: hint_request,
		time: endTimer(),
		topic: array_questions[counter].topic,
		sub_topic: array_questions[counter].sub_topic,
	};
	hint_request = false;
	console.table(array_questions);
	console.table(array_answers);
	setAgentDialogue();
	initializeQuestion(counter);
	// Store answers to database
	//setDatabase();
}

function setFeedback() {
	if (counter <= array_answers.length - 1) {
		if (array_answers[counter].evaluation == "correct") {
			cont_success.classList.remove("d-none");
			cont_danger.classList.add("d-none");
		} else {
			cont_danger.classList.remove("d-none");
			cont_success.classList.add("d-none");
		}
	} else {
		cont_success.classList.add("d-none");
		cont_danger.classList.add("d-none");
	}
}

function getQuestion(current_question) {
	text_statement.textContent = array_questions[counter].statement;
}

function setQuestionId() {
	text_question_id.textContent = counter + 1;
}

function setQuestionTotal() {
	text_question_total.textContent = array_questions.length;
}

function setAnswerCorrect() {
	var count = 0;
	for (var i = 0; i < array_answers.length; i++) {
		if (array_answers[i].evaluation == "correct") {
			count += 1;
		}
	}
	text_question_correct.textContent = count;
}

function setAnswerIncorrect() {
	var count = 0;
	for (var i = 0; i < array_answers.length; i++) {
		if (array_answers[i].evaluation == "incorrect") {
			count += 1;
		}
	}
	text_question_incorrect.textContent = count;
}

function setQuestionPrevious() {
	counter -= 1;
	initializeQuestion(counter);
}

function setQuestionNext() {
	counter += 1;
	initializeQuestion(counter);
}

function disableButtons() {
	btn_submit.disabled = false;
	btn_previous.disabled = false;
	btn_next.disabled = false;
	input_1.disabled = false;
	input_2.disabled = false;
	if (counter == 0) {
		btn_previous.disabled = true;
	}
	if (counter == array_questions.length - 1) {
		btn_next.disabled = true;
	}
	if (counter <= array_answers.length - 1) {
		btn_submit.disabled = true;
		input_1.disabled = true;
		input_2.disabled = true;
	}
}

function initializeQuestion(current_question) {
	startTimer();
	getQuestion(current_question);
	setQuestionId();
	setQuestionTotal();
	setAnswerCorrect();
	setAnswerIncorrect();
	disableButtons();
	setFeedback();
}

function openHint() {
	window.open(array_questions[counter].hint, "_blank");
	hint_request = true;
}

function startTimer() {
	start_time = new Date();
}

function endTimer() {
	end_time = new Date();
	var elapsed_time = end_time - start_time; //in ms
	elapsed_time /= 1000;
	var seconds = Math.round(elapsed_time);
	return seconds;
}

function setAgentDialogue() {
	if (array_answers[counter].time <= 5 && array_answers[counter].evaluation == "incorrect") {
		text_agent_dialogue.textContent = "Chewbacca gets angry when you answer too quickly. He has been known to rip people's arm off.";
	}
}
