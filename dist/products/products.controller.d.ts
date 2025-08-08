import { ProductsService } from "./products.service";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(input: CreateProductInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, input: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<boolean>;
}
