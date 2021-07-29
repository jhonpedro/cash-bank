declare module '@ioc:Cash_Bank/Kafka' {
  import KafkaInterface from 'Contracts/interfaces/kafka.interface'

  const KafkaService: KafkaInterface

  export default KafkaService
}
