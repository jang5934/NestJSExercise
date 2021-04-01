import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeesConfig),
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
    ],
    exports: [CoffeesService],
})
export class CoffeesModule { }
