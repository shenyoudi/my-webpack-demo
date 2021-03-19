import './index.scss'
import loading from '../../assets/image/loading.gif'
//const loading = require('./loading.gif')
//const jpg1 = require('./1.jpg')

let div = document.createElement('div')
div.innerHTML = 'page image load'
document.body.appendChild(div)

let img = document.createElement('img')
img.src = loading
document.body.appendChild(img)

function loadImage (src) {
	new Promise((resolve) => {
		let image = new Image()
		image.src = src
		image.onload = function () {
			resolve()
		}
	}).then(() => {
		setTimeout(() => {
			img.src = src
		}, 2000)
	})
}

loadImage('./image/1.jpg')