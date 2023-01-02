import { read, write } from '../utils/model.js';


const GET = (req, res) => {
  try {
    const post = read('post');
    let {active} = req.query
    let filterUsers = post.filter(user => user.active = active)

    if (filterUsers) {
      res.status(200).json({status: 200, message: "ok", data:filterUsers})
    }
    res.status(200).json({status: 200, message: "ok", data:post})
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export default {
  GET
}