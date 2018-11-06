$(document).ready(function() {

	//variables
	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;
	var questionArray = [
		{ 	
        //the questions    
			question: "Who is 'The Boy Who Lived'?",
			answers: [
				{text: "Harry Potter", isCorrect: true},
				{text: "Ron Weasley", isCorrect: false},
				{text: "Albus Dumbledore", isCorrect: false},
				{text: "Draco Malfoy", isCorrect: false}
			]
		},
		{	
			question: "What is the name of the alley filled with witches and wizards and (if you can't apparate or haven't got any floo powder handy) can only be entered through the Leaky Cauldron?",
			answers: [
				{text: "Hogwarts", isCorrect: false},
				{text: "Diagon Ally", isCorrect: true},
				{text: "Azkaban", isCorrect: false},
			]
		},
		{
			question: "Who is 'The Darkest Wizard of His Age'?",
			answers: [
				{text: "James Potter", isCorrect: false},
				{text: "Lord Voldemort", isCorrect: true},
				{text: "Draco Malfoy", isCorrect: false}
			]
		},
		{ 
			question: "What is the name of the school that all witches and wizards attended?",
			answers: [
				{text: "Gryffindor", isCorrect: false},
				{text: "Diagon Ally", isCorrect: false},
				{text: "Oxford", isCorrect: false},
				{text: "Hogwarts", isCorrect: true}
			]
		},
		{
			question: "What is the name of the sport that all wizards love??",
			answers: [
				{text: "Quidditch", isCorrect: true},
				{text: "Tennis", isCorrect: false},
				{text: "Badminton", isCorrect: false},
				{text: "Croquet", isCorrect: false}
			]
		},
		{
			question: "In which of the following houses was Harry Potter assigned to by the sorting hat?",
			answers: [
				{text: "Hufflepuff", isCorrect: false},
				{text: "Slytherin", isCorrect: false},
				{text: "Gryffindor", isCorrect: true},
				{text: "Ravenclaw", isCorrect: false}
			]
		},
		{ 
			question: "What is the name of the platform the Hogwarts Express leaves from? (numerical)",
			answers: [
				{text: "9 1/4", isCorrect: false},
				{text: "9 3/4", isCorrect: true},
				{text: "4 1/3", isCorrect: false},
				{text: "3 1/4", isCorrect: false}
			]	
		},
		{
			question: "Who was the half-blood prince? (Last name only)?",
			answers: [
				{text: "Snape", isCorrect: true},
				{text: "Malfoy", isCorrect: false},
				{text: "Voldemort", isCorrect: false}
			]
		},
		{
			question: "What is the name of the Birthday present Hagrid gave to Harry in the 1st book? Hint* Owl",
			answers: [
				{text: "Peeves", isCorrect: false},
				{text: "Nagini", isCorrect: false},
				{text: "Hedwig", isCorrect: true},
				{text: "Percy", isCorrect: false}
			]
		},
		{
			question: "Who delivers baby Harry to Dumbledore in Privet Drive at the start of the movie?",
			answers: [
			 {text: "Severus Snape", isCorrect: false},
			 {text: "Minerva McGonagall", isCorrect: false},
			 {text: "Dumbledore", isCorrect: false},
			 {text: "Hagrid", isCorrect: true}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}
	//when user answers a question correct - it generates a picture//
	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/correct.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	//when user answers a question wrong - it generates a picture//
	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/rubbish.jpeg'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	//when the user doesn't answer the question in the amount of time allowed//
	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/rubbish.jpeg'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	//when the time runs out after 20 seconds, it clears the clock and it displays the losing image//
	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}
	
	//the users stats at the end of the game - button to restart game//
	function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Here's how you did!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
	}

	//resetting the game//
	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and directions screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>How much do you know about Harry Potter?</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Best of luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-primary btn-lg btn-block text-center' type='button'>Start Game</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

	initialScreen();

});  

