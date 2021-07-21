"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'id': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
            ]),
            'password': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required()
            ])
        });
        this.messages = {};
    }
}
exports.default = LoginValidator;
//# sourceMappingURL=LoginValidator.js.map