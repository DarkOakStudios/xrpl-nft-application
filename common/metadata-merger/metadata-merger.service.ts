import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';

@Injectable()
export class MetadataMergerService {
    async merge(baseMetadata, equipmentMedata): Promise<string> {
        return merge(baseMetadata.attributes, equipmentMedata.attributes);
    }
}
