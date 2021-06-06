// selecting all required elements
const selectBox = document.querySelector(".select-box"),
    selectXbtn = selectBox.querySelector(".playerX"),
    selectObtn = selectBox.querySelector(".playerO"),
    playboard = document.querySelector(".play-board"),
    xturn=playboard.querySelector(".Xturn"),    
    oturn=playboard.querySelector(".Oturn"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { //once window loaded.
    for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all section's span.
        allBox[i].setAttribute("onClick", "clickedBox(this)");
    }
    selectXbtn.onclick = () => {
        selectBox.classList.add("hide"); // hide the select box on clicking playerX button.
        playboard.classList.add("show"); // show the playboard section on clicking playerX button.
    }
    selectObtn.onclick = () => {
        xturn.innerHTML=`O's turn`;
        oturn.innerHTML=`X's turn`;
        selectBox.classList.add("hide"); // hide the select box on clicking playerO button.
        playboard.classList.add("show"); // show the playboard section on clicking playerO button.
        players.setAttribute("class", "players player");
    }
}

let playerXIcon = "fas fa-times"; // class name of fontawesome cross icon.
let playerOIcon = "far fa-circle"; // class name of fontawesome circle icon.
let playerSign = "X"; // suppose player will b X.
let runBot = true;

// user click functon

function clickedBox(element) {
    if (players.classList.contains("player")) { // if players element has contains .players .
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element.
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }
    else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element.
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // calling the winner function. 
    playboard.style.pointerEvents = "none"; // once user selects the box then user can't select any other box until bot selects.
    element.style.pointerEvents = "none"; // once user selects any box it can not be selected again.
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // generating random time delay so bot delay randomly to select box.
    setTimeout(() => {
        bot(runBot); // calling bot function.
    }, randomDelayTime); // passing random delay time.
}

// bot click function

function bot(runBot) {
    if (runBot) { // if runBot is true then run the following code.
        playerSign = "X";
        let array = []; // creating empty array....we'll store unselected box index in this array.
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { // if span does not have any element.
                array.push(i); // inserting unclicked or unselected box insisde array means that span has no children.
                // console.log(i +" "+ "has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select from box. 
        if (array.length > 0) {
            if (players.classList.contains("player")) { // if players element has contains .players .
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element.
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element.
                playerSign = "O";
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); // calling the winner function.
             
        }
        allBox[randomBox].style.pointerEvents = "none"; // once bot selects any unselected  box then user will not be able to select that box.
        playboard.style.pointerEvents = "auto"; // once user selects the box then user can't select any other box until bot selects.
        playerSign = "X";

    }
}

// lets work on selecting the winner.

function getId(idname) {
    return document.querySelector(".box" + idname).id; // returning id name.
}

function checkId(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign)
        return true;
}

function selectWinner() { // if there is any matching combination then select the winner. 
    if (checkId(1, 2, 3, playerSign) || checkId(4, 5, 6, playerSign) || checkId(7, 8, 9, playerSign) || checkId(1, 4, 7, playerSign) || checkId(2, 5, 8, playerSign) || checkId(3, 6, 9, playerSign) || checkId(1, 5, 9, playerSign) || checkId(3, 5, 7, playerSign)) {
        console.log(playerSign + " is the winner");
        // once match won by someone then stop the bot.
        runBot = false;
        bot(runBot);
        setTimeout(() => { // we'll delay to show the result
            playboard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // 700 ms delay.
        // lets show the result box with the winner sign

        wonText.innerHTML = `player <p>${playerSign}</p> won the game!`;
    }
    else {
        // if match has drawn
        // first we'll check all id...if all span has same id and no one won the game then we'll draw the game.
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => { // we'll delay to show the result
                playboard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); // 700 ms delay.
            // lets show the result box with the winner sign

            wonText.innerHTML = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // reload the current page
}