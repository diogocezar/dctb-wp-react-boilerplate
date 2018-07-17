import React, { Component, Fragment } from 'react'

//Plugins
import { PluginMouseWheel }     from '../../plugins/plugin-mouse-wheel'
import { PluginNiceScroll }     from '../../plugins/plugin-nice-scroll'

class Movie extends Component {
	constructor(){
		super()
		this.state = {
			movies : []
		}
	}
	componentDidMount(){
		this.pluginNiceScroll   = new PluginNiceScroll()
		this.pluginMouseWheel   = new PluginMouseWheel()
		document.title          = "Movies";
		this.getData()
	}
	getData(lang){
		let url = `http://localhost/dctb-wp-react-boilerplate/public/api/wp-json/wp/v2/movies?lang=${lang}`
		fetch(url)
			.then(res => res.json())
			.then(res => {
				this.setState({
					movies: res
				})
			})
	}
	changeLanguage(lang){
		this.getData(lang)
	}
	render() {
		let movies = this.state.movies.map((movie, i) => {
			return(
				<div key={i}>
					<h2>Titile</h2>
					<p>{movie.title.rendered}</p>
					<h3>Release Year</h3>		
					<p>{movie.acf.release_year}</p>
					<h4>Ratting</h4>
					<p>{movie.acf.ratting}</p>
					<h4>Description</h4>
					<p>{movie.acf.description}</p>
					<img src={movie.acf.image}/>
				</div>
			)
		})
		return(
			<Fragment>
				<a onClick={() => this.changeLanguage('pt')} style={{'color':'red'}}>PT</a>
				-
				<a onClick={() => this.changeLanguage('en')} style={{'color':'red'}}>EN</a>
				{movies}
			</Fragment>
		)
	}
}

export default Movie