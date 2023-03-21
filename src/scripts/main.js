const hero = document.querySelector("#hero");
const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".author");
const twitterBtn = document.querySelector(".twitter");
const facebookBtn = document.querySelector(".facebook");
const newQuoteBtn = document.querySelector(".new-quote");
const shareBtn = document.querySelector(".share");
const dropdownContent = document.querySelector(".dropdown-content");
const loader = document.querySelector(".loader");

const loading = () => {
  loader.hidden = false;
  hero.hidden = true;
};

const loaded = () => {
  if (!loader.hidden) {
    hero.hidden = false;
    loader.hidden = true;
  }
}

const postFacebookQuote = () => {
  console.log("facebook");
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const facebookUrl = `https://online-courses.club/`;
  window.open(facebookUrl, "_blank");
};

const tweetQuote = () => {
  console.log("twitter");
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

const getQuote = async () => {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.quotable.io/random";

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    if (data.author === "") {
      authorText.textContent = "Anonymous";
    } else {
      authorText.textContent = data.author;
    }

    if (data.content.length > 120) {
      quoteText.classList.add("long");
    } else {
      quoteText.classList.remove("long");
    }
    quoteText.textContent = data.content;

    loaded();
  } catch (error) {
    getQuote();
    // console.log('Something went wrong', error)
  }
};

const shareBtnTransition = () => {
  shareBtn.addEventListener('click', (e) => {

    console.log(e.target)
    dropdownContent.classList.toggle("show");
  })
  // window.onclick = (e) => {
  //   if (!e.target.classList.contains("share") || !e.target.classList.contains('fa-share')) {
  //     if (dropdownContent.classList.contains("show")) {
  //       dropdownContent.classList.remove("show");
  //     }
  //   }
  // };
};


shareBtnTransition();

newQuoteBtn.onclick = getQuote;
facebookBtn.onclick = postFacebookQuote;
twitterBtn.onclick = tweetQuote;
getQuote()