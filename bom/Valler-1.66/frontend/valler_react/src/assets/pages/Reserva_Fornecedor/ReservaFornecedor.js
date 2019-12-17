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
        this.setState({mensagemSucesso: "Uma reserva acabou de ser excluida!"})
        setTimeout(() => {
          this.getReserva()
        }, 1000)
      }
      ).catch(() => {this.setState({mensagemErro: "Voce nao pode remover esta reserva no momento, aguarde ate ser cancelada"})})
      setTimeout(() => {
        this.setState({mensagemSucesso: ""})   
        this.setState({mensagemErro: ""}) 
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

        <div className="container">
                        <MDBTable striped bordered>
                            <MDBTableHead>
                                <tr>
                                    <th>Oferta Reservada</th>
                                    <th>Usuario</th>
                                    <th>Quantidade</th>
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
                                                    <td>{r.quantidadeReserva}</td>
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

                        </MDBTable>

                    </div>

      </div>
    );
  }

}