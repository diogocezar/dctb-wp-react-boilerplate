import $ from 'jquery'
import 'jquery.nicescroll'
import Mobile from '../helpers/mobile'

export class PluginNiceScroll {
	constructor() {
		this.Mobile = new Mobile()
		this.configs = {
			'cursorwidth'        : "8px",
			'zindex'             : 1000,
			'cursoropacitymax'   : 0.8,
			'cursorcolor'        : "#C9ADA7",
			'horizrailenabled'   : false,
			'cursorborder'       : "none",
			'cursorborderradius' : "0px"
		}
		this.init()
	}
	init() {
		if (!this.Mobile.isMobile)
			$("html").niceScroll(this.configs)
	}
}