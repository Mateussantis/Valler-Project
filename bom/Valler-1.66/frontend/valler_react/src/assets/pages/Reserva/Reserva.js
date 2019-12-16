import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api } from '../../services/api';
import { parseJwt } from '../../services/auth';
import Alert from 'react-bootstrap/Alert';

export default class Reserva extends Component {

  //#region Construtor

  constructor() {
    super();
    this.state = {
      listarReserva: [],
      idUsuario: parseJwt().idUsuario,

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
    }, 1500)
  }

  getReserva = () => {
    api.get('Reserva/a/' + parseJwt().idUsuario)
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
          <Alert variant="danger" dismissible>
            <Alert.Heading>Opss, parece que houve um problema!</Alert.Heading>
            <p>
              {this.state.mensagemErro}
            </p>
          </Alert>
        }

        {
          this.state.mensagemSucesso &&
          <Alert variant="success" dismissible>
            <Alert.Heading>Que bom, sua operação foi realizada com sucesso!</Alert.Heading>
            <p>
              {this.state.mensagemSucesso}
            </p>
          </Alert>
        }

        <table>

          <tbody id="tabela-corpo-lista">
            {
              this.state.listarReserva.map(
                function (e) {
                  return (

                    <tr key={e.idReserva}>
                      <br />
                      <td><strong>Oferta</strong> : {e.idOfertaNavigation.titulo} || </td>
                      <td><strong>Mercado</strong> : {e.idOfertaNavigation.idProdutoNavigation.idUsuarioNavigation.nomeRazaoSocial} || </td>
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

        </table>

      </div>
    );
  }
}