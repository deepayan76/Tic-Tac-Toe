let box  = document.querySelectorAll(".box");
let rsetbtn = document.querySelector("#reset");
let container = document.querySelector(".win-game");
let newgamebtn = document.querySelector("#new-game");
let winmsg = document.querySelector("#winner-msg");
let game = document.querySelector("main");

let playero = true;

let winpattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

box.forEach((box)=>{
    box.addEventListener("click", () =>{
        if (playero) {
            box.innerHTML = "X";
            playero = false;
        }
        else {
            box.innerHTML = "O";
            playero = true;
        }
        box.disabled = true;

        chekwinner();
    })
});

let resetbtn = () =>{
    for (let boxes of box) {
        boxes.innerHTML = "";
        boxes.disabled = false;
    }
}

let newGamebtn = () =>{
    container.classList.add("hidden");
    resetbtn();
}



const newwinner = (winner) =>{
    winmsg.innerHTML = `Congratulation Winner is ${winner}`;
    container.classList.remove("hidden");
    disabledbox();
}

const disabledbox = () =>{
    for (let boxes of box) {
        boxes.disabled = true;
    }
}

const chekwinner= () =>{
    for (let pattersn of winpattern) {
        let pos1val = box[pattersn[0]].innerHTML;
        let pos2val = box[pattersn[1]].innerHTML;
        let pos3val = box[pattersn[2]].innerHTML; 

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                newwinner(pos1val);
            }
        }
    }
}

rsetbtn.addEventListener("click", resetbtn);
newgamebtn.addEventListener("click", newGamebtn);

