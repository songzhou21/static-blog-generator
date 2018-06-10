const fs = require('fs')
const path = require('path')

const jsdom = require('jsdom')
const {JSDOM} = jsdom

const _post_path = path.join(process.cwd(), '_posts')
const _index_path = path.join(process.cwd(), "index.html")

// const parser = new DOMParser()
// let doc = parser.parseFromString(,"text/html")

/// read index.html
JSDOM.fromFile(_index_path, null).then(dom => {
	const document = dom.window.document
	const postsElement = document.getElementsByClassName('posts')[0]


	/// get post files
	fs.readdir(_post_path, (error, files) => {
		files.filter(file => {
			const ext = path.extname(file)
			return ext === '.md'
		}).forEach(file => {
			/// list node
			const postListNode= document.createElement("li")

			/// a node
			const postHrefNode = document.createElement("a")
			postListNode.appendChild(postHrefNode)
			const postHref = document.createAttribute("href")
			postHref.value = 'posts/' + path.parse(file).name + '.html'
			postHrefNode.setAttributeNode(postHref)

			/// title
			const title = document.createTextNode(path.basename(file))
			postHrefNode.appendChild(title)

			/// insert post node
			postsElement.insertBefore(postListNode, null)

		})
	})
	
	console.log(dom.serialize())

})
