import React, { Component, Fragment } from 'react'

import './content-contact.css'

class ContentContact extends Component {
    render() {
        return (
            <Fragment>
                <div id="content-contact">
                    <h2 className="sr-3">entrem em contato</h2>
                    <img src={require('../../../assets/images/geovanna-icon-rings.svg')} alt="Imagem de dois anéis de noivado" className="sr-1" />
                    <h3 className="sr-4">Será um prazer<br/>conversar com vocês!</h3>
                    <h4 className="sr-1">Whatsapp e Telefone</h4>
                    <p className="bigger sr-3"><a href="tel:43996923296">(43) 996 923 296</a><small>clique no número!</small></p>
                    <h4 className="sr-1">E-mail</h4>
                    <p><a href="mailto:geovannagarcia.assesoria@gmail.com">geovannagarcia.assesoria@gmail.com</a></p>
                    <ul>
                        <li className="sr-1"><a href="https://www.instagram.com/geovannagarcia/" target="_blank" rel="noopener noreferrer"><img src={require('../../../assets/images/geovanna-icon-instagram.svg')} alt="Ícone Instagram"/></a></li>
                        <li className="sr-1"><a href="https://www.facebook.com/geovannagarciaeventos/" target="_blank" rel="noopener noreferrer"><img src={require('../../../assets/images/geovanna-icon-facebook.svg')} alt="Ícone Facebook"/></a></li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default ContentContact