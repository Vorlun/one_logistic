import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { Product } from "./entities/product.entity";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create product and assign to vehicle" })
  @ApiBody({ type: CreateProductInput })
  @ApiResponse({ status: 201, description: "Product created", type: Product })
  create(@Body() input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({ status: 200, type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, type: Product })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateProductDto
  ) {
    return this.productsService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Deleted successfully" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
