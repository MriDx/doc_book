"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class BookingCancelUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'reason': Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required()
            ]),
            'request_id': Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.exists({ table: 'bookings', column: 'id' })
            ])
        });
        this.messages = {};
    }
}
exports.default = BookingCancelUserValidator;
//# sourceMappingURL=BookingCancelUserValidator.js.map