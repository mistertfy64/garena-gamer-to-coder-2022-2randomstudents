/* 
  Important note from mistertfy64:
  Although the data was received from Garena's API, please note that I've added some other fields (with random data) to make it feel more "complete".
*/

let target;
let data;
function initialize() {
	let parameters = new URL(document.location).searchParams;
	target = parameters.get("number");
	let data;
	getAndRenderData(target);
	if (window.innerWidth < 1100) {
		document.getElementById("header__content__text--1").innerText = "H";
		document.getElementById("header__content__text--2").innerText = "J";
		document.getElementById("header__content__text--3").innerText = "S";
		document.getElementById("header__content__text--4").innerText = "I";
	}
}

async function getAndRenderData(target) {
	fetch(`https://gamertocoder.garena.co.th/api/minigame/${target}`)
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			}
			// handle error
		})
		.then((data) => {
			createSubmissionBox(data);
			createSubmissionInformation(data);
		});
}

// TODO: Make all tags available w/o hovering over the +x
function createSubmissionBox(data) {
	let submissionBox = document.createElement("div");
	submissionBox.innerHTML = `
  <div class="submission-box">
    <h3>
    Submission #${JSON.stringify(data.no)}
    
    <h3/><h1>${JSON.stringify(
		data.name
	)}</h1><img class="icon fade-in-image-ctr" src=${JSON.stringify(data.icon)}>
      <div >
      <span class="submission-box__tags">${cleanString(
			JSON.stringify(data.genre.join(", "))
		)}</span> 
  <br>
      </div>

  </div>
  `;
	document
		.getElementById("submission-box__container")
		.appendChild(submissionBox);
}

function createSubmissionInformation(data) {
	let submissionInformation = document.createElement("div");
	submissionInformation.innerHTML = `
  <div class="submission-information">
  <h2>Description</h2><div class="submission-information__text" >${cleanString(
		JSON.stringify(data.description)
  )}
  </div><hr>
  <h2>Images</h2> 
  <div class="submission-information__images">
  ${createSlideshow(data).innerHTML}
  </div>
  </div>
  `;

	document
		.getElementById("submission-information__container")
		.appendChild(submissionInformation);
}

// TODO: It's not a slideshow yet, it's just a placeholder.
function createSlideshow(data) {
	let result = document.createElement("div");
	if (data.images) {
		result.innerHTML = "";

		for (let i = 0; i < data.images.length; i++) {
			result.innerHTML += `<img src=${data.images[i]} class="slideshow-image fade-in-image">`;
		}
	} else {
		result.innerHTML = "";
		result.innerHTML = "(None.)";
	}

	return result;
}
