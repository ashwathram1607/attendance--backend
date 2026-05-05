import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(data: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<Partial<User>>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    updateUser(data: Partial<User>): Promise<User>;
}
