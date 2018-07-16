import React, { Component, Fragment } from 'react'
import Button from '../../Button'

import './content-services.css'

class ContentAbout extends Component {
    render() {
        return (
            <Fragment>
                <div id="content-services">
                    <div className="row">
                        <div className="col">
                            <h2 className="sr-2">Tipos de Serviços</h2>
                            <img src={require('../../../assets/images/geovanna-icon-ring.svg')} className="sr-3" alt="Ícone de um anel de casamento"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h3 className="sr-3">Assessoria<br/><span className="hl">Completa</span></h3>
                            <p className="sr-1">Nessa modalidade, iniciamos com a consultoria e seguimos acompanhando o casal durante todo o processo: elaboração do <i>layout</i>, estilo do casamento, busca por fornecedores, visitas técnicas, contratações e organização de planilhas para o controle de orçamento.</p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h3 className="sr-3">Assessoria<br/><span className="hl">Intermediária</span></h3>
                            <p className="sr-1">Essa modalidade é para o casal que já contratou alguns serviços, porém, encontraram dificuldades em organizar o casamento no meio do processo. Teremos reuniões em que os noivos nos contam como será o grande dia, e então preparamos todo o suporte daqui pra frente.</p>
                        </div>
                    </div>
                    <a href="https://www.geovannagarcia.com.br/files/geovanna-apresentacao.pdf" className="sr-2" target="_blank" rel="noopener noreferrer" download>
                        <Button 
                            id="btn-presentation"
                            label="BAIXAR A APRESENTAÇÃO"
                            type="white">
                        </Button>
                    </a>
                </div>
            </Fragment>
        );
    }
}

export default ContentAbout