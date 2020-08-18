const express = require("express")
const PostRouter = require("./users-post")

const server = express()
const port = process.env.PORT || 8080

server.use(express.json())
server.use(PostRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})