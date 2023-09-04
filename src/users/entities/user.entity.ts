import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Pet } from '../../pets/entities/pet.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ name: 'user_name', unique: true })
  @Field()
  userName: string;

  @Column()
  // @Field({ nullable: true })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    }
  })
  @Field(() => [Role], { nullable: true })
  roles: Role[];

  @OneToMany(() => Pet, (pet) => pet.user)
  @Field(() => [Pet], { nullable: true })
  pets: Pet[];
}
