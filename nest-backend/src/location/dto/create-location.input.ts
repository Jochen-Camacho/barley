import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  city: string;

  @Field()
  country: string;
}
