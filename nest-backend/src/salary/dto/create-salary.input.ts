import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSalaryInput {
  @Field(() => Int)
  base: number;

  @Field(() => Int)
  variable: number;

  @Field(() => Int)
  bonus: number;

  @Field(() => Int)
  benefits: number;

  @Field(() => Int)
  equity: number;
}
