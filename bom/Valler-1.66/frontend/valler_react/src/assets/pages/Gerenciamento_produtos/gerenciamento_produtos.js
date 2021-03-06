import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api, apiOfertaPut } from '../../services/api';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBTable, MDBDataTable, MDBTableHead, MDBTableFoot, MDBTableBody } from 'mdbreact';
import { Button, Modal } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { isDate } from 'util';
import '../../css/table_MDB.css';
import Alert from 'react-bootstrap/Alert';
import { number } from 'prop-types';
import moment from 'moment';

export default class gerenciamento_produtos extends Component {


    //#region Construtor

    constructor() {
        super();
        let token = "";
        if (usuarioAutenticado()) {
            token = parseJwt().idUsuario;
        }

        this.state = {

            listarProduto: [],
            listarOferta: [],
            listarCategoria: [],
            puxaCategorias: [],

            postProduto: {
                idCategoria: "",
                idUsuario: token,
                nomeProduto: "",
                descricao: "",
            },

            putSetState: {
                idProduto: "",
                idCategoria: "",
                idUsuario: "",
                nomeProduto: "",
                descricao: ""
            },
            
            postSetStateOferta: {
                idProduto: "",
                idUsuario: token,
                titulo: "",
                dataOferta: "",
                dataVencimento: "",
                preco: "",
                quantidade: "",
                imagem: React.createRef()
            },

            putSetStateOferta: {
                idOferta: "",
                idProduto: "",
                idUsuario: token,
                titulo: "",
                dataOferta: "",
                dataVencimento: "",
                preco: "",
                quantidade: "",
                imagem: React.createRef()
            },

            postReserva: {
                idOferta: "",
                idUsuario: "",
                quantidadeReserva: "",
                cronometro: "",
                statusReserva: ""
            },

            modal: false,
            modal2: false,
            modal3: false,
            modalProduto: false,
            modalOferta: false,
            modalReserva: false,
            show: false,

            mensagemErro: "",
            mensagemSucesso: ""

        }
    }

    //#endregion


    //#region Ciclos De Vida

    componentDidMount() {
        console.log("Página carregada")
        this.listaAtualizada();
        this.listaOfertaAtualizada();
        this.puxaCategorias();
    }


    componentDidUpdate() {
        console.log("Pagina atualizada");
    }

    //#endregion


    //#region Togles

    toggleProduto = () => {
        this.setState({
            modalProduto: !this.state.modalProduto
        });

    }


    toggleOferta = () => {
        this.setState({
            modalOferta: !this.state.modalOferta
        });

    }


    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }


    toggle3 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleReserva = () => {
        this.setState({
            modalReserva: !this.state.modalReserva
        });
    }

    //#endregion


    //#region Ofertas

    deleteOferta(id) {
        api.delete("Oferta/" + id)
            .then(() => {
                this.setState({ mensagemSucesso: "Você excluiu uma oferta!" })
                this.listaOfertaAtualizada()
            }
            ).catch(() => {
                this.setState({ mensagemErro: "Não foi possivel excluir essa oferta, verifique se não esta reservado!" })
            })
        setTimeout(() => {
            this.listaOfertaAtualizada()
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000)
    }


    postOferta = (e) => {

        console.log(this.state.postSetStateOferta)
        e.preventDefault();
        let Oferta = new FormData();

        try {

            Oferta.set('idProduto', this.state.postSetStateOferta.idProduto);
            Oferta.set('idUsuario', this.state.postSetStateOferta.idUsuario);
            Oferta.set('titulo', this.state.postSetStateOferta.titulo);
            Oferta.set('dataOferta', this.state.postSetStateOferta.dataOferta);
            Oferta.set('dataVencimento', this.state.postSetStateOferta.dataVencimento);
            Oferta.set('preco', this.state.postSetStateOferta.preco);
            Oferta.set('quantidade', this.state.postSetStateOferta.quantidade);
            Oferta.set('imagemServer', this.state.postSetStateOferta.imagem.current.files[0]);
            Oferta.set('imagem', this.state.postSetStateOferta.imagem.current.value);

        }
        catch{
            this.setState({ mensagemErro: "Digite todos os dados necessarios para finalizar o cadastro dessa Oferta!" });
        }
        api.post('Oferta', Oferta)
            .then(() => {
                this.setState({ mensagemSucesso: "Você cadastrou uma oferta!" })
                setTimeout(() => {
                    this.listaOfertaAtualizada();
                }, 1500);
            }
            ).catch(() => {
                this.setState({ mensagemErro: "Digite todos os dados necessarios para finalizar o cadastro dessa Oferta!" })
            }
            )
        this.toggle2();
        setTimeout(() => {
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }


    putSetStateOferta = (input) => {
        this.setState({
            putSetStateOferta: {
                ...this.state.putSetStateOferta,
                [input.target.name]: input.target.value
            }
        })
    }


    putSetStateOfertaImg = (input) => {
        this.setState({
            putSetStateOferta: {
                ...this.state.putSetStateOferta,
                [input.target.name]: input.target.files[0]
            }
        })
    }


    listaOfertaAtualizada = () => {
        fetch("http://localhost:5000/api/Oferta/a/" + parseJwt().idUsuario)
            .then(response => response.json())
            .then(data => this.setState({ listarOferta: data })
                , console.log(this.listarOferta));
    }


    postSetStateOferta = (input) => {
        this.setState({
            postSetStateOferta: {
                ...this.state.postSetStateOferta,
                [input.target.name]: input.target.value
            }
        })
    }


    abrirModalOferta = (Oferta) => {
        console.log(this.state.postSetStateOferta.dataOferta);
        this.toggle2();
    }


    abrirModalOferta2 = (Oferta) => {
        this.setState({ putSetStateOferta: Oferta });
        console.log(this.state.putSetStateOferta);
        this.toggle3();
    }


    putOferta = (e) => {
        e.preventDefault();

        let Oferta = new FormData();


        try {

            Oferta.set('idOferta', this.state.putSetStateOferta.idOferta);
            Oferta.set('idProduto', this.state.putSetStateOferta.idProduto);
            Oferta.set('idUsuario', this.state.putSetStateOferta.idUsuario);
            Oferta.set('titulo', this.state.putSetStateOferta.titulo);
            Oferta.set('dataOferta', this.state.putSetStateOferta.dataOferta);
            Oferta.set('dataVencimento', this.state.putSetStateOferta.dataVencimento);
            Oferta.set('preco', this.state.putSetStateOferta.preco);
            Oferta.set('quantidade', this.state.putSetStateOferta.quantidade);
            Oferta.set('imagems', this.state.putSetStateOferta.imagem.current.files[0], this.state.putSetStateOferta.imagem.value);
            Oferta.set('imagem', this.state.putSetStateOferta.imagem.value);

            console.log("aaa", Oferta)

            apiOfertaPut.put('Oferta/' + this.state.putSetStateOferta.idOferta, Oferta)
                .then(this.setState({ mensagemSucesso: "Você atualizou uma oferta!" }))
            setTimeout(() => {
                this.listaOfertaAtualizada();
            }, 1500);
        }
        catch{
            this.setState({ mensagemErro: "Digite todos os dados necessarios para atualizar sua Oferta, não deixe campos em branco!" })
        }
        this.toggle3();
        setTimeout(() => {
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }

    //#endregion


    //#region Produtos

    listaAtualizada = () => {
        fetch("http://localhost:5000/api/Produto/a/" + parseJwt().idUsuario)
            .then(response => response.json())
            .then(data => this.setState({ listarProduto: data })
                , console.log(this.listarProdutos));

    }

    cadastrarProduto = (c) => {
        c.preventDefault();
        api.post('/produto', this.state.postProduto)
            .then(() => {
                try {
                    this.setState({ mensagemSucesso: "Você cadastrou um produto, agora pode realizar uma oferta!" })
                    this.listaAtualizada();
                } catch {
                    this.setState({ mensagemErro: "Não foi possível cadastrar esse produto!" })
                }
            }
            )
            .catch(() => { this.setState({ mensagemErro: "Não foi possível cadastrar esse produto!" }) })
        setTimeout(() => {
            this.listaAtualizada();
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }

    deleteProduto(id) {
        console.log(id)
        api.delete("/Produto/" + id)
            .then(() => {
                try {
                    this.setState({ mensagemSucesso: "Você deletou um produto!" })
                    setTimeout(() => {
                        this.listaAtualizada()
                    }, 1500)
                }
                catch{
                    this.setState({ mensagemErro: "Não foi possível cadastrar esse produto!" })
                }
            })
            .catch(() => { this.setState({ mensagemErro: "Não foi possível cadastrar esse produto!" }) })
        setTimeout(() => {
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }


    putSetState = (input) => {

        this.setState({
            putSetState: {
                ...this.state.putSetState,
                [input.target.name]: input.target.value
            }
        })

    }


    putProduto = (event) => {

        event.preventDefault();

        let idProduto = this.state.putSetState.idProduto;
        let produto = this.state.putSetState;

        api.put('Produto/' + idProduto, produto)
            .then(() => {
                this.setState({ mensagemSucesso: "Você atualizou um produto!" })
                this.listaAtualizada()
            })
            .catch(() => { this.setState({ mensagemErro: "Verifique se os campos foram inteiramente preenchidos" }) })

        this.toggle();

        setTimeout(() => {
            this.listaAtualizada();
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }


    abrirModal = (Produto) => {

        this.toggle();
        this.setState({ putSetState: Produto });

        console.log("PUT", this.state.putSetState);

    }


    puxaCategorias = () => {
        api.get("/categoria")
            .then(data => {
                this.setState({ puxaCategorias: data.data })
            })
    }


    cadastrarSetProduto = (input) => {
        this.setState({
            postProduto: {
                ...this.state.postProduto,
                [input.target.name]: input.target.value
            }
        })
    }


    abrirModalProduto = () => {

        this.toggleProduto();
    }


    // abrirModalOferta = () => {

    //     this.toggleOferta();
    // }

    //#endregion


    //#region Reserva

    cadastrarReservar = (c) => {
        c.preventDefault();

        api.post('/reserva', this.state.postReserva)
            .then(() => {

                try {
                    setTimeout(() => {
                        this.setState({ mensagemSucesso: "Você acabou de reservar um produto, pode ver essas compras no seu carrinho de reservas" })
                    }, 1000)

                } catch {
                    this.setState({ mensagemErro: "Não foi possível fazer a Reserva, por favor verifique se o produto ainda existe em estoque!" })
                }
            }
            )
            .catch(() => {
                this.setState({ mensagemErro: "Não foi possível fazer a Reserva, por favor verifique se o produto ainda existe em estoque!" });
            }
            )
        this.toggleReserva();
        setTimeout(() => {
            this.setState({ mensagemSucesso: "" })
            this.setState({ mensagemErro: "" })
        }, 4000);
    }

    abrirModalReserva = (id) => {

        this.toggleReserva();
        console.log("Post", this.state.postReserva);

    }

    postSetStateReserva = (input) => {

        this.setState({
            postReserva: {
                ...this.state.postReserva,
                [input.target.name]: input.target.value
            }
        })

    }

    //#endregion



    render() {
        return (
            <div>
                <Header />

                <main>

                    {
                        this.state.mensagemErro &&
                        <Alert variant="danger">
                            <Alert.Heading>Opss, parece que houve um problema!</Alert.Heading>
                            <p>
                                {this.state.mensagemErro}
                            </p>
                        </Alert>
                    }

                    {
                        this.state.mensagemSucesso &&
                        <Alert variant="success">
                            <Alert.Heading>Que bom, sua operação foi realizada com sucesso!</Alert.Heading>
                            <p>
                                {this.state.mensagemSucesso}
                            </p>
                        </Alert>
                    }

                        <div className="titulo_gerenciamento">
                            <p id="title_gerenciamento_de_produtos">- Gerenciamento de produtos e Ofertas -</p>
                        </div>
                    <div className="container ">

                    
                    <div className="tabela-produto">
                            <div className="cabecalho-tb-produto margin-bottom">
                                
                                <h3 className="titulo-tb-produto zera-margin"><i class="fas fa-file-contract"/> Seus Produtos Cadastrados</h3>
                                <button className="btn botao-laranja zera-margin" onClick={this.abrirModalProduto}>
                                    <i className="" class="fas fa-hamburger"></i> Cadastrar Produto  
                                        +
                                </button>
                            </div>
                    <MDBTable striped className="tabela-body">
                            <MDBTableHead className="table-head">
                                <tr className="table-head">
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Descricão</th>
                                    <th>Ações</th>
                                </tr>
                            </MDBTableHead>

                            <MDBTableBody>
                                {
                                    this.state.listarProduto.map(
                                        function (Produto) {
                                            return (
                                                <tr key={Produto.idProduto}>
                                                    <td>{Produto.nomeProduto}</td>
                                                    <td>{Produto.idCategoriaNavigation.categoria1}</td>
                                                    <td>{Produto.descricao}</td>
                                                    <td className="acoes">
                                                        <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom btn_50 btn-edit" onClick={() => this.abrirModal(Produto)}>Alterar</button>
                                                        <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom btn_50 btn-delete" onClick={() => this.deleteProduto(Produto.idProduto)}>Deletar</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this)
                                    )
                                }
                                
                            </MDBTableBody>

                            <MDBTableFoot>
                            </MDBTableFoot>

                        </MDBTable>

                    </div>

                    </div>

                    <div class="search-cat">
                        <div class="barra_pesquisa-mobile">
                            <i class="fas fa-search"></i>
                            <label for="pesquisa-produtos-cadastrados">
                                <input type="search" id="pesquisa-produtos-cadastrados" name=""
                                    placeholder=" Buscar por # ou Título" />
                            </label>
                        </div>
                        <a href="#"><i class="fas fa-bars"></i>categorias</a>
                    </div>




                    


                
                <hr className="container uk-divider-icon"/>
                    <div className="cabecalho-tb-produto container  margin-top">
                            <h3 className="titulo-tb-produto zera-margin" ><i class="fas fa-dollar-sign"/> Suas Ofertas Cadastradas</h3>
                            <button className="btn botao-laranja zera-margin" onClick={this.abrirModalOferta}>
                            <i class="fas fa-bars"></i> Cadastrar Oferta 
                            +
                    </button>
                  </div>
                  {/* <div className="separador container">
                    
                    </div> */}

                    {/* <h3 className="titulo-tb-produto zera-margin" >Suas Ofertas Cadastradas</h3> */}
                    <section class="container sessao-produtos">
                    {
                            this.state.listarOferta.map(
                                function (Oferta) {
                                    return (
                                        <a key={Oferta.idOferta} class="card-item">

                                            <div class="header-card">
                                                <span class="uk-label uk-label-success .uk-position-right">Vencimento <br></br>
                                                {moment((Oferta.dataVencimento).split('T')[0]).format('DD-MM-YYYY').replace("-","/").replace("-","/")}
                                                </span>
                                                <img src={"http://localhost:5000/Images/" + Oferta.imagem} alt="" />
                                                <div class="avaliacao">
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star unchecked"></span>
                                                    <span class="fa fa-star unchecked"></span>
                                                </div>
                                            </div>

                                            <div class="main-card">
                                                <p>{Oferta.titulo} - Quantidade: {Oferta.quantidade}</p>
                                                <p class="preco">R$ {Oferta.preco}  ---  <span class="local">{Oferta.idProdutoNavigation.idUsuarioNavigation.nomeRazaoSocial}</span></p>
                                            </div>

                                            <div class="footer-card">
                                                	<button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom btn-edit" onClick={() => this.abrirModalOferta2(Oferta)}>Alterar
                                                </button>
                                                <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom btn-delete" onClick={() => this.deleteOferta(Oferta.idOferta)}>Deletar
                                                </button>
                                            </div>

                                        </a>
                                    )
                                }.bind(this)
                            )
                        }
                        <MDBContainer>
                            <form onSubmit={this.putProduto}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                    <div>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putSetState.nomeProduto}</MDBModalHeader>
                                        <MDBModalBody>
                                            <select label="Categoria" name="idCategoria" value={this.state.putSetState.idCategoria} onChange={this.putSetState.bind(this)} >
                                                {
                                                    this.state.puxaCategorias.map(
                                                        function (categoria) {
                                                            return (
                                                                <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.categoria1}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                            <MDBInput label="Produtos" name="nomeProduto" value={this.state.putSetState.nomeProduto} onChange={this.putSetState.bind(this)} />
                                            <MDBInput label="Descrição" name="descricao" value={this.state.putSetState.descricao} onChange={this.putSetState.bind(this)} />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            {/* Incluimos o tipo submit para enviar o formulario */}
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </div>
                                </MDBModal>
                            </form>
                        </MDBContainer>


                        <MDBContainer>

                            <form onSubmit={this.postOferta}>
                                <MDBModal isOpen={this.state.modal2} toggle={this.toggle2}>
                                    <div>
                                        <MDBModalHeader toggle={this.toggle2}>Cadastrar - {this.state.postSetStateOferta.titulo}</MDBModalHeader>
                                        <MDBModalBody>

                                            <select onChange={this.postSetStateOferta.bind(this)} value={this.state.postSetStateOferta.idProduto} name="idProduto">
                                                <option>Escolha o produto</option>
                                                {
                                                    this.state.listarProduto.map(function (o) {
                                                        return (
                                                            <>
                                                                <option key={o.idProduto} value={o.idProduto}>{o.nomeProduto}</option>
                                                            </>
                                                        )
                                                    }.bind(this))
                                                }
                                            </select>

                                            <MDBInput label="Produtos" name="titulo" value={this.state.postSetStateOferta.titulo} onChange={this.postSetStateOferta.bind(this)} />
                                            <MDBInput type="date" label="Data Oferta" name="dataOferta" value={this.state.postSetStateOferta.dataOferta} onChange={this.postSetStateOferta.bind(this)} />
                                            <MDBInput type="date" label="Data Vencimento" name="dataVencimento" value={this.state.postSetStateOferta.dataVencimento} onChange={this.postSetStateOferta.bind(this)} />
                                            <MDBInput type="numeric" label="Preço" name="preco" value={this.state.postSetStateOferta.preco} onChange={this.postSetStateOferta.bind(this)} />
                                            <MDBInput type="numeric" label="Quantidade" name="quantidade" value={this.state.postSetStateOferta.quantidade} onChange={this.postSetStateOferta.bind(this)} />
                                            <input
                                                type="file"
                                                placeholder="Coloque uma foto sua"
                                                aria-label="Coloque uma foto sua"
                                                ref={this.state.postSetStateOferta.imagem}
                                            />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle2}>Fechar</MDBBtn>

                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </div>
                                </MDBModal>
                            </form>

                        </MDBContainer>



                        <MDBContainer>

                            <form onSubmit={this.putOferta}>
                                <MDBModal isOpen={this.state.modal3} toggle={this.toggle3}>
                                    <div>
                                        <MDBModalHeader toggle={this.toggle3}>Editar - {this.state.putSetStateOferta.titulo}</MDBModalHeader>
                                        <MDBModalBody>

                                            <select onChange={this.putSetStateOferta.bind(this)} value={this.state.putSetStateOferta.idProduto} name="idProduto">

                                                {
                                                    this.state.listarProduto.map(function (o) {
                                                        return (
                                                            <>
                                                                <option key={o.idProduto} value={o.idProduto}>{o.nomeProduto}</option>
                                                            </>
                                                        )
                                                    }.bind(this))
                                                }
                                            </select>

                                            <MDBInput label="Oferta" name="titulo" value={this.state.putSetStateOferta.titulo} onChange={this.putSetStateOferta.bind(this)} />
                                            <MDBInput type="datetime-local" label="Data Oferta" name="dataOferta" value={this.state.putSetStateOferta.dataOferta.split(','[0])} onChange={this.putSetStateOferta.bind(this)} />
                                            <MDBInput type="datetime-local" label="Data Vencimento" name="dataVencimento" value={this.state.putSetStateOferta.dataVencimento.split(','[0])} onChange={this.putSetStateOferta.bind(this)} />
                                            <MDBInput type="numeric" label="Preço" name="preco" value={this.state.putSetStateOferta.preco} onChange={this.putSetStateOferta.bind(this)} />
                                            <MDBInput type="numeric" label="Quantidade" name="quantidade" value={this.state.putSetStateOferta.quantidade} onChange={this.putSetStateOferta.bind(this)} />
                                            <input
                                                type="file"
                                                placeholder="Coloque uma foto sua"
                                                aria-label="Coloque uma foto sua"
                                                name="imagem"
                                                onChange={this.putSetStateOfertaImg.bind(this)}
                                                ref={this.state.putSetStateOferta.imagem}
                                            />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle3}>Fechar</MDBBtn>

                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </div>
                                </MDBModal>
                            </form>

                        </MDBContainer>



                        <Modal show={this.state.modalProduto} toggleProduto={this.toggleProduto}>
                            <Modal.Header>
                                Cadastrar Produto
                        </Modal.Header>
                            <form onSubmit={this.cadastrarProduto}>
                                <Modal.Body show={this.state.modalProduto} toggleOferta={this.toggleProduto}>
                                    <MDBInput
                                        label="Nome do Produto"
                                        id="nomeProduto"
                                        name="nomeProduto"
                                        value={this.state.postProduto.nomeProduto}
                                        size="lg"
                                        onChange={this.cadastrarSetProduto.bind(this)} />
                                    <select onChange={this.cadastrarSetProduto.bind(this)} value={this.state.postProduto.idCategoria} name="idCategoria" id="idCategoria">
                                        <option>Escolha uma Categoria</option>
                                        {
                                            this.state.puxaCategorias.map(function (listaPuxada) {
                                                return (
                                                    <>
                                                        <option key={listaPuxada.idCategoria} value={listaPuxada.idCategoria}>{listaPuxada.categoria1}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                    <MDBInput
                                        label="Descrição:"
                                        placeholder="Ex: Coca Cola 2L - Zero"
                                        id="descricao"
                                        name="descricao"
                                        value={this.state.postProduto.descricao}
                                        size="lg"
                                        onChange={this.cadastrarSetProduto.bind(this)} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.abrirModalProduto}>
                                        Fechar
                                    </Button>
                                    <Button type="submit" onClick={this.abrirModalProduto}>
                                        Cadastrar Produto
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>



                        <Modal show={this.state.modalOferta} toggleOferta={this.toggleOferta}>
                            <Modal.Header>
                                Teste Oferta
                        </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={this.abrirModalOferta}>
                                    Fechar
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <MDBContainer>

                            <form onSubmit={this.cadastrarReservar}>
                                <MDBModal isOpen={this.state.modalReserva} toggle={this.toggleReserva}>
                                    <div>
                                        <MDBModalHeader toggle={this.toggleReserva}>Reservar - {this.state.postReserva.idUsuario}</MDBModalHeader>
                                        <MDBModalBody>

                                            <MDBInput type="numeric" label="Oferta" name="idOferta" value={this.state.postReserva.idOferta} onChange={this.postSetStateReserva.bind(this)} />
                                            <MDBInput type="numeric" label="Usuario" name="idUsuario" value={this.state.postReserva.idUsuario} onChange={this.postSetStateReserva.bind(this)} />
                                            <MDBInput type="numeric" label="Quantidade" name="quantidadeReserva" value={this.state.postReserva.quantidadeReserva} onChange={this.postSetStateReserva.bind(this)} />
                                            <MDBInput type="numeric" label="Cronometro" name="cronometro" value={this.state.postReserva.cronometro} onChange={this.postSetStateReserva.bind(this)} />
                                            <MDBInput type="numeric" label="Status Reserva" name="statusReserva" value={this.state.postReserva.statusReserva} onChange={this.postSetStateReserva.bind(this)} />

                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggleReserva}>Fechar</MDBBtn>

                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </div>
                                </MDBModal>
                            </form>

                        </MDBContainer>



                    </section>
                </main>
               
            </div>
            // <Footer/>

        )

    }
}