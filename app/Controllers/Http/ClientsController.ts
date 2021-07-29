import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kafka from '@ioc:Cash_Bank/Kafka'
import ClientStoreValidator from 'App/Validators/ClientStoreValidator'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(ClientStoreValidator)

    const data = request.only(['name', 'email', 'password', 'cpf', 'adress', 'income'])

    await Kafka.newMessage('new-client', JSON.stringify(data))

    return response.status(201).send('created')
  }
}
