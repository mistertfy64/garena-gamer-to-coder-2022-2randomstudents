const SPLASH_SCREEN_MESSAGES = [
	"The BlockWorld is now looking for creators.",
	"Creators who are willing to create their own realms.",
	"Realms that seclude itself from others.",
	"They are looking for one perfect realm.",
	"A realm comparable to paradise.",
	"The new realm would be the new paradise.",
	"Maybe you want to join in on the competition?",
];

const SPLASH_SCREEN_CORRUPTED_CHARACTERS = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"+",
	"-",
	";",
	"/",
	"{",
	"}",
	"[",
	"]",
];

let splashScreenSkipped = false;
let splashScreenCurrentlyDisappearing = false;

// This is used when the website was VISITED
function initialize() {
	// start the animation or something
	startOpeningAnimation();
}

// animation open
async function startOpeningAnimation() {
	// add a click listener in case user doesn't want to see it
	document.getElementById("content__main").style.display = "none";
	document.body.style.overflowY = "hidden";
	document
		.getElementById("content__splash-screen__wrapper")
		.addEventListener("click", skipOpeningAnimation);
	await wait(1000);
	for (let i = 0; i < SPLASH_SCREEN_MESSAGES.length; i++) {
		if (splashScreenSkipped) {
			break;
		}
		let currentText = SPLASH_SCREEN_MESSAGES[i];
		let remainingLetters = SPLASH_SCREEN_MESSAGES[i].length + 1;
		let lettersToRestore = [...Array(currentText.split("").length).keys()];

		currentText = initializeText(currentText);

		// pick one non-letter and replace it with its respective letter

		while (remainingLetters > 0) {
			document.getElementById("text__main-story").innerText = currentText;
			let roll = Math.floor(Math.random() * lettersToRestore.length);
			currentText = restoreCharacter(
				currentText,
				lettersToRestore[roll],
				SPLASH_SCREEN_MESSAGES[i]
			);
			lettersToRestore.splice(roll, 1);
			remainingLetters--;
			await wait(25);
		}
		await wait(2500);
	}
	await wait(1500);
	finishOpeningAnimation();
}

function initializeText(currentText) {
	let newText = "";
	for (let i = 0; i < currentText.length; i++) {
		newText +=
			SPLASH_SCREEN_CORRUPTED_CHARACTERS[
				Math.floor(
					Math.random() * SPLASH_SCREEN_CORRUPTED_CHARACTERS.length
				)
			];
	}
	return newText;
}

function restoreCharacter(currentText, index, restoredText) {
	currentText = currentText.split("");
	index = parseInt(index);
	currentText[index] = restoredText[index];
	currentText = currentText.join("");
	return currentText;
}

function skipOpeningAnimation() {
	splashScreenSkipped = true;
	finishOpeningAnimation();
}

// remove animation so it doesn't break stuff
async function finishOpeningAnimation() {
	if (!splashScreenCurrentlyDisappearing) {
		splashScreenCurrentlyDisappearing = true;
		var splash = document.getElementById("content__splash-screen__wrapper");
		document.getElementById("content__main").style.display = "block";
		//check if the browser supports the animation
		if (splash.style.opacity != undefined) {
			for (let i = 100; i >= 0; i--) {
				splash.style.opacity = i / 100;
				// hide the splash screen
				if (i == 0) splash.style.display = "none";
				await wait(10);
			}
		}
		// skip
		else {
			splash.style.display = "none";
		}
		splashScreenSkipped = true;
		// TODO: fix?
		document.body.style.overflowY = "scroll";
	}
}
