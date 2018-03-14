//list of questions
qList = [
    q0 = {
        question: "who is your daddy, and what does he do?",
        answer: "I'm detective John Kimble",
        wrongs: ["tumor", "also tumor", "ferret"],
    },

    q1 = {
        question: "Conan, what is best in life?",
        answer: "To crush your enemies, see them driven before you, and to hear the lamentations of their women.",
        wrongs: ["the open steppe", "fleet horse", "falcons at your wrist", "the wind in your hair"],
    },
];

let correct = 0;
let wrong = 0;
let qNum = 0; //what number question are we on
let qTimer;
let countdown;
let seconds;

function clock() {
    seconds--;
    $('#time').html('00:0' + (seconds - 1));
}

function nextQTimer() {
    clearInterval(countdown);    
    displayA();
    wrong++;
    setTimeout(nextQ, 3000);
}

//shuffle fx, not very efficient
function shuffle (arr) {
    let indices = [];
    let temp = [];
    while(temp.length < arr.length) {
        let x = Math.floor(Math.random() * arr.length)
        if(indices.indexOf(x) == -1) {
            temp.push(arr[x]);
            indices.push(x);
        }
    }
    return temp;
}

//fx to display question
function displayQ (num) {
    current = qList[num];
    $('#question').html('Question #' + (qNum + 1) + ": " + current.question);
    let answers = [];
    let x = $('<li>').attr("id", "correct").html(current.answer).on("click", function(){
        clearTimeout(qTimer);
        clearInterval(countdown);
        displayA();
        correct++;
        setTimeout(nextQ, 1000 * 3);
    });
    answers.push(x);

    for(let i=0; i < current.wrongs.length; i++) {
        x = $('<li>').attr("id", "incorrect").html(current.wrongs[i]).on("click", function(){
            clearTimeout(qTimer);
            clearInterval(countdown);
            displayA();
            wrong++;
            setTimeout(nextQ, 1000 * 3);
        });
        answers.push(x);        
    }


    //randomize answers
    answers = shuffle(answers);

    //send li answers to dom
    for(let i = 0; i < answers.length; i++) {
        $('#answers').append(answers[i]);
        $('#answers').append('<br>');
    }
}

//this shows the answers by changing the colors :D
function displayA() {
    $('li#correct').css("color", "green").off("click");
    $('li#incorrect').css("color", "red").off("click").fadeOut(2000);
}

function nextQ() {
    if (qNum < qList.length) {
        $('ul#answers').empty();
        displayQ(qNum);
        seconds = 6;
        $('#time').html('00:0' + (seconds - 1));
        qTimer = setTimeout(nextQTimer, 1000 * seconds);
        countdown = setInterval(clock, 1000);
        qNum++;    
    } else {
        endGame();
    }
}

//initialize the game
function playGame() {
    correct = 0; 
    wrong = 0;
    qNum = 0;
    qList = shuffle(qList);
    nextQ();
}

//show score and add button to play it again
function endGame() {
    $('#qDisplay').fadeOut('slow', function(){
        $('ul#answers').empty();
        $('#time').empty();
        $('#question').html("Game Over<br><br>Score: " + Math.round( (correct / (correct + wrong)) * 100 ) + '%<br>');
        $('<button>').html("Play Again?").on("click", function(){
            $('#qDisplay').fadeOut('slow', function(){
                $('button').remove();
                playGame();
                $('#qDisplay').fadeIn('slow');//fade in
            });//fade out
        }).appendTo('#qDisplay');
        $('#qDisplay').fadeIn();
    })
}

playGame();