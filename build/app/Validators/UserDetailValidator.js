"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserDetailValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'details': Validator_1.schema.object().anyMembers()
        });
        this.messages = {};
    }
}
exports.default = UserDetailValidator;
//# sourceMappingURL=UserDetailValidator.js.map