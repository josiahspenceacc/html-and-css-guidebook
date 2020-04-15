// Setup Codemirror
Vue.use(VueCodeMirror);

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

/////////////////////////////////////////////////////
//Register Quiz component
/////////////////////////////////////////////////////
Vue.component('quiz', {
	template: `<div class="quiz">

	<form v-if="$root.currentStep === 0" @submit.prevent="startQuiz" id="start-quiz">
		<h2>Let's test your knowledge</h2>

		<label for="user-name">Enter your first name</label>
		<input type="text" name="userName" class="quiz-input" v-model="user" required>

		<button type="submit" class="quiz-button">Start the Lesson</button>

		<div class="instructions">

			<p>You must complete at least 70% of steps to pass.</p>

			<p>You may start over at any time.</p>

			<p>Works best in the Chrome browser.</p>

		</div>

	</form>

	<slot v-if="$root.currentStep != 0"></slot>

	<div v-if="$root.currentStep != 0 && $root.currentStep != finalTab" class="quiz-status-bar">

		<div class="quiz-step-tracker">
		
			<label for="progress-tracker">Step {{this.$root.currentStep}} of {{totalTabs}}</label>

			<progress id="progress-tracker" max="100" v-bind:value="percentDone">{{percentDone}}% Done</progress>

		</div>

		<div class="quiz-success-tracker">
			<div><strong>{{this.$root.incorrect}}</strong> Steps Skipped</div>
			<div v-bind:class="[percentScored < 70  ? 'failing-score' : '']">Projected score: <strong>{{percentScored}}%</strong></div>
		</div>

		<div v-if="percentScored < 70" class="failing-message">Your score is below 70% and you won't earn a badge. Consider starting over.</div>

		<button @click="startOver" class="quiz-button start-over-button" v-bind:class="[percentScored < 70  ? '' : 'quiz-button-secondary']">Start Over</button>

	</div>

	<div v-if="$root.currentStep != 0 && $root.currentStep === finalTab && percentScored >= 70" class="quiz-complete">
		<h2>All done!!</h2>
		<p>You've earned a badge with your mastery:</p>

		<svg version="1.1" id="svg-badge" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	y="0px" viewBox="0 0 521.8 499.6" style="enable-background:new 0 0 521.8 499.6;" xml:space="preserve">
			<g id="soft" v-if="badgeType === 'soft'">
				<g>
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" d="M448.2,186.1L448.2,186.1c0-25-13.3-48.1-35-60.6
					L295.9,57.7c-21.7-12.5-48.3-12.5-70,0l-117.3,67.8c-21.7,12.5-35,35.6-35,60.6v0" />
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" d="M73.5,303.1v18.5c0,25,13.3,48.1,35,60.6
					l117.3,67.7c21.7,12.5,48.3,12.5,70,0l117.3-67.7c21.7-12.5,35-35.6,35-60.6v-18.5" />
				</g>
				<g>
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" d="M469.7,186.1L469.7,186.1
					c0-32.7-17.4-62.9-45.8-79.2L306.6,39.1c-28.3-16.3-63.2-16.3-91.5,0L97.8,106.8C69.5,123.2,52,153.4,52,186.1v0" />
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" d="M52,303.1v18.5c0,32.7,17.4,62.9,45.8,79.2
					l117.3,67.8c28.3,16.3,63.2,16.3,91.5,0L424,400.8c28.3-16.3,45.8-46.6,45.8-79.2v-18.5" />
				</g>
			</g>
			<g id="circles" v-if="badgeType === 'circle'">
				<g>
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" d="M461.7,185.1c-25-87.4-105.4-151.3-200.8-151.3
					S85.1,97.7,60.1,185.1" />
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" d="M60.7,302.1c25.6,86.3,105.5,149.3,200.2,149.3
					s174.6-63,200.2-149.3" />
				</g>
				<g>
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" d="M486.1,185.1C460.5,84.5,369.4,10.1,260.9,10.1
					S61.2,84.5,35.6,185.1" />
					<path v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" d="M36.2,302.1C62.4,401.6,153.1,475,260.9,475
					s198.4-73.4,224.7-172.9" />
				</g>
			</g>
			<g id="hexagon"  v-if="badgeType === 'hex'">
				<g>
					<polyline v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" points="448.2,186.1 448.2,141.7 260.9,33.5 
					73.5,141.7 73.5,186.1 		" />
					<polyline v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:4;stroke-miterlimit:10;" points="73.5,303.1 73.5,358 260.9,466.1 
					448.2,358 448.2,303.1 		" />
				</g>
				<g>
					<polyline v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" points="469.7,186.1 469.7,129.2 260.9,8.7 
					52,129.2 52,186.1 		" />
					<polyline v-bind:stroke="'hsl('+badgehue+', 27.6%, 34%)'" style="fill:none;stroke-width:15;stroke-miterlimit:10;" points="52,303.1 52,370.4 260.9,491 
					469.7,370.4 469.7,303.1 		" />
				</g>
			</g>

			<g>
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="408.9" cy="156.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="334.9" cy="156.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="260.9" cy="156.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="186.9" cy="156.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="112.8" cy="156.6" r="3.5" />
			</g>
			<g>
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="408.9" cy="329.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="334.9" cy="329.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="260.9" cy="329.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="186.9" cy="329.6" r="3.5" />
				<circle v-bind:fill="'hsl('+badgehue+', 39.6%, 67%)'" cx="112.8" cy="329.6" r="3.5" />
			</g>
			<polygon v-bind:fill="'hsl('+badgeCompliment+', 57.9%, 52.5%)'" points="266.9,93.6 280.3,95.8 270.4,105.1 272.5,118.5 260.6,112 248.5,118.1 251,104.8 241.5,95.2 
			254.9,93.4 261.1,81.4 " />

			<text x="50%" y="73%" dominant-baseline="middle" text-anchor="middle"
			v-bind:fill="'hsl('+badgeCompliment+', 57.9%, 52.5%)'"	style=" font-family:'OpenSans', sans-serif; font-size:24px; letter-spacing:11; text-transform:uppercase;">{{user}}</text>
			<text  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
			v-bind:fill="'hsl('+badgeCompliment+', 57.9%, 52.5%)'"	style=" font-family:'OpenSans-Bold', sans-serif; font-weight:700; font-size:52px; letter-spacing:1; text-transform:uppercase;">{{subject}}</text>

			<line v-bind:stroke="'hsl('+badgeCompliment+', 57.9%, 52.5%)'" style="fill:none;stroke-width:8;stroke-miterlimit:10;" x1="0" y1="186.1" x2="521.8"
				y2="186.1" />
			<line v-bind:stroke="'hsl('+badgeCompliment+', 57.9%, 52.5%)'" style="fill:none;stroke-width:8;stroke-miterlimit:10;" x1="0" y1="302.6" x2="521.8"
				y2="302.6" />
		</svg>


		 <a href="#" @click="downloadSVG" class="badge-download-button">Download the badge to keep</a>

	</div>

	<div v-if="$root.currentStep != 0 && $root.currentStep === finalTab && percentScored < 70" class="quiz-complete">

		<h2>Want to try again?</h2>

		<p>You completed {{percentScored}} steps, which is less that the 70% needed to earn your badge.</p>

		<button @click="startOver" class="quiz-button quiz-button-secondary start-over-button">Start Over</button>

	</div>
	
</div>`,

	data: () => ({
		totalTabs: 0,
		finalTab: 0,
		tabs: [],
		user: null,
		badgeCompliment: 0,
		badgeType: ''
	}),

	props: {
		badgehue: {
			type: Number,
			default: '204'
		},
		subject: {
			type: String,
			default: ''
		}
	},

	created() {
		// Get quiz children
		this.tabs = this.$children;

		// Set colors
		this.badgeCompliment = this.badgehue + 180;
		
		// Set Badge Type
		// If divisible by 3 and 5
		if(this.badgehue % 3 === 0 && this.badgehue % 5 === 0){
			this.badgeType = 'hex';
		}
		//detect values divisible by 3
		else if(this.badgehue % 3 === 0){
			this.badgeType = 'circle';
		}
		//detect values divisible by 5
		else if(this.badgehue % 5 === 0){
			this.badgeType = 'hex';
		}
		//all others
		else {
			this.badgeType = 'soft';
		}
	},

	updated() {
		// Count quiz children
		this.totalTabs = this.tabs.length;

		// Badge screen count
		this.finalTab = this.tabs.length + 1;
	},

	computed: {

		// What percentage is complete?
		percentDone: function () {
			return (this.$root.currentStep / this.totalTabs) * 100;
		},

		// Percentage scored, rounded to two decimal places
		percentScored: function () {
			var score = ((this.totalTabs - this.$root.incorrect) / this.totalTabs) * 100;
			return Math.round(( score + Number.EPSILON) * 100) / 100;
		}

	},

	methods: {

		startQuiz() {
			this.$emit('next-step');
		},

		// Download Custom SVG
		downloadSVG(evt) {

			const svgContent = document.getElementById("svg-badge").outerHTML,
				blob = new Blob([svgContent], {
					type: "image/svg+xml"
				}),
				url = window.URL.createObjectURL(blob),
				link = evt.target;

			link.target = "_blank";
			link.download = this.user + ' ' + this.subject + "-badge.svg";
			link.href = url;


		},
		
		startOver() {
			location.reload();
		}

	}

});

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