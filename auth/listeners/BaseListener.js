import initKafka from '../kafka/init';

class BaseListener {
  constructor(topicName) {
    this.kafka = initKafka();
    this.topic = topicName;
    this.subscribe();
    // this.createTopic(this.topic);
  }

  async subscribe(key, value, topic = undefined) {
    let kafkaTopic = topic;

    if (kafkaTopic === undefined) {
      kafkaTopic = this.topic;
    }

    console.log(kafkaTopic);

    this.consumer = this.kafka.consumer({
      groupId: `${kafkaTopic}_group`,
    });

    await this.consumer.connect();

    await this.consumer.subscribe({
      topic: kafkaTopic,
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ topicName, partition, message }) => {
        const messageKey = message.key.toString();
        const messageValue = JSON.parse(message.value.toString());

        console.log('Received message', {
          topicName,
          partition,
          key: messageKey,
          value: messageValue,
        });
        
        if (typeof this[messageKey] === 'function') {
          this[messageKey](messageValue.data, topic);
        }
      },
    });
  }
}

export default BaseListener;
