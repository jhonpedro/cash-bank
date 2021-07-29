import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Env from '@ioc:Adonis/Core/Env'
import Admin from 'App/Models/Admin'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Admin.create({
      name: 'root',
      email: Env.get('ROOT_ADM_EMAIL'),
      password: Env.get('ROOT_ADM_PASS'),
    })
  }
}
