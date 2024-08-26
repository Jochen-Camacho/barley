import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FileUploadInput {
  @Field(() => Int)
  id: number;

  @Field()
  mimetype: string;

  @Field()
  data: string;
}
