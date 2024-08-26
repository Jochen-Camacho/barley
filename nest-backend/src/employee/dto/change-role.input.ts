import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChangeRoleInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  jobId: number;
}
