import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
