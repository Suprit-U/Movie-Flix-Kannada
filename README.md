# MovieFlix Kannada Showcase

MovieFlix Kannada Showcase is a web application that highlights and celebrates Kannada cinema. This project allows users to explore, search, and manage a collection of Kannada movies, providing an interactive platform for movie enthusiasts.

## Features

- Browse recommended Kannada movies
- View all movies with sorting options
- Search for specific movies
- View detailed information about each movie
- Add new movies to the database
- Delete movies from the database

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Database: MySQL

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MovieFlix-Kannada-Showcase.git
   ```

2. Navigate to the project directory:
   ```
   cd MovieFlix-Kannada-Showcase
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up the MySQL database:
   - Create a database named `movie`
   - Update the database connection details in `server.js`

5. Import the SQL schema:
   ```
   mysql -u yourusername -p movie < movie.sql
   ```

6.Start Http server
   ```
      http-server
   ```

7. Start the server:
   ```
   node server.js
   ```

8. Open `index.html` in your web browser to view the application.

## Usage

- Click on "Recommend Movies" to see a selection of highly-rated Kannada movies.
- Use "All Movies" to view the complete collection, with options to sort.
- Use the search bar to find specific movies by title.
- Click on a movie to view more details.
- Use the "Add Movie" and "Delete Movie" options to manage the movie collection.

## Contributing

Contributions to improve MovieFlix Kannada Showcase are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped to showcase Kannada cinema through this project.
- Special appreciation to the vibrant Kannada film industry for producing amazing content.
