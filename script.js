const favoriteButtons = document.querySelectorAll('.favorite-btn');
const message = document.querySelector('#message');

favoriteButtons.forEach((button) => {
    let isFavorite = false;

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        isFavorite = !isFavorite;
        button.style.backgroundColor = isFavorite ? 'red' : 'rgba(104, 104, 104, 0.9)';

        if (message) {
            message.textContent = isFavorite ? '✓ Товар добавлен' : '✗ Товар удален';
            message.classList.remove('hide');
            message.classList.add('show');

            setTimeout(() => {
                message.classList.remove('show');
                message.classList.add('hide');
            }, 2000);
        }
    });
});

const basketButtons = document.querySelectorAll('.basket');

basketButtons.forEach((button) => {
    const controls = document.createElement('div');
    controls.className = 'basket-counter basket-hidden';
    controls.innerHTML = `
        <button type="button" class="basket-counter-btn basket-decrease">-</button>
        <span class="basket-counter-value">1</span>
        <button type="button" class="basket-counter-btn basket-increase">+</button>
    `;

    button.insertAdjacentElement('afterend', controls);

    const decreaseButton = controls.querySelector('.basket-decrease');
    const increaseButton = controls.querySelector('.basket-increase');
    const value = controls.querySelector('.basket-counter-value');

    let count = 0;

    const renderBasketState = () => {
        if (count <= 0) {
            count = 0;
            button.classList.remove('basket-hidden');
            controls.classList.add('basket-hidden');
            value.textContent = '1';
            return;
        }

        button.classList.add('basket-hidden');
        controls.classList.remove('basket-hidden');
        value.textContent = String(count);
    };

    renderBasketState();

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        count = 1;
        renderBasketState();
    });

    decreaseButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        count -= 1;
        renderBasketState();
    });

    increaseButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        count += 1;
        renderBasketState();
    });
});