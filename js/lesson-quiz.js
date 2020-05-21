//Register Lesson Quiz component
Vue.component( 'lesson-quiz', {
	props: {
		url: {
			type: String,
			required: true
		}
	},
	template: `<div class="lesson-quiz-container">

	<a class="quiz-link" v-bind:href="url" target="_blank">
		Open exercise in a new tab 
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
	</a>

	<div class="lesson-quiz">
		<iframe v-bind:src="url" name="lesson-quiz" loading="lazy" scrolling="no" allowfullscreen></iframe>
	</div>

</div>`});