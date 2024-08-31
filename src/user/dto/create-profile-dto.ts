import { Gender } from "user/entities/profile.entity";

export class CreateProfileDto
{
    userId: string;
    profileData: ProfileData;
}

export class UpdateProfileDto
{
    profileId: string;
    profileData: ProfileData; 
}

export class ProfileData {
    occupation?: string;
    gender?: Gender;
    nationality?: string;
    bio?: string;
}