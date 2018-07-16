import Mobile from '../helpers/mobile'
import ScrollReveal from 'scrollreveal'

export class PluginScrollReveal {
	constructor() {
		this.Mobile = new Mobile()
		this.configs = {
			'.sr-1' : {
				'duration'  : 1500,
				'origin'    : 'left',
				'reset'     : false,
				'delay'     : 100,
				'scale'     : 0.9,
			},
			'.sr-2' : {
				'duration'  : 1800,
				'origin'    : 'top',
				'reset'     : false,
				'delay'     : 100,
				'scale'     : 0.9
			},
			'.sr-3' : {
				'duration'  : 1000,
				'origin'    : 'bottom',
				'reset'     : false,
				'delay'     : 100,
				'scale'     : 0.7
			},
			'.sr-4' : {
				'duration'  : 800,
				'origin'    : 'right',
				'reset'     : false,
				'delay'     : 100,
				'scale'     : 0.9,
			}
		}
		this.init()
	}
	init() {
		if (!this.Mobile.isMobile){
			window.sr = ScrollReveal()
			for (var key in this.configs)
				window.sr.reveal(key, this.configs[key])
		}
	}
}