import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api } from '../../services/api';
import { parseJwt } from '../../services/auth';

export default class Reserva extends Component {

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
  
  deletarReserva = (id) =>  {
    console.log(id);
    
    api.delete("Reserva/"+ id)
    .then(response => {
       if( response.status === 200){
           console.log('Item deletado')
           setTimeout( () => {
               this.getReserva()
           },1500)
          }
        }).catch (error => {
          console.log(error);
        })
    
   }


  // GET -- Reserva_finalizada
  getReserva = () => {
    api.get('Reserva/a/'+parseJwt().idUsuario)
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
                      <br/>
                      <td>{e.idReserva} | </td>
                      <td>{e.idOfertaNavigation.titulo} | </td>
                      <td>{e.idUsuarioNavigation.nomeRazaoSocial} | </td>
                      <td>{e.quantidade_reserva} | </td>
                      <td>{e.cronometro}  |  </td>
                      <td>{e.status_reserva}  --  </td>
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