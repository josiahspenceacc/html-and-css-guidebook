// Setup Codemirror
Vue.use(VueCodeMirror);

import './click-outside.js';
import './page-header.js';
import './video-lesson.js';
import './lesson-quiz.js';
import './code-block.js';
import './pen-demo.js';
import './table-of-contents.js';
import './page-footer.js';


//Root Instance
new Vue({
	el: '#app',
	data: {},
})