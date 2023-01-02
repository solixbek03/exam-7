import { read, write } from '../utils/model.js';
import path from 'path'

const GET = (req, res) => {
  try {
    const post = read('post');
    let {active} = req.query
    let filterUsers = post.filter(user => user.active.toString() == active)

    if (filterUsers) {
      return res.status(200).json({status: 200, message: "ok", data:filterUsers})
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const POST = (req, res) => {
  try {
    let posts = read("post");
    let {title, date, dateHour, direction, internalDirection, postLink, postText,types,} = req.body;
    let {postImage} = req.files;

    if (!(title && date && dateHour && direction && internalDirection && postLink && postText && types)){
      throw new Error('please enter the information');
    }
    let image = Date.now() + postImage.name.replace(/\s/g, '');
    postImage.mv(path.resolve('uploads', image));

    
    let newPost = {
      postId: posts.at(-1)?.postId + 1 || 1,
      title,
      date,
      dateHour,
      direction,
      internalDirection,
      postLink,
      postText,
      types,
      active: false,
      image
    };
    posts.push(newPost);
    write('post', posts);

    return res.status(201).json({
      status: 201,
      message: 'created new post',
      data: newPost,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const DELETE = (req, res) => {
  try {
    const post = read('post');
    let { id } = req.params
    let postIndex = post.findIndex(post => post.postId == id)
    console.log(postIndex != -1);
    if(postIndex != -1) {
      let posts = post.splice(postIndex, 1)
      write('post', post)
      return res.status(200).json({status: 200, message : 'post deleted', data:posts})
    } else {
      throw new Error("post not found")
    }
  } catch (error) {
    return res.status(404).json({status: 404, message: 'post not found'})
  }
};

const PUT = (req, res) => {
  try {
    let posts = read('post')
    let { id } = req.params;
    let { active, title, date, dateHour, direction, internalDirection, postLink, postText, types,} = req.body;

    console.log(posts);
    if (!(active|| title|| date, dateHour|| direction|| internalDirection|| postLink|| postText|| types)){
      throw new Error('please enter the information');
    }
    let post = posts.find(post => post.postId == id);

    if (!post){
      throw new Error("not found post")
    } else {
      post.active = active || post.active
      post.title = title || post.title 
      post.date = date || post.date  
      post.dateHour = dateHour || post.dateHour
      post.direction = direction || post.direction
      post.internalDirection = internalDirection || post.internalDirection
      post.postLink = postLink || post.postLink
      post.postText = postText || post.postText
      post.types = types || post.types

      write('post', posts)
      return res.status(200).json({ status: 200, message: "post updated", data: post })

    }
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message})
    
  }
}

export default {
  GET,
  POST,
  DELETE,
  PUT
}