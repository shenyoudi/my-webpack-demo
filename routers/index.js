const router = ['index', 'flex', 'fileloader', 'css']

function createRouter () {
	const ul = document.createElement('ul')
	ul.className = 'router'
	for (let route of router) {
		const li = document.createElement('li')
		li.innerHTML = route
		li.dataset.link = route
		ul.appendChild(li)
	}
	ul.addEventListener('click', function (e) {
		const link = e.target.getAttribute('data-link')
		if (link) {
			location.href= "./" + link + '.html'
		}
	})

	return ul
}

export default createRouter()