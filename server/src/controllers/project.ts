import Users from '../models/Users'
import Projects from '../models/Projects'

export default
{
  getProjects: getProjects
}

/**
 * List projects that the user has access to.
 * @param req
 * @param res
 */
function getProjects(req: any, res: any)
{
  Users.findOne({uid: req.user.uid}, {groups: 1, role: 1}, (err, user) =>
  {
    if (err) {return res.status(500).send(err.toString())}
    let condition = user.role === 'admin' ? {} : {groups: {$in: user.groups}}
    Projects.find(condition, (err, projects) =>
    {
      if (err) {return res.status(500).send(err.toString())}
      res.send(projects)
    })
  })
}
