import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

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

    @ManyToOne(() => User, (user) => user.pets)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    @Field(() => User, { nullable: true })
    user: User;

    @Field(() => Boolean, { nullable: true })
    isOwner: boolean;
}