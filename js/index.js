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
// TODO: Sometimes it wont resize
function initialize() {
	document.body.style.overflowY = "hidden";
	let parameters = new URL(document.location).searchParams;
	let ignoreOpeningAnimation = parameters.get("ignoreOpeningAnimation");
	// start the animation or something
	if (!ignoreOpeningAnimation) {
		startOpeningAnimation();
	} else {
		document.body.style.overflowY = "scroll";
		finishOpeningAnimation();
	}
	calibrateScreen();
	if (window.innerWidth < 1100) {
		document.getElementById("header__content__text--1").innerText = "H";
		document.getElementById("header__content__text--2").innerText = "J";
		document.getElementById("header__content__text--3").innerText = "S";
		document.getElementById("header__content__text--4").innerText = "I";
	}
}

// animation open
async function startOpeningAnimation() {
	// add a click listener in case user doesn't want to see it
	document.getElementById("content__splash-screen__wrapper").style.display =
		"flex";
	document.getElementById("content__main").style.display = "none";
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
	calibrateScreen();
	finishOpeningAnimation();
}

// remove animation so it doesn't break stuff
async function finishOpeningAnimation() {
	document.getElementById("content__main").style.display = "block";
	let parameters = new URL(document.location).searchParams;
	let ignoreOpeningAnimation = parameters.get("ignoreOpeningAnimation");

	if (!ignoreOpeningAnimation) {
		document.getElementById(
			"content__call-to-action-zone__banner-wrapper"
		).style.height = `500px`;
	}
	calibrateScreen();
	if (!splashScreenCurrentlyDisappearing) {
		splashScreenCurrentlyDisappearing = true;
		var splash = document.getElementById("content__splash-screen__wrapper");

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
		document.body.style.overflowY = "scroll";

		calibrateScreen();
	}
}

// wait, why is this here?
window.onresize = function () {
	calibrateScreen();
};

function calibrateScreen() {
	let size = (window.outerWidth / window.innerWidth) * 100;
	document.getElementById(
		"content__call-to-action-zone__banner"
	).style.height = `${Math.max(100, size)}%`;
	document.getElementById(
		"content__call-to-action-zone__banner-wrapper"
	).style.height = `${
		document.getElementById("content__call-to-action-zone__banner")
			.clientHeight
	}px`;
	document.getElementById(
		"content__call-to-action-zone__wrapper"
	).style.height = `${
		document.getElementById("content__call-to-action-zone__banner")
			.clientHeight
	}px`;
}
