headerIsVisible = true;
buttonVisibility = false;
// document.getElementById("header__content").style.display = "none";

window.onresize = function () {
	//chek if the device is a mobile device 
	if (window.innerWidth < 1100) {
		hideHeader();
		headerIsVisible = false;
		buttonVisibility = true;
		document.getElementById("header__ribbon__container").style.display = "flex";
	}else {
		showHeader();
		headerIsVisible = true;
		buttonVisibility = false;
		document.getElementById("header__ribbon__container").style.display = "none";
	}
};


function toggleHeaderVisibility() {
	if (headerIsVisible) {
		hideHeader();
	} else {
		showHeader();
	}
	headerIsVisible = !headerIsVisible;
}

async function hideHeader() {
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-in");
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-out");
	void document.getElementById("header").offsetWidth;
	document
		.getElementById("header")
		.classList.add("header-animation-slide-out");
	await wait(250);
	document.getElementById("header__content").style.display = "none";
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-out");
}

async function showHeader() {
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-out");
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-in");
	void document.getElementById("header").offsetWidth;
	document
		.getElementById("header")
		.classList.add("header-animation-slide-in");

	document.getElementById("header__content").style.display = "block";
	await wait(250);
	document
		.getElementById("header")
		.classList.remove("header-animation-slide-in");
}

function cleanString(string) {
	return string.replace(/^"(.+(?="$))"$/, "$1");
}

// IMPORTANT: USE THIS WITH AWAIT!!!!
function wait(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
