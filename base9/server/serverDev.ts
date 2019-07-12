import { prepareServer } from './server'
const port = 3200
const server = prepareServer()
server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

