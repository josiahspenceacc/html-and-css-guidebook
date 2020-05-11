/////////////////////////////////////////////
//Root Instance
///////////////////////////////////////////////
new Vue({
	el: '#app',

	data: () => ({
		currentStep: 0,
		incorrect: 0
	}),

	methods: {

		// Move to next step of quiz
		nextStep() {
			this.currentStep++;
		},

		// Give up on a step
		skipStep() {
			this.incorrect++;
			this.currentStep++;
		}

	}

})