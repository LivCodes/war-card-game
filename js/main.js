let deckId = "";

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    if (!localStorage.getItem("deck_id")) {
      localStorage.setItem("deck_id", data.deck_id);
      deckId = localStorage.getItem("deck_id");
    } else {
      deckId = localStorage.getItem("deck_id");
    }
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.remaining === 0) {
        reShuffleDeck();
      }
      document.querySelector("#Player1").src = data.cards[0].image;
      document.querySelector("#Player2").src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);

      if (player1Val > player2Val) {
        document.querySelector("p").innerText = "Player 1 Wins";
      } else if (player2Val > player1Val) {
        document.querySelector("p").innerText = "Player 2 Wins";
      } else {
        document.querySelector("p").innerText = "Time for War!";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

function reShuffleDeck() {
  let url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}
