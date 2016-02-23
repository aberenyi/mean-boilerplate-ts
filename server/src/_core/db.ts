//import * as mongojs from 'mongojs'
import mongojs = require('mongojs');

let db = mongojs('mongodb://localhost/boilerplate')
db.on('error', (err: Error) =>
{
  console.error(`Database error ${err}`)
})
db.oid = mongojs['ObjectID']

db.on('connect', () =>
{
  console.log('Database connection established.');
})

export default db
