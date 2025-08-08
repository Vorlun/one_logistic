import { RoutesService } from "./routes.service";
import { CreateRouteInput } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Route } from "./entities/route.entity";
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    create(input: CreateRouteInput): Promise<Route>;
    findAll(): Promise<Route[]>;
    findOne(id: number): Promise<Route>;
    update(id: number, input: UpdateRouteDto): Promise<Route>;
    remove(id: number): Promise<boolean>;
    assignOrders(id: number): Promise<string>;
}
