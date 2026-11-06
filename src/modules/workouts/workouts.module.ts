import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity.js';
import { SetLog } from './entities/set-log.entity.js';
import { RoutineExercise } from '../routines/entities/routine-exercise.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutSession, SetLog, RoutineExercise])],
  exports: [TypeOrmModule],
})
export class WorkoutsModule {}

