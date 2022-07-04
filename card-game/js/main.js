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
      document.querySelector("#Player1").src = data.cards[0].image;
      document.querySelector("#Player2").src = data.cards[1].image;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
