/* 
  Important note from mistertfy64:
  Although the data was received from Garena's API, please note that I've added some other fields to make it feel more "complete".
*/

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

  </div>
  `;
	document
		.getElementById("submission-box__container")
		.appendChild(submissionBox);
}
