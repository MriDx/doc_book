"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class RegisterValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'name': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required()
            ]),
            'email': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.requiredIfNotExists('phone'),
                Validator_1.rules.email(),
                Validator_1.rules.unique({ column: 'email', table: 'users' })
            ]),
            'phone': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.requiredIfNotExists('email'),
                Validator_1.rules.mobile({ strict: false }),
                Validator_1.rules.unique({ column: 'phone', table: 'users' })
            ]),
            'password': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required()
            ])
        });
        this.messages = {};
    }
}
exports.default = RegisterValidator;
//# sourceMappingURL=RegisterValidator.js.map