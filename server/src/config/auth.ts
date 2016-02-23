import * as passport from 'passport'
import * as jwt from 'express-jwt'

export const jwtSecret = '=5.4Miox.jO^|.4kxM0VJQ*JM!p=%S^Z|;Sw5EhnBKFF-Ypjva.E35tigX~:N-MtMG+6+T!AUkUI2bu-|Am%' +
  '|VNP8FP.N:d=3f*-=|DS2+9GLtfj:CX_L5EvKs!fzGKr'

export default
{
  authenticate,
  requiresLogin: jwt({secret: jwtSecret})
}

function authenticate(req: any, res: any, next: any)
{
  let auth = passport.authenticate('local', (err: Error, user: any) =>
  {
    if (err) {return next(err)}
    if (!user) {res.send({success: false})}
    req.logIn(user, function(err)
    {
      if (err) {return next(err)}
      res.send({success: true, user: user})
    })
  })
  auth(req, res, next)
}
