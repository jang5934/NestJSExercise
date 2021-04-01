import { Query, Body, Controller, Delete, Get, Param, Patch, Post, Inject, ValidationPipe, SetMetadata } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request,
        ) {
        console.log('CoffeesController created');
    }

    @SetMetadata('isPublic', true)
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get()
    //async 
    findAll(@Query() pagenationQuery) {
        const { limit, offset } = pagenationQuery;
        //await new Promise(resolve => setTimeout(resolve, 5000));
        return this.coffeesService.findAll(pagenationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        console.log(id);
        return this.coffeesService.findOne('' + id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    delete(@Param('id') id : string) {
        return this.coffeesService.remove(id);
    }
}
