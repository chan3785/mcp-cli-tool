import http from 'node:http';
import { Buffer } from 'node:buffer';

export function handleCommand(command: string, args: string[]) {
  const data = JSON.stringify({ command, args });

  const options: http.RequestOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/command',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      try {
        const json = JSON.parse(body);
        console.log('✅ Response:', json);
      } catch {
        console.log('🟡 Raw Response:', body);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Request error:', err.message);
  });

  req.write(data);
  req.end();
}
