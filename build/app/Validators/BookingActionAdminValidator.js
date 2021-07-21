"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class BookingActionAdminValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'status': Validator_1.schema.enum(['accepted', 'rejected'], [
                Validator_1.rules.required()
            ]),
            'reason': Validator_1.schema.string.optional({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = BookingActionAdminValidator;
//# sourceMappingURL=BookingActionAdminValidator.js.map