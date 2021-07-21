"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LoginValidator"));
const RegisterValidator_1 = __importDefault(require("../../Validators/RegisterValidator"));
class UsersController {
    async register({ request, response }) {
        const data = await request.validate(RegisterValidator_1.default);
        await User_1.default.create(data);
        return response.status(200).json({ status: 'success' });
    }
    async login({ request, auth }) {
        const data = await request.validate(LoginValidator_1.default);
        const token = await auth.use('api').attempt(data.id, data.password);
        return token.toJSON();
    }
    async show({ auth, response }) {
        const user = await auth.use('api').authenticate();
        let details = await user.related('details').query().first();
        let tmpUser = await user.toPublic();
        return response.status(200).json({
            data: {
                user: tmpUser,
                details: details
            }
        });
    }
    async listDoctors({}) {
        return await User_1.default.query()
            .where('role', 'doctor')
            .select(['id', 'name', 'email', 'phone', 'active', 'created_at'])
            .preload('details');
    }
    async show_doctor({ params: { id } }) {
        return await User_1.default.query()
            .where('id', id)
            .where('role', 'doctor')
            .preload('details')
            .select(['id', 'name', 'phone', 'email'])
            .firstOrFail();
    }
    async requests({ auth }) {
        const user = await auth.use('api').authenticate();
        return await user.related('requests').query()
            .preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])));
    }
    async requestsPending({ auth }) {
        const user = await auth.use('api').authenticate();
        return await user.related('requests').query().where('status', 'requested')
            .preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])));
    }
    async requestsAccepted({ auth }) {
        const user = await auth.use('api').authenticate();
        return await user.related('requests').query().where('status', 'accepted')
            .preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])));
    }
    async requestsRejected({ auth }) {
        const user = await auth.use('api').authenticate();
        return await user.related('requests').query().where('status', 'rejected')
            .preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])));
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map