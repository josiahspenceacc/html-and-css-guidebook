///////////////////////////////////////////////////
//Register Quiz Step component
////////////////////////////////////////////////////
Vue.component('quiz-step', {
	template: `<div class="quiz-step" v-if="$root.currentStep == step">

	<h2 class="step-number" v-if="answerState == 'none' || answerState == 'wrong'">Step {{step}}</h2>

	<div class="step-instructions" v-if="answerState == 'none' || answerState == 'wrong'">

		<div class="step-instructions-text">

			<slot></slot>

		</div>

		<div v-if="image">

			<img v-bind:src="image" alt="example image">

		</div>

	</div>

	<form v-if="answerState == 'none' || answerState == 'wrong'">

		<div class="quiz-work-area">

			<div class="quiz-live-code-area">

				<div v-if="mode != 'css'" class="code-single">

					<div><h4 class="work-area-label">HTML</h4></div>

					<button @click.prevent="resetStarter" class="reset-button">Reset Code</button>

					<codemirror v-model="userCode"		
					:options="{
						mode: 'htmlmixed',
						lineWrapping: true,
						lineNumbers: true,
						htmlMode: true,
						indentUnit: 4,
						indentWithTabs: true
					}"></codemirror>

				</div>

				<div v-if="mode === 'css'" class="code-tabs">

					<ul class="tab-select">
						<li><a href="#" @click.prevent="selectedTab ='css'" v-bind:class="[selectedTab === 'css'  ? 'active-tab' : '']">CSS</a></li>
						<li><a href="#" @click.prevent="selectedTab ='html'" v-bind:class="[selectedTab === 'html'  ? 'active-tab' : '']">HTML <span class="not-editable-label">(not editable)</span></a></li>
					</ul>

					<button @click.prevent="resetStarter" class="reset-button">Reset Code</button>

					<codemirror v-show="selectedTab === 'css'" v-model="userCode"
						:options="{
							mode: 'css',
							lineWrapping: true,
							lineNumbers: true,
							htmlMode: true,
							indentUnit: 4,
							indentWithTabs: true
						}"></codemirror>

					<codemirror v-show="selectedTab === 'html'" v-model="starter"
						:options="{
							mode: 'htmlmixed',
							readOnly: true,
							lineWrapping: true,
							htmlMode: true,
							indentUnit: 4,
							indentWithTabs: true
						}"></codemirror>

				</div>

			</div>

			<div class="quiz-rendering-area">

				<div><h4 class="work-area-label">What Users See</h4></div>

				<iframe v-if="mode != 'css'" v-bind:srcdoc="userCode" class="quiz-rendering"></iframe>

				<iframe v-if="mode === 'css'" v-bind:srcdoc="'<style>'+userCode+'</style>'+starter" class="quiz-rendering"></iframe>

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
		finalAnswer: '',
		output: '',
		userCode: '',
		selectedTab: 'css',
		answerState: 'none',
		errorClass: '',
		errorMessageList: [
			'Something is incorrect. Give it another try.',
			'That\'s not it. Try again.',
			'Something doesn\'t look right. Try it again.',
			'That\'s not correct. Try again.',
			'Something\'s wrong. How about another try?'
		],
		hasError: '',
		failedAttempts: 0
	}),

	props: {
		step: {},
		starter: {
			type: String
		},
		cssstarter: {
			type: String,
			default: ''
		},
		answer: {
			type: String
		},
		image: {
			type: String
		},
		mode: {
			type: String,
			default: 'html'
		}
	},

	created() {

		// Set user code data based on mode
		if (this.mode === 'css') {
			this.userCode = this.cssstarter;
		} else {
			this.userCode = this.starter;
		}

		// Remove spaces from final answer for comparison
		this.finalAnswer = this.answer.replace(/\s/g, '');

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
			this.output = this.userCode.replace(/\s/g, '');

			if (this.output == this.finalAnswer) {

				this.answerState = 'correct';
				this.userCode = '';

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
		
		// User Clicks Reset Button
		resetStarter() {
			// Set user code data based on mode
			if (this.mode === 'css') {
				this.userCode = this.cssstarter;
			} else {
				this.userCode = this.starter;
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