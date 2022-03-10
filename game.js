var dice_value = 0;
var player_turn = 1;
const player_pos = [0, 0, 0, 0];
const player_round = [0, 0, 0, 0];
const rel_pos=Array.apply(null, Array(42)).map(function () {});
const player_money =[0,0,0,0];
for(let i=0;i<21;i++){
    rel_pos[i]=i;
}
for(let i=33;i<42;i++){
    rel_pos[i]=i-12;
}
for(let i=21;i<33;i++){
    rel_pos[i]=i+9;
}
document.getElementById('start').addEventListener("click", Play);
function Play() {
    console.log("Working");
    document.getElementById('heading').style.display = 'none';
    document.getElementsByClassName('gameArea')[0].style.display = 'flex';
    document.getElementById('GameFooter').style.display = 'flex';


    for (let i = 1; i <= 4; i++) {
        document.getElementsByClassName(`player${i}_icon`)[0].style.display = 'inline-block';
        document.getElementById(`Player${i}_Money`).innerHTML=player_money[i-1];
    }



}
document.getElementById("Dice_Roll").addEventListener('click', roll);
function roll() {
    
    dice_value = Math.ceil((Math.random() * 6));
    document.getElementById('dice').innerHTML = dice_value;
    document.getElementsByClassName(`player${player_turn}_icon`)[rel_pos[player_pos[`${player_turn-1}`]]].style.display = "none";
    player_pos[player_turn-1]+=dice_value;
    if(player_pos[player_turn-1]>41){
        player_round[player_turn-1]++;
        player_pos[player_turn-1]-=42;
    }
    document.getElementsByClassName(`player${player_turn}_icon`)[rel_pos[player_pos[`${player_turn-1}`]]].style.display ="inline-block";
    player_turn++;
    if(player_turn==5){
        player_turn=1;
    }
}