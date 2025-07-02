import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log('[ProductsController] POST /products');
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    console.log('[ProductsController] GET /products');
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`[ProductsController] GET /products/${id}`);
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log(`[ProductsController] PATCH /products/${id}`);
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`[ProductsController] DELETE /products/${id}`);
    return this.productsService.remove(+id);
  }
}
