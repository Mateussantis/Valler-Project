import React, {Component} from 'react';

import Header from '../../components/Header/header.js';

// export default class App extends Component() {
  
//   constructor(props) {
//     super(props);
//   }

//   render(){
//     return (
//       <div className="App">
//         <Header/>
//       </div>
//     );
//   }


// }

function App (props){
  return (
    <div className="App">
      <Header {...props} />
    </div>
  );
}

export default App;