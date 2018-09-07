import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



//COMPONENTE 1
/* class Square extends React.Component {
  //4.- usaremos .state para recordarle cosas al componente en un constructor
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

  }
  render() {
    return (
      //3.- agregar
      //3.-<button className="square">
      <button className="square"
        onClick={() => this.props.onClick()}
      >
        {/*ñ}

        {/* 2.-{recibimos el valor de "value = {i}"} }
        {this.props.value}
      </button>
    );
  }
} */



//remplazamos la clase Squere con la funcion siguiente
//En una clase, usamos una función de flecha para acceder 
//al valor correcto de este, pero en un componente funcional
// no tenemos que preocuparnos por esto.
function Square(props) {

  return (
    <button className='square' onClick={props.onClick}> {props.value} </button>
  );

}




//COMPONENTE 2 PADRE 
class Board extends React.Component {

  /*  //5.-ponemos el state inicial que contenga un array{9} nulls 
   //5.-que esos 9 nulos corresponden los 9 squares
   constructor(props) {
     super(props);
     this.state = {
       squares: Array(9).fill(null),
       //ponemos por default en el board que X sea inicial con un booleano
       xIsNext: true,
     }
   } */

  //9.-definimos un "manejador de click" al board
  //ahora el estado es guardado en el componente BOARD en vez de componentes
  //individuales cuadrados
  //los componentes Square ahora son componentes controlados...
  // el  componente board tiene control total sobre ellos.
  //SLICE CREA UNA COPIA DEL ARRAY para no modificar la matriz
  /* //2 formas de cambiar la informacion mutar los datos cambiando
  // directamente los valores de los datos. 
  //El segundo enfoque es reemplazar los datos con una nueva copia que 
  //tenga los cambios deseados. */

  //EJEMPLO DE MUTACION DIRECTA Y NO DIRECTA POR COPIA
  /*    Evitar la mutación de datos directos nos permite mantener intactas 
     las versiones anteriores de la historia del juego y reutilizarlas
      más adelante.
*/
  handleClick(i) {

    // console.log(this.state.xIsNext )

    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,

    });

  }
  renderSquare(i) {
    //1.-pasa la propiedad "value = {i}" al componente SQUARE 
    //1.-return <Square />;
    // return <Square value={i}/>;
    //6.-modificamos para que lea de un state
    return <Square
      value={this.props.squares[i]}
      //7.- se llamará a esta funcion cuando un cuadrado es clickeado
      onClick={() => this.props.onClick(i)}
    />;
    //se cambio el onclick por this.props.onclick
  }

  render() {






    
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    }
    //const status = 'Sigue :' + (this.state.xIsNext ? 'El duy': 'El cebas');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//COMPONENTE 3
class Game extends React.Component {

  //un constructor para ver la historia del juego
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }


  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
