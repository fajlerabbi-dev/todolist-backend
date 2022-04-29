const TodoListModel = require('../models/TodoListModel');

exports.CreateTodo = (req, res) => {
  const reqBody = req.body;
  const UserName = req.headers['UserName'];
  // const [TodoSubject, TodoDescription] = reqBody;
  const TodoSubject = reqBody['TodoSubject'];
  const TodoDescription = reqBody['TodoDescription'];
  const TodoStatus = "NEW";
  const TodoCreateDate = Date.now();
  const TodoUpdateDate = Date.now();

  const postBody = {
    UserName: UserName,
    TodoSubject: TodoSubject,
    TodoDescription: TodoDescription,
    TodoStatus: TodoStatus,
    TodoCreateDate: TodoCreateDate,
    TodoUpdateDate: TodoUpdateDate,
  }
  TodoListModel.create(postBody, (error, data) => {
    if (!error) {
      res.status(201).json({ Status: 'Success', Data: data });
    } else {
      res.status(400).json({ Status: 'Fail', Data: error });
    }
  })
}


// Select Todo
exports.SelectTodo = (req, res) => {
  const UserName = req.headers['UserName'];

  TodoListModel.find({ UserName: UserName }, { Password: 0 }, (error, data) => {
    if (!error) {
      res.status(200).json({ status: 'Success', data: data });
    } else {
      res.status(400).json({ status: 'Unauthorized', data: error });
    }
  })

}


// Update Todo
exports.UpdateTodo = (req, res) => {

  let TodoSubject = req.body['TodoSubject']
  let TodoDescription = req.body['TodoDescription']
  let _id = req.body['_id']
  let TodoUpdateDate = Date.now();

  let PostBody = {
    TodoSubject: TodoSubject,
    TodoDescription: TodoDescription,
    TodoUpdateDate: TodoUpdateDate,
  }

  TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })

}