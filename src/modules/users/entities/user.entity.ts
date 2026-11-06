import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../../common/enums/index.js';
import { ImcRecord } from '../../imc/entities/imc-record.entity.js';
import { Routine } from '../../routines/entities/routine.entity.js';
import { WorkoutSession } from '../../workouts/entities/workout-session.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENTE,
  })
  rol: Role;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  alturaCm: number | null;

  @OneToMany(() => ImcRecord, (imc) => imc.user)
  imcRecords: ImcRecord[];

  @OneToMany(() => Routine, (routine) => routine.cliente)
  rutinasRecibidas: Routine[];

  @OneToMany(() => Routine, (routine) => routine.entrenador)
  rutinasCreadas: Routine[];

  @OneToMany(() => WorkoutSession, (session) => session.cliente)
  workoutSessions: WorkoutSession[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

