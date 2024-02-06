const makeupNav = document.querySelector('.nav_section.-makeup')
const makeupNavMenu = document.querySelector('.nav_section_menu.-makeup')
const faceNav = document.querySelector('.nav_section.-face')
const faceNavMenu = document.querySelector('.nav_section_menu.-face')

function closeAllDesktopMenus() {
	const allNavs = document.querySelectorAll('.nav_section_menu')
	allNavs.forEach(menu => {
		if (menu.classList.contains('-open')) {
			menu.classList.remove('-open')
		}
	})
}

makeupNav.addEventListener('mouseenter', function() {
	closeAllDesktopMenus()
	const isMenuActive = makeupNavMenu.classList.contains('-open');
	!isMenuActive && makeupNavMenu.classList.add('-open')
})

makeupNavMenu.addEventListener('mouseleave', function() {
	const isMenuActive = makeupNavMenu.classList.contains('-open');
	isMenuActive && makeupNavMenu.classList.remove('-open')
})

faceNav.addEventListener('mouseenter', function() {
	closeAllDesktopMenus()
	const isMenuActive = faceNavMenu.classList.contains('-open');
	!isMenuActive && faceNavMenu.classList.add('-open')
})

faceNavMenu.addEventListener('mouseleave', function() {
	const isMenuActive = faceNavMenu.classList.contains('-open');
	isMenuActive && faceNavMenu.classList.remove('-open')
})