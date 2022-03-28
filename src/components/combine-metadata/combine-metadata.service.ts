import { Injectable } from '@nestjs/common';
import { MetadataDTO } from './DTO/metadata.dto';

@Injectable()
export class CombineMetadataService {
    async merge(
        baseMetadata: MetadataDTO,
        equipmentMetadata: MetadataDTO,
      ): Promise<MetadataDTO> {
        const mergedAttributes = [
          ...baseMetadata.attributes,
          ...equipmentMetadata.attributes,
        ];
        baseMetadata.attributes = mergedAttributes;
        return baseMetadata;
      }
}
