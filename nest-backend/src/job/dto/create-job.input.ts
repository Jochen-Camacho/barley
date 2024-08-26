import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
  @Field()
  title: string;

  @Field(() => Int)
  level: number;

  @Field()
  department: string;
}
