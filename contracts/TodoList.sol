// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList{
    uint public taskCount=0;

    struct Task{
        uint id; //this is the special ID of each task
        string content; //this is the name of each task to be done
        bool completed; //true if item is checked off and false if still yet to be completed
    }

    mapping(uint => Task) public tasks; //array storing all the tasks in a signed array state called tasks, the mapping is from the id of the task to the task

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public{
        createTask("New Item");
    }

    function createTask(string memory _content) public{
        taskCount++; //this is the unique ID of a task
        tasks[taskCount]=Task(taskCount, _content, false); //creating the Task with the content passed and adding it to the state variable tasks
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}