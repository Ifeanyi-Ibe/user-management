import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
    MALE = "Male",
    FEMALE = "Female"
}

@Entity("user_profiles")
export class UserProfile {
    @PrimaryGeneratedColumn("uuid", { name: "user_profile_id" })
    id: string;

    @Column({ length: 70, nullable: true })
    occupation?: string;

    @Column({ nullable: true })
    gender?: Gender;

    @Column({ length: 70, nullable: true })
    nationality?: string;

    @Column("text", { nullable: true })
    bio?: string;

    @OneToOne(() => User, (user) => user.profile, { cascade: true })
    user: User;
}