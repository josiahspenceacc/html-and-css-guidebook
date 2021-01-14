//Register Video Lesson component
Vue.component( 'video-demo', {
	props: {
		url: {
			type: String,
			required: true
		}
	},
	template: `<div class="video-demo">
	<iframe v-bind:src="url" style="border:0px #ffffff none;" loading="lazy" name="scrimba-demo" scrolling="no" allowfullscreen></iframe>
</div>`});