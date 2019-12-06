import React, {Component} from 'react';


export default function Header(){
    
    return(
        <div>
            <header uk-sticky>
                <div uk-sticky className="header-mobile"> 
                    <div className="background-laranja">
                        <nav className="container">
                            <div className="barra-desktop container">
                                <nav className="barra-cima">
                                    <a href="index.html"><img className="logo-valer" src="img/valler_logo_novo.png"
                                            alt="Logo da Valer - Clicar para Voltar para a página inicial"/></a>
                                    <button className="categoria s ">Categorias <i className="fas fa-bars"></i></button>
                                    <div uk-dropdown>
                                        <ul className="uk-nav uk-dropdown-nav">
                                            <li><a href="#">Bebidas</a></li>
                                            <li><a href="#">Hortifruti</a></li>
                                            <li><a href="#">Açougue</a></li>
                                            <li><a href="#">Grãos</a></li>
                                            <li><a href="#">Higiene</a></li>
                                        </ul>
                                    </div>

                                    <nav className="uk-navbar-container uk-navbar">
                                        <div className="uk-navbar-left container">
            
                                            <div className="uk-navbar-item">
                                                <form className="uk-search uk-search-navbar">
                                                    <span uk-search-icon></span>
                                                    <input className="uk-search-input" type="search" placeholder="O que procura ?"/>
                                                </form>
                                            </div>
            
                                        </div>
                                    </nav>

                                    <a href="#"><i className="fas fa-map-marker-alt"></i> Santa Cecilia, São Paulo - SP</a>
                                </nav>
                            </div>
                        </nav>
                    </div>
            
                    <div className="background-branco">
                        <div className="barra-desktop container">
            
                            <ul className="uk-subnav uk-subnav-pill" uk-margin>
                                <li className="uk-active"><a href="index.html">Destaques</a></li>
                                <li><a href="gerenciamento de produtos.html">Vender</a></li>
                                <li><a href="#">Como funciona?</a></li>
                                <li><a href="#">Buscar outros mercados</a></li>
                                <li className="laranja-valler"><a className="laranja-valler" href="#login"><span
                                            uk-icon="sign-in"></span>&nbsp;Entrar/Cadastrar</a></li>
                            </ul>
            
                        </div>
                    </div>
                </div>

            </header>
        </div>
    )
}