var dice_value = 0;
var player_turn = 1;


const player_pos = [0, 0, 0, 0];
const player_round = [0, 0, 0, 0];
const player_money = [100000, 100000, 100000, 100000];
const place_buy_cost = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
const place_rent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
const place_name = ["Start", "Mumbai", "Community Chest", "Water Works", "Railways", "Ahmedabad", "Income Tax", "Indore", "Chance", "Jaipur", "Roorkee", "Jail", "Delhi", "Chance", "Chandigadh", "Electric Company", "B.E.S.T", "Shimla", "Amritsar", "Community Chest", "Srinagar", "Club", "Agra", "Chance", "Kanpur", "Patna", "Darjeeling", "Rajkot", "Air India", "Calcutta", " Community Chest", "Hyderabad", "Rest House", "Madras", "Community Chest", "Bangalore", "Wealth Tax", "Ooty", "Cochin", "Motor Boat", "Chance", "Goa"];
const player_name = ["Player1", "Player2", "Player3", "Player4"];

const bought = Array.apply(null, Array(42)).map(function () { });
for (let i = 0; i < 42; i++) {
    bought[i] = false;
}
const boughtBy = Array.apply(null, Array(42)).map(function () { });


const rel_pos = Array.apply(null, Array(42)).map(function () { });
for (let i = 0; i < 21; i++) {
    rel_pos[i] = i;
}
for (let i = 33; i < 42; i++) {
    rel_pos[i] = i - 12;
}
for (let i = 21; i < 33; i++) {
    rel_pos[i] = i + 9;
}


const noBuy = document.getElementById('place_not_bought');
const Buy = document.getElementById('place_bought');


document.getElementById('start').addEventListener("click", Play);
function Play() {
    console.log("Working");
    document.getElementById('heading').style.display = 'none';
    document.getElementsByClassName('gameArea')[0].style.display = 'flex';
    document.getElementById('GameFooter').style.display = 'flex';
    document.getElementById('Start').innerHTML += place_name[0];
    for (let i = 1; i <= 41; i++) {
        document.getElementById(`box_${i}`).innerHTML += place_name[i];
    }
    for (let i = 1; i <= 4; i++) {
        document.getElementsByClassName(`player${i}_icon`)[0].style.display = 'inline-block';
    }
    display_money();

}
function display_money() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`Player${i}_Money`).innerHTML = player_money[i - 1];
    }
}

document.getElementById("Dice_Roll").addEventListener('click', roll);
function roll() {

    dice_value = Math.ceil((Math.random() * 6));
    document.getElementById('dice').innerHTML = dice_value;
    document.getElementsByClassName(`player${player_turn}_icon`)[rel_pos[player_pos[`${player_turn - 1}`]]].style.display = "none";
    player_pos[player_turn - 1] += dice_value;
    if (player_pos[player_turn - 1] > 41) {
        player_round[player_turn - 1]++;
        player_pos[player_turn - 1] -= 42;
    }
    document.getElementsByClassName(`player${player_turn}_icon`)[rel_pos[player_pos[`${player_turn - 1}`]]].style.display = "inline-block";
    document.getElementById('overlay').style.display = "block";
    var pos = player_pos[player_turn - 1];
    if (pos == 2 || pos == 19 || pos == 30 || pos == 34) {
        // Community Chest
        console.log("Community");
            document.getElementById('comm_chest').style.display ="block";
            document.getElementsByClassName('player_name')[2].innerHTML = player_name[player_turn - 1];
            document.getElementsByClassName('place')[2].innerHTML = place_name[player_pos[player_turn - 1]];
            document.getElementById('dice_roll_comm').addEventListener('click',comm());
    }
    else if (pos == 8 || pos == 13 || pos == 23 || pos == 40) {
        // Chance
        document.getElementById('chance').style.display ="block";
            document.getElementsByClassName('player_name')[3].innerHTML = player_name[player_turn - 1];
            document.getElementsByClassName('place')[3].innerHTML = place_name[player_pos[player_turn - 1]];
            document.getElementById('dice_roll_chance').addEventListener('click',chance());
    }
    else if (pos == 6) {
        // income tax
        document.getElementById('itax').style.display="block";
        player_money[player_turn-1]-=5000;
        document.getElementById('ok_button_itax').addEventListener('click',okitax);
    }
    else if (pos == 11) {
        // Jail
        document.getElementById('jail').style.display="block";
        player_money[player_turn-1]-=500;
        document.getElementById('ok_button_jail').addEventListener('click',okjail);
    }
    else if (pos == 21) {
        // club
        document.getElementById('club').style.display="block";
        player_money[player_turn-1]-=2000;
        for( let i=0;i<4;i++){
            player_money[i]+=500;
        }
        document.getElementById('ok_button_club').addEventListener('click',okclub);

    }
    else if (pos == 32) {
        // Rest house
        document.getElementById('rest').style.display="block";
        player_money[player_turn-1]-=5000;
        document.getElementById('ok_button_rest').addEventListener('click',okrest);
    }
    else if (pos == 0) {
        //Start
    }
    else {
        if (bought[player_pos[player_turn - 1]] == false) {

            noBuy.style.display = "block";
            document.getElementsByClassName('player_name')[0].innerHTML = player_name[player_turn - 1];
            document.getElementsByClassName('place')[0].innerHTML = place_name[player_pos[player_turn - 1]];
            document.getElementById('place_cost').innerHTML = place_buy_cost[player_pos[player_turn - 1]];
            document.getElementById('buy').addEventListener('click', buy);

        }
        else {
            Buy.style.display = "block";
            document.getElementsByClassName('player_name')[1].innerHTML = player_name[player_turn - 1];
            document.getElementsByClassName('place')[1].innerHTML = place_name[player_pos[player_turn - 1]];
            document.getElementById('rent').innerHTML = place_rent[player_pos[player_turn - 1]];
            document.getElementById("player_bought_place").innerHTML = player_name[boughtBy[player_pos[player_turn - 1]] - 1];
            document.getElementById('pay').addEventListener('click', pay_rent);
        }
    }
}
function buy() {
    if (player_money[player_turn - 1] > place_buy_cost[player_pos[player_turn - 1]]) {
        bought[player_pos[player_turn - 1]] = true;
        boughtBy[player_pos[player_turn - 1]] = player_turn;
        player_money[player_turn - 1] -= place_buy_cost[player_pos[player_turn - 1]];
        display_money();
    }
    document.getElementById('overlay').style.display = "none";
    noBuy.style.display = "none";
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function pay_rent() {
    document.getElementById('overlay').style.display = "none";
    Buy.style.display = "none";
    player_money[player_turn - 1] -= place_rent[player_pos[player_turn - 1]];
    player_money[boughtBy[player_pos[player_turn - 1]] - 1] += place_rent[player_pos[player_turn - 1]];
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function comm(){
    var number=Math.ceil(6*Math.random());
    const comm_change=[2000,2500,-1000,-2000,-1500,3000];
    player_money[player_turn-1]+=comm_change[number-1];
    document.getElementById('comm_chest').style.display ="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function chance(){
    var number=Math.ceil(6*Math.random());
    const comm_change=[2000,2500,-1000,-2000,-1500,3000];
    player_money[player_turn-1]+=comm_change[number-1];
    document.getElementById('chance').style.display ="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function okitax(){
    document.getElementById('itax').style.display="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function okjail(){
    document.getElementById('jail').style.display="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function okclub(){
    document.getElementById('club').style.display="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}
function okrest(){
    document.getElementById('rest').style.display="none";
    display_money();
    player_turn++;
    if (player_turn == 5) {
        player_turn = 1;
    }
}