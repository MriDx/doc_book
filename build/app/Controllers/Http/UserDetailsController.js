"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDetailValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserDetailValidator"));
class UserDetailsController {
    async index({}) {
    }
    async create({ request, auth, response }) {
        const data = await request.validate(UserDetailValidator_1.default);
        const user = await auth.use('api').authenticate();
        await user.related('details').updateOrCreate({}, {
            'details': JSON.stringify(data.details)
        });
        return response.json({ status: 'success' });
    }
    async store({}) {
    }
    async show({}) {
    }
    async edit({}) {
    }
    async update({}) {
    }
    async destroy({}) {
    }
}
exports.default = UserDetailsController;
//# sourceMappingURL=UserDetailsController.js.map