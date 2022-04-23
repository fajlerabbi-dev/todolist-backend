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