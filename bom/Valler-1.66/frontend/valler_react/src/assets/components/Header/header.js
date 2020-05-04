import React, { Component } from 'react';
import { usuarioAutenticado, parseJwt } from '../../services/auth';
import { api } from '../../services/api';
import { Button, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBAlert, MDBDropdown, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu } from 'mdbreact';
import logoValler from '../../img/valler_logo_novo.png';
import '../../css/style.css'
import { parse } from 'querystring';


class Header extends Component {

    //#region Construtor

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

            filtro: "",
            listarbusca: [],
            listarOferta: [],


            // Lista para o filtro de categorias
            puxarCategorias: [],

            filtroState: [],
            filtrotrue: ""

        }
    }

    //#endregion

    //#region  Ciclo De Vida

    // componentDidUpdate() {
    //     this.listaOfertaAtualizada();
    // }

    componentDidMount() {
        console.log(this.props)
        this.listaOfertaAtualizada();
        this.puxaCategorias();
    }

    //#endregion

    //#region Funcoes


    filtroSetState = (categoria) => {

        console.log(this.state.filtrotrue)

        let dados = {
            filtro: categoria
        }

        api.post('FIltroTrue', dados)
            .then(response => {
                console.log(response)
                this.props.history.push({
                    pathName: '/',
                    state: { filtroState: response.data }
                })
            }
            )
    }

    buscaSetState = (input) => {

        this.setState({ [input.target.name]: input.target.value })

        console.log("Termo", this.state.filtro);
        console.log(this.props);

        // let dados = {
        //     filtro: this.state.filtro
        // }

        let dados = {
            filtro: input.target.value
        }

        api.post('FIltro', dados)
            .then(response => {
                console.log(response)
                this.listaOfertaAtualizada()
                setTimeout(() => {
                    this.props.history.push({
                        pathName: '/',
                        state: { listarbusca: response.data }
                    }, 1000)
                })
            }
            )


        // else {
        //     api.post('FIltro', dados)
        //         .then(response => {
        //             console.log(response)

        //             setTimeout(() => {
        //                 this.props.history.push({
        //                     pathName: '/',
        //                     state: { listarbusca: response.data }
        //                 }, 1000)
        //             })

        //         }
        //         )

        // }


    }

    listaOfertaAtualizada = () => {
        fetch("http://localhost:5000/api/Oferta")
            .then(response => response.json())
            .then(data => this.setState({ listarOferta: data })
                , console.log(this.listarOferta));
    }

    puxaCategorias = () => {
        api.get("/categoria")
            .then(data => {
                this.setState({ puxarCategorias: data.data })
            })
    }

    //#endregion

    //#region Login

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

    //#endregion

    render() {

        return (
            <div>

                <div className="modal-size">
                    <Modal show={this.state.modalLogin || this.props.logar} toggleModalLogin={this.toggleModalLogin || this.props.logar} logar={this.props.logar}>

                        <div className="flex-login">
                            <form className="form-login" onSubmit={this.fazerLogin.bind(this)}>

                                {/* <Modal.Header className="title-modal force-down">
                            <MDBIcon icon="shopping-cart" />
                                Fazer Login
                            </Modal.Header> */}

                                <Modal.Body>
                                    <MDBInput
                                        icon="at"
                                        size="lg"
                                        label="Digite seu Email:"
                                        placeholder="Email"
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.atualizaEstado}
                                        id="login_email"
                                    />
                                    <MDBInput
                                        color="#FF5700"
                                        icon="lock"
                                        size="lg"
                                        label="Digite sua senha:"
                                        placeholder="Senha"
                                        type="password"
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
                                        <MDBBtn
                                            className="background-valler"
                                            color="#FF5700"
                                            type="submit"
                                        >Carregando</MDBBtn>
                                    }

                                    {
                                        this.state.isLoading === false &&
                                        <MDBBtn
                                            className="background-valler"
                                            color="#FF5700"
                                            onClick={this.toggleModalLogin}
                                            type="submit"
                                        >Entrar</MDBBtn>
                                    }


                                </Modal.Footer>
                                <div className="title-modal force-down">
                                    <MDBIcon icon="shopping-cart" />
                                    Fazer Login
                            </div>
                            </form>



                            <form className="form-cadastro" onSubmit={this.postUsuario}>
                                <Modal.Header className="title-modal">
                                    <MDBIcon icon="dollar-sign" />
                                    Realizar Cadastro
                            </Modal.Header>

                                <Modal.Body>


                                    <MDBInput
                                        icon="user"
                                        size="lg"
                                        label="Nome/Razão Social"
                                        placeholder="Nome ou Razão Social"
                                        type="text"
                                        name="NomeRazaoSocial"
                                        value={this.state.NomeRazaoSocial}
                                        onChange={this.postSetState}
                                    />
                                    <select id="option_tipoUsuario"
                                        className="browser-default custom-select"
                                        name="IdTipoUsuario"
                                        value={this.state.postUsuario.IdTipoUsuario}
                                        onChange={this.postSetState}
                                    >
                                        <option>Eu quero: </option>
                                        <option value="2">Quero Apenas comprar</option>
                                        <option value="3">Quero Vender!</option>


                                    </select>
                                    <MDBInput
                                        // label="Digite seu Nome ou Razão Social"
                                        // placeholder="Nome ou Razão Social"
                                        type="hidden"
                                        name="IdTipoUsuario"
                                        value={this.state.IdTipoUsuario}
                                        onChange={this.postSetState}
                                    />

                                    <MDBInput
                                        icon="id-card"
                                        size="lg"
                                        label="CPF/CNPJ"
                                        placeholder="CPF/CNPJ"
                                        type="text"
                                        name="Documento"
                                        value={this.state.Documento}
                                        onChange={this.postSetState}
                                    />

                                    <MDBInput
                                        icon="phone-alt"
                                        size="lg"
                                        label="Digite seu Telefone"
                                        placeholder="Telefone"
                                        type="text"
                                        name="Telefone1"
                                        value={this.state.Telefone1}
                                        onChange={this.postSetState}
                                    />

                                    <MDBInput
                                        icon="at"
                                        size="lg"
                                        label="Email:"
                                        placeholder="Email"
                                        type="text"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={this.postSetState}
                                        id="cadastro_email"

                                    />
                                    <MDBInput
                                        icon="lock"
                                        size="lg"
                                        label="Senha:"
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
                                            className="background-valler"
                                            color="#FF5700"
                                            disabled
                                            type="submit"

                                        >Carregando</Button>
                                    }
                                    {
                                        this.state.isLoading === false &&
                                        <MDBBtn
                                            className="background-valler"
                                            color="#FF5700"
                                            type="submit"
                                        >Cadastrar</MDBBtn>
                                    }
                                </Modal.Footer>
                            </form>
                        </div>


                    </Modal>
                </div>

                <header uk-sticky>
                    <div uk-sticky className="header-mobile">
                        <div className="background-laranja">
                            <nav className="container_V">
                                <div className="barra-desktop container_V">
                                    <nav className="barra-cima">
                                        <a href="/"><img src={logoValler} className="logo-valer"
                                            alt="Logo da Valer - Clicar para Voltar para a página inicial" /></a>


                                        <div className="alturaBusca">
                                            <nav className="uk-navbar-container uk-navbar">
                                                <div className="uk-navbar-left container_V">
                                                    <div className="uk-navbar-item">
                                                        <form className="uk-search uk-search-navbar">
                                                            <div className="flex-busca">
                                                                <MDBIcon icon="search" className="margin-icon" />
                                                                <input className="uk-search-input" type="search" placeholder="O que procura ?" value={this.state.termo} onChange={(e) => this.buscaSetState(e)} />
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </nav>
                                        </div>

                                        <MDBDropdown>

                                            <MDBDropdownToggle color="" className="categorias_btn laranja" id="#laranja">
                                                <div className="categoria_t">
                                                    <i className="fas fa-bars margin-icon"></i> Categorias
                                        </div>
                                            </MDBDropdownToggle>

                                            <MDBDropdownMenu basic>
                                                {
                                                    this.state.puxarCategorias.map(categoria => {
                                                        return (
                                                            <MDBDropdownItem onClick={() => this.filtroSetState(categoria.categoria1)} key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.categoria1}</MDBDropdownItem>
                                                        )
                                                    }
                                                    )
                                                }
                                            </MDBDropdownMenu>
                                        </MDBDropdown>

                                    </nav>
                                </div>
                            </nav>
                        </div>



                        <div className="background-branco">
                            <div className="barra-desktop container_V">



                                <ul className="uk-subnav uk-subnav-pill" uk-margin>

                                    {this.props.location.pathname === "/" ? (

                                        <li className="uk-active"><Link to="/" href>Destaques</Link></li>

                                    ) : (
                                            <li><Link to="/" href>Destaques</Link></li>

                                        )}


                                    {this.props.location.pathname === "/geren_p" || this.props.location.pathname === "/reserva" ? (

                                        <li className="uk-active">
                                            {usuarioAutenticado() && parseJwt().Role === "ADM" ? (
                                                <>
                                                    <Link to="/geren_p">Gerenciar Produtos/Ofertas</Link>
                                                </>
                                            ) : (


                                                    usuarioAutenticado() && parseJwt().Role === "Comum" ?
                                                        (
                                                            <>
                                                                <Link to="/reserva" >Minhas Reservas</Link>
                                                            </>
                                                        ) : (
                                                            usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                                                <>
                                                                    <Link to="/geren_p">Gerenciar Produtos/Ofertas</Link>
                                                                </>
                                                            )
                                                                : (
                                                                    <React.Fragment>
                                                                        <a href="#Home" className="laranja-valler" onClick={this.abrirModalLogin}>Vender</a>
                                                                    </React.Fragment>
                                                                )
                                                        ))}
                                        </li>

                                    ) : (



                                            <li>
                                                {usuarioAutenticado() && parseJwt().Role === "ADM" ? (
                                                    <>

                                                        <Link to="/geren_p" className="uk-active" >Gerenciar Produtos/Ofertas</Link>
                                                    </>
                                                ) : (
                                                        usuarioAutenticado() && parseJwt().Role === "Comum" ?
                                                            (
                                                                <>
                                                                    <Link to="/reserva" className="uk-active" >Minhas Reservas</Link>
                                                                </>
                                                            ) : (
                                                                usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                                                    <>
                                                                        <Link to="/geren_p" className="uk-active">Gerenciar Produtos/Ofertas</Link>
                                                                    </>
                                                                )
                                                                    : (
                                                                        <React.Fragment>
                                                                            <a href="#Home" className="laranja-valler" onClick={this.abrirModalLogin}>Vender</a>
                                                                        </React.Fragment>
                                                                    )
                                                            ))}
                                            </li>

                                        )}



                                    {this.props.location.pathname === "/reservafornecedor" ? (
                                        <li className="uk-active">
                                            {usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                                <>
                                                    <Link to="/reservafornecedor">Meus Produtos Reservados</Link>
                                                </>
                                            ) : (
                                                    <>
                                                    </>
                                                )}
                                        </li>

                                    ) : (
                                            <li>
                                                {usuarioAutenticado() && parseJwt().Role === "Fornecedor" ? (
                                                    <>
                                                        <Link to="/reservafornecedor">Meus Produtos Reservados</Link>
                                                    </>
                                                ) : (
                                                        <>
                                                        </>
                                                    )}
                                            </li>

                                        )}



                                    <li><a href="#">Como funciona?</a></li>
                                    {/* <li><a href="#">Buscar outros mercados</a></li> */}
                                    <li className="laranja-valler">




                                        {usuarioAutenticado() && (parseJwt()
                                            .Role === "ADM" || parseJwt().Role === "Comum" || parseJwt().Role === "Fornecedor") ? (
                                                <>
                                                    <a href="#home" className="laranja-valler" onClick={this.logout}>Sair<span
                                                        uk-icon="sign-out"></span> </a>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to="/#" className="laranja-valler" onClick={this.abrirModalLogin} {...this.props} >Entrar/Cadastrar<span
                                                        uk-icon="sign-out"></span> </Link>
                                                </>
                                            )
                                        }
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </header>
            </div >
        )
    }
}

export default withRouter(Header);