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

  TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })

}

// Update Status Todo
exports.UpdateStatusTodo = (req, res) => {
  const _id = req.body['_id'];
  const TodoUpdateDate = Date.now();
  const TodoStatus = req.body['TodoStatus'];
  const postBody = {
    TodoStatus,
    TodoUpdateDate
  }

  TodoListModel.updateOne({ _id: _id }, { $set: postBody }, { upsert: true }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}

// Remove Todo
exports.RemoveTodo = (req, res) => {
  const _id = req.body['_id'];

  TodoListModel.remove({ _id }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  });
}


// Select Todo by status
exports.SelectTodoByStatus = (req, res) => {
  const UserName = req.headers['UserName'];
  const TodoStatus = req.body['TodoStatus'];

  TodoListModel.find({ UserName, TodoStatus }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}

// Select Todo by status
exports.SelectTodoByDate = (req, res) => {
  const UserName = req.headers['UserName'];
  const FromDate = req.body['FromDate'];
  const ToDate = req.body['ToDate'];

  TodoListModel.find({ UserName: UserName, TodoCreateDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) } }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}