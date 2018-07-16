import React, { Component, Fragment } from 'react'
import Carousel from '../../Carousel'

import './content-testmonials.css'

import testimonials from '../../../data/testmonials'

class ContentTestmonials extends Component {
    render() {
        return (
            <Fragment>
                <div id="content-testmonials">
                    <div className="row">
                        <div className="col">
                            <h2 className="sr-1">depoimentos</h2>
                            <img src={require('../../../assets/images/geovanna-icon-ballons.svg')} alt="Ícone de dois balões com coração" className="sr-4" />
                            <h3 className="sr-3">Aqui estão os depoimentos de alguns casais que contrataram os nossos serviços</h3>
                        </div>
                    </div>
                    <div className="row">
                        <Carousel id="carousel-default" testimonials={testimonials}></Carousel>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ContentTestmonials