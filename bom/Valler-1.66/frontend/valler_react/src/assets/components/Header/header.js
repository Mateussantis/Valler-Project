import React, { Component } from 'react';
import { usuarioAutenticado, parseJwt } from '../../services/auth';
import { api } from '../../services/api';
import { Button, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBAlert } from 'mdbreact';
import { logoValler } from '../../img/valler_logo_novo.png';
import '../../css/style.css'
// import { Dropdown } from 'uikit-react';

class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {


            // States de Login 
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading: false,



            // POST States de Cadastro
            postUsuario: {
                IdTipoUsuario: "",
                NomeRazaoSocial: "",
                Email: "",
                Senha: "",
                Documento: "",
                Telefone1: "",
            },



            // States do Modal

            modalLogin: false,
            show: false,

            termo: ""



        }
    }


    buscaSetState = (input) =>{
        this.setState({ termo: input.target.value })
    }


    postSetState = (input) => {
        this.setState({
            postUsuario: {
                ...this.state.postUsuario, [input.target.name]: input.target.value
            }
        })
    }

    postUsuario = (u) => {
        u.preventDefault();

        if (this.state.postUsuario.IdTipoUsuario === "2") {
            this.state.postUsuario.IdTipoUsuario = 2

        } if (this.state.postUsuario.IdTipoUsuario === "3") {
            this.state.postUsuario.IdTipoUsuario = 3
        }

        api.post('/usuario', this.state.postUsuario)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível fazer seu cadastro. Verifique suas informações novamente" })
            })
    }

    componentDidMount() {
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

                    var base64 = localStorage.getItem('usuario-valler').split('.')[1]

                    console.log(base64)

                    console.log(parseJwt().Role)

                    if (parseJwt().Role === "ADM" || parseJwt().Role === "Fornecedor") {

                        this.props.history.push('/geren_p');
                        console.log(this.props)

                    }

                } else {
                    this.props.history.push('/')
                }

                // if (parseJwt().Role === 'Comum') {
                //     this.props.history.push('/')
                // } if (parseJwt().Role === 'Fornecedor') {
                //     this.props.history.push('/geren_p')
                // }
            }
            )

            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválidos!' })
                this.setState({ isLoading: false })
            })
    }




    logout = () => {

        localStorage.removeItem("usuario-valler");
        this.props.history.push("/");
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
                                type="number"
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
                                    onClick={this.toggleModalLogin}
                                    type="submit"
                                >Entrar</Button>
                            }
                        </Modal.Footer>
                    </form>

                    <form onSubmit={this.postUsuario}>
                        <Modal.Header>
                            Realizar Cadastro
                        </Modal.Header>

                        <Modal.Body>

                            <select id="option_tipoUsuario"
                                name="IdTipoUsuario"
                                value={this.state.postUsuario.IdTipoUsuario}
                                onChange={this.postSetState}
                            >
                                <option>Eu quero: </option>
                                <option value="2">Quero Apenas comprar</option>
                                <option value="3">Quero Vender!</option>


                            </select>

                            <MDBInput
                                label="Digite seu Nome ou Razão Social"
                                placeholder="Nome ou Razão Social"
                                type="text"
                                name="NomeRazaoSocial"
                                value={this.state.NomeRazaoSocial}
                                onChange={this.postSetState}
                            />
                            <MDBInput
                                // label="Digite seu Nome ou Razão Social"
                                // placeholder="Nome ou Razão Social"
                                type="hidden"
                                name="IdTipoUsuario"
                                value={this.state.IdTipoUsuario}
                                onChange={this.postSetState}
                            />

                            <MDBInput
                                label="Digite seu CPF ou CNPJ"
                                placeholder="CPF/CNPJ"
                                type="text"
                                name="Documento"
                                value={this.state.Documento}
                                onChange={this.postSetState}
                            />

                            <MDBInput
                                label="Digite seu Telefone"
                                placeholder="Telefone"
                                type="text"
                                name="Telefone1"
                                value={this.state.Telefone1}
                                onChange={this.postSetState}
                            />

                            <MDBInput
                                label="Digite seu Email:"
                                placeholder="Email"
                                type="text"
                                name="Email"
                                value={this.state.Email}
                                onChange={this.postSetState}
                                id="cadastro_email"
                            />
                            <MDBInput
                                label="Digite sua senha:"
                                placeholder="Senha"
                                type="text"
                                name="Senha"
                                value={this.state.Senha}
                                onChange={this.postSetState}
                                id="login_senha"
                            />

                            <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>
                        </Modal.Body>

                        <Modal.Footer>
                            {
                                this.state.isLoading === true &&
                                <Button
                                    disabled
                                    type="submit"

                                >Carregando</Button>
                            }
                            {
                                this.state.isLoading === false &&
                                <Button
                                    type="submit"
                                >Cadastrar</Button>
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
                                        <a href="/"><img src={logoValler} className="logo-valer"
                                            alt="Logo da Valer - Clicar para Voltar para a página inicial" /></a>
                                        <button className="categorias ">Categorias <i className="fas fa-bars"></i></button>
                                        <div uk-dropdown>
                                            {/* <Dropdown className="uk-nav uk-dropdown-nav">
                                                <li><a href="#">Bebidas</a></li>
                                                <li><a href="#">Hortifruti</a></li>
                                                <li><a href="#">Açougue</a></li>
                                                <li><a href="#">Grãos</a></li>
                                                <li><a href="#">Higiene</a></li>
                                            </Dropdown> */}
                                        </div>

                                        <nav className="uk-navbar-container uk-navbar">

                                            <div className="uk-navbar-left container">
                                                <div className="uk-navbar-item">
                                                    <form className="uk-search uk-search-navbar">
                                                        <span uk-search-icon></span>
                                                        <input className="uk-search-input" type="search" placeholder="O que procura ?" value={this.state.termo} onChange={(e) => this.buscaSetState(e)} />
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
                                    <li className="uk-active"><Link to="/" href>Destaques</Link></li>
                                    <li>
                                        {usuarioAutenticado() && parseJwt().Role === "ADM" ? (
                                            <>
                                                <Link to="/geren_p" >Gerenciar Produtos/Ofertas</Link>
                                            </>
                                        ) : (
                                                usuarioAutenticado() && parseJwt().Role === "Comum" ? 
                                                (
                                                    <>
                                                    <Link to="/reserva" >Minhas Reservas</Link>
                                                </>
                                            ) :(
                                                usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                                    <>
                                                        <Link to="/geren_p" >Gerenciar Produtos/Ofertas</Link>
                                                    </>
                                                ) 
                                                :(
                                                        <React.Fragment>
                                                            <a href="#Home" className="laranja-valler" onClick={this.abrirModalLogin}>Vender</a>
                                                        </React.Fragment>
                                                    )
                                        ))}

                                    </li>


                                    <li><a href="#">Como funciona?</a></li>
                                    <li><a href="#">Buscar outros mercados</a></li>
                                    <li className="laranja-valler">


                                        {/* {
                                            usuarioAutenticado() && ( parseJwt().Role === "ADM" || parseJwt().Role === "Comum" ) ? (
                                                // faça algo
                                            ) : (
                                                // faça outra coisa
                                            )
                                        } */}




                                        {usuarioAutenticado() && (parseJwt()
                                            .Role === "ADM" || parseJwt().Role === "Comum" || parseJwt().Role === "Fornecedor") ? (
                                                <>
                                                    <a href="#home" className="laranja-valler" onClick={this.logout}>Sair<span
                                                        uk-icon="sign-out"></span> </a>
                                                </>
                                            ) : (
                                                <React.Fragment>
                                                    <a href="#home" className="laranja-valler" onClick={this.abrirModalLogin}>Entrar/Cadastrar<span
                                                        uk-icon="sign-out"></span> </a>
                                                </React.Fragment>
                                            )
                                        }
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default withRouter(Header);