const fs = require('fs')
const path = require('path')

const jsdom = require('jsdom')
const {JSDOM} = jsdom

const _post_path = path.join(process.cwd(), '_posts')
const _index_path = path.join(process.cwd(), "index.html")

function _allFiles(dir_path) {
	return new Promise((resolve, reject) => {
		/// get post files
		fs.readdir(dir_path, (error, files) => {
			if (error) {
				reject(error)
			} else {
				resolve(files)
			}
		})
	})
}

function _allPosts(dir_path) {
	return _allFiles(dir_path)
		.then(function(files) {
			return files.filter(file => {
				const ext = path.extname(file)
				return ext === '.md'
			})
		})
		.catch(reason => {
			console.log(reason)
		})
}

function _loadDOM(path) {
	return JSDOM.fromFile(path)
}

function generate_index(index_path, posts) {
	return _loadDOM(index_path).then(function(dom) {
		const document = dom.window.document
		const postsElement = document.getElementsByClassName('posts')[0]

		while(postsElement.firstChild) {
			postsElement.removeChild(postsElement.firstChild)
		}

		posts.forEach(post => {
			/// list node
			const postListNode = document.createElement("li")

			/// a node
			const postHrefNode = document.createElement("a")
			postListNode.appendChild(postHrefNode)
			const postHref = document.createAttribute("href")
			postHref.value = 'posts/' + path.parse(post).name + '.html'
			postHrefNode.setAttributeNode(postHref)

			/// title
			const title = document.createTextNode(path.parse(post).name)
			postHrefNode.appendChild(title)

			/// insert post node
			postsElement.insertBefore(postListNode, null)
		});

		return dom.serialize()
	})
}


// generate index.html
_allPosts(_post_path)
	.then(function (files) {
		return generate_index(_index_path, files);
	})
	.then(function (index_html) {
		fs.writeFile(_index_path, index_html, function (error) {
			if (error) {
				console.log(error)
			}
		})
	})