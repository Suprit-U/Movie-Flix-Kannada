const http = require('http');
const mysql = require('mysql2');
const
{
    URL
} = require('url');

// Database connection configuration
const connection = mysql.createConnection(
{
    host: 'localhost',
    user: 'suprit',
    password: '12345',
    database: 'movie',
    port: 3306
});

// Connect to the database
connection.connect(err =>
{
    if (err)
    {
        console.error('Error connecting to database: ' + err.stack);
        process.exit(1);
    }
    console.log('Connected to database as id ' + connection.threadId);
});

// Helper function to parse POST data
const getPostData = (req) =>
{
    return new Promise((resolve, reject) =>
    {
        let body = '';
        req.on('data', chunk =>
        {
            body += chunk.toString();
        });
        req.on('end', () =>
        {
            try
            {
                resolve(JSON.parse(body));
            }
            catch (error)
            {
                reject(error);
            }
        });
    });
};

// Create the HTTP server
const server = http.createServer(async (req, res) =>
{
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS')
    {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const id = parsedUrl.searchParams.get('id');
    const searchQuery = parsedUrl.searchParams.get('query');
    const sort = parsedUrl.searchParams.get('sort') || 'ASC';

    try
    {
        switch (path)
        {
            case '/get_recommend_movies':
                if (req.method === 'GET')
                {
                    const sql = `
                        SELECT movie_id, title, release_year, genre, rating, thumbnail_url
                        FROM movies
                        WHERE rating > 8.5
                        ORDER BY RAND()
                        LIMIT 10
                    `;
                    connection.query(sql, (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error fetching recommended movies:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        res.writeHead(200,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(results));
                    });
                }
                break;

            case '/get_all_movies':
                if (req.method === 'GET')
                {
                    const sql = `
                        SELECT movie_id, title, release_year, genre, rating, thumbnail_url
                        FROM movies
                        ORDER BY title ${sort}
                    `;
                    connection.query(sql, (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error fetching all movies:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        res.writeHead(200,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(results));
                    });
                }
                break;

            case '/get_movie_info':
                if (req.method === 'GET')
                {
                    if (!id)
                    {
                        res.writeHead(400,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(
                        {
                            error: 'Movie ID is required'
                        }));
                        return;
                    }
                    const sql = `
                        SELECT m.*, 
                               GROUP_CONCAT(DISTINCT a.name) as artists,
                               GROUP_CONCAT(DISTINCT ma.role) as roles,
                               m.thumbnail_url
                        FROM movies m
                        LEFT JOIN movie_artists ma ON m.movie_id = ma.movie_id
                        LEFT JOIN artists a ON ma.artist_id = a.artist_id
                        WHERE m.movie_id = ?
                        GROUP BY m.movie_id
                    `;
                    connection.query(sql, [id], (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error fetching movie info:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        if (results.length === 0)
                        {
                            res.writeHead(404,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Movie not found'
                            }));
                        }
                        else
                        {
                            res.writeHead(200,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(results[0]));
                        }
                    });
                }
                break;

            case '/search_movies':
                if (req.method === 'GET')
                {
                    if (!searchQuery)
                    {
                        res.writeHead(400,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(
                        {
                            error: 'Search query is required'
                        }));
                        return;
                    }
                    const searchSql = `
                        SELECT movie_id, title, release_year, genre, rating, thumbnail_url
                        FROM movies
                        WHERE title LIKE ?
                    `;
                    connection.query(searchSql, [`%${searchQuery}%`], (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error searching for movies:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        res.writeHead(200,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(results));
                    });
                }
                break;

            case '/add_movie':
                if (req.method === 'POST')
                {
                    const data = await getPostData(req);
                    const addSql = `
                        INSERT INTO movies (title, release_year, genre, rating, thumbnail_url)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    connection.query(addSql, [data.title, data.release_year, data.genre, data.rating, data.thumbnail_url], (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error adding movie:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        res.writeHead(201,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(
                        {
                            message: 'Movie added successfully'
                        }));
                    });
                }
                break;

            case '/delete_movie':
                if (req.method === 'DELETE')
                {
                    const data = await getPostData(req);
                    if (!data.title)
                    {
                        res.writeHead(400,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(
                        {
                            error: 'Title is required'
                        }));
                        return;
                    }
                    const deleteSql = `
                        DELETE FROM movies
                        WHERE title = ?
                    `;
                    connection.query(deleteSql, [data.title], (error, results) =>
                    {
                        if (error)
                        {
                            console.error('Error deleting movie:', error);
                            res.writeHead(500,
                            {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(
                            {
                                error: 'Internal Server Error'
                            }));
                            return;
                        }
                        res.writeHead(200,
                        {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(
                        {
                            message: 'Movie deleted successfully'
                        }));
                    });
                }
                break;

            default:
                res.writeHead(404,
                {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(
                {
                    error: 'Not found'
                }));
                break;
        }
    }
    catch (error)
    {
        console.error('Server Error:', error);
        res.writeHead(500,
        {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(
        {
            error: 'Internal Server Error'
        }));
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () =>
{
    console.log(`Server running at http://localhost:${PORT}/`);
});