import React, { Component, Fragment } from 'react'

//Plugins
import { PluginMouseWheel } from '../../plugins/plugin-mouse-wheel'
import { PluginNiceScroll } from '../../plugins/plugin-nice-scroll'

class Music extends Component {
	constructor() {
		super()
		this.state = {
			musics: []
		}
	}
	componentDidMount() {
		this.pluginNiceScroll = new PluginNiceScroll()
		this.pluginMouseWheel = new PluginMouseWheel()
		document.title        = "Musics";
		this.getData()
	}
	getData(lang) {
		let url = `http://localhost/dctb-wp-react-boilerplate/public/api/wp-json/wp/v2/musics?lang=${lang}`
		fetch(url)
			.then(res => res.json())
			.then(res => {
				this.setState({
					musics: res
				})
			})
	}
	changeLanguage(lang) {
		this.getData(lang)
	}
	render() {
		let musics = this.state.musics.map((music, i) => {
			return (
				<div key={i}>
					<h2>Titile</h2>
					<p>{music.title.rendered}</p>
					<h3>Release Year</h3>
					<p>{music.acf.artist}</p>
				</div>
			)
		})
		return (
			<Fragment>
				{musics}
			</Fragment>
		)
	}
}

export default Music