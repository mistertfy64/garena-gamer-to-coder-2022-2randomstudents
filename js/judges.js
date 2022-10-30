const JUDGE_INFORMATION = {};
const BIG_IMAGE_THRESHOLDS = {
	width: 1200,
	height: 700,
};

function initialize() {
	getAndRenderData();
}

async function getAndRenderData() {
	fetch("https://gamertocoder.garena.co.th/api/assets")
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			}
			// handle error
		})
		.then((data) => {
			for (let i = 0; i < data.characters.length; i++) {
				JUDGE_INFORMATION[i] = {
					name: data.characters[i]
						.replace(
							"https://cdngarenanow-a.akamaihd.net/webth/cdn/garena/gamertocoder/bmg-characters/",
							""
						)
						.replace(".png", ""),
					description: `Description for judge #${i}`,
					imageURI: data.characters[i],
					lore: JUDGE_LORE[
						data.characters[i]
							.replace(
								"https://cdngarenanow-a.akamaihd.net/webth/cdn/garena/gamertocoder/bmg-characters/",
								""
							)
							.replace(".png", "")
					],
				};
				createJudgeSelectBox(data.characters[i], i);
			}
		});
}

function createJudgeSelectBox(data, index) {
	let box = document.createElement("div");
	box.innerHTML = `<div class="judge-select-box">

    <img class="fade-in-image" onClick="setDisplayedJudge(${index})" src="${data}" width="50" height="50">

  </div>`;
	document.getElementById("judge-information--minor").appendChild(box);
}

function setDisplayedJudge(index) {
	document.getElementById("content__judge-information__name").innerText =
		JUDGE_INFORMATION[index].name;
	document.getElementById(
		"judge-image--main"

	).innerHTML = `<img class="fade-in-image-ctr" src=${JUDGE_INFORMATION[index].imageURI}>`;

	document.getElementById(
		"content__judge-information__description"
	).innerText = JUDGE_INFORMATION[index].lore;
	calibrateJudgeImage();
}
