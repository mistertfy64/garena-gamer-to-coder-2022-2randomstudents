// Originally created by fireship: https://youtu.be/T33NN_pPeNI

const obs = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			//show
		} else {
			//remove show
		}
	});
});

const hidden = document.querySelectorAll(".hidden");
hidden.forEach((elem) => obs.observe(elem));
