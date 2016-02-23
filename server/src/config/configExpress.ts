import * as express from 'express'
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import * as morgan from 'morgan'

export default (app: any) =>
{
  app
    .set('views', __dirname + '/../../views')
    .set('view engine', 'jade')
  app
    .use(compress())
    .use(express.static(__dirname + '/../../../public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
    .use(passport.initialize())
    .use(passport.session())
    .use(morgan('dev'))
}
