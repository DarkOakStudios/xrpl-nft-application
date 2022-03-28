import { Module } from '@nestjs/common';
import { CombineMetadataController } from './combine-metadata.controller';
import { CombineMetadataService } from './combine-metadata.service';

@Module({
  controllers: [CombineMetadataController],
  providers: [CombineMetadataService]
})
export class CombineMetadataModule {}
