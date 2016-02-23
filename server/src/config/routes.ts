import auth from './auth'
import project from '../controllers/project'
import user from '../controllers/user'

export default (app) =>
{
  //unprotected routes
  app.post('/login', auth.authenticate)
  app.post('/logout', (req: Express.Request, res: any) =>
  {
    req.logout()
    res.end()
  })
  app.get('/partials/*', (req: any, res) =>
  {
    res.render('../../public/app/' + req.params[0])
  })
  app.get('/', (req, res) =>
  {
    res.render('index')
  })

  //protected routes
  app.use('/api/*', auth.requiresLogin)
  app.get('/api/me', user.getUser)
  app.get('/api/projects', project.getProjects)
  app.all('/api/*', (req, res: any) =>
  {
    res.sendStatus(404)
  })

  //catch all route
  app.get('*', (req, res) =>
  {
    res.redirect('/')
  })

  //error handling
  app.use(function(err: Error, req, res: any, next)
  {
    console.error(err)
    let msg = 'Uh-oh, something went wrong.'
    if (err.name === 'UnauthorizedError')
    {
      msg = 'Soz, your token is invalid.'
    }
    res.sendStatus(401)
  })
}
