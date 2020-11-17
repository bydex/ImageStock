let url = `https://api.unsplash.com/photos/`;

if (page === 'index') url += 'random/';
url += "?client_id=QszM52c-azRYJVtD3U7jeMGvYnq0k-ASZ5Gh8GC60jA";
if (page === 'index') url += '&count=10';

const cardMarkup = function({ imgSrc,  first_name, username, profileImage, downloadLink, alt_description, isLiked }) {
    return `
        <img class="card__img" src="${imgSrc}" alt="${alt_description}">
        <div class="card__wrapper">
            <div class="card__inner">
                <div class="card__user"><img class="card__avatar" src="${profileImage}">
                    <div class="card__title">${first_name}</div>
                    <div class="card__subtitle">@${username}</div>
                </div>
                <div class="card__controls">
                    <ul class="card__list">
                        <li class="card__item card__item--like ${(isLiked) ? 'card__item_active' : false}">
                            <button class="card__button">
                                <svg class="card__icon" viewBox="0 0 23 21">
                                    <use xlink:href="./img/sprites/sprite.svg#like"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="card__item">
                            <button class="card__button">
                                <svg class="card__icon" viewBox="0 0 37 36">
                                    <use xlink:href="./img/sprites/sprite.svg#fullscreen"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="card__item">
                            <a class="card__button" href="${imgSrc}" download>
                                <svg class="card__icon" viewBox="0 0 20 26">
                                    <use xlink:href="./img/sprites/sprite.svg#download"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
};

const galleryContainer = document.querySelector('.gallery__row');
function generateCard({ imgSrc,  first_name, username, profileImage, downloadLink, alt_description, cardId, isLiked }) {
    let card = document.createElement("div");
    card.classList.add('card', 'gallery__card');
    card.innerHTML = cardMarkup({
      imgSrc,
      first_name,
      username,
      profileImage,
      downloadLink,
      alt_description,
      cardId,
      isLiked,
    });

    card.config = {
      id: cardId
    };

    return card;
}


function showImages(url) {
    fetch(url, {
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setTimeout(function () {
                data.forEach((item) => {
                    if (localStorage.getItem("likes") !== "") {
                      var storedNames = localStorage.getItem("likes").split(",");
                    } else {
                      var storedNames = [];
                    }

                    let isLiked = storedNames.includes(item.id);

                    let card = generateCard({
                        imgSrc: item.urls.small,
                        first_name: item.user.first_name,
                        username: item.user.username,
                        profileImage: item.user.profile_image.small,
                        profileImage: item.user.profile_image.small,
                        downloadLink: item.links.download,
                        alt_description: item.alt_description,
                        cardId: item.id,
                        isLiked: isLiked
                    });

                    galleryContainer.append(card);
                })
            }, 50);
        });
}

if (page === 'index') showImages(url);
if (page === 'likes') {
    if (localStorage.getItem("likes") !== "") {
      var storedNames = localStorage.getItem("likes").split(",");
    } else {
      var storedNames = [];
    }

    storedNames.forEach((el) => {
        url += `&id=${el}`;
        showImages(url);
    })
}
