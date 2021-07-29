import { Kafka as KafkaJS, logLevel } from 'kafkajs'
import KafkaInterface from 'Contracts/interfaces/kafka.interface'

export default class Kafka implements KafkaInterface {
  private instance: KafkaJS
  constructor(
    instance = new KafkaJS({
      brokers: ['localhost:9092'],
      clientId: 'cash_app',
      logLevel: logLevel.INFO,
    })
  ) {
    this.instance = instance
  }

  public async newMessage(topic: string, message: string) {
    const producer = this.instance.producer()

    await producer.connect()

    await producer.send({
      topic,
      messages: [
        {
          value: message,
        },
      ],
    })

    await producer.disconnect()
  }
}
