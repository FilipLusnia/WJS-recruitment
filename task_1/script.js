//desktop
const makeupHeaderBtn = document.querySelector('.header_nav_btn.-makeup')
const makeupHeaderMenu = document.querySelector('.header_nav_menu.-makeup')
const faceHeaderBtn = document.querySelector('.header_nav_btn.-face')
const faceHeaderMenu = document.querySelector('.header_nav_menu.-face')

function closeAllDesktopMenus() {
	const headerButtons = document.querySelectorAll('.header_nav_btn')
	const headerMenus = document.querySelectorAll('.header_nav_menu')

	headerButtons.forEach(btn => {
		const arrowIcon = btn.querySelector('img');
		if (arrowIcon && arrowIcon.classList.contains('-open')) {
			arrowIcon.classList.remove('-open')
		}
	})
	headerMenus.forEach(menu => {
		if (menu.classList.contains('-open')) {
			menu.classList.remove('-open')
		}
	})
}

makeupHeaderBtn.addEventListener('click', function() {
	const arrowIcon = makeupHeaderBtn.querySelector('img');
	const isMenuActive = makeupHeaderMenu.classList.contains('-open')
	isMenuActive ? (
		makeupHeaderMenu.classList.remove('-open'),
		arrowIcon.classList.remove('-open')
	)
	: (
		closeAllDesktopMenus(),
		makeupHeaderMenu.classList.add('-open'),
		arrowIcon.classList.add('-open')
	)
})

faceHeaderBtn.addEventListener('click', function() {
	const arrowIcon = faceHeaderBtn.querySelector('img');
	const isMenuActive = faceHeaderMenu.classList.contains('-open')
	isMenuActive ? (
		faceHeaderMenu.classList.remove('-open'),
		arrowIcon.classList.remove('-open')
	)
	: (
		closeAllDesktopMenus(),
		faceHeaderMenu.classList.add('-open'),
		arrowIcon.classList.add('-open')
	)
})

//mobile
const burger = document.querySelector('.header_burger')
const mobileMenu = document.querySelector('.header_nav_mobile')
const makeupMobileBtn = document.querySelector('.mobile_nav_btn.-makeup')
const makeupMobileMenu = document.querySelector('.mobile_nav_menu.-makeup')
const faceMobileBtn = document.querySelector('.mobile_nav_btn.-face')
const faceMobileMenu = document.querySelector('.mobile_nav_menu.-face')

burger.addEventListener('click', function() {
	const burgerIcon = burger.querySelector('img');
	const isMenuActive = mobileMenu.classList.contains('-open')
	isMenuActive ? (
		mobileMenu.classList.remove('-open'),
		burgerIcon.src = './assets/burger_icon.svg'
	)
	: (
		mobileMenu.classList.add('-open'),
		burgerIcon.src = './assets/close_icon.svg'
	)
})

makeupMobileBtn.addEventListener('click', function() {
	const arrowIcon = makeupMobileBtn.querySelector('img');
	const isMenuActive = makeupMobileMenu.classList.contains('-open')
	isMenuActive ? (
		makeupMobileMenu.classList.remove('-open'),
		arrowIcon.classList.remove('-open')
	)
	: (
		makeupMobileMenu.classList.add('-open'),
		arrowIcon.classList.add('-open')
	)
})

faceMobileBtn.addEventListener('click', function() {
	const arrowIcon = faceMobileBtn.querySelector('img');
	const isMenuActive = faceMobileMenu.classList.contains('-open')
	isMenuActive ? (
		faceMobileMenu.classList.remove('-open'),
		arrowIcon.classList.remove('-open')
	)
	: (
		faceMobileMenu.classList.add('-open'),
		arrowIcon.classList.add('-open')
	)
})