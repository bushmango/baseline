export default (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end('pong');
};