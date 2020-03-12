// Click outside handler
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and its children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

//Register Header component
Vue.component( 'page-header', {
	template: `<header class="site-header">
		
	<a href="../index.html" class="logo">

		<svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 416.67">
			<defs><style>.cls-1{fill:#ffa07a;}</style></defs>
			<title>HTML and CSS Guidebook Icon</title>
			<path class="cls-1" d="M58.68,41.67C26.27,41.67,0,63,0,89.29S26.27,136.9,58.68,136.9H427.25V41.67Z" transform="translate(0 -41.67)"/>
			<path class="cls-1" d="M58.68,148.81C26.27,148.81,0,170.13,0,196.43s26.27,47.62,58.68,47.62H357.14V148.81Z" transform="translate(0 -41.67)"/>
			<path class="cls-1" d="M58.68,256C26.27,256,0,277.27,0,303.57s26.27,47.62,58.68,47.62H428.57V256Z" transform="translate(0 -41.67)"/>
			<path class="cls-1" d="M58.68,363.1C26.27,363.1,0,384.42,0,410.71s26.27,47.62,58.68,47.62H500V363.1Z" transform="translate(0 -41.67)"/>
		</svg>

		<span>HTML &amp; CSS Guidebook</span>
	</a>
		
</header>`});

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


//Register Code Block component
Vue.component( 'code-block', {
	props: {
		lang: {
			type: String,
			required: true
		},
		code: {
			type: String,
			required: true
		}
	},
	template: `<pre v-bind:class="'language-' + lang"><code>{{ code }}</code></pre>`
});

//Register Book Nav component
Vue.component( 'table-of-contents', {
	template: `<nav class="table-of-contents">

		<slot></slot>

		<h2>Table of Contents</h2>

		<section>

			<h3 id="intro">Introductions</h3>

			<ul>
				<li><h5><a href="/what-is-a-website.html">Introduction: What is a Website?</a></h5>
						<div class="meta-text">How does the internet work? How are websites built?</div>

						<ul>
							<li><a href="/what-is-a-website.html#network">A Network of Computers</a></li>
							<li><a href="/what-is-a-website.html#finding">Finding Websites</a></li>
							<li><a href="/what-is-a-website.html#building">How Pages are Built</a></li>
							<li><a href="/what-is-a-website.html#file-types">Code Languages and File Types</a></li>
						</ul>

					</li>
			</ul>

		</section>

		<section>

			<h3 id="html">HTML: Content and Structure</h3>

			<ul>

				<li><h5><a href="/html/html-intro.html">HTML Introduction</a></h5>
					<div class="meta-text">What is HTML? What are the rules of the language?</div>

					<ul>
						<li><a href="/html/html-intro.html#content">A Language for Content</a></li>
						<li><a href="/html/html-intro.html#elements">Elements</a></li>
						<li><a href="/html/html-intro.html#semantics">Semantics</a></li>
						<li><a href="/html/html-intro.html#attributes">Attributes</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/file-structure.html">File Structure</a></h5>
					<div class="meta-text">How to structure the folders and files of a website project.</div>

					<ul>
						<li><a href="/html/file-structure.html#project-folder">Project Folder</a></li>
						<li><a href="/html/file-structure.html#home-page">Home Page</a></li>
						<li><a href="/html/file-structure.html#subfolders">Subfolders</a></li>
						<li><a href="/html/file-structure.html#parent-folders">Parent Folders</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/skeleton-code.html">Skeleton Code</a></h5>
					<div class="meta-text">The code that should be included in every HTML document.</div>

					<ul>
						<li><a href="/html/skeleton-code.html#doctype">Doctype</a></li>
						<li><a href="/html/skeleton-code.html#html">HTML</a></li>
						<li><a href="/html/skeleton-code.html#head">Head</a></li>
						<li><a href="/html/skeleton-code.html#meta">Meta</a></li>
						<li><a href="/html/skeleton-code.html#title">Title</a></li>
						<li><a href="/html/skeleton-code.html#body">Body</a></li>
						<li><a href="/html/skeleton-code.html#video">Video Lesson</a></li>
						<li><a href="/html/skeleton-code.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/basic-text.html">Basic Text Elements</a></h5>
					<div class="meta-text">The most common elements for structuring text content.</div>

					<ul>
						<li><a href="/html/basic-text.html#headings">Headings</a></li>
						<li><a href="/html/basic-text.html#paragraphs">Paragraphs &amp; Small</a></li>
						<li><a href="/html/basic-text.html#strong-em">Strong &amp; Emphaisis</a></li>
						<li><a href="/html/basic-text.html#lists">Lists</a></li>
						<li><a href="/html/basic-text.html#breaking">Breaking Tags (hr and br)</a></li>
						<li><a href="/html/basic-text.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/links.html">Links</a></h5>
					<div class="meta-text">The most fundamental type of interactivity in HTML is the clickable link.</div>

					<ul>
						<li><a href="/html/links.html#absolute">Absolute Links</a></li>
						<li><a href="/html/links.html#relative">Relative Links</a></li>
						<li><a href="/html/links.html#anchor">Anchor Links</a></li>
						<li><a href="/html/links.html#email">Email Links</a></li>
						<li><a href="/html/links.html#optional-attributes">Optional Attributes</a></li>
						<li><a href="/html/links.html#tools">Tools</a></li>
						<li><a href="/html/links.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/ids-classes.html">IDs &amp; Classes</a></h5>
					<div class="meta-text">Attributes for giving names to elements.</div>

					<ul>
						<li><a href="/html/ids-classes.html#ids">IDs</a></li>
						<li><a href="/html/ids-classes.html#classes">Classes</a></li>
						<li><a href="/html/ids-classes.html#multiples">Use of Multiples</a></li>
						<li><a href="/html/ids-classes.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/html5-semantic.html">HTML5 Semantic Elements</a></h5>
					<div class="meta-text">A set of elements aimed at adding meaning to the parts of a web page.</div>
					
					<ul>
						<li><a href="/html/html5-semantic.html#header">Header</a></li>
						<li><a href="/html/html5-semantic.html#footer">Footer</a></li>
						<li><a href="/html/html5-semantic.html#main">Main</a></li>
						<li><a href="/html/html5-semantic.html#article">Article</a></li>
						<li><a href="/html/html5-semantic.html#section">Section</a></li>
						<li><a href="/html/html5-semantic.html#aside">Aside</a></li>
						<li><a href="/html/html5-semantic.html#nav">Nav</a></li>
						<li><a href="/html/html5-semantic.html#figure">Figure &amp; Figcaption</a></li>
						<li><a href="/html/html5-semantic.html#video">Video Lesson</a></li>
						<li><a href="/html/html5-semantic.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/div-span.html">Divs &amp; Spans</a></h5>
					<div class="meta-text">Meaningless elements.</div>
				</li>

				<li><h5><a href="/html/images.html">Images</a></h5>
					<div class="meta-text">Image formats, the HTML image element, and inline SVG.</div>

					<ul>
						<li><a href="/html/images.html#formats">Common Formats</a></li>
						<li><a href="/html/images.html#element">Image Element</a></li>
						<li><a href="/html/images.html#svg">Inline SVG</a></li>
						<li><a href="/html/images.html#video">Video Lesson</a></li>
						<li><a href="/html/images.html#resources">Resource Links</a></li>
						<li><a href="/html/images.html#tools">Tools</a></li>
						<li><a href="/html/images.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/forms.html">Forms</a></h5>
					<div class="meta-text">Whenever input or data is needed from a user, forms and fields are the tools to use.</div>

					<ul>
						<li><a href="/html/forms.html#form">The Form Element</a></li>
						<li><a href="/html/forms.html#input">Input</a></li>
						<li><a href="/html/forms.html#textarea">Textarea</a></li>
						<li><a href="/html/forms.html#select">Select &amp; Option</a></li>
						<li><a href="/html/forms.html#label">Label</a></li>
						<li><a href="/html/forms.html#submit">Submit Buttons</a></li>
						<li><a href="/html/forms.html#attributes">Additional Attributes</a></li>
						<li><a href="/html/forms.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/html/interactive.html">Interactive Elements: Details &amp; Dialog</a></h5>
					<div class="meta-text">Elements with built-in interactive open-and-close behaviors.</div>
				
					<ul>
						<li><a href="/html/interactive.html#details">Details &amp; Summary</a></li>
						<li><a href="/html/interactive.html#dialog">Dialog</a></li>
						<li><a href="/html/interactive.html#video">Video Lesson</a></li>
						<li><a href="/html/interactive.html#resources">Resource Links</a></li>
					</ul>

				</li>

			</ul>

		</section>

		<section>

			<h3 id="css">CSS: Style and Layout</h3>

			<ul>

				<li><h5><a href="/css/css-intro.html">CSS Introduction</a></h5>
					<div class="meta-text">What is the purpose of CSS? How does it work to style HTML?</div>

					<ul>
						<li><a href="/css/css-intro.html#external">External CSS</a></li>
						<li><a href="/css/css-intro.html#syntax">Syntax</a></li>
						<li><a href="/css/css-intro.html#cascade">The Cascade</a></li>
						<li><a href="/css/css-intro.html#default">Default Styles</a></li>
						<li><a href="/css/css-intro.html#comments">Comments</a></li>
						<li><a href="/css/css-intro.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/selectors.html">Selectors</a></h5>
					<div class="meta-text">A chart showing different ways CSS can select HTML elements.</div>
				</li>

				<li><h5><a href="/css/size-units.html">Sizing Units for CSS</a></h5>

					<ul>
						<li><a href="/css/size-units.html#pixel">Pixel</a></li>
						<li><a href="/css/size-units.html#rem">Rems</a></li>
						<li><a href="/css/size-units.html#em">Ems</a></li>
						<li><a href="/css/size-units.html#percent">Percentage</a></li>
						<li><a href="/css/size-units.html#viewport">Viewport Units</a></li>
						<li><a href="/css/size-units.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/colors.html">Colors</a></h5>
					<div class="meta-text">These are several of the ways to specify a color in CSS.</div>

					<ul>
						<li><a href="/css/colors.html#hex">Hexadecimal</a></li>
						<li><a href="/css/colors.html#rgb">RGB / RGBa</a></li>
						<li><a href="/css/colors.html#named">Named Colors</a></li>
						<li><a href="/css/colors.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/type-css.html">Typographic Properties</a></h5>
					<div class="meta-text">CSS provides a wide variety of ways to customize and control the presentation of text.</div>
					
					<ul>
						<li><a href="/css/type-css.html#family">Font-Family</a></li>
						<li><a href="/css/type-css.html#size">Font-Size</a></li>
						<li><a href="/css/type-css.html#weight">Font-Weight</a></li>
						<li><a href="/css/type-css.html#style">Font-Style</a></li>
						<li><a href="/css/type-css.html#color">Color</a></li>
						<li><a href="/css/type-css.html#height">Line-Height</a></li>
						<li><a href="/css/type-css.html#transform">Text-Transform</a></li>
						<li><a href="/css/type-css.html#decoration">Text-Decoration</a></li>
						<li><a href="/css/type-css.html#spacing">Letter-Spacing</a></li>
						<li><a href="/css/type-css.html#video">Video Lessons</a></li>
						<li><a href="/css/type-css.html#resources">Resources</a></li>
						<li><a href="/css/type-css.html#tools">Tools</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/list-styles.html">List Styles</a></h5>
					<div class="meta-text">How to control the bullets, numbers, and spacing associated with list items.</div>

					<ul>
						<li><a href="/css/list-styles.html#list-style-type">List Style Type</a></li>
						<li><a href="/css/list-styles.html#nested">Nested Lists</a></li>
						<li><a href="/css/list-styles.html#padding">Padding</a></li>
						<li><a href="/css/list-styles.html#list-style-position">List Style Position</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/box-model.html">The Box Model</a></h5>
					<div class="meta-text">How block elements are sized and spaced in CSS.</div>

					<ul>
						<li><a href="/css/box-model.html#dimensions-section">Width &amp; Height</a></li>
						<li><a href="/css/box-model.html#padding-section">Padding</a></li>
						<li><a href="/css/box-model.html#margin-section">Margin</a></li>
						<li><a href="/css/box-model.html#border-section">Border</a></li>
						<li><a href="/css/box-model.html#box-sizing-section">Box-Sizing</a></li>
						<li><a href="/css/box-model.html#video">Video Lesson</a></li>
						<li><a href="/css/box-model.html#demo">Interactive Demo</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/link-states.html">Link States</a></h5>
					<div class="meta-text">and how to style them.</div>

					<ul>
						<li><a href="/css/link-states.html#normal">Normal</a></li>
						<li><a href="/css/link-states.html#visited">Visited</a></li>
						<li><a href="/css/link-states.html#hover">Hover</a></li>
						<li><a href="/css/link-states.html#active">Active</a></li>
						<li><a href="/css/link-states.html#focus">Focus</a></li>
						<li><a href="/css/link-states.html#full-example">Full Example</a></li>
						<li><a href="/css/link-states.html#video">Video Lesson</a></li>
						<li><a href="/css/link-states.html#quiz">Practice Exercise</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/float-clear.html">Float &amp; Clear</a></h5>
					<div class="meta-text">How to wrap text around an image or other element.</div>

					<ul>
						<li><a href="/css/float-clear.html#float">Float</a></li>
						<li><a href="/css/float-clear.html#clear">Clear</a></li>
						<li><a href="/css/float-clear.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/backgrounds.html">Background Colors &amp; Images</a></h5>
					<div class="meta-text">How to control the appearance of the area behind a page or element.</div>

					<ul>
						<li><a href="/css/backgrounds.html#bg-color">Background Color</a></li>
						<li><a href="/css/backgrounds.html#bg-image">Background Image</a></li>
						<li><a href="/css/backgrounds.html#bg-repeat">Background Repeat</a></li>
						<li><a href="/css/backgrounds.html#bg-position">Background Position</a></li>
						<li><a href="/css/backgrounds.html#bg-attachment">Background Attachment</a></li>
						<li><a href="/css/backgrounds.html#bg-size">Background Size</a></li>
						<li><a href="/css/backgrounds.html#video">Video Lesson</a></li>
						<li><a href="/css/backgrounds.html#resources">Resources</a></li>
					</ul>
				
				</li>

				<li><h5><a href="/css/effects.html">Special Effects</a></h5>
					<div class="meta-text">How to apply unique styles such as shadows and rounded corners.</div>
					
					<ul>
						<li><a href="/css/effects.html#box">Box Shadow</a></li>
						<li><a href="/css/effects.html#text">Text Shadow</a></li>
						<li><a href="/css/effects.html#radius">Rounded Corners</a></li>
						<li><a href="/css/effects.html#video">Video Lesson</a></li>
						<li><a href="/css/effects.html#tools">Tools</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/fluid-width.html">Fluid Width</a></h5>
					<div class="meta-text">How to make elements stretch and squish depending on the size of the space available.</div>

					<ul>
						<li><a href="/css/fluid-width.html#fixed">Fixed Width</a></li>
						<li><a href="/css/fluid-width.html#percent">Percentage Width</a></li>
						<li><a href="/css/fluid-width.html#min-max">Min / Max Width</a></li>
						<li><a href="/css/fluid-width.html#height">Height</a></li>
						<li><a href="/css/fluid-width.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/responsive.html">Responsive Design</a></h5>
					<div class="meta-text">Using Media Queries to adapt a page to different screen sizes.</div>

					<ul>
						<li><a href="/css/responsive.html#queries">Media Queries</a></li>
						<li><a href="/css/responsive.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/display.html">Display</a></h5>
					<div class="meta-text">How to control the core layout behavior of an element.</div>
					
					<ul>
						<li><a href="/css/display.html#block">Block</a></li>
						<li><a href="/css/display.html#inline">Inline</a></li>
						<li><a href="/css/display.html#inline-block">Inline-Block</a></li>
						<li><a href="/css/display.html#none">None</a></li>
						<li><a href="/css/display.html#other">Other Values</a></li>
						<li><a href="/css/display.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/position.html">Position</a></h5>
					<div class="meta-text">For when you want full manual control of the placement of an element.</div>

					<ul>
						<li><a href="/css/position.html#flow">Document Flow</a></li>
						<li><a href="/css/position.html#relative">Relative</a></li>
						<li><a href="/css/position.html#absolute">Absolute</a></li>
						<li><a href="/css/position.html#fixed">Fixed</a></li>
						<li><a href="/css/position.html#video">Video Lesson</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/animation.html">Transitions &amp; Animation</a></h5>
					<div class="meta-text">For adding motion to web pages, whether simple or highly complex.</div>

					<ul>
						<li><a href="/css/animation.html#transitions">Transitions</a></li>
						<li><a href="/css/animation.html#animation">Keyframe Animation</a></li>
						<li><a href="/css/animation.html#video">Video Lesson</a></li>
						<li><a href="/css/animation.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/transforms.html">Transforms</a></h5>
					<div class="meta-text">For scaling, rotating, skewing, or moving an element.</div>

					<ul>
							<li><a href="/css/transforms.html#basic-usage">Basic Usage</a></li>
							<li><a href="/css/transforms.html#common-functions">Common Transform Functions</a></li>
							<li><a href="/css/transforms.html#example-usage">Example Usage</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/flexbox.html">Flexbox</a></h5>
					<div class="meta-text">For laying out items in a line.</div>

					<ul>
						<li><a href="/css/flexbox.html#display">Activating Flexbox</a></li>
						<li><a href="/css/flexbox.html#flex-direction">Flex Direction</a></li>
						<li><a href="/css/flexbox.html#justify-content">Justify Content</a></li>
						<li><a href="/css/flexbox.html#align-items">Align Items</a></li>
						<li><a href="/css/flexbox.html#video">Video Lesson</a></li>
						<li><a href="/css/flexbox.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/grid.html">Grid</a></h5>
					<div class="meta-text">For laying out items in a two-dimensional grid.</div>

					<ul>
						<li><a href="/css/grid.html#terminology">Terminology</a></li>
						<li><a href="/css/grid.html#display">Activating Grid</a></li>
						<li><a href="/css/grid.html#template">Grid Template</a></li>
						<li><a href="/css/grid.html#gap">Grid Gap</a></li>
						<li><a href="/css/grid.html#justify-items">Justify Items</a></li>
						<li><a href="/css/grid.html#align-items">Align Items</a></li>
						<li><a href="/css/grid.html#positioning">Positioning Grid Children</a></li>
						<li><a href="/css/grid.html#video">Video Lesson</a></li>
						<li><a href="/css/grid.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/css/variables.html">Variables</a></h5>
					<div class="meta-text">For creating reusable CSS values.</div>

					<ul>
						<li><a href="/css/variables.html#defining">Defining Variables</a></li>
						<li><a href="/css/variables.html#using">Using Variables</a></li>
						<li><a href="/css/variables.html#video">Video Lesson</a></li>
						<li><a href="/css/variables.html#resources">Resource Links</a></li>
					</ul>

				</li>


				<li><h5><a href="/css/pseudo-elements.html">CSS-Generated Content</a></h5>
					<div class="meta-text">Insert visual content with CSS.</div>

					<ul>
						<li><a href="/css/pseudo-elements.html#pseudo-elements">Using Pseudo-Elements</a></li>
						<li><a href="/css/pseudo-elements.html#styling-content">Styling Inserted Content</a></li>
						<li><a href="/css/pseudo-elements.html#absolute-positioning">Absolute Positioning</a></li>
					</ul>

				</li>

			</ul>

		</section>

		<section>

			<h3 id="advanced">Advanced / Other</h3>

			<ul>

				<li><h5><a href="/advanced/type-advanced.html">Advanced Typographic CSS</a></h5>
					<div class="meta-text">Techniques for creating cohesive, responsive typography.</div>

					<ul>
						<li><a href="/advanced/type-advanced.html#webfonts">Web Fonts</a></li>
						<li><a href="/advanced/type-advanced.html#modular-scales">Modular Scales</a></li>
						<li><a href="/advanced/type-advanced.html#responsive-type">Responsive Type</a></li>
						<li><a href="/advanced/type-advanced.html#video">Video</a></li>
						<li><a href="/advanced/type-advanced.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/advanced/responsive-nav.html">Styling a Responsive Nav</a></h5>
					<div class="meta-text">A simple example of responsive design for site navigation.</div>

					<ul>
						<li><a href="/advanced/responsive-nav.html#html">The HTML</a></li>
						<li><a href="/advanced/responsive-nav.html#mobile-first">Mobile-First Styles</a></li>
						<li><a href="/advanced/responsive-nav.html#responsive">Making it Responsive</a></li>
					</ul>

				</li>

				<li><h5><a href="/advanced/favicons.html">Site Icons (Favicons)</a></h5>
					<div class="meta-text">An icon for the browser tab and elsewhere.</div>

					<ul>
						<li><a href="/advanced/favicons.html#creating-favicon">Creating a Favicon</a></li>
						<li><a href="/advanced/favicons.html#using-favicon">Using a Favicon on a Site</a></li>
					</ul>

				</li>

				<li><h5><a href="/advanced/github.html">Git / Github</a></h5>
					<div class="meta-text">Version control to keep track of changes.</div>

					<ul>
						<li><a href="/advanced/github.html#repositories">Repositories</a></li>
						<li><a href="/advanced/github.html#commits">Commits</a></li>
						<li><a href="/advanced/github.html#workflow">Workflow</a></li>
						<li><a href="/advanced/github.html#video">Video</a></li>
						<li><a href="/advanced/github.html#resources">Resource Links</a></li>
					</ul>

				</li>

				<li><h5><a href="/advanced/beyond.html">Going Beyond</a></h5>
					<div class="meta-text">Want to know more about front-end coding?</div>

					<ul>
						<li><a href="/advanced/beyond.html#html">More HTML</a></li>
						<li><a href="/advanced/beyond.html#css">More CSS</a></li>
						<li><a href="/advanced/beyond.html#animation">Animation</a></li>
						<li><a href="/advanced/beyond.html#javascript">Javascript</a></li>
						<li><a href="/advanced/beyond.html#general">General</a></li>
					</ul>

				</li>

			</section>

		<section>

			<h3 id="general">General Resources</h3>

			<ul>

				<li><h5><a href="/styleguide.html">Code Style Guide</a></h5>
					<div class="meta-text">Use this resource to guide you in formatting and other preferred practices for writing your code.</div>
				</li>

				<li><h5><a href="/glossary.html">Glossary</a></h5>
					<div class="meta-text">Some of the most common HTML & CSS terms and their meanings.</div>
</li>

				<li><h5><a href="/checklist.html">Website Project Checklist</a></h5>
					<div class="meta-text">A handy tool for making sure your bases are covered before you call a project complete.</div>
</li>

				<li><h5><a href="/reference-index.html">Reference Index</a></h5>
					<div class="meta-text">An index of all HTML elements, HTML attributes, and CSS properties discussed on this site.</div>
</li>

			</ul>

		</section>

	</nav>`
});


//Register Table of Contents component
Vue.component( 'site-footer', {
	template: `<footer class="site-footer" :class="{ isOpen: isOpen }">

		<button type="button" class="menu-toggle" @click="toggle">
	
			<svg xmlns="http://www.w3.org/2000/svg" class="menu-open icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<title>Open Nav</title>

				<g class="icon-burger">
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</g>

				<g class="icon-x">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</g>
			</svg>

		</button>

	<table-of-contents v-click-outside="outsideClose">

	</table-of-contents>
	
</footer>`,
  data: () => ({
    isOpen: false
  }),
  methods: { 
	 outsideClose() {
		 if (this.isOpen) {
      	this.isOpen = false;
			document.documentElement.style.overflow = 'auto'
      }
	 },
    toggle() {
      if (this.isOpen) {
      	this.isOpen = false;
			document.documentElement.style.overflow = 'auto'
      } else {
      	this.isOpen = true;
			document.documentElement.style.overflow = 'hidden';
			event.stopPropagation();
      }
    }
  }
});

//Root Instance
new Vue({
  el: '#app',
  data: {},
})