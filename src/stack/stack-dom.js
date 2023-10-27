const stackList = document.getElementById('stack-list');
const stackInput = document.getElementById('stack-input');
const container = document.getElementById('container');
const warningTopStack = document.querySelector('#stack-container .warning-top');
const warningBottomStack = document.querySelector(
  '#stack-container .warning-bottom'
);
const addStackBtn = document.getElementById('add-stack');
const takeStackBtn = document.getElementById('take-stack');

// creates a new stack object
const newStack = new Stack();

// function that deletes the text on the input box
const clearStackInput = () => {
  stackInput.value = '';
};

// makes the task list visible. runs the first time, is triggered every time we click the button
const renderListStack = () => {
  // hides top warning
  warningTopStack.style.display = 'none';

  // hides bottom warning
  warningBottomStack.style.display = 'none';

  // assumption: replaces all the content every time it is called, rendering the correct amount of filled and empty cells. Without it, a new stack is added, and not created
  stackList.innerHTML = '';
  let length = newStack.display().length;
  let size = newStack.MAX_SIZE - length;
  // this is creating the blue items
  newStack.display().forEach(item => {
    let li = document.createElement('li');
    li.className = 'active';
    li.innerText = item;
    stackList.appendChild(li);
  });
  // this is creating the gray squares. grey squares are the # of elements not occupied fot the array, hence a for loop that can stop with size
  for (let i = 0; i < size; i++) {
    let li = document.createElement('li');
    li.className = 'inactive';
    li.innerHTML = '&nbsp;';
    stackList.appendChild(li);
  }
};
renderListStack();

// function takes a type parameter. if a certain type, will display the error
const generateWarningStack = type => {
  if (type === 'underflow') {
    warningBottomStack.style.display = 'block';
    warningBottomStack.innerText = type;
  } else if (type === 'overflow') {
    warningTopStack.style.display = 'block';
    warningTopStack.innerText = type;
  }
};

// adds a new value to the stack -> generates warning if an error happens
const addToStack = () => {
  if (newStack.push(stackInput.value) === 'Stack Overflow') {
    generateWarningStack('overflow');
  } else {
    clearStackInput();
    renderListStack();
  }
};

// removes value from the stack -> generates warning if an error happens
const removeFromStack = () => {
  if (newStack.pop() === 'Stack Underflow') {
    generateWarningStack('underflow');
  } else {
    renderListStack();
  }
};

addStackBtn.addEventListener('click', addToStack);
takeStackBtn.addEventListener('click', removeFromStack);
