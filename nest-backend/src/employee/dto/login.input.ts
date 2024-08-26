import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
}
