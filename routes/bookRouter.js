const express=require("express")
const { addbook, getbook, deletbook, updatebook } = require("../controller/bookController")
const { authenticate } = require("../middleware/authenticate")
const bookRouter=express.Router()


// for add book
bookRouter.post("/add",authenticate,addbook)

// for getting all book
bookRouter.get("/allbook",getbook)

// delete book
bookRouter.delete("/remove/:id",authenticate,deletbook)

// update book
bookRouter.patch("/edit/:id",authenticate,updatebook)

module.exports={bookRouter}
