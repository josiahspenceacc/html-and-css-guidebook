///////////////////////////////////////////////////
//Register Pen Demo component
////////////////////////////////////////////////////
Vue.component('pen-demo', {
	template: `<div class="pen-demo">

		<div class="pen-live-code-area">

			<div class="pen-code-tabs">

				<ul class="pen-tab-select">
					<li><a href="#" @click.prevent="selectedTab ='html'" v-bind:class="[selectedTab === 'html'  ? 'active-tab' : '']">HTML</a></li>
					<li><a href="#" @click.prevent="selectedTab ='css'" v-bind:class="[selectedTab === 'css'  ? 'active-tab' : '']">CSS</a></li>
				</ul>

				<button @click.prevent="resetStarter" class="pen-reset-button">Reset Code</button>

				<codemirror v-show="selectedTab === 'html'" v-model="userhtml"
					:options="{
						mode: 'htmlmixed',
						lineWrapping: true,
						htmlMode: true,
						indentUnit: 4,
						indentWithTabs: true
					}"></codemirror>

				<codemirror v-show="selectedTab === 'css'" v-model="usercss"
					:options="{
						mode: 'css',
						lineWrapping: true,
						htmlMode: true,
						indentUnit: 4,
						indentWithTabs: true
					}"></codemirror>

			</div>

		</div>

		<div class="pen-rendering-area">

			<div><h4 class="pen-work-area-label">What Users See</h4></div>

			<iframe v-bind:srcdoc="'<style>'+usercss+'</style>'+userhtml" class="pen-rendering"></iframe>

		</div>
	
</div>`,

	data: () => ({
		output: '',
		userhtml: '',
		usercss: ''
	}),

	props: {
		htmlCode: {
			type: String
		},
		cssCode: {
			type: String,
			default: ''
		},
		selectedTab: {
			type: String,
			default: 'html'
		}
	},

	created() {

		// Set user code data
		this.usercss = this.cssCode;
		this.userhtml = this.htmlCode;

	},

	methods: {

		// User Clicks Reset Button
		resetStarter() {
			this.usercss = this.cssCode;
			this.userhtml = this.htmlCode;
		}

	}

});