const cartData = () => {
    // Загружаем корзину из localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Инициализация корзины:', cartItems);

    // Сохраняем корзину в localStorage
    const saveCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Корзина сохранена:', cartItems);
    };

    // Обновление счетчика товаров
    const updateCartItemCountDisplay = () => {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
        cartCountElements.forEach(el => {
            el.textContent = totalCount;
        });
        console.log('Обновлен счетчик корзины:', totalCount);
    };

    // Рендеринг товаров в корзине (для cart.html)
    const renderProductsInCart = () => {
        const cartList = document.querySelector('.cart-modal__body');
        if (!cartList) {
            console.log('Элемент .cart-modal__body не найден (нормально для index.html/goods.html)');
            return;
        }

        console.log('Рендеринг корзины, cartItems:', cartItems); // Отладка
        cartList.innerHTML = ''; // Очищаем список
        if (cartItems.length === 0) {
            cartList.innerHTML = '<h2 style="text-align: center;">Корзина пуста</h2>';
        } else {
            cartItems.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <div class="cart-item" id="cart-item-${item.id}">
                        <p class="cart-item__title">${item.model}</p>
                        <div class="cart-item__controls">
                            <div class="cart-item__controls--price" data-price="${item.price}">${item.price} ₽</div>
                            <button class="btn btn-outline" data-action="decrease" data-id="${item.id}">-</button>
                            <div class="cart-item__controls--count">${item.count}</div>
                            <button class="btn btn-outline" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>`;
                cartList.append(div);
            });
        }

        calculateTotalCartValue();
    };

    // Подсчет общей стоимости корзины
    const calculateTotalCartValue = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
        const cartTotal = document.querySelector('.cart-modal__footer--price');
        if (cartTotal) {
            cartTotal.innerHTML = `${total} ₽`;
            console.log('Общая стоимость:', total);
        }
    };

    // Добавление товара в корзину (для goods.html)
    const addProductToCart = () => {
        const productsList = document.querySelector('#products-container');
        if (!productsList) {
            console.log('Элемент #products-container не найден (нормально для index.html/cart.html)');
            return;
        }

        productsList.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-primary');
            if (btn) {
                const product = btn.closest('.products-card');
                if (!product) {
                    console.error('Элемент .products-card не найден');
                    return;
                }

                const productId = product.dataset.id;
                console.log('ID товара:', productId);

                const selectedProduct = window.goods.find(item => item.id == productId);
                if (!selectedProduct) {
                    console.error('Товар с ID', productId, 'не найден в window.goods');
                    return;
                }

                const productInfo = {
                    id: selectedProduct.id,
                    model: selectedProduct.name,
                    price: selectedProduct.price,
                    count: 1,
                };

                const existingItem = cartItems.find(item => item.id == productInfo.id);
                if (existingItem) {
                    existingItem.count += 1;
                } else {
                    cartItems.push(productInfo);
                }

                saveCart();
                updateCartItemCountDisplay();
                calculateTotalCartValue();
                alert(`Товар ${productInfo.model} добавлен в корзину!`);
            }
        });
    };

    // Обновление количества товаров
    window.updateCartItemCount = (id, delta) => {
        const item = cartItems.find(item => item.id == id);
        if (item) {
            item.count += delta;
            if (item.count <= 0) {
                const index = cartItems.findIndex(item => item.id == id);
                cartItems.splice(index, 1);
                console.log('Товар удален:', id);
            }
            saveCart();
            renderProductsInCart();
            updateCartItemCountDisplay();
            calculateTotalCartValue();
        }
    };

    // Обработчик для кнопок увеличения/уменьшения количества
    const setupCartControls = () => {
        const cartList = document.querySelector('.cart-modal__body');
        if (cartList) {
            cartList.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-outline');
                if (btn) {
                    const id = parseInt(btn.dataset.id);
                    const action = btn.dataset.action;
                    if (action === 'increase') {
                        window.updateCartItemCount(id, 1);
                    } else if (action === 'decrease') {
                        window.updateCartItemCount(id, -1);
                    }
                }
            });
        }
    };

    // Обработчик для кнопки подтверждения заказа
    const setupConfirmButton = () => {
        const confirmButton = document.querySelector('.btn-confirm');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                if (cartItems.length === 0) {
                    alert('Корзина пуста!');
                    return;
                }
                alert(`Заказ успешно оформлен, сумма к оплате ${cartItems.reduce((sum, item) => sum + item.price * item.count, 0)} ₽!`);
                localStorage.removeItem('cartItems'); // Очищаем корзину
                cartItems = []; // Обновляем локальную переменную
                renderProductsInCart(); // Перерендерим корзину
                updateCartItemCountDisplay(); // Обновляем счетчик
                window.location.href = 'index.html'; // Перенаправляем на goods.html
            });
        } else {
            console.log('Элемент .btn-confirm не найден (нормально для index.html/goods.html)');
        }
    };

    // Инициализация
    addProductToCart();
    renderProductsInCart();
    setupCartControls();
    updateCartItemCountDisplay();
    calculateTotalCartValue();
    setupConfirmButton();
};

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Запуск cartData');
    cartData();
});