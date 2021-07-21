"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationException_1 = require("@adonisjs/auth/build/src/Exceptions/AuthenticationException");
class Admin {
    async handle({ auth }, next) {
        if (!await auth.check())
            throw new AuthenticationException_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        let user = await auth.use('api').authenticate();
        if (!user.role || user.role != 'admin') {
            throw new AuthenticationException_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        }
        await next();
    }
}
exports.default = Admin;
//# sourceMappingURL=Admin.js.map