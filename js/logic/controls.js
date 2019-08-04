let turn = {player: 2, start: true};

window.onload = function(){
      setBoard();

      document.getElementById('player-1-name').innerHTML = "Ngadou Yopa";
      document.getElementById('player-2-name').innerText = "Djomo Brown";

      let btn = document.getElementById('reset');
      btn.addEventListener('click', (event) => {

            event.currentTarget.innerText = "Reset";
            setBoard();

      });

      let text = "Player 1: "+document.getElementById('player-1-name').innerHTML + "!<br> Your turn to play";
      displayPlayer(text);

      playerTurn();
};

const setBoard = () => {

      /**********************************************
       *  Called at the beginning for the game or when both players want to reset the board
       *  Puts four (4) seeds in all the 12 holes
       *  Uses document query selector and jQuery to reinitialise
       */

      for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 7; j++) {
                  document.getElementById('player-'+i+'-'+j).innerHTML = "4";
            }
      }


};

const getState = () => {

      /**
       * When you need an information about the current state of the game
       * @return an object with all the values a{i} : number_of_seeds followed by b{i} : number_of_seeds
       * */

};

const getContent = (elem_id) => {

      /****************************************
       * Returns the number of seeds in a cell
       * @param {id} id of element we wish to get the content
       * @return {element} string representation of cell content
       * */

      let element = document.getElementById(elem_id).innerHTML;

      return element.toString();

};

const emptyCell = (empty_elem) => {
      document.getElementById(empty_elem).innerHTML = "0";
};

const distibute = (event) => {

      let id = event.currentTarget.id;
      const number = parseInt(getContent(id));
      emptyCell(id);

      const id_string = id.toString();

      (id_string.startsWith("player-2")) ? start = 0 : start = 6;

      const index = parseInt(id_string.substr(-1));

      let position;
      (start === 6) ? position = 7 - index + start : position = index + start;

      for (let i = 0; i < number; i++) {

            incrementCell(getid(position + i));

            if (i === number - 1){

                  const num = parseInt(getContent(getid(position + i)));

                  if (num === 2 || num === 3){
                        document.getElementById("score-"+turn.player).innerHTML = num;
                        incrementScore("score-"+turn.player, num);
                        incrementScore("player-"+turn.player+"-c", num);
                        emptyCell(getid(position + i));
                  }

            }

      }

      playerTurn();
};

const incrementCell = (id) => {

      const string_val = getContent(id);
      let int_val = parseInt(string_val);
      document.getElementById(id).innerHTML = ++int_val;

};

const incrementScore = (id, num_point) => {

      const string_val = getContent(id);
      let int_val = parseInt(string_val);
      document.getElementById(id).innerHTML = int_val + num_point;

};

const getid = (current_position) => {

      let id_string = "player-";

      (((current_position % 12) + 1) <= 6) ? id_string += "2-" : id_string += "1-";

      let end = "";

      if(id_string.startsWith("player-2")) {
            end = (((current_position % 6) + 1).toString())
      } else{
            let positn = 13 - ((current_position % 12) + 1);
            end =  positn.toString();
      }

      id_string += end;

      return id_string;
};

const activateRow = (num) => {
            for (let j = 1; j < 7; j++) {
                  const el = document.getElementById('player-'+num+'-'+j);
                  el.addEventListener("click", distibute);
                  el.style.cursor = "pointer";
            }
};

const deactivateRow = (num) => {
      for (let j = 1; j < 7; j++) {
            const el = document.getElementById('player-'+num+'-'+j);
            el.removeEventListener("click", distibute);
            el.style.cursor = "default";
      }
};

const displayPlayer = (text) => {
      document.getElementById('current_player').innerHTML = text;
      console.log(turn.player);
};

const playerTurn = () => {
      if (turn.player === 1) {
            activateRow(1);
            deactivateRow(2);
            if(turn.start){
                  turn.start = false;
            } else{
                  console.log("Player 2: "+document.getElementById('player-2-name').innerHTML + "!\n Your turn to play");
                  let text = "Player 2: "+document.getElementById('player-2-name').innerHTML + "!\n<br> Your turn to play";
                  displayPlayer(text);
            }
            turn.player = 2;
      }
      else{
            activateRow(2);
            deactivateRow(1);
            if(turn.start){
                  turn.start = false;
            } else{
                  console.log("Player 1: "+document.getElementById('player-1-name').innerHTML + "!\n Your turn to play");
                  let text = "Player 1: "+document.getElementById('player-1-name').innerHTML + "!<br> Your turn to play";
                  displayPlayer(text);
            }
            turn.player = 1;
      }
};

const fillCell = (id, n) => {
      let el = document.getElementById(id).innerHTML;
      el = "";
      for (let i = 0; i < n; i++) {
            el += "<svg height=\"16\" width=\"16\">\n" +
            "           <circle cx=\"8\" cy=\"8\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill=\"brown\" />\n" +
            "      </svg>";
      }

      document.getElementById(id).innerHTML = el;
}
