import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import axios from 'axios'
import Kafka from 'App/Services/kafka'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Cash_Bank/Kafka', () => new Kafka())
    this.app.container.singleton('Cash_Bank/Axios', () => axios)
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
