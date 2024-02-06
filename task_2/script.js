const searchbarInput = document.querySelector('.searchbar_input');
const searchbarButton = document.querySelector('.searchbar_btn');
const searchbarLoading = document.querySelector('.searchbar_loading');
const searchbarResults = document.querySelector('.results');

const toggleLoadingState = state => {
	if (state ==='loading') {
		searchbarLoading.classList.add('-loading')
		searchbarResults.classList.add('-loading')
	}
	if (state === 'ready') {
		searchbarLoading.classList.remove('-loading')
		searchbarResults.classList.remove('-loading')
	}
}

const toggleResultsVisiblity = show => {
	show ?
		searchbarResults.classList.add('-visible')
	:
		searchbarResults.classList.remove('-visible')
}

const debounce = (func, time = 500) => {
	let debounced;
	return (...args) => {
		clearTimeout(debounced)
		return new Promise(resolve => {
			debounced = setTimeout(() => resolve(func(...args)), time)
		})
	}
}

const getSearchResults = (query, limit = 5, delay = 1000) => {
	toggleLoadingState('loading')
	return fetch(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&delay=${delay}`)
		.then(resp => {
			toggleLoadingState('ready')
			return resp.json()
		})
		.catch(err => console.error(err))
};
const downloadData = debounce(getSearchResults);

const showResults = input => {
	if (input.length > 0) {
		downloadData(input)
			.then(data => {
				toggleResultsVisiblity(true)
				if (data.products.length > 0) {
					const products = data.products.map(prod => {
						const listItem = document.createElement('li')
						const title = document.createElement('p')
						const price = document.createElement('p')
						title.innerHTML = prod.title;
						price.innerHTML = prod.price + '$';
						listItem.append(title, price)
						return listItem
					});
					searchbarResults.replaceChildren(...products)
				} else {
					const listItem = document.createElement('li')
					const noResultsP = document.createElement('p')
					noResultsP.innerText = 'Brak wyników'
					listItem.appendChild(noResultsP);
					searchbarResults.replaceChildren(listItem)
				}
		})
	} else {
		toggleResultsVisiblity(false)
	}
}

searchbarInput.addEventListener('input', event => showResults(event.target.value))
searchbarButton.addEventListener('click', event => {
	event.preventDefault();
	showResults(searchbarInput.value)
})