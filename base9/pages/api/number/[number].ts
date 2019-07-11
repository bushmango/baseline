export default (req, res) => {

  const {
    query: { number }
  } = req;

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ number: number }));
};