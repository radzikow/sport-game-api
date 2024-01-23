import { Module } from '@nestjs/common';
import { DataLoaderFactory } from './dataloader.factory';

@Module({
  providers: [DataLoaderFactory],
  exports: [DataLoaderFactory],
})
export class DataloaderModule {}
