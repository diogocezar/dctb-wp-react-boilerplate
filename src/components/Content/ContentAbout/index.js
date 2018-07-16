import React, { Component, Fragment } from 'react'

import './content-about.css'

class ContentAbout extends Component {
    render() {
        return (
            <Fragment>
                <div id="content-about">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <h2 className="sr-4">sobre nós</h2>
                            <h3 className="sr-3">Oi, sou a Geovanna Garcia</h3>
                            <p className="sr-1">Saber que seus bens estão seguros é viver com mais tranquilidade, podendo dedicar seu tempo no que mais importa para você. Pensando nisso a LIEN Corretora de Seguros trabalha oferecendo facilidade e transparência. Uma corretora atual que busca a melhoria contínua em seus processos e serviços.</p>
                            <p className="sr-1">Nosso objetivo é proporcionar segurança e despreocupação, por isso contamos com uma consultoria especializada que visa orientar e apresentar a proposta de seguro mais adequada às suas necessidades, através de uma análise minuciosa para oferecer o melhor custo-benefício com a certeza de uma apólice bem elaborada.</p>
                            <p className="sr-1">No site é possível solicitar cotações, tirar dúvidas e compreender em detalhes tudo sobre o seguro contratado. Isso permitirá usufruir de todas as facilidades que o seguro oferece e ainda ter a certeza de estar realmente assistido, caso tenha a necessidade de acionar os serviços. Com a LIEN Corretora de Seguros você estará protegido e terá todo o suporte de nossa consultoria especializada com agilidade e clareza. Conheça nossos serviços, faça um seguro com a LIEN.</p>
                            <img src={require('../../../assets/images/geovanna-icon-heart.svg')} className="sr-4" alt="Ícone de dois corações" />
                            <h3 className="sr-3">A nossa missão</h3>
                            <p className="sr-1">é planejar com total dedicação o momento mais importante na vida de um casal, acompanhando todo processo com muito profissionalismo transmitindo tranquilidade e confiança para que os noivos possam desfrutar ao máximo esse momento único e especial.</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ContentAbout