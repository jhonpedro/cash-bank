export default interface KafkaInterface {
  newMessage(topic: string, message: string): Promise<void>
}
