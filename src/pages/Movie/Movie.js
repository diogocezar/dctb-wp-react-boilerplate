import React, { Component, Fragment } from 'react'
import { bindActionCreators }         from 'redux'
import { connect }                    from 'react-redux'
import * as MovieActions              from '../../actions/movie'

class Movie extends Component {
	componentDidMount(){
		document.title = "Movies"
		this.props.loadMovies()
	}
	changeLang(lang){
		this.props.loadMovies(lang)
	}
	render() {
		if (typeof this.props.movies.data !== 'undefined' && this.props.movies.data.length > 0){
			let movies = this.props.movies.data.map((movie, i) => {
				return (
					<div key={i}>
						<h2>Titile</h2>
						<p>{movie.title.rendered}</p>
						<h3>Release Year</h3>
						<p>{movie.acf.release_year}</p>
						<h4>Ratting</h4>
						<p>{movie.acf.ratting}</p>
						<h4>Description</h4>
						<p>{movie.acf.description}</p>
						<img src={movie.acf.image} alt="testing" />
					</div>
				)
			})
			return (
				<Fragment>
					<button onClick={(e) => {this.changeLang('pt')}}>Português</button>
					<button onClick={(e) => {this.changeLang('en')}}>Inglês</button>
					{movies}
				</Fragment>
			)
		}
		else{
			return(
				<h1>Carregando</h1>
			)
		}
	}
}

const mapStateToProps    = state => state
const mapDispatchToProps = dispatch => bindActionCreators(MovieActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Movie)