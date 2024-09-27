## Available Scripts

In the project directory, you can run:

### `npm install`

Run this command from the root folder after pulling the repository from git.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Main functionalities of the app include:

    1. Kanban board which contains 3 columns and on load the board will include one ticket per column.

    2. The tickets can be drag and dropped into each column only in the designated space, if its dropped outside of the designated space the ticket will snap back to the original column.

    3. Adding tickets for each column via + button on the right.

    4. Editing the tickets by double clicking on the ticket text, will open a modal for editing.

    5. Searching (filtering) the tickets via a search input which is case insensitive.

    6. The board is responsive for different media queries and will readjust based on screen changes.

    7. The board state is saved in local storage and will remain peristant on hard refreshes, if the local storage is cleared the board will default back to the initial state menitioned in 1.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm test -- {name of test file eg. KanbanBoard.test.tsx}`

Launches specific test by given name

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
