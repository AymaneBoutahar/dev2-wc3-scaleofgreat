import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
    adjectives = JSON.parse(getAdjectives());
    addSortEvents();
    render();
}

function addSortEvents() {
    document.querySelector('#sort-up').addEventListener('click', function () {
        sortDirection = "up";
        document.querySelector('#sort-down').classList.remove('active');
        this.classList.toggle('active');
        sort();
        render();
    });

    document.querySelector('#sort-down').addEventListener('click', function () {
        sortDirection = "down";
        console.log('down', this);
        document.querySelector('#sort-up').classList.remove('active');
        this.classList.toggle('active');
        sort();
        render();
    })
}

function addVoteEvents() {
    document.querySelectorAll('.upvote-button').forEach(el => {
        el.addEventListener('click', (e) => {
            upVote(e.target.value)
        })
    })

    document.querySelectorAll('.downvote-button').forEach(el => {
        el.addEventListener('click', (e) => {
            downVote(e.target.value)
        })
    })
}

function sort() {
    if (sortDirection == 'down') {
        adjectives.sort(function (a, b) {
            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        })
    } else {
        adjectives.sort(function (a, b) {
            if (a.score > b.score) {
                return -1
            } else {
                return 1
            }
        })
    }
}

function render() {
    let htmlString = '';

    adjectives.forEach(function (item) {
        let rate = 'bad';
        if (item.score >= 6) {
            rate = 'good';
        }
        htmlString += `
            <div class="word-item">
            <span class="word-score ${rate}">${item.score}</span>
            <span>${item.word}</span>
            <div class="vote-buttons">
                <button value="${item.word}" class="upvote-button">👍</button>
                <button value="${item.word}" class="downvote-button">👎</button>
            </div>
        </div>
        `
    })

    document.getElementById('container').innerHTML = htmlString;

    addVoteEvents();
}

function upVote(target) {
    console.log(target);
    updateScore(target, 0.1);
    sort();
    render();
}


function downVote(value) {
    console.log(target);
    updateScore(target, -0.1);
    sort();

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