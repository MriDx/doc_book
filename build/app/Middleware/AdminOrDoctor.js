"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/auth/build/standalone");
class AdminOrDoctor {
    async handle({ auth }, next) {
        if (!await auth.check())
            throw new standalone_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        let user = await auth.use('api').authenticate();
        if (!user.role || user.role != 'admin' && user.role != 'doctor') {
            throw new standalone_1.AuthenticationException('Permission Denied', 'Unauthorized access', 'api', 'null');
        }
        await next();
    }
}
exports.default = AdminOrDoctor;
//# sourceMappingURL=AdminOrDoctor.js.map