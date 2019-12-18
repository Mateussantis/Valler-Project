import React, { Component } from 'react';
import Header from '../../components/Header/header';

import { api } from '../../services/api';
import { parseJwt } from '../../services/auth';
import Alert from 'react-bootstrap/Alert';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBTable, MDBDataTable, MDBTableHead, MDBTableFoot, MDBTableBody } from 'mdbreact';

export default class ReservaFornecedor extends Component {

  //#region Construtor

  constructor() {
    super();
    this.state = {
      listarReserva: [],
      idUsuario: parseJwt().idUsuariol,

      mensagemErro: "",
      mensagemSucesso: ""
    }
  }

  //#endregion


  //#region Ciclo De Vida 

  componentDidMount() {
    this.getReserva();
  }

  //#endregion

  //#region Reservas

  deletarReserva = (id) => {

    api.delete("Reserva/" + id)
      .then(() => {
        this.setState({ mensagemSucesso: "Uma reserva acabou de ser excluida!" })
        setTimeout(() => {
          this.getReserva()
        }, 1000)
      }
      ).catch(() => { this.setState({ mensagemErro: "Voce nao pode remover esta reserva no momento, aguarde ate ser cancelada" }) })
    setTimeout(() => {
      this.setState({ mensagemSucesso: "" })
      this.setState({ mensagemErro: "" })
    }, 1000)
  }

  getReserva = () => {
    api.get('Reserva/aa/' + parseJwt().idUsuario)
      .then(response => {
        if (response.status === 200) {
          this.setState({ listarReserva: response.data })
        }
      })
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

        {/* <table>

          <tbody id="tabela-corpo-lista">
            {
              this.state.listarReserva.map(
                function (e) {
                  return (

                    <tr key={e.idReserva}>
                      <br />
                      <td><strong>Oferta</strong> : {e.idOfertaNavigation.titulo} || </td>
                      <td><strong>Usuario</strong> : {e.idUsuarioNavigation.nomeRazaoSocial} || </td>
                      <td><strong>Quantidade</strong> : {e.quantidadeReserva} -- </td>
                      <td><strong>Cronometro</strong> : {e.cronometro}  --  </td>
                      <td><strong>Status</strong> : {e.statusReserva == 0 && "Fechada" || "Aberta"}  --  </td>
                      <td>
                        <button onClick={() => this.deletarReserva(e.idReserva)}>Deletar</button>
                      </td>

                    </tr>
                  )
                }.bind(this)
              )
            }

          </tbody>

        </table> */}

        <div className="container">

          <div className="titulo_gerenciamento">
            <p id="title_gerenciamento_de_produtos">- Gerenciamento de Reservas -</p>
          </div>

          <div className="tabela-produto">

            <div className="t">
              <div className="cabecalho-tb-reserva  titulo-reserva">
                <h3 className="titulo-tb-produto zera-margin titulo-reserva" >Suas Ofertas que foram reservadas</h3>
              </div>
            </div>


            <MDBTable striped className="tabela-body">
              <MDBTableHead className="table-head">
                <tr className="table-head">
                  <th>Oferta Reservada</th>
                  <th>Usuario</th>
                  <th>Documento</th>
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
                          <td>{r.idOfertaNavigation.titulo}</td>
                          <td>{r.idUsuarioNavigation.nomeRazaoSocial}</td>
                          <td>{r.idUsuarioNavigation.documento}</td>
                          <td>{r.quantidadeReserva}</td>
                          <td>R$  {r.idOfertaNavigation.preco}</td>
                          <td>R$  {r.idOfertaNavigation.preco * r.quantidadeReserva}</td>
                          <td>{r.cronometro}</td>
                          <td>{r.statusReserva == 0 && "Fechada" || "Aberta"}</td>
                          <td>
                            <button onClick={() => this.deletarReserva(r.idReserva)}>Deletar</button>
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
      </div>
    );
  }

}