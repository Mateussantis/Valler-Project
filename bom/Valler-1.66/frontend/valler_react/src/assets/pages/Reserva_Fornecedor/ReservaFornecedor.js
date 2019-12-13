import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api } from '../../services/api';
import { parseJwt } from '../../services/auth';

export default class ReservaFornecedor extends Component {

  constructor() {
    super();
    this.state = {
      listarReserva: [],
      idUsuario: parseJwt().idUsuario
    }
  }

  componentDidMount() {
    this.getReserva();
  }

  //DELETE -- Reserva

  deletarReserva = (id) => {
    console.log(id);

    api.delete("Reserva/" + id)
      .then(response => {
        if (response.status === 200) {
          console.log('Item deletado')
          setTimeout(() => {
            this.getReserva()
          }, 1500)
        }
      }).catch(error => {
        console.log(error);
      })

  }


  // GET -- Reserva_finalizada
  getReserva = () => {
    api.get('Reserva/aa/' + parseJwt().idUsuario)
      .then(response => {
        if (response.status === 200) {
          this.setState({ listarReserva: response.data })
        }
      })
  }

  render() {
    return (
      <div>

        <Header />

        <table>

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

        </table>

      </div>
    );
  }

}