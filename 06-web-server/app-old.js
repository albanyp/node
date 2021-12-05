const http = require('http')

http.createServer( (req, res) => {
  console.log(req)

  // res.writeHead(200, { 'Content-Type': 'text/plain'})
  // res.writeHead(200, { 'Content-Type': 'application/csv'})

  // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
  // res.writeHead(200, { 'Content-Type': 'application/csv'})


  // res.write('404 | Page not found')

  // const person = {
  //   id: 1,
  //   name: 'Albany'
  // }
  // res.write(JSON.stringify(person))

  // res.write('id, nombre\n')
  // res.write('1, Albany\n')
  // res.write('2, Jean\n')
  // res.write('3, Michael\n')


  res.write('Hello world')

  res.end()
})
.listen(8080)

console.log('listening in 8080 port')