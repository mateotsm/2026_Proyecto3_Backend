import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ImcClassification } from '../../../common/enums/index.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('imc_records')
export class ImcRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.imcRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'userId' })
  userId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  pesoKg: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  alturaCm: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  imcCalculado: number;

  @Column({
    type: 'enum',
    enum: ImcClassification,
  })
  clasificacion: ImcClassification;

  @Column({ type: 'int' })
  edadAlRegistrar: number;

  @CreateDateColumn()
  fechaRegistro: Date;
}

