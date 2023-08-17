import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
