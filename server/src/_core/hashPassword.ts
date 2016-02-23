import crypto = require('crypto')
import base64url = require('base64url')

export default
{
  generateSalt: (size: number): string =>
  {
    return base64url(crypto.randomBytes(size))
  },

  hashPassword: (salt: string, pwd: string): string =>
  {
    let hmac = crypto.createHmac('sha256', salt)
    return hmac.update(pwd).digest('hex')
  }
}
