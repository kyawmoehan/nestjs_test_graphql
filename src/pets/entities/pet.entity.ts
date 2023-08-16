import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "../../owners/entities/owner.entity";

@Entity('pets')
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    type: string;

    @ManyToOne(() => Owner, owner => owner.pets)
    @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
    @Field(() => Owner, { nullable: true })
    owner: Owner;
}