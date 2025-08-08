import { User } from "../../users/entities/user.entity";
import { Route } from "../../routes/entities/route.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Product } from "../../products/entities/product.entity";
import { Address } from "../../address/entities/address.entity";
export declare class Order {
    id: number;
    client: User;
    dispatcher: User;
    pickup_address: Address;
    delivery_address: Address;
    route: Route;
    vehicles: Vehicle[];
    status: string;
    total_price: number;
    currency: string;
    products: Product[];
    payments: Payment[];
}
