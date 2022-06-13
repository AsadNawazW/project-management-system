import { Kafka } from 'kafkajs';

export default function initKafka() {
  const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
  const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
  const ssl = !!sasl;

  // This creates a client instance that is configured to connect to the Kafka broker provided by
  // the environment variable KAFKA_BOOTSTRAP_SERVER
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    ssl,
    sasl,
  });

  return kafka;
}
