"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: process.env.KAFKA_CLIENT_ID,
                brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
                groupId: !process.env.KAFKA_CONSUMER_GROUP_ID ||
                    process.env.KAFKA_CONSUMER_GROUP_ID === ''
                    ? 'my-consumer-' + Math.random()
                    : process.env.KAFKA_CONSUMER_GROUP_ID,
            }
        }
    });
    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map