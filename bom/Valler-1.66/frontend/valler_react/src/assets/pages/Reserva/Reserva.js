import React, { Component } from 'react';
import Header from '../../components/Header/header';
import { api } from '../../services/api';

export default class Reserva extends Component {

  constructor() {

    super();

    this.state = {
      listarReservaFinalizada: []
    }
  }

  componentDidMount() {
    this.getReserva_finalizada();
  }

  //DELETE -- Reserva_finalizada
  
  deletarReserva = (id) =>  {
    console.log(id);
    
    api.delete("Reserva/"+ id)
    .then(response => {
       if( response.status === 200){
           console.log('Item deletado')
           setTimeout( () => {
               this.getReserva_finalizada()
           },1500)
          }
        }).catch (error => {
          console.log(error);
        })
    
   }


  // GET -- Reserva_finalizada
  getReserva_finalizada = () => {
    api.get('Reserva')
      .then(response => {
        if (response.status === 200) {
          this.setState({ listarReservaFinalizada: response.data })
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
              this.state.listarReservaFinalizada.map(
                function (e) {
                  return (

                    <tr key={e.idReserva}>
                      
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