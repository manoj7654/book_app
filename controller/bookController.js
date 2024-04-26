
// importing book model for crud operation
const { BookModal } = require("../modal/bookModal");


// here creating book and saving into database
const addbook = async (req, res) => {
  const {title,author,publication_year,userId}=req.body
  if (!title || !author || !publication_year || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }  
  try {
      const book = new BookModal({title,author,publication_year,userId});
      await book.save();
     
      res.status(201).json({"message":"Book created successfully"});
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ "message": 'An error occurred' });
    }
  };

  // getting books based on filteration
  const getbook = async (req, res) => {
    const {limit}=req.query
    const {page}=req.query;
    const skip=(page*limit)-limit
    try {
      const { author, publication_year } = req.query;
      let query = {};
      if (author) {
        query.author = author;
      }
      if (publication_year) {
        query.publication_year = publication_year;
      }
      const books = await BookModal.find(query).skip(skip).limit(limit);
      res.status(200).json(books);
    } catch (error) {
      console.error('Error getting book:', error);
      res.status(500).json({ "message": 'Getting error while getting book' });
    }
  }

  // updating books
const updatebook=async(req,res)=>{
    const Id = req.params.id;
    const payload = req.body;
  
    const book=await BookModal.findOne({"_id":Id})
   const userId_in_book=book.userId
   const userId_making_request=req.body.userId
    try {
      if (userId_making_request!==userId_in_book) {
        res.status(400).json({ message: "You are not authorized" });
      }else{
          await BookModal.findByIdAndUpdate({ _id: Id }, payload);
          res.status(200).send({ message: "Book updated successfully" });
      }
      
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  
// deleting book
const deletbook=async(req,res)=>{
  const Id=req.params.id

  const book=await BookModal.findOne({"_id":Id})
  const userId_in_book=book.userId
  const userId_making_request=req.body.userId

  try {
    if (userId_making_request!==userId_in_book) {
        res.status(400).json({ message: "You are not authorized" });
      }else{
        await BookModal.findByIdAndDelete({_id:Id})
        res.status(201).json({"message":"Book has been deleted"})
      }

  } catch (error) {
    console.log(error);
    res.status(500).json({"message":"Unable to delete data"})
  }
}


// exporting 
  module.exports={
    addbook,
    getbook,
    deletbook,
    updatebook
  }