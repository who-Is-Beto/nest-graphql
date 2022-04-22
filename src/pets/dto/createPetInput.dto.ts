import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field(() => Int)
  ownerId: number;

  @Field({ nullable: true })
  type?: string;
}
