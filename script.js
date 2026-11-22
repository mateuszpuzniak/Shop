document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.burger')
	const navMenu = document.querySelector('.ul-menu')

	if (!burger || !navMenu) {
		console.error('Nie znaleziono burgera lub menu!')
		return
	}

	burger.addEventListener('click', () => {
		burger.classList.toggle('active')
		navMenu.classList.toggle('active')
	})
})


const products = document.querySelector('.products')


const pagination = document.querySelectorAll('.pagination-button')

let currentPage = 1
const productsPerPage = 9
let currentProducts = productsData



function calculateTotalPages() {
	return Math.ceil(currentProducts.length / productsPerPage)
}


function displayProducts(productList = productsData) {
	currentProducts = productList

	const startIndex = (currentPage - 1) * productsPerPage
	const endIndex = startIndex + productsPerPage

	const visibleProducts = currentProducts.slice(startIndex, endIndex)

	products.innerHTML = ''

	visibleProducts.forEach(product => {
		const productCard = document.createElement('div')
		productCard.classList.add('product')

		productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.price} zł</p>
            </div>

            <div class="product-actions">
                <button>Dodaj do koszyka</button>
            </div>
        `

		products.appendChild(productCard)
	})

	updatePagination()
}


function updatePagination() {
	const totalPages = calculateTotalPages()

	pagination.forEach((button, index) => {
		const pageNumber = index + 1

		if (pageNumber <= totalPages) {
			button.style.display = 'inline-block'
		} else {
			button.style.display = 'none'
		}

		if (pageNumber === currentPage) {
			button.classList.add('active')
		} else {
			button.classList.remove('active')
		}
	})
}


pagination.forEach((button, index) => {
	button.addEventListener('click', () => {
		currentPage = index + 1

		displayProducts(currentProducts)
	})
})



let selectedGender = 'all'
let selectedPrice = 'all'

const allProducts = productsData

const allCollections = document.querySelector('.allcollections')

const priceRange1 = document.querySelector('.priceRange1')
const priceRange2 = document.querySelector('.priceRange2')
const priceRange3 = document.querySelector('.priceRange3')



const priceButtons = document.querySelectorAll('.priceRange1, .priceRange2, .priceRange3')
priceButtons.forEach(button => {
	button.classList.remove('btnactive')
})


const womenCard = document.querySelector('.card1')
const childrenCard = document.querySelector('.card2')
const menCard = document.querySelector('.card3')


menCard.addEventListener('click', () => {
	selectedGender = 'Men'
	filterProducts()
})

womenCard.addEventListener('click', () => {
	selectedGender = 'Women'
	filterProducts()
})

childrenCard.addEventListener('click', () => {
	selectedGender = 'Children'
	filterProducts()
})

allCollections.addEventListener('click', () => {

	priceRange1.classList.remove('priceActive')
	priceRange2.classList.remove('priceActive')
	priceRange3.classList.remove('priceActive')
	selectedGender = 'all'
	selectedPrice = 'all'
	filterProducts()
})
priceRange1.addEventListener('click', event => {

	if (event.currentTarget.classList.contains('priceActive')) {
		selectedPrice = 'all'
	} else {
		selectedPrice = 'priceUnder100'
	}

	event.currentTarget.classList.toggle('priceActive')
	priceRange2.classList.remove('priceActive')
	priceRange3.classList.remove('priceActive')

	filterProducts()
})
priceRange2.addEventListener('click', event => {

	if (event.currentTarget.classList.contains('priceActive')) {
		selectedPrice = 'all'
	} else {
		selectedPrice = 'price101to500'	
	}

	event.currentTarget.classList.toggle('priceActive')
	priceRange1.classList.remove('priceActive')
	priceRange3.classList.remove('priceActive')

	filterProducts()
})
priceRange3.addEventListener('click', event => {

	if (event.currentTarget.classList.contains('priceActive')) {
		selectedPrice = 'all'
	} else {
		selectedPrice = 'priceOver500'
	}

	event.currentTarget.classList.toggle('priceActive')
	priceRange1.classList.remove('priceActive')
	priceRange2.classList.remove('priceActive')

	filterProducts()
})


displayProducts()


function filterProducts() {

	const filteredProducts = productsData.filter(product => {
		return (
			(product.gender === selectedGender || selectedGender === 'all') &&
			(selectedPrice === 'all' ||
				(selectedPrice === 'priceUnder100' && product.price <= 100) ||
				(selectedPrice === 'price101to500' && product.price > 100 && product.price <= 500) ||
				(selectedPrice === 'priceOver500' && product.price > 500))
		)
	})
	currentPage = 1
	displayProducts(filteredProducts)

}

