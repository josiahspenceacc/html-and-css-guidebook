
//Register Code Block component
Vue.component( 'code-block', {

	data: () => ({
		mode: 'htmlmixed'
	}),

	props: {
		lang: {
			type: String,
			default: 'htmlmixed'
		},
		code: {
			type: String,
			required: true
		}
	},

	created() {

		// Set user code data based on mode
		if (this.lang === 'css') {
			this.mode = 'css';
		}

	},

	computed: {
		options: function() {
			return {
				mode: this.mode,
				tabSize: 4,
				lineWrapping: true,
				viewportMargin: Infinity,
				indentWithTabs: true,
				readOnly: true,
				scrollbarStyle: "null"
			}
		}
	},

	template: `<div class="code-block" :class="mode">
	<codemirror
	:options="options"
		:value="code"></codemirror>
</div>`
});