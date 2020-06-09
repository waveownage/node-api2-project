const express = require("express")
const users = require("./data/db")
const PostRouter = express.Router()

PostRouter.get("/posts", (req, res) => {
	console.log(req.query)
	users.find({})
		.then((post) => {
			res.status(200).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})

PostRouter.get("/posts/:id", (req, res) => {
	users.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "User not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the user",
			})
		})
})

PostRouter.get("/posts/:id/comments", (req, res) => {
    users.findById(req.params.id)
    .then ((post) => {
    if (!post) {
        return res.status(404).json({
            message: "User not found"
        })
    } else {
    return users.findPostComments(req.params.id) }
    
})
.then((comments) => {
    res.json(comments)

})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        message: "Error getting the user",
    })
})
})

module.exports = PostRouter