import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionValidator from 'App/Validators/SessionValidator'

export default class SessionsController {
  public async store({ auth, request }: HttpContextContract) {
    await request.validate(SessionValidator)
    const { email, password } = request.only(['email', 'password'])

    const token = await auth.attempt(email, password)

    return token
  }
}
