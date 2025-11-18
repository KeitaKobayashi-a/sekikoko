const { setupServer } = require('./server');

const app = setupServer();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Is your server running? Well, you better go catch it, then! http://localhost:${PORT}`
  );
});
