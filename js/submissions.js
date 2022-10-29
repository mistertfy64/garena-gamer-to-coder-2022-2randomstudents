/* 
  Important note from mistertfy64:
  Although the data was received from Garena's API, please note that I've added some other fields to make it feel more "complete".
*/

let tagColors = {};
function initialize() {
	getAndRenderData();
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
			console.log(data);
			data = data;
			for (let submission of data) {
				createSubmissionBox(submission);
			}
		});
}

function createSubmissionBox(data) {
	let submissionBox = document.createElement("div");
	submissionBox.innerHTML = `
  <div class="submission-box">
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
      </div>

  </div>
  `;
	document
		.getElementById("submission-box__container")
		.appendChild(submissionBox);
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
