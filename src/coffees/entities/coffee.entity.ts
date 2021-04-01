import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity"
@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recommendations: number;

    // 소유자 측에서의 관계를 특정시켜준다.지금의 경우에는 Coffee 엔티티가 되겠다. 
    @JoinTable()
    @ManyToMany(
        type => Flavor,
        (flavor) => flavor.coffees,
        {
            cascade: true, // 👈 or optionally just insert or update ['insert']
        },
    ) // type => Flavor는 관련된 엔티티를 리턴시켜주는 역할을 하는 함수인데
    // 지금의 경우엔 Flavor를 반환해주는 것.
    flavors: Flavor[];
}