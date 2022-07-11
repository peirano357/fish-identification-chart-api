import { UserTypeEnum } from './enum/user-type.enum';
export declare class User {
    id: string;
    username: string;
    password: string;
    userType?: UserTypeEnum;
}
