///////////////////////////////////////////////////
//Register Question Step component
////////////////////////////////////////////////////
Vue.component('question-step', {
	template: `<div class="quiz-step" v-if="$root.currentStep == step">

	<h2 class="step-number" v-if="answerState == 'none' || answerState == 'wrong'">Step {{step}}</h2>

	<form class="question-step" v-if="answerState == 'none' || answerState == 'wrong'">

		<div class="step-instructions-text">

			<slot></slot>

			<div v-for="option in options">
				<label class="question-option">
					<input type="radio"
						v-model="selectedAnswer"
						name="question-answer"
						v-bind:value="option"> <span v-html="option"></span>
				</label>
			</div>

		</div>

		<div class="quiz-validation-area">

			<button @click.prevent="checkAnswer" class="quiz-button">Check Your Work</button>

			<button v-if="failedAttempts >= 4" @click.prevent="giveUp" class="quiz-button quiz-button-tertiary skip-button">Skip Step</button>

			<p v-if="answerState == 'wrong'" class="error-message" v-bind:class="{'has-error': hasError}">

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

				{{errorMessage}}
			</p>

			<div v-if="failedAttempts >= 4" class="skip-message">Would you like to skip this step? Remember you must answer 70% to earn your badge.</div>

		</div>

	</form>

	<div v-if="answerState == 'correct' && step != $parent.totalTabs" class="quiz-correct-step">

		<p class="success-message">
			
			<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg>

			Correct! Great job, {{$parent.user}}!
		</p>

		<button @click="nextStep" class="quiz-button">Move on to step {{$root.currentStep + 1}}</button>

	</div>
	
</div>`,

	data: () => ({
		answerState: 'none',
		errorClass: '',
		errorMessageList: [
			'That answer is incorrect. Give it another try.',
			'That\'s not it. Try again.',
			'That\'s not the the one. Try it again.',
			'That\'s not correct. Try again.',
			'Incorrect answer. How about another try?'
		],
		hasError: '',
		selectedAnswer: '',
		failedAttempts: 0
	}),

	props: {
		step: {},
		options: {
			type: Array
		},
		answer: {
			type: String
		},
	},
	
	computed: {

		// Create computed value to watch for step activation
		now: function () {
			return this.$root.currentStep;
		}

	},

	methods: {

		// Check user code against final answer
		checkAnswer() {

			if (this.selectedAnswer == this.answer) {

				this.answerState = 'correct';

				if ( this.step === this.$parent.totalTabs ) {
					this.nextStep()
				}

			} else {

				// Random error message from list
				this.errorMessage = this.errorMessageList[Math.floor(Math.random() * this.errorMessageList.length)];

				this.answerState = 'wrong';

				this.failedAttempts++;

				var self = this;
				self.hasError = 'has-error';
				setTimeout(function () { self.hasError = ''; }, 1000);

			}
		},

		// User clicks next step button
		nextStep() {
			this.$parent.$emit('next-step')
		},

		// User clicks give up button
		giveUp() {
			this.$parent.$emit('skip-step')
		}

	}

});