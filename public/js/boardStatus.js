const updateTokenPos = function(positions){
  positions.forEach((char)=>{
    let name = char.name;
    if(!char.start){
      let id = name.split(' ').pop().toLowerCase();
      updateCharPosition(id, char.position);
    }
  });
};

const updateCharPosition = function(id,pos){
  let posElement = document.getElementById(`${pos}`);
  let posX = posElement.getAttribute('x');
  let posY = posElement.getAttribute('y');
  document.getElementById(`${id}`).setAttribute('cx',+posX + 15);
  document.getElementById(`${id}`).setAttribute('cy',+posY + 15);
};

const showBoardStatus = function() {
  let path = getBaseUrl();
  sendAjaxRequest('get',`${path}/boardstatus`,(res)=>{
    let charPositions = JSON.parse(res);
    updateTokenPos(charPositions);
  });
};

const enableRollDice = function(){
  document.querySelector('#activity-box').innerHTML = `<div class="popup">
    <button class="rolldice" onclick="rollDice()">Roll Dice</button>
    </div>`;
};

const rollDice = function(){
  let url= getBaseUrl();
  sendAjaxRequest('get',`${url}/rolldice`,(res)=>{
    let dice = JSON.parse(res);
    document.querySelector('#message-box')
      .innerHTML = `<div>You got ${dice.error || dice.value}</div>`;
  });
};

const getBaseUrl = function(){
  return window.location.pathname.replace(/\/$/,'');
};

window.addEventListener('load',()=>{
  setInterval(showBoardStatus,3000);
});
