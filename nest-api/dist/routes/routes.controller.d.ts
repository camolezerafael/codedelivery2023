import { OnModuleInit } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ClientKafka } from "@nestjs/microservices";
import { RoutesGateway } from "./routes/routes.gateway";
export declare class RoutesController implements OnModuleInit {
    private readonly routesService;
    private kafkaClient;
    private routeGateway;
    private kafkaProducer;
    constructor(routesService: RoutesService, kafkaClient: ClientKafka, routeGateway: RoutesGateway);
    create(createRouteDto: CreateRouteDto): string;
    findAll(): Promise<(import("./entities/route.entity").Route & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateRouteDto: UpdateRouteDto): string;
    remove(id: string): string;
    startRoute(id: string): void;
    onModuleInit(): Promise<any>;
    consumeNewPosition(value: {
        routeId: string;
        clientId: string;
        position: [number, number];
        finished: boolean;
    }): void;
}
