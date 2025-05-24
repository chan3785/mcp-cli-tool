import http from 'node:http'

const server = http.createServer((req,res) => {
    if (req.method === 'POST' && req.url === '/command') {
        let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () =>{
        try {
            const response = {
                status: 'ok',
                text: 'hello world!'
            }
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(response))
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(error));
        }
    })
       

} else {
    res.writeHead(404);
    res.end('Not found');
  }
})

server.listen(3000, () => {
    console.log('🚀 MCP Server running on http://localhost:3000');
})