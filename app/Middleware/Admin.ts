
import { AuthenticationException } from '@adonisjs/auth/build/src/Exceptions/AuthenticationException'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  /**
   * Handle request
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (!await auth.check()) throw new AuthenticationException(
      'Permission Denied',
      'Unauthorized access',
      'api',
      'null',
    )
    let user = await auth.use('api').authenticate()
    if (!user.role || user.role != 'admin') {
      //throw new Exception('Invalid access exception', 401)
      throw new AuthenticationException(
        'Permission Denied',
        'Unauthorized access',
        'api',
        'null',
      )
    }
    await next()
  }
}