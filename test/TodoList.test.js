const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })//before hook to get a copy of TodoList before it is deployeed to blockchain

  it('deploys successfully', async () => { //make sure that the address isnt empty or null
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
  //test to see if the default constructor list item is loading successfully
  it('lists tasks', async () => { 
    const taskCount = await this.todoList.taskCount() 
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber()) 
    assert.equal(task.content, 'New Item') 
    assert.equal(task.completed, false) 
    assert.equal(taskCount.toNumber(), 1)
  })
  //test to see if tasks are getting created successfully
  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)
  })
  //checks to see if tasks are being completed when their checkbox is toggeled
  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })
})