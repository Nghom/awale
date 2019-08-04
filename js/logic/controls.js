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
      fillCell();
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

      getnumber();

      let skip = false;

      let id = event.currentTarget.id;
      let number = parseInt(getContent(id));

      if (number === 0) {
            return 0;
      }

      if (number >= 12){
            ++number;
            skip = true;
      }

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
                        if (getid(position + i).startsWith("player-1") && turn.player === 2){
                              break;
                        } else if (getid(position + i).startsWith("player-2") && turn.player === 1){
                              break;
                        } else {
                              incrementScore("score-" + turn.player, num);
                              incrementScore("player-" + turn.player + "-c", num);
                              emptyCell(getid(position + i));
                        }
                  }
            }

      }

      if(skip){
            emptyCell(id);
      }

      if(checkLoss()){
            alert("Player " + turn.player +" Won !");
            return 0;
      }

      playerTurn();
      fillCell();
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
                  let text = "Player 1: "+document.getElementById('player-1-name').innerHTML + "!<br> Your turn to play";
                  displayPlayer(text);
            }
            turn.player = 1;
      }
};

const addToolTip = (id, num) => {

};

const fillCell = () => {

      let el;

      for (let j = 1; j < 3; j++) {

            for (let k = 1; k < 7; k++) {

                  el = document.getElementById("player-"+j+"-"+k).innerHTML;
                  let nn = parseInt(getContent("player-"+j+"-"+k));

                  el = "";

                  for (let i = 0; i < nn; i++) {
                        if (i > 19) {
                              el += "+";
                              break;
                        }
                        el += "<svg height=\"16\" width=\"16\">\n" +
                              "           <circle cx=\"8\" cy=\"8\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill=\"#2F4F4F\" />\n" +
                              "      </svg>";
                  }
                  document.getElementById("player-"+j+"-"+k).innerHTML = el;
            }

            el = document.getElementById("player-"+j+"-c").innerHTML;
            let n = parseInt(getContent("player-"+j+"-c"));

            el = "";

            for (let i = 0; i < n; i++) {
                  el += "<svg height=\"16\" width=\"16\">\n" +
                        "           <circle cx=\"8\" cy=\"8\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill=\"#2F4F4F\" />\n" +
                        "      </svg>";
            }
            document.getElementById("player-"+j+"-c").innerHTML = el;

      }

      //el =+ "<span class=\"tooltiptext\">Tooltip text</span>";
      //console.log(el);
};

const checkLoss = () => {

      let n;

      (turn.player === 1) ? n = 1 : n = 2;

      for (let j = 1; j < 7; j++) {
            if(document.getElementById('player-'+n+'-'+j).innerHTML != "0"){
                  return false;
            }
      }

      return true;
};

const getnumber = () => {
      let el;

      for (let j = 1; j < 3; j++) {

            for (let k = 1; k < 7; k++) {
                  document.getElementById("player-"+j+"-"+k).innerHTML = document.getElementById("player-"+j+"-"+k).childElementCount;
            }

            document.getElementById("player-"+j+"-c").innerHTML = document.getElementById("player-"+j+"-c").childElementCount;

      }
};
