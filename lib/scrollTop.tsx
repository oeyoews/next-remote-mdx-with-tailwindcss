'use client'
function scrollTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth' // 可以是 'auto' 或 'smooth'
	});
}

export default scrollTop