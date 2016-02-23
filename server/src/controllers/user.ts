import Users from '../models/Users'

export default
{
  getUser: getUser
}

/**
 * List projects that the user has access to.
 * @param req
 * @param res
 */
function getUser(req, res)
{
  if (req.user.uid)
  {
    Users.findOne({uid: req.user.uid}, {_id: 0, uid: 1, role: 1, groups: 1}, (err, user) =>
    {
      if (err) {return res.status(500).send(err.toString())}
      res.send(user)
    })
  }
  else
  {
    res.status(500).send('Uh-oh, nothing found. Not logged in perhaps?')
  }
}
