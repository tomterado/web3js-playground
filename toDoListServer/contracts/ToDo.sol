// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ToDo {

  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  constructor(){
    lastTaskId = 0;
  }

  event TaskCreated(uint, uint, string , string , bool);

  function createTask(string memory _content, string memory _author) public {
    tasks[lastTaskId] = Task(lastTaskId, block.timestamp , _content, _author, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, block.timestamp , _content, _author, false);
    lastTaskId++;
  }

  function getTask(uint id) taskExists(id) public 
    returns(
      uint,
      uint,
      string memory,
      string memory,
      bool
    ) {
      if(tasks[id].id == 0){
        revert();
      }
      return(
        id,
        tasks[id].date,
        tasks[id].content,
        tasks[id].author,
        tasks[id].done
      );
  }

  function getTaskIds() public returns(uint[] memory) {
    return taskIds;
  }

  modifier taskExists(uint id) {
    if(tasks[id].id == 0){
      revert();
    }
    _;
  }


}
