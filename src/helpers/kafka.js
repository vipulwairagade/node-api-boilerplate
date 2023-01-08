import { envConfig } from "#configs/index";
import { readFileSync } from "node:fs";
import { logger } from "#helpers/index";
const { Kafka, logLevel } = require("kafka-node");

let options = {
	clientId: "id", // not sure if this is required yet
	brokers: ["kafka1:9093", "kafka2:9093"],
	logLevel: logLevel.ERROR
};

if (envConfig.KAFKA_SSL_ENABLED) {
	options = {
		...options,
		ssl: envConfig.KAFKA_SSL_ENABLED,
		sslOptions: {
			rejectUnauthorized: true,
			ca: [readFileSync("ca-cert.pem")],
			key: readFileSync("client-key.pem"),
			cert: readFileSync("client-cert.pem")
		}
	};
}
// Will use configs later here, for now i am hardcoding this.
const client = new Kafka(options);

// Create a producer
const producer = new Kafka.Producer(client);

// Wait for the producer to be ready
producer.on("ready", () => {
	logger.info("Producer is ready");
});

// Handle producer errors
producer.on("error", error => {
	logger.error(error);
});

// Create a consumer
const consumer = new Kafka.Consumer(client, [{ topic: "my-topic" }]);

// Wait for the consumer to be ready
consumer.on("ready", () => {
	logger.info("Consumer is ready");
});

// Consume messages
consumer.on("message", message => {
	logger.info(message);
});

// Handle consumer errors
consumer.on("error", error => {
	logger.error(error);
});

module.exports = {
	producer,
	consumer,
	produceMessage: (topic, message) => {
		producer.send([{ topic, messages: message }], (error, result) => {
			logger.info(error || result);
		});
	},
	consumeMessages: () => {
		// Consume messages as they become available
		consumer.on("message", message => {
			logger.info(message);
		});
	}
};
