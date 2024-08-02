USE movie;

-- Step 1: Drop existing tables if they exist
DROP TABLE IF EXISTS movie_artists;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS movies;

-- Step 2: Create tables
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    genre VARCHAR(100),
    rating DECIMAL(3, 1),
    description TEXT,
    summary TEXT,
    thumbnail_url VARCHAR(255) -- Added column for movie poster URL
);

CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year INT,
    nationality VARCHAR(100)
);

CREATE TABLE movie_artists (
    movie_id INT,
    artist_id INT,
    role VARCHAR(100),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

-- Step 3: Insert data into movies
INSERT INTO movies (title, release_year, genre, rating, description, summary, thumbnail_url) VALUES
('K.G.F: Chapter 1', 2018, 'Action', 8.6, 'The story of Rocky, a young man with a troubled past, who rises to power in the world of gold mining, facing numerous challenges.', 'Rocky’s rise to power in the K.G.F (Kolar Gold Fields) as he battles against a ruthless empire and uncovers dark secrets.', 'https://www.scrolldroll.com/wp-content/uploads/2023/09/kgf-best-kannada-movies-on-ott.jpg'),
('K.G.F: Chapter 2', 2022, 'Action', 8.8, 'Rocky continues his fight against the forces of evil in the gold mining empire, facing new challenges and adversaries.', 'The sequel to K.G.F: Chapter 1, continuing Rocky’s journey and his battle for supremacy.', 'https://m.media-amazon.com/images/S/pv-target-images/f5a21f64af7359f7aaa7c29dee8a12a97630e707cdbf71e0ae6b063322fb8575.jpg'),
('Raja Huli', 2013, 'Action', 8.9, 'A local hero fights against the corruption and injustice in his village.', 'The story of a local hero who stands up against corruption and injustice in his village.', 'https://m.media-amazon.com/images/M/MV5BNTc4NTg4MjYwMV5BMl5BanBnXkFtZTgwMDUxMDA3MjE@'),
('Tagaru', 2018, 'Action', 8.2, 'A cop’s quest for justice leads him into a world of crime and violence.', 'A gripping tale of a police officer’s fight against the criminal underworld.', 'https://assets.voxcinemas.com/posters/P_HO00005344.jpg'),
('Ugramm', 2014, 'Action', 8.9, 'A man returns to his hometown to confront his dark past and seek vengeance.', 'The story of a man’s return to his roots to confront his past and seek justice.', 'https://i.pinimg.com/originals/5b/1c/1e/5b1c1e3cebcfec18377e6de4a59ff5d0.jpg'),
('Bharaate', 2019, 'Action', 8.8, 'A man’s journey to become a hero in his own right amidst various challenges.', 'A heroic tale of a man striving to make a mark in the world despite numerous obstacles.', 'https://m.media-amazon.com/images/M/MV5BNmJiNjBkY2QtYTRhNy00YTI3LWI1ZGMtMDIyMjNhNTE3MDI3XkEyXkFqcGdeQXVyNjkwOTg4MTA@'),
('Masterpiece', 2015, 'Action', 8.8, 'A young man fights against a criminal empire to save his loved ones.', 'The story of a young man’s battle against a powerful criminal syndicate.', 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/masterpiece-et00036801-16-10-2020-11-36-18.jpg'),
('Kantara', 2022, 'Action', 9.3, 'A man fights to protect his land and culture against external threats.', 'A gripping story of a man’s fight to preserve his land and cultural heritage.', 'https://voicingaloud.files.wordpress.com/2022/10/img_8127.jpg'),
('Doddhamane Huduga', 2016, 'Action', 8.8, 'A local man’s struggle to overcome personal and societal challenges.', 'The story of a man’s journey through personal struggles and societal issues.', 'https://1.bp.blogspot.com/-KbldlDEXGXc/XyEPUzZBGfI/AAAAAAAAAUQ/iF7Kpxz7WOUeSZSHKg9XfPNDW_vrKH53ACLcBGAsYHQ/s1600/90278_328960.jpg'),
('Sarkari Hi. Pra. Shaale, Kasaragod', 2018, 'Comedy', 7.6, 'A comedy-drama revolving around the educational system in a small town.', 'A humorous take on the challenges and dynamics of the education system in a small town.', 'https://kannada.filmibeat.com/img/2018/10/2sarkarishaalecopy-1539095661.jpg'),
('Humble Politician Nograj', 2018, 'Comedy', 8.6, 'A satirical take on the political landscape through the eyes of a quirky politician.', 'The story of a quirky politician and his humorous take on the political landscape.', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Humble_Politician_Nograj_Poster.jpg/220px-Humble_Politician_Nograj_Poster.jpg'),
('Gaalipata', 2008, 'Action', 9.0, 'Three friends embark on a journey that brings them face to face with various challenges.', 'A story of friendship and adventure as three friends navigate through various trials.', 'https://m.media-amazon.com/images/M/MV5BZGI0ZDk4MDMtYWE4ZS00MTc3LTg4YjAtYjRhZDczNmRmYzJkXkEyXkFqcGdeQXVyMzQzMDc2MDk@'),
('Avane Srimannarayana', 2019, 'Action', 8.7, 'A detective’s quest to uncover a mystery in a fictional kingdom.', 'The story of a detective’s investigation into a series of mysterious events in a fictional kingdom.', 'https://m.media-amazon.com/images/M/MV5BNzY3M2UyOWYtZTM4Zi00ZjY3LTg2MDktMDgyNzEwMjRiYjc1XkEyXkFqcGdeQXVyMTA4NjE0NjEy'),
('Pailwaan', 2019, 'Action', 7.7, 'A wrestler’s journey to achieve greatness and overcome personal hurdles.', 'The story of a wrestler’s struggle to achieve success and overcome personal obstacles.', 'https://musicart.xboxlive.com/7/275e5500-0000-0000-0000-000000000002/504/image.jpg'),
('Rambo 2', 2018, 'Action', 7.5, 'A sequel where the protagonist faces new adversaries in his fight for justice.', 'The continuation of Rambo’s fight as he confronts new enemies and challenges.', 'https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_webp,q_auto:eco/resources/0-0-movie_1755621395/portrait/00movie17556213192208592.jpg'),
('Rathavara', 2015, 'Action', 7.8, 'A man’s quest for revenge against a criminal empire.', 'The story of a man’s battle against a powerful criminal organization in his quest for revenge.', 'https://m.media-amazon.com/images/M/MV5BNGY4MTE2ZWItNGZiOS00MGJjLWFjYzQtNTc0NTdjYmQ2YTIwXkEyXkFqcGdeQXVyNTE0NDY5Njc@'),
('Kirik Party', 2016, 'Comedy', 9.0, 'A comedy-drama following the lives and adventures of college friends.', 'The story of a group of college friends and their humorous and dramatic experiences.', 'https://is5-ssl.mzstatic.com/image/thumb/Music19/v4/08/c2/20/08c220b8-92c5-90ff-089b-65aa592972f1/Kirik_Party.jpg/1200x1200bf-60.jpg'),
('Garuda Gamana Vrushabha Vahana', 2022, 'Action', 8.5, 'A story of rivalry and power struggles in the criminal underworld.', 'A gripping narrative of power struggles and rivalries in the world of crime.', 'https://m.media-amazon.com/images/M/MV5BMGY5M2MxZjYtMWUwNi00N2RlLTk4NWQtMTY3YjI2ZjAwYjQ5XkEyXkFqcGdeQXVyODk4NTI4NDA@'),
('Mungaru Male 2', 2016, 'Romance', 7.6, 'A romantic tale exploring the journey of love and relationships.', 'The story of a romantic journey and the challenges faced in relationships.', 'https://m.media-amazon.com/images/M/MV5BYzFhOGZjOWEtYzg0Ni00NWM3LTlhYzktZTI3M2NkOGM1OWEzXkEyXkFqcGdeQXVyNjkwOTg4MTA@'),
('Brundavana', 2012, 'Action', 7.7, 'A story of family and honor set against a backdrop of action and drama.', 'The tale of family honor and drama intertwined with action and adventure.', 'https://upload.wikimedia.org/wikipedia/en/c/c8/Brindavana_poster.jpg'),
('Rajkumara', 2017, 'Action', 8.8, 'A young man’s journey to achieve greatness and fulfill his dreams.', 'The story of a young man’s quest to achieve success and fulfill his ambitions.', 'https://i.pinimg.com/736x/ae/24/c9/ae24c9b4de2957c9cdcc4b41531693cf--abs-cinema.jpg'),
('Bell Bottom', 2019, 'Action', 7.8, 'A detective’s adventure in solving a high-profile case.', 'A thrilling detective story involving a complex and high-profile investigation.', 'https://data1.ibtimes.co.in/photo/en/full/82265/check-out-first-look-poster-kannada-movie-bell-bottom-starring-rishab-shetty-hariprriya-lead.jpg?w=738'),
('777 Charlie', 2022, 'Drama', 8.8, 'A heartwarming story of a man and his loyal dog.', 'The touching story of the bond between a man and his dog, exploring themes of loyalty and companionship.', 'https://www.wikibiodata.com/wp-content/uploads/2020/06/777-Charlie.jpg'),
('Gaalipata 2', 2022, 'Action', 7.9, 'The sequel to Gaalipata, continuing the adventures of the lead characters.', 'A continuation of the Gaalipata story, featuring new adventures and challenges for the characters.', 'https://c.saavncdn.com/005/Gaalipata-2-Kannada-2021-20220812162718-500x500.jpg'),
('Gandhada Gudi', 2022, 'Drama', 7.8, 'A drama centered around a man’s fight for justice in a rural setting.', 'The story of a man’s struggle for justice and righteousness in a rural environment.', 'https://pics.filmaffinity.com/Gandhada_Gudi-471314074-large.jpg'),
('First Rank Raju', 2015, 'Comedy', 9.0, 'A comedy-drama about a student’s journey to achieve top rank.', 'The story of a student’s humorous and dramatic quest to become the top ranker in his class.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM38ldGOof5MleEPgRagsN3WmQN0F9lvZie6E6Zi0uARYWUmZDeDpIfu5ExU5xZylYt_w&usqp=CAU'),
('Mungaru Male', 2006, 'Romance', 8.0, 'A romantic drama focusing on love and relationships.', 'The story of romance and relationships, depicting the emotional journey of the characters.', 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mungaru-male-et00312232-13-07-2021-03-22-54.jpg'),
('Mynaa', 2013, 'Drama', 7.6, 'A drama about love and personal struggles.', 'The tale of love and the personal struggles faced by the characters.', 'https://macsendisk.com/wp-content/uploads/2022/07/Mynaa-Kannada-Movie-DVD.jpg'),
('Love Mocktail', 2020, 'Romance', 8.7, 'A romantic drama exploring the ups and downs of love.', 'A heartfelt exploration of love and its challenges through the lens of the main characters.', 'https://bingeddata.s3.amazonaws.com/uploads/2020/03/Love-Mocktail-Kannada-Movie-Is-Streaming-on-Amazon-Prime-Release-Date-12th-March.jpg'),
('APPU', 2002, 'Action', 8.4, 'A story of a young man’s rise to power amidst challenges.', 'The tale of a young man’s journey to rise above challenges and achieve greatness.', 'https://i0.wp.com/macsendisk.com/wp-content/uploads/2021/12/Appu-Kannada-Movie-DVD-www.macsendisk.com-1.jpg?fit=941%2C1280&ssl=1');

-- Step 4: Insert data into artists
INSERT INTO artists (name, birth_year, nationality) VALUES
('Tim Robbins', 1958, 'American'),
('Morgan Freeman', 1937, 'American'),
('Marlon Brando', 1924, 'American'),
('Al Pacino', 1940, 'American'),
('Christian Bale', 1974, 'British'),
('Heath Ledger', 1979, 'Australian'),
('Henry Fonda', 1905, 'American'),
('Liam Neeson', 1952, 'Irish'),
('John Travolta', 1954, 'American'),
('Bruce Willis', 1955, 'American'),
('Elijah Wood', 1981, 'American'),
('Clint Eastwood', 1930, 'American'),
('Edward Norton', 1969, 'American'),
('Tom Hanks', 1956, 'American'),
('Brad Pitt', 1963, 'American');

-- Step 3: Insert data into movie_artists
INSERT INTO movie_artists (movie_id, artist_id, role) VALUES
(1, 1, 'Actor'),
(1, 2, 'Actor'),
(2, 3, 'Actor'),
(2, 4, 'Actor'),
(3, 5, 'Actor'),
(3, 6, 'Actor'),
(4, 7, 'Actor'),
(5, 8, 'Actor'),
(6, 9, 'Actor'),
(6, 10, 'Actor'),
(7, 11, 'Actor'),
(8, 12, 'Actor'),
(9, 13, 'Actor'),
(9, 15, 'Actor'),
(10, 14, 'Actor');

-- Step 4: Update the movies table with concatenated artist information
UPDATE movies m
JOIN (
    SELECT m.movie_id, 
           GROUP_CONCAT(CONCAT(a.name, ' (', a.nationality, ', born ', a.birth_year, ')') SEPARATOR ', ') AS artist_info
    FROM movies m
    JOIN movie_artists ma ON m.movie_id = ma.movie_id
    JOIN artists a ON ma.artist_id = a.artist_id
    GROUP BY m.movie_id
) subquery ON m.movie_id = subquery.movie_id
SET m.description = CONCAT(m.description, ' Starring ', subquery.artist_info);