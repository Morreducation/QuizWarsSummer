// Working with JSON Cloud Storage
async function getDatabase() {
	await fetch("https://ericpoitras.github.io/quizwars/json/database.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// TO DO: Update the array_questions table and initialize questions for the app
			console.table(array_questions);
			initializeQuestion(counter);
		})
		.catch((error) => {
			console.log(error);
		});
}

function setDatabase() {
	// Local storage for user sessions
	// TO DO: Check if the item exists at the beginning of the session to load recent answers
	if (localStorage) {
		localStorage.setItem("QuizWars", JSON.stringify(array_answers));
	}

	// delete JSON cloud storage
	// Read more here: https://github.com/vasanthv/jsonbox#readme
	fetch("https://jsonbox.io/box_239929d1d8a5ca0a2de0?q=topic:javascript", {
		method: "DELETE",
	}).then(function () {
		// JSON cloud storage
		fetch("https://jsonbox.io/box_239929d1d8a5ca0a2de0", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(array_answers),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

// Working with TinCan.js
function initializexAPIDatabase() {
	// SCORM CLOUD for debugging and testing
	//var endpoint = "https://cloud.scorm.com/lrs/UFLRLFQEP4/";
	//var key = "Mav9ZzpzkqjMBVP9la4";
	//var secret = "eFe1hoayiTNIHdZvjZ0";

	// Watershed LRS for production
	var endpoint = "https://watershedlrs.com/api/organizations/11524/lrs/";
	var key = "2786545bd25887";
	var secret = "7ba3b0da667b21";

	try {
		lrs = new TinCan.LRS({
			endpoint: endpoint,
			username: key,
			password: secret,
			allowFail: false,
		});
	} catch (ex) {
		console.log("Failed to setup LRS object: " + ex);
	}
}

function setxAPIDatabase(username, verb, target) {
	var statement = new TinCan.Statement({
		actor: {
			name: username,
			mbox: "mailto:quizwars@example.com",
		},
		//http://xapi.vocab.pub/verbs/index.html
		verb: {
			id: "http://adlnet.gov/expapi/verbs/" + verb,
			display: {
				"en-US": verb,
			},
		},
		target: {
			id: document.URL + "/" + target,
			definition: {
				name: {
					"en-US": target,
				},
			},
		},
	});

	lrs.saveStatement(statement, {
		callback: function (err, xhr) {
			if (err !== null) {
				if (xhr !== null) {
					console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
					// TODO: do something with error, didn't save statement
					return;
				}

				console.log("Failed to save statement: " + err);
				// TODO: do something with error, didn't save statement
				return;
			}

			console.log("Statement saved");
			// TOOO: do something with success (possibly ignore)
		},
	});
}

function getxAPIDatabase(verb) {
	lrs.queryStatements({
		params: {
			verb: new TinCan.Verb({
				id: "http://adlnet.gov/expapi/verbs/" + verb,
			}),
			since: "2016-01-05T08:34:16Z",
		},
		callback: function (err, sr) {
			if (err !== null) {
				console.log("Failed to query statements: " + err);
				// TODO: do something with error, didn't get statements
				return;
			}

			if (sr.more !== null) {
				// TODO: additional page(s) of statements should be fetched
			}

			// TODO: do something with statements in sr.statements
			console.log(sr.statements);
		},
	});
}
// Test the functions
//initializexAPIDatabase();
//setxAPIDatabase("Eric Poitras", "experienced", "QuizWars");
//getxAPIDatabase("experienced");
