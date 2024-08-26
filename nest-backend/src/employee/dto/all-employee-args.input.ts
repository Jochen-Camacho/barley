import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AllEmployeeArgs {
  @Field({ nullable: true })
  job: string;

  @Field(() => Int, { nullable: true })
  level: number;

  @Field({ nullable: true })
  department: string;

  @Field(() => Int, { nullable: true })
  id: number;
}
