import React, { Component } from 'react';

import Header from '../../components/Header/header';
import api from '../../services/api';

export default class reserva extends Component{

    constructor(){
        super();

        this.state = {
            listarReservaAtiva: [],
        }
    }

    getReservaAtiva= () =>{
        api.Axios
    }

    render(){

        
        return(
            <div>
                <Header/>

                
            </div>
        );
    }

    
}