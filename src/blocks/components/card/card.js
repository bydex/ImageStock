document.addEventListener("click", function(event) {
    if (event.target.closest('.card__item--like')) {
        let likeBtn = event.target.closest(".card__item--like");
        let card = likeBtn.closest('.card');
        let cardId = card.config.id;

        if (!localStorage.getItem("likes")) {
            localStorage.setItem("likes", []);
        }

        if (localStorage.getItem("likes") !== '') {
            var storedNames = localStorage.getItem("likes").split(',');
        } else {
            var storedNames = [];
        }


        if (storedNames.includes(cardId)) {
            storedNames.pop(cardId);
            likeBtn.classList.remove('card__item_active');
        } else {
            storedNames.push(cardId);
            likeBtn.classList.add('card__item_active');
        }

        localStorage.setItem("likes", storedNames);

    }
});
