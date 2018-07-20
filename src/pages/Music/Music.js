import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MusicActions from '../../actions/music'

class Music extends Component {
	componentDidMount() {
		document.title = "Musics"
		this.props.loadMusics()
	}
	changeLang(lang) {
		this.props.loadMusics(lang)
	}
	render() {
		if (typeof this.props.musics.data !== 'undefined' && this.props.musics.data.length > 0) {
			let musics = this.props.musics.data.map((music, i) => {
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
					<button onClick={(e) => { this.changeLang('pt') }}>Português</button>
					<button onClick={(e) => { this.changeLang('en') }}>Inglês</button>
					{musics}
				</Fragment>
			)
		}
		else {
			return (
				<h1>Carregando</h1>
			)
		}
	}
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(MusicActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Music)