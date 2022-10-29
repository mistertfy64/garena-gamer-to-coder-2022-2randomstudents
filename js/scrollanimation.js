// Originally created by fireship: https://youtu.be/T33NN_pPeNI

const obs = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		let aostype = entry.target.className.split("--");
		aostype = aostype[aostype.length - 1];
		console.log(aostype);

		console.log(entry);
		if (entry.isIntersecting) {
			//show
			entry.target.classList.add('show--' + aostype);
			console.log('show: ' + entry.target.className);

		} else {
			//remove show
			entry.target.classList.remove('show--' + aostype);
			console.log('hide: ' + entry.target.className);
		}
	});
});


const aostypes = ["fade", "slide-left"]
aostypes.forEach((aos) => {
	console.log(aos);
	const hidden = document.querySelectorAll(".hidden--" + aos);
	hidden.forEach((elem) => obs.observe(elem));
});
