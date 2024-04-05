import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
    console.log("Let's start");

    adjectives = JSON.parse(getAdjectives());
    console.log(adjectives);
    render();
    addSortEvents();
}

function addSortEvents() {
    document.querySelector('#sort-up').addEventListener('click', function (event) {
        this.classList.add('active');
        document.querySelector('#sort-down').classList.remove('active');
        console.log("Sort up!");
        sortDirection = "up";
        sort();
    });

    document.querySelector('#sort-down').addEventListener('click', function () {
        this.classList.add('active');
        document.querySelector('#sort-up').classList.remove('active');
        console.log("Sort down!");
        sortDirection = "down";
        sort();
    });

}

function addVoteEvents() {
    const upvoteButtons = document.querySelectorAll('.upvote-button');
    upvoteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            console.log(event.target);
            upVote(event.target);
        })
    });

    const downvoteButtons = document.querySelectorAll('.downvote-button');
    downvoteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            console.log(event.target);
            downVote(event.target);
        })
    })
}

function sort() {
    console.log("This is the sorting function");

    if (sortDirection == 'down') {
        adjectives.sort(function (a, b) {
            if (a.score > b.score) {
                return -1
            } else {
                return 1
            }
        });
    } else {
        adjectives.sort(function (a, b) {
            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        });
    }

    render();
}

function render() {
    console.log("render!");

    //create htmlstring
    let htmlString = '';

    adjectives.forEach(function (adjective) {
        let scoreClass = 'bad';
        if (adjective.score >= 6) {
            scoreClass = 'good';
        }

        htmlString += `
        <div class="word-item">
            <span class="word-score ${scoreClass}">${adjective.score}</span>
            <span>${adjective.word}</span>
            <div class="vote-buttons">
                <button value="${adjective.word}" class="upvote-button">👍</button>
                <button value="${adjective.word}" class="downvote-button">👎</button>
            </div>
        </div>
        `;
    })

    //add htmlString to HTML
    document.querySelector('#container').innerHTML = htmlString;

    addVoteEvents();
}

function upVote(target) {
    console.log("Upvote", target.value);
    updateScore(target.value, 0.1);
    render();
}


function downVote(target) {
    console.log("Downvote", target.value);
    updateScore(target.value, -0.1);
    render();
}

function updateScore(word, scoreChange) {
    const foundIndex = adjectives.findIndex(function (item, index) {
        if (item.word == word) {
            return true
        }
    });

    if (foundIndex != null) {
        let newScore = adjectives[foundIndex]['score'] + scoreChange;
        adjectives[foundIndex]['score'] = Math.round(newScore * 100) / 100;
    }
}

init();