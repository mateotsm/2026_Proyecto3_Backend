import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity.js';
import { RoutineDay } from './entities/routine-day.entity.js';
import { RoutineExercise } from './entities/routine-exercise.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, RoutineDay, RoutineExercise])],
  exports: [TypeOrmModule],
})
export class RoutinesModule {}

