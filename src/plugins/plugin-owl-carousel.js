import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import 'owl.carousel'
const $ = window.$

export class PluginOwlCarousel {
	constructor() {
		this.configs = {
			'loop'               : true,
			'nav'                : false,
			'pagination'         : true,
			'items'              : 1,
			'dots'               : true,
			'autoplay'           : true,
			'autoplayTimeout'    : 5000,
			'autoplayHoverPause' : true,
			'singleItem'         : true,
			'smartSpeed'         : 700
		}
		this.elementsBinds = {
			'default': '.carousel-default'
		}
		this.init()
	}
	init() {
		const self = this;
		$(`${self.elementsBinds.default}`).owlCarousel(self.configs);
		$(`${self.elementsBinds.default}`).on('mouseout', function () {
			$(`${self.elementsBinds.default}`).trigger('stop.owl.autoplay');
			$(`${self.elementsBinds.default}`).trigger('play.owl.autoplay', [3000]);
		});
	}
}