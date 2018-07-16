import React, { Component } from 'react'

import './carousel.css'

class Carousel extends Component {
    constructor(props){
        super(props)
        this.renderTestimonials = this.renderTestimonials.bind(this)
    }
    renderTestimonials(){
        return(
            this.props.testimonials.map((page, i) => {
                return(
                    <div className="item" key={i}>
                        <div className="row row-testimony">
                        {
                            page.map((element, j) => {
                                return(
                                    <div className="col-md-6 col-sm-12" key={j}>
                                        <p>{element.text}</p>
                                        <img src={element.image} alt={`Imagem do casal ${element.name} que fizeram um depoimento`} />
                                        <h4>{element.name}</h4>
                                        <h5>{element.date}</h5>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            })
        )
    }
    render() {
        return(
            <div id="carousel-testimony" className="owl-carousel owl-theme carousel-default">
                {this.renderTestimonials()}
            </div>
        )
    }
}

export default Carousel