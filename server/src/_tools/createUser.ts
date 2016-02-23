import stdio = require('stdio')
import jwt = require('jsonwebtoken')
import db from '../_core/db'
import hashPwd from '../_core/hashPassword'
import Users from '../models/Users'
import {jwtSecret} from '../config/auth'
var args = stdio['getopt']
({
  db: {key: 'd', description: 'Database to act on', mandatory: true, args: 1},
  uid: {key: 'u', description: 'Username', mandatory: true, args: 1},
  pwd: {key: 'p', description: 'Password', mandatory: true, args: 1},
  role: {key: 'r', description: 'Role', mandatory: true, args: 1},
  groups: {key: 'g', description: 'Group', mandatory: false, multiple: true}
});

Users.findOne({uid: args.uid}, function(err, user)
{
  if (err) {return console.error('%s', err.toString())}
  if (!user)
  {
    var salt = hashPwd.generateSalt(128)
    var groups = typeof args.groups === 'object' ? args.groups : [args.groups]
    var hashedPwd = hashPwd.hashPassword(salt, args.pwd)
    Users.insert
    (
      {
        uid: args.uid,
        groups: groups,
        salt: salt,
        role: args.role,
        hashPwd: hashedPwd,
        token: jwt.sign({uid: args.uid}, jwtSecret, {expiresIn: 30 * 60 * 60})
      },
      function(err, doc)
      {
        if (err) {return console.error('%s', err.toString())}
        if (doc) {console.log('User ' + args.uid + ' successfully created.')}
        else {console.error('Failed to insert')}
        db.close()
      }
    );
  }
  else
  {
    console.error('User (%s) already exists!', args.uid)
    db.close()
  }
});

