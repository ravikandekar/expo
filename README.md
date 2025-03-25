# React Native Task Management App (Expo)

## Overview
This is a full-featured React Native app built using Expo. It includes authentication and task management functionalities with JWT-based authentication and JSON as the data source. The app ensures a modern and attractive UI with proper state management using React Context API.

## Features

### Authentication
- **Signup Screen**: Users can register with their name, email, and password.
- **Login Screen**: Users can log in with their email and password.
- **JWT Token Authentication**: Tokens are stored using `AsyncStorage` for session management.
- **Logout**: Clears stored token and navigates back to the login screen.

### Task Management
- **Home Screen**: Displays a list of tasks from a JSON file (simulating an API response). Includes pull-to-refresh.
- **Add Task Screen**: Users can create a new task with a title and description.
- **Task Details Screen**: Displays task details and allows users to edit or delete tasks.

## Tech Stack & Tools
- **State Management**: React Context API (wrapped properly for API handling)
- **Navigation**: React Navigation (Stack Navigator)
- **Storage**: AsyncStorage (for JWT tokens)
- **UI Library**: NativeBase (for an attractive UI)

## Project Structure
```
.
├── assets/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # API Context for state management
│   ├── screens/          # All screens (Login, Signup, Home, Add Task, Task Details)
│   ├── utils/            # Helper functions (JWT handling, AsyncStorage operations)
│   ├── data/             # Sample JSON files for authentication and tasks
│   ├── navigation/       # Stack navigation setup
│   ├── App.js            # Main app entry point
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
```

## Installation & Setup

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-repo/task-manager-app.git
   cd task-manager-app
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Start the Expo Development Server:**
   ```sh
   npx expo start
   ```

## Usage
1. **Signup** with a name, email, and password.
2. **Login** using registered credentials.
3. **View tasks** on the home screen.
4. **Add, edit, or delete** tasks.
5. **Logout** to clear the session.

## Sample JSON Data
### Users (`src/api/mockdata.json`)
```json
[
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123' // In a real app, this would be hashed
  }
]
```

### Tasks (`src/api/mockdata.json`)
```json
[
  {
    "id": 1,
    "title": "Complete React Native Project",
    "description": "Build a task management app with authentication."
  }
]
```

## Contributing
Feel free to submit issues or pull requests for improvements.

## License
This project is open-source and available under the MIT License.

---
Enjoy building with React Native! 🚀

