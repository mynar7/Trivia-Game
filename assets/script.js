//list of questions
qList = [
    q0 = {
        question: "Who was the original creator of Batman?",
        answer: "Bob Kane",
        wrongs: ["Stan Lee", "Jack Kirby", "Grant Morrison"],
        explain: 'Bob Kane (1915-1998) created the character "Batman" in 1939.',
    },

    q1 = {
        question: "Who was the original Robin?",
        answer: "Dick Grayson",
        wrongs: ["Tim Drake", "Damian Wayne", "Jason Todd"],
        explain: 'Dick Grayson became the original Robin in April 1940. Bob Kane and Bill Finger were inspired by Sherlock Holmes\' sidekick Watson, and "Robin Hood." The two thought it would be interesting for Batman to have someone to talk to.',
    },

    q2 = {
        question: "In what title did 'Batman' originally appear?",
        answer: "Detective Comics",
        wrongs: ["Action Comics", "Batman", "The Brave and the Bold"],
        explain: "Batman first appeared in <i>Detective Comics</i> #27 in May 1939",
    },

    q3 = {
        question: "What Famous Celebrity penned the Batman Comic Arc <i>Cacophony</i>?",
        answer: "Kevin Smith",
        wrongs: ["George Clooney", "Matt Damon", "Ben Affleck"],
        explain: "Kevin Smith wrote <i>Cacophony</i> with his friend Walt Flanagan from November 2008 through March 2009. ",
    },

    q4 = {
        question: "What was Two-Face's profession before he became a criminal?",
        answer: "District Attorney",
        wrongs: ["Judge", "Mayor", "Plumber"],
        explain: "Two-face was once Gotham City's District Attorney. He Was hideously scarred after a mob boss threw acidic chemicals at him during a trial. Two-face first appeared in <i>Detective Comics</i> #66.",
    },
    
];

let correct = 0;
let wrong = 0;
let qNum = 0; //what number question are we on
let qTimer; //var for timer fx so clearTimeout can be used
let countdown; //fx for countdown clock timer
let seconds; //seconds modified each call of countdown
let secondsMax = 30; //seconds for each question
let answerTime = 10; //time answer is displayed

//writes clock
function clock() {
    seconds--;
    if(seconds <= 10) {
        $('#time').html('00:0' + (seconds - 1));
    } else if (seconds > 10) {
        $('#time').html('00:' + (seconds - 1));        
    }
}

//fx for what happens when time runs out
function nextQTimer() {
    clearInterval(countdown);    
    displayA(qList[qNum - 1].explain);
    wrong++;
    setTimeout(nextQ, 1000 * answerTime);
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
    //set q to this q
    current = qList[num];
    $('#question').html('Question #' + (qNum + 1) + ": " + current.question);
    //make array of answers to be displayed
    let answers = [];
    //make right answer and add it with callback fx
    let x = $('<li>').attr("id", "correct").html(current.answer).on("click", function(){
        clearTimeout(qTimer);
        clearInterval(countdown);
        displayA(current.explain, true);
        correct++;
        setTimeout(nextQ, 1000 * answerTime);
    });
    answers.push(x);
    //make decoy answers and add callback fx to handle wrong answer
    for(let i=0; i < current.wrongs.length; i++) {
        x = $('<li>').attr("id", "incorrect").html(current.wrongs[i]).on("click", function(){
            clearTimeout(qTimer);
            clearInterval(countdown);
            displayA(current.explain, false);
            wrong++;
            setTimeout(nextQ, 1000 * answerTime);
        });
        answers.push(x);        
    }


    //randomize answers
    answers = shuffle(answers);

    //send li answers to dom
    for(let i = 0; i < answers.length; i++) {
        $('#answers').append(answers[i]);
    }
}

//this shows the answers by changing the colors :D
function displayA(str, bool) {
    let choice = '<span class="choice" style="color:rgb(113,1,255)">Time\'s Up! </span>';
    switch(bool) {
        case true:
        choice = '<span class="choice" style="color:rgb(1,255,2)">That\'s Right! </span>';
        break;
        case false:
        choice = '<span class="choice" style="color:rgb(255,1,1)">Wrong! </span>';
        break;
        default:
        break;
    }
    $('li#correct').css("color", "rgb(1,255,2)").off("click");
    $('li#incorrect').css("color", "red").off("click").fadeOut(2000);
    $('#time').fadeOut(2000);
    setTimeout(function(){
        $('li#incorrect').remove();
        $('<p>').html(choice + str).hide().appendTo('#answers').fadeIn(2000);
    }, 2000);
}

function nextQ() {
    if (qNum < qList.length) {
        $('ul#answers').empty();
        displayQ(qNum);
        seconds = secondsMax;
        $('#time').show().html('00:' + (seconds - 1));
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
