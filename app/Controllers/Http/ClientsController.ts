import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import axios from '@ioc:Cash_Bank/Axios'
import Kafka from '@ioc:Cash_Bank/Kafka'
import ClientStoreValidator from 'App/Validators/ClientStoreValidator'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(ClientStoreValidator)

    const data = request.only(['name', 'email', 'password', 'cpf', 'adress', 'income'])

    await Kafka.newMessage('new-client', JSON.stringify(data))

    return response.status(201).send('created')
  }
  public async index({ request, response }: HttpContextContract) {
    const { s, d } = request.qs()

    const clients = await axios.get(
      `http://localhost:3001/clients?s=${!s ? '' : s}&d=${!d ? '' : d}`,
      { headers: { Authorization: `Bearer ${Env.get('ROOT_ADM_PASS')}` } }
    )

    return response.json(clients.data)
  }
  public async balances({ request, response }: HttpContextContract) {
    const { d } = request.qs()

    const balances = await axios.get(`http://localhost:3001/operations?d=${!d ? '' : d}`, {
      headers: { Authorization: `Bearer ${Env.get('ROOT_ADM_PASS')}` },
    })

    return response.json(balances.data)
  }
}
