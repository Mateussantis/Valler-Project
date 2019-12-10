import React, { Component } from 'react';
import { parseJwt } from '../../services/auth';
import { api } from '../../services/api';
import { Button, Modal } from 'react-bootstrap';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBAlert } from 'mdbreact';

export default class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {


            // States de Login 
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading: false,

            // States do Modal

            modalLogin: false,
            show: false,



        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    toggleModalLogin = () => {
        this.setState({
            modalLogin: !this.state.modalLogin
        });

    }


    abrirModalLogin = () => {

        this.toggleModalLogin();
    }


    fazerLogin(event) {
        event.preventDefault();

        this.setState({ erroMensagem: '' })

        this.setState({ isLoading: true })


        let usuario = {
            email: this.state.email,
            senha: this.state.senha
        }

        api.post("/login", usuario)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('usuario-valler', response.data.token)
                    this.setState({ isLoading: false })

                    console.log("Meu token é: " + response.data.token)

                    var base64 = localStorage.getItem('usuario-valler').split('.')[1]

                    console.log(base64)

                    console.log(window.atob(base64))

                    console.log(JSON.parse(window.atob(base64)))

                    console.log(parseJwt().Role)

                    console.log(this.props)

                    if(parseJwt().Role === "ADM") {
                        console.log("Até aqui funciona")
                        this.props.history.push('/geren_p');
                        
                    }else {
                        console.log("Ele consegue fazer a verificação da Role")
                        this.props.history.push('/');
                    }

                    // if (parseJwt().Role === 'Comum') {
                    //     this.props.history.push('/')
                    // } if (parseJwt().Role === 'Fornecedor') {
                    //     this.props.history.push('/geren_p')
                    // }
                }
            })

            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválidos!' })
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <div>

                    <Modal show={this.state.modalLogin} toggleModalLogin={this.toggleModalLogin}>
                    <form onSubmit={this.fazerLogin.bind(this)}>

                        <Modal.Header>
                            Fazer Login
                        </Modal.Header>

                        <Modal.Body>
                            <MDBInput
                                label="Digite seu Email:"
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.atualizaEstado}
                                id="login_email"
                            />
                            <MDBInput
                                label="Digite sua senha:"
                                placeholder="Senha"
                                type="text"
                                name="senha"
                                value={this.state.senha}
                                onChange={this.atualizaEstado}
                                id="login_senha"
                            />

                            <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>
                        </Modal.Body>

                        <Modal.Footer>
                        {
                                this.state.isLoading === true &&
                                <Button
                                    type="submit"
                                
                                >Carregando</Button>
                            }
                            {
                                this.state.isLoading === false &&
                                <Button
                                    type="submit"
                                >Entrar</Button>
                            }
                        </Modal.Footer>
                    </form>

                    </Modal>

                <header uk-sticky>
                    <div uk-sticky className="header-mobile">
                        <div className="background-laranja">
                            <nav className="container">
                                <div className="barra-desktop container">
                                    <nav className="barra-cima">
                                        <a href="index.html"><img className="logo-valer" src="img/valler_logo_novo.png"
                                            alt="Logo da Valer - Clicar para Voltar para a página inicial" /></a>
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
                                                        <input className="uk-search-input" type="search" placeholder="O que procura ?" />
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
                                    <li className="laranja-valler"><a className="laranja-valler" onClick={this.abrirModalLogin} ><span
                                        uk-icon="sign-in"></span>&nbsp;Entrar/Cadastrar</a></li>
                                </ul>

                            </div>
                        </div>
                    </div>




                </header>
            </div>
        )
    }
}