import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './profile.entity';

export enum UserRole {
  ADMIN = "admin",
  VIEWER = "viewer",
  EDITOR = "editor"
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  bio: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  @JoinColumn()
  profile: UserProfile
}
