const fs = require('fs')
const path = require('path')

const _post_path = path.join(process.cwd(), '_posts')
const _index_path = path.join(process.cwd(), "index.html")

// const parser = new DOMParser()
// let doc = parser.parseFromString(,"text/html")

/// read index.html
fs.readFile(_index_path, {encoding: 'utf-8'}, (error, data) => {
})

function post_files(dir, callback) {
	fs.readdir(_post_path, (error, files) => {
		files.forEach(file => {
			// console.log(file)
		})
	})
}


function html_post(file_path) {

}