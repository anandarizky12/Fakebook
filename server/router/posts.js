import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/Post.js';
const router = express.Router();


export const getPosts = async (req, res) => { 
  try {
      const postMessages = await PostMessage.find().sort({_id:-1});
              
      res.status(200).json(postMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const {  username,email,image,profile,caption} = req.body;

  const newPostMessage = new PostMessage({  username,email,image,profile,caption})

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}


export default router;

// router.route('/').get((req, res) => {
//     User.find().sort({_id:-1})
//       .then(users => res.json(users))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
//   router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const image = req.body.image;
//     const caption = req.body.caption;
//     const profile = req.body.profile;
//     const newUser = new User({
//         username,
//         image,
//         caption,
//         profile,
    
//     });
  
//     newUser.save()
//       .then(() => res.json('User added!'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

//   router.route('/:id').get((req, res) => {
//      User.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
//   router.route('/:id').delete((req, res) => {
//      User.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Exercise deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
//  module.exports = router;