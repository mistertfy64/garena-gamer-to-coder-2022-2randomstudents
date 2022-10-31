/* 
  Important note from mistertfy64:
  Although the data was received from Garena's API, please note that I've added some other fields to make it feel more "complete".
*/

let tagColors = {};
function initialize() {
	getAndRenderData();
	if (window.innerWidth < 1100) {
		document.getElementById("header__content__text--1").innerText = "H";
		document.getElementById("header__content__text--2").innerText = "J";
		document.getElementById("header__content__text--3").innerText = "S";
		document.getElementById("header__content__text--4").innerText = "I";
	}
}

async function getAndRenderData() {
	let data;
	fetch("https://gamertocoder.garena.co.th/api/minigames")
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			}
			// handle error
		})
		.then((data) => {
			//console.log(data);
			data = data;
			document.getElementById("loading-text").remove();
			for (let submission of data) {
				createSubmissionBox(submission);
			}
		});
}

// TODO: Make all tags available w/o hovering over the +x
function createSubmissionBox(data) {
	let submissionBox = document.createElement("div");
	submissionBox.innerHTML = `
  <div class="submission-box hidden--fade">
  <div>
    <h3>
    Submission #${JSON.stringify(data.no)}
    
    <h3/><h1>${JSON.stringify(
		data.name
	)}</h1><img class="icon" src=${JSON.stringify(data.icon)}>
      <div >
      <span class="submission-box__tags" style="background-color:${getTagColor(
			JSON.stringify(data.genre[0])
		)}">${cleanString(
		JSON.stringify(data.genre[0])
	)}</span> <span title="Tags: ${data.genre.join(", ")}">${
		data.genre.length > 1 ? `+${data.genre.length - 1}` : ""
	}</span>
  <br>
  ${
		cleanString(JSON.stringify(data.description.slice(0, 199))) +
		(data.description.length >= 200 ? "..." : "")
  }
      </div></div><div><br>
      <a style="color:#ffffff" href="./submission.html?number=${
			data.no
		}">More Information</a></div>

  </div>
  `;

	document
		.getElementById("submission-box__container")
		.appendChild(submissionBox);
	fetchaos();
}

function getTagColor(tagName) {
	if (Object.keys(tagColors).indexOf(tagName) > -1) {
		return tagColors[tagName];
	}

	// FIXME: WHAT IS THIS
	let color = `#${Math.floor(Math.random() * 10)}${Math.floor(
		Math.random() * 10
	)}${Math.floor(Math.random() * 10)}${Math.floor(
		Math.random() * 10
	)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

	tagColors[tagName] = color;
	return color;
}
