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