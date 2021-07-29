import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kafka from '@ioc:Cash_Bank/Kafka'
import Admin from 'App/Models/Admin'
import ForgotPasswordStoreValidator from 'App/Validators/ForgotPasswordStoreValidator'
import ForgotPasswordUpdateValidator from 'App/Validators/ForgotPasswordUpdateValidator'
import { randomUUID } from 'crypto'

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(ForgotPasswordStoreValidator)

    const { email, redirectURL } = request.only(['email', 'redirectURL'])

    const admin = await Admin.findByOrFail('email', email)

    const token = randomUUID()

    admin.forgot_password_token = token
    await admin.save()

    const formatedURL =
      redirectURL.slice(redirectURL.length - 1) === '/'
        ? redirectURL.slice(0, redirectURL.length - 1)
        : redirectURL

    await Kafka.newMessage(
      'new-forgot-password',
      JSON.stringify({ email, url: `${formatedURL}/${token}` })
    )

    return response.json(true)
  }

  public async update({ request }: HttpContextContract) {
    await request.validate(ForgotPasswordUpdateValidator)
    const { password, token } = request.only(['password', 'token'])

    const admin = await Admin.findByOrFail('forgot_password_token', token)

    admin.merge({ password })
    admin.forgot_password_token = ''

    await admin.save()
  }
}
