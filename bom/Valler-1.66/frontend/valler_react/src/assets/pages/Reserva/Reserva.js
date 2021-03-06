import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api } from '../../services/api';
import { parseJwt } from '../../services/auth';
import Alert from 'react-bootstrap/Alert';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBTable, MDBDataTable, MDBTableHead, MDBTableFoot, MDBTableBody } from 'mdbreact';

export default class Reserva extends Component {

  //#region Construtor

  constructor() {
    super();
    this.state = {
      listarReserva: [],
      listarEndereco: [],

      listarEnderecos: {
        idEndereco: "",
        idUsuario: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: ""
      },


      idUsuario: parseJwt().idUsuario,

      mensagemErro: "",
      mensagemSucesso: ""
    }
  }

  //#endregion

  //#region Ciclo De Vida

  componentDidMount() {
    this.getReserva();
    // this.getEndereco();
  }

  //#endregion

  //#region Reservas

  deletarReserva = (id) => {
    api.delete("Reserva/" + id)
      .then(() => {
        this.setState({ mensagemSucesso: "Uma Reserva foi cancelada!" })
        setTimeout(() => {
          this.getReserva()
        }, 1500)
      }
      ).catch(() => {
        this.setState({ mensagemErro: "Não foi possivel remover essa reseva, por favor aguarde, ou entre em contato com o forne!" })
      })
    setTimeout(() => {
      this.getReserva()
      this.setState({ mensagemSucesso: "" })
      this.setState({ mensagemErro: "" })
    }, 4000)
  }

  getReserva = () => {
    api.get('Reserva/a/' + parseJwt().idUsuario)
      .then(response => {

        this.setState({ listarReserva: response.data })

      })
  }

  getEndereco = (a) => {

    api.get('Endereco/a/' + a)
      .then(response => {
        this.setState({ listarEndereco: response.data })
      })

    // this.setState({listarEnderecos.rua : this.listarEndereco})

    console.log("aaaaaaaaaaaaaaa", this.state.listarEndereco)
  }



  //#endregion

  render() {
    return (
      <div>

        <Header />

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


        <div className="container">

          <div className="titulo_reservas">
          <p id="title_reserva_fornecedores">Veja quem reservou seus produtos!!</p>
          </div>

          <MDBTable striped className="tabela-body">
            <MDBTableHead className="table-head">
              <tr className="table-head">
                <th>Produto</th>
                <th>Oferta Reservada</th>
                <th>Mercado</th>
                <th>Localização</th>
                <th>Quantidade</th>
                <th>Valor Unitario</th>
                <th>Valor Total</th>
                <th>Tempo restante</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {
                this.state.listarReserva.map(
                  function (r) {
                    return (
                      <tr key={r.idReserva}>
                        <td>{r.idOfertaNavigation.idProdutoNavigation.nomeProduto}</td>
                        <td>{r.idOfertaNavigation.titulo}</td>
                        <td>{r.idOfertaNavigation.idProdutoNavigation.idUsuarioNavigation.nomeRazaoSocial}</td>
                        <td>
                          {
                            <a href= {"https://www.google.com/maps/search/"+r.idOfertaNavigation.idProdutoNavigation.idUsuarioNavigation.imagemUsuario} target="_blank">{r.idOfertaNavigation.idProdutoNavigation.idUsuarioNavigation.imagemUsuario}</a>
                            
                          }
                          {/* {this.getEndereco(r.idOfertaNavigation.idProdutoNavigation.idUsuarioNavigation.idUsuario)} */}
                        </td>
                        <td>{r.quantidadeReserva}</td>
                        <td>R$  {r.idOfertaNavigation.preco}</td>
                        <td>R$  {r.idOfertaNavigation.preco * r.quantidadeReserva}</td>
                        <td>{r.cronometro}</td>
                        <td>{r.statusReserva == 0 && "Fechada" || "Aberta"}</td>
                        <td>
                          <button onClick={() => this.abrirModal(Reserva)}>Alterar</button>
                          <button onClick={() => this.deletarReserva(r.idReserva)}>Deletar</button>
                        </td>
                      </tr>
                    )
                  }.bind(this)
                )
              }
            </MDBTableBody>

          </MDBTable>
          {/* <table>
          {
            this.state.listarEndereco.map(
              function (r) {
                return (
                  <tr key={r.idEndereco}>
                    <td>{r.rua}</td>
                )
              }.bind(this)
            )
          }
          </table> */}

        </div>

      </div>
    );
  }
}