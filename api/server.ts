import app from './app/app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[server]: server listening at port ${port}`);
});