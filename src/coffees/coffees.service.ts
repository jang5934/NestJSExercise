import { NotFoundException, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shpwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        }
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        // throw 'A random exception';
        const coffee = this.coffees.find(item => item.id === +id);
        if(!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto: any) {
        let foundIndex = this.coffees.findIndex(item => item.id === +id)
        console.log(foundIndex);
        if (foundIndex !== undefined) {
            this.coffees[foundIndex] = updateCoffeeDto;
        }

    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}
