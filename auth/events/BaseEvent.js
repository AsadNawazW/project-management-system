import initKafka from '../kafka/init';

class BaseEvent {
  constructor() {
    const kafka = initKafka();
    this.producer = kafka.producer();
    this.kafkaAdmin = kafka.admin();
    this.topic = process.env.KAFKA_DEFAULT_TOPIC;
    // this.createTopic(this.topic);
  }

  async createTopic(topicName) {
    await this.kafkaAdmin.connect();
    await this.kafkaAdmin.createTopics({
      topics: [{ topicName }],
      waitForLeaders: true,
    });
  }

  async sendMessage(key, value, topic = undefined) {
    let kafkaTopic = topic;

    if (kafkaTopic === undefined) {
      kafkaTopic = this.topic;
    }

    await this.producer.connect();

    await this.producer.send({
      topic: kafkaTopic,
      messages: [
        {
          key,
          value: JSON.stringify(value),
        },
      ],
    });
  }
}

export default BaseEvent;
