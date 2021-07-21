"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class SlotActionValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'request_id': Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.exists({ column: 'id', table: 'bookings' })
            ]),
            'reason': Validator_1.schema.string.optional({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = SlotActionValidator;
//# sourceMappingURL=SlotActionValidator.js.map