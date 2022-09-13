import app from './app'

const environment = app.get('env')
const port = process.env.PORT

app.listen(port, () => {
  if (environment === 'development') {
    console.log(`Server running at http://localhost:${port as string}`)
  } else {
    console.log('Server is ready')
  }
})
