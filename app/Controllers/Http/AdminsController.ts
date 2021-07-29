import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import AdminStoreValidator from 'App/Validators/AdminStoreValidator'

export default class AdminsController {
  public async index({}: HttpContextContract) {
    return Admin.all()
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(AdminStoreValidator)
    const data = request.only(['name', 'email', 'password'])

    const newAdmin = await Admin.create(data)

    return newAdmin
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    return Admin.find(id)
  }

  public async update({ request, params }: HttpContextContract) {
    await request.validate(AdminStoreValidator)
    const { id } = params
    const data = request.only(['name', 'email', 'password'])

    const admin = await Admin.findByOrFail('id', id)

    admin.merge(data)

    await admin.save()

    return admin
  }
}
