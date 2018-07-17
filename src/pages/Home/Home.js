import React, { Component, Fragment } from 'react'

// JQuery
import $ from 'jquery'

//Plugins
import { PluginMouseWheel }     from '../../plugins/plugin-mouse-wheel'
import { PluginNiceScroll }     from '../../plugins/plugin-nice-scroll'
import { PluginScrollReveal }   from '../../plugins/plugin-scroll-reveal'
import { PluginOwlCarousel }    from '../../plugins/plugin-owl-carousel'

class Home extends Component {
	constructor(){
		super()
		this.state = {
			movies : []
		}
	}
	componentDidMount(){
		this.pluginNiceScroll   = new PluginNiceScroll()
		this.pluginScrollReveal = new PluginScrollReveal()
		this.pluginOwlCarousel  = new PluginOwlCarousel()
		this.pluginMouseWheel   = new PluginMouseWheel()
		$('#loader').fadeOut()
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
			console.log(movie)
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
				<a href="#pt" onClick={() => this.changeLanguage('pt')} style={{'color':'red'}}>PT</a>
				-
				<a href="#en" onClick={() => this.changeLanguage('en')} style={{'color':'red'}}>EN</a>
				{movies}
			</Fragment>
		)
	}
}

export default Home