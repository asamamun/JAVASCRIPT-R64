const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/numbers' && req.method === 'GET') {
        // Generate array of numbers from 1 to 100
        const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
        //Array.from({ length: 100 }, (_, i) => i + 1) creates an array of 100 elements, mapping each index i to i + 1 (so it starts at 1, not 0).

        // Set response headers for JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // Send JSON response
        res.end(JSON.stringify(numbers));
    }
    else{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
    }
});

const PORT = 3030;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});