const express = require("express")
const posts = require("./data/db")
const PostRouter = express.Router()

//GET ENDPOINTS

PostRouter.get("/posts", (req, res) => {
	console.log(req.query)
	posts.find({})
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
	posts.findById(req.params.id)
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
    posts.findById(req.params.id)
    .then ((post) => {
    if (!post) {
        return res.status(404).json({
            message: "User not found"
        })
    } else {
    return posts.findPostComments(req.params.id) }
    
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

//POST ENDPOINTS

PostRouter.post("/posts", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})

PostRouter.post("/posts/:id/comments", (req, res) => {
    posts.findCommentById(req.params.id)
    .then ((post) => {
    if (!post) {
        return res.status(404).json({
            message: "User not found"
        })
    } else {
    return posts.insertComment(req.body) }
    
})
.then((comment) => {
    res.status(201).json(comment)

})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        message: "Error getting the user",
    })
})
})

// DELETE ENDPOINT

PostRouter.delete("/posts/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
        })
    })



module.exports = PostRouter