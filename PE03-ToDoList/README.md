# 1. Input:
The app gets a task description from the user by typing in the text box. When the user writes a description and clicks the Add Task button, that description becomes the input data. 
If the description is empty, the app doesn't add it to the list so there are no blank tasks.

# 2. Process: 
The app handles each task using React's state, which is managed with the useState hook. The TodoList component keeps track of all the tasks in an array and has functions to add and delete tasks.When the Add Task button is clicked, a new task with a unique ID is created and the state is updated without changing the original array directly. 
The TodoTask component gets a task and a delete function through props. The map() function is used to create a TodoTask component for every task in the state array.React automatically updates the screen whenever the state changes.

# 3. output:
The output is a to-do list that shows up on the page.
Each task has a Delete button.When a new task is added, it shows up on the list. When a task is deleted, it disappears from the list.