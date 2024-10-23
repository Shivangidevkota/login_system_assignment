* Live Deployment
https://shivangidevkota.github.io/login_system_assignment/

* Steps to run the project
  
Step 1: Set Up Your Environment
Install Node.js: Ensure you have Node.js installed on your machine. This will include npm (Node Package Manager).

Clone the Repository
Navigate to the Project Directory:

Step 2: Install Dependencies
Install Project Dependencies: Run the following command to install all the necessary packages:
npm install

Step 3: Run the Development Server
Start the Development Server: Launch the application using:
npm start
This will start the local server, and you should see output indicating the app is running, usually at http://localhost:3000.

Open Your Browser: Navigate to http://localhost:3000 in your web browser to see your app in action.

## Structure of the App

/src
  ├── /components
  │   ├── Login.js
  │   ├── TaskManager.js
  ├── /contexts
  │   ├── UserContext.js
  │   └── TaskContext.js
  ├── App.js
  ├── index.js
  ├── App.css
  └── package.json
  
* Login.js:
Handles user authentication.
Contains forms for user registration and login.
Uses the UserContext to manage user state (login, logout, registration).
Validates input and displays error messages.

* TaskManager.js:
Manages tasks for the logged-in user.
Provides functionality to add, edit, mark as complete, and delete tasks.
Displays the list of tasks and their statuses.
Utilizes the TaskContext to manage the task state.


* UserContext.js:
Manages user-related state, such as login status and user information.
Provides functions for logging in, registering new users, and logging out.
Stores user credentials in localStorage for persistence.

* TaskContext.js:
Handles task-related state management.
Provides functions to add, update, delete, and mark tasks as completed.
Syncs task data with localStorage, ensuring tasks persist across sessions.

* App.js:
The main entry point of the application.
Wraps components with UserProvider and TaskProvider to provide context to child components.
Handles routing and conditional rendering based on user authentication state.

* index.js:
The starting point for the React application.
Renders the App component into the root element in the HTML.

* App.css:
Contains styles for the application. You can add custom CSS rules here to enhance the UI.

* package.json:
Manages project dependencies and scripts.
Defines the project metadata, including the name, version, and homepage for deployment.
