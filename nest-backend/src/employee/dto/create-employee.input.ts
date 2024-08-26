import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  job: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field(() => Int)
  base: number;

  @Field(() => Int, { nullable: true })
  variable: number;

  @Field(() => Int, { nullable: true })
  bonus: number;

  @Field(() => Int, { nullable: true })
  benefits: number;

  @Field(() => Int, { nullable: true })
  equity: number;
}
