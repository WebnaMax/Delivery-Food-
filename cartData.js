// const cartData = () => {
//     // const cart = document.querySelector('.cart-modal');
//     const productsList = document.querySelector('#products-container');
//     const cartList = document.querySelector('.cart-modal__body');
//     const cartItems = [];

//     if (!productsList) {
//         console.error('Элемент #products-container не найден');
//         return;
//     }
//     if (!cartList) {
//         console.error('Элемент .cart-modal__body не найден');
//         return;
//     }

//     const updateCartItemCount = () => {
//         // const cartCount = document.querySelector('.cart-count');
//         // if (cartCount) {
//         //     cartCount.textContent = cartItems.length;
//         // }
//     };

//     updateCartItemCount();

//     const addProductToCart = () => {
//         setTimeout(() => {
//             productsList.addEventListener('click', (e) => {
//                 if (e.target.closest('.btn-primary')) {
//                     const product = e.target.closest('.products-card');

//                     if (!product) {
//                         console.error('Элемент .products-card не найден');
//                         return;
//                     }

//                     const productId = product.dataset.id;
//                     const selectedProduct = window.goods.find(item => item.id == productId);

                    // if (selectedProduct) {
                    //     const productInfo = {
                    //         id: selectedProduct.id,
                    //         model: selectedProduct.name,
                    //         price: selectedProduct.price,
                    //         count: 1,
                    //     };

                    //     const existingItem = cartItems.find(item => item.id == productInfo.id);
                    //     if (existingItem) {
                    //         existingItem.count += 1; // Увеличиваем счётчик
                    //     } else {
                    //         cartItems.push(productInfo); // Добавляем новый товар
                    //     }
                    //     alert(`Товар ${productInfo.model} добавлен в корзину!`);
                    //     renderProductsInCart();
                    // } else {
                    //     console.error('Товар с ID', productId, 'не найден в массиве goods');
                    // }
                // }
//             });
//         }, 1200); // Задержка больше, чем в productsHandler (1000 мс)
//     };

//     addProductToCart();

    // const renderProductsInCart = () => {
    //     cartList.innerHTML = ''; // Clear the cart list before rendering
    //     cartItems.forEach(item => {
    //         const div = document.createElement('div');
    //         div.classList.add('cart-item');
    //         div.innerHTML = `
    //             <div class="cart-item" id="cart-item-${item.id}">
    //                 <p class="cart-item__title">
    //                     ${item.model}
    //                 </p>
    //                 <div class="cart-item__controls">
    //                     <div class="cart-item__controls--price" data-price="${item.price}">${item.price} ₽</div> 
    //                     <button class="btn btn-outline" onclick="window.updateCartItemCount(${item.id}, -1)">-</button>
    //                     <div class="cart-item__controls--count">${item.count}</div> 
    //                     <button class="btn btn-outline" onclick="window.updateCartItemCount(${item.id}, 1)">+</button>
    //                 </div>
    //             </div>`;
    //         cartList.append(div);
    //     });
    //     calculateTotalCartValue();
    // };

    window.updateCartItemCount = (id, delta) => {
        const item = cartItems.find(item => item.id == id);
        if (item) {
            item.count += delta;
            if (item.count <= 0) {
                const index = cartItems.findIndex(item => item.id == id);
                cartItems.splice(index, 1); // Удаляем товар, если count <= 0
            }
            renderProductsInCart();
            calculateTotalCartValue();
        }
    };

//     const calculateTotalCartValue = () => {
//         const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
//         console.log('Общая стоимость корзины:', total); // Отладка
//         const cartTotal = document.querySelector('.cart-modal__footer--price');
//         if (cartTotal) {
//             cartTotal.textContent = `${total} ₽`; // Обновляем элемент в DOM
//         }
//     };

//     calculateTotalCartValue();
// };

// document.addEventListener('DOMContentLoaded', () => {
//     cartData();
// });

// calculateTotalCartValue();



const cartData = () => {
    // Загружаем корзину из localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Инициализация корзины:', cartItems); // Отладка: начальное состояние корзины

    // Сохраняем корзину в localStorage
    const saveCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Корзина сохранена:', cartItems); // Отладка
    };

    // Обновление счетчика товаров
    const updateCartItemCountDisplay = () => {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
        cartCountElements.forEach(el => {
            el.textContent = totalCount;
        });
        console.log('Обновлен счетчик корзины:', totalCount); // Отладка
    };

    // Рендеринг товаров в корзине (для cart.html)
    const renderProductsInCart = () => {
        const cartList = document.querySelector('.cart-modal__body');

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
                            <button class="btn btn-outline" onclick="window.updateCartItemCount(${item.id}, -1)">-</button>
                            <div class="cart-item__controls--count">${item.count}</div>
                            <button class="btn btn-outline" onclick="window.updateCartItemCount(${item.id}, 1)">+</button>
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
            console.log('Общая стоимость:', total); // Отладка
        }
    };

    // Добавление товара в корзину (для main.html)
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
                console.log('ID товара:', productId); // Отладка

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
                console.log('Товар удален:', id); // Отладка
            }
            saveCart();
            renderProductsInCart();
            updateCartItemCountDisplay();
            calculateTotalCartValue();
        }
    };

    // Инициализация
    addProductToCart();
    renderProductsInCart();
    updateCartItemCountDisplay();
    calculateTotalCartValue();
};

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Запуск cartData'); // Отладка
    cartData();
});

document.querySelector('.btn-confirm').addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    alert(`Заказ успешно оформлен сумма к оплате ${cartItems.reduce((sum, item) => sum + item.price * item.count, 0)} ₽!`);
    localStorage.removeItem('cartItems'); // Очищаем корзину после оформления заказа
    window.location.href = 'main.html'; // Перенаправляем на главную страницу
});