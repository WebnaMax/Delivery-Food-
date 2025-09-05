// import {goods} from './goods.js'

// console.log(goods)

window.goods = [
    {
        id: 0,
        name: 'Ролл угорь стандарт',
        text: 'Рис, угорь, соус унаги, кунжут, водоросли нори.',        
        price: 250,        
        image: 'rollone'
    },
    {
        id: 1,
        name: 'Калифорния лосось стандарт',
        text: 'Рис, лосось, авокадо, огурец, майонез, икра масаго, водоросли нори.',        
        price: 395,       
        image: 'rolltwo'
    },
    {
        id: 2,
        name: 'Окинава стандарт',
        text: 'Рис, креветка отварная, сыр сливочный, лосось, огурец свежий...',
        price: 250,        
        image: 'rollthree'
    },
    {
        id: 3,
        name: 'Цезарь маки хl',
        text: 'Рис, креветка отварная, сыр сливочный, лосось, огурец свежий...',
        price: 250,        
        image: 'rollfour'
    },
    {
        id: 4,
        name: 'Ясай маки стандарт 185 г',
        text: 'Рис, помидор свежий, перец болгарский, авокадо, огурец, айсберг',
        price: 250,        
        image: 'rollfive'
    },
    {
        id: 5,
        name: 'Ролл с креветкой стандарт',
        text: 'Рис, водоросли нори, креветки отварные, сыр сливочный, огурцы',
        price: 250,        
        image: 'rollsix'
    },
]

// const modalHandler = () => {
//     const modal = document.querySelector('.cart-modal__overlay');
//     const cartBtn = document.querySelector('.cart-btn');

//     const openModal = () => {
//         modal.classList.add('open')
//     }

//     const closeModal = () => {
//         modal.classList.remove('open')
//     }

//     cartBtn.addEventListener('click', () => {
//         openModal()
//     })


//     modal.addEventListener('click', (e) => {
//         if (e.target.classList.contains('cart-modal__overlay') ||
//             e.target.closest('.cart-modal__header--close') ||
//             e.target.closest('.btn-outline')) {
//             closeModal()
//         }
//     })

//     if (modal.classList.contains('open')) {
//         document.body.classList.add('modal-active');
//     } else {
//         document.body.classList.remove('modal-active');
//     }

// }

const restsHandler = () => {
    const container = document.querySelector('#rests-container');
    const searchInput = document.querySelector('.products-header--search');

    const restArray = [
        {
            id: 0,
            title: 'Пицца плюс',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'pizza'
        },
        {
            id: 1,
            title: 'Тануки ',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'tanuki'
        },
        {
            id: 2,
            title: 'FoodBand',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'foodband'
        },
        {
            id: 3,
            title: 'Жадина-пицца',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'pizzajadina'
        },
        {
            id: 4,
            title: 'Точка еды',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'pointfood'
        },
        {
            id: 5,
            title: 'PizzaBurger',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            image: 'pizzaburger'
        },
    ]

    const loadingRests = () => {
        container.innerHTML = '<p style="width: 100%; text-align: center;"> Loading... </p>'
    }

    const renderRests = (array) => {
        container.innerHTML = '';

        array.forEach((card) => {
            container.insertAdjacentHTML('beforeend', `
                <a href="./goods.html?id=${card.id}" class="products-card card">
                    <div class="products-card__image">
                        <img src="./images/rests/${card.image}.jpg" alt="${card.title}">
                    </div>
                    <div class="products-card__description">
                        <div class="products-card__description-row">
                            <div class="products-card__description-title">
                                ${card.title}
                            </div>
                            <div class="products-card__description-badge">${card.time} мин</div>
                        </div>

                        <div class="products-card__description-info">                                    
                            <div class="products-card__description-info--raiting">
                                <img src="./images/icons/Vector.svg" alt="star">
                                ${card.rating}</div>
                            <div class="products-card__description-info--price">От ${card.price} ₽</div>
                            <div class="products-card__description-info--group">${card.type} </div>
                        </div>
                    </div>
                </a>
            `)
        })
    }

    const handleSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        const filteredArray = restArray.filter((rest) =>
            rest.title.toLowerCase().includes(query)
        );
        renderRests(filteredArray);
    };

    if (container) {
        loadingRests();
        setTimeout(() => {
            renderRests(restArray); // Рендерим все рестораны при загрузке
            if (searchInput) {
                searchInput.addEventListener('input', handleSearch);
            }
        }, 1000);
    } 
}

const productsHandler = (array) => {
    const container = document.querySelector('#products-container');

    const loadingProducts = () => {
        container.innerHTML = '<p style="width: 100%; text-align: center;"> Loading... </p>'
    }

    const renderProducts = (array) => {
        container.innerHTML = '';

        array.forEach((card) => {
            container.insertAdjacentHTML('beforeend', `
                <div class="products-card" data-id="${card.id}">
                    <div class="products-card__image">
                        <img src="./images/goods/${card.image}.jpg" alt="pizza plus">
                    </div>
                    <div class="products-card__description">
                        <div class="card__title products-card__description-row">
                            <h5 class="products-card__description-row--name">
                                ${card.name}
                            </h5>
                        </div>
                        <div class="products-card__description-row">
                            <p class="products-card__description-row--text">
                                ${card.text}
                            </p>
                        </div>
                        <div class="products-card__description-row--controls">
                            <button class="btn btn-primary">
                                <span>В корзину</span>
                                <img src="./images/icons/shopping-cart2.svg" alt="user" width="16"
                                    height="16"></button>
                            <span class="products-card__description-row-controls--price">${card.price} ₽</span>
                        </div>
                    </div>
                </div>
            `)
        })
    }

    if (container) {
        loadingProducts()
        setTimeout(() => {
            renderProducts(goods)
        }, 1000)
    }

}

// modalHandler()
restsHandler()
productsHandler()


