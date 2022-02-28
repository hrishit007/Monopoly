var dice_value=0;

document.getElementById('start').addEventListener("click",Play);
function Play() {
    console.log("Working");
    document.getElementById('heading').style.display='none';
    document.getElementsByClassName('gameArea')[0].style.display='flex';
    document.getElementById('GameFooter').style.display='flex';
}
document.getElementById("Dice_Roll").addEventListener('click',roll);
function roll() {
    console.log("Working");
    dice_value=Math.ceil((Math.random()*6));
    document.getElementById('dice').innerHTML=dice_value;
}