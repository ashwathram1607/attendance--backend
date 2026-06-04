"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userService;
    jwtService;
    mailService;
    configService;
    constructor(userService, jwtService, mailService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async signup(data) {
        const existingUser = await this.userService.findByEmail(data.email);
        if (existingUser) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userService.createUser({
            ...data,
            password: hashedPassword,
        });
        return { message: 'Signup successful', user };
    }
    async login(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { email: user.email, sub: user.id, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            user,
        };
    }
    async forgotPassword(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return { message: 'If the email exists, a reset link has been sent' };
        }
        const token = await this.jwtService.signAsync({ sub: user.id, email: user.email, type: 'reset' }, {
            secret: this.configService.get('JWT_RESET_SECRET'),
            expiresIn: '15m',
        });
        await this.mailService.sendResetPasswordEmail(user.email, token);
        return { message: 'Reset password email sent' };
    }
    async resetPassword(token, password) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_RESET_SECRET'),
            });
            console.log('PAYLOAD:', payload);
            const user = await this.userService.findById(payload.sub);
            console.log('USER:', user);
            const hashedPassword = await bcrypt.hash(password, 10);
            const updated = await this.userService.updateUser({
                id: user.id,
                password: hashedPassword,
            });
            console.log('UPDATED:', updated);
            return { message: 'Password reset successful' };
        }
        catch (err) {
            console.error(err);
            throw new common_1.BadRequestException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map