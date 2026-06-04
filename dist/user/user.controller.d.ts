import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("./user.entity").User[]>;
    getUser(id: number): Promise<Partial<import("./user.entity").User>>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
