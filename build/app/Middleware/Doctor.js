"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationException_1 = require("@adonisjs/auth/build/src/Exceptions/AuthenticationException");
class Doctor {
    async handle({ auth }, next) {
        if (!await auth.check())
            throw new AuthenticationException_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        let user = await auth.use('api').authenticate();
        if (!user.role || user.role != 'doctor') {
            throw new AuthenticationException_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        }
        await next();
    }
}
exports.default = Doctor;
//# sourceMappingURL=Doctor.js.map