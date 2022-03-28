import { Body, Controller, Get } from '@nestjs/common';
import { CombineMetadataService } from './combine-metadata.service';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Controller('combine-metadata')
export class CombineMetadataController {
  constructor(
    private readonly combineMetadataService: CombineMetadataService,
  ) {}

  @Get()
  async getMetadataAndImage(@Body() body): Promise<any> {
    const { characterMetadata, equipmentMetadata } = body;
    const combinedMetadata = await this.combineMetadataService.merge(
      characterMetadata,
      equipmentMetadata,
    );
    const imageInBase64 = await readFile(
      join(__dirname, '..', '..', 'static', 'final-image.png'),
      'base64',
    );
    return {
      metadata: combinedMetadata,
      image: imageInBase64,
    };
  }
}
