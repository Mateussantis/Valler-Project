import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import geren_p from './assets/pages/Gerenciamento_produtos/gerenciamento_produtos';
// import './index.css';
import App from './assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';
import './assets/css/style.css';
import './assets/css/uikit-rtl.css';
import './assets/css/uikit-rtl.min.css';
import './assets/css/uikit.css';
import './assets/css/uikit.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/geren_p" component={geren_p}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
