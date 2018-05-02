# Trivia-Game

## Overview
This is a time-based trivia game for the browser that gives the player 30 seconds to answer a multiple choice question before moving to the next question. After the player makes a choice or if the timer runs out, the player receives feedback telling them if they were correct or incorrect, shown the actual answer along with the rationale explaining it. After the game asks all the questions, the player is scored and shown a percentage they answered correctly and is prompted to play again.

The game runs through an array of question objects that contain all the data for the question including answers, dummy answers, and the rationale. In this way, the game could be fed any series of multiple choice questions, and questions can be expanded/edited easily.

## Technologies
* Javascript
* jQuery
* HTML
* CSS

## Challenges
<ul><li>Coming up with a unique format to ask questions proved challenging. Faced with choosing between displaying all questions at once or multiple on a page, I chose to stick with displaying one question at a time to focus the user on the current question, correct answer and rationale. I felt this was a more engaging way to present the questions and drew the user's eyes to each question/answer as they were displayed.</li>

Styling the game also proved challenging. While I would like to make the UI as beautiful and detailed as possible, I also had to balance that against distracting the player from focusing on the questions themselves. In the end I chose a minimalist format that looked presentable but also focused mainly on the question content.</li></ul>

## Future Plans
* I would like to improve the display on mobile devices, maximizing the question space and increasing the display length of questions and answers.
* I would like to include code that allowed the game to pull questions from an API with Ajax so that any number of questions or perhaps different categores of questions could be displayed.
