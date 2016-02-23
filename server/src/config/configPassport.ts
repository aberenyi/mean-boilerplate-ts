import * as passport from 'passport'
import LocalStrategy = require('passport-local')
import db from '../_core/db'
import hashPwd from '../_core/hashPassword'
import Users from '../models/Users'

export default () =>
{
  passport.use
  (
    new LocalStrategy((username: string, password: string, done: any) =>
    {
      Users.findOne({uid: username}, {token: 1, salt: 1, hashPwd: 1}, (err: Error, user: any) =>
      {
        if (user && user.token && user.hashPwd === hashPwd.hashPassword(user.salt, password))
        {
          delete user.salt
          delete user.hashPwd
          done(null, user)
        }
        else
        {
          done(null, false)
        }
      })
    })
  )


  passport.serializeUser((user: any, done: any) =>
  {
     if (user) {done(null, user._id)}
  });

  passport.deserializeUser((_id: any, done: any) =>
  {
    Users.findOne({_id: db.oid(_id)}, {token: 1}, (err: Error, user: any) =>
    {
      done(null, user ? user : false)
    })
  })
}
