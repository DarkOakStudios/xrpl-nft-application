import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Attributes {
  readonly trait_type: string;
  readonly value: string;
}

export class MetadataDTO {
  readonly name: string;
  readonly image: string;
  @Type(() => Attributes)
  @ValidateNested()
  attributes: Attributes[];
}
