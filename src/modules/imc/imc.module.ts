import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImcRecord } from './entities/imc-record.entity.js';
import { User } from '../users/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ImcRecord, User])],
  exports: [TypeOrmModule],
})
export class ImcModule {}

