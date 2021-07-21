"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class SlotAddValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'start_time': Validator_1.schema.date({
                format: 'yyyy-MM-dd h:m:s'
            }, [
                Validator_1.rules.required()
            ]),
            'end_time': Validator_1.schema.date({
                format: 'yyyy-MM-dd h:m:s'
            }, [
                Validator_1.rules.required()
            ]),
            'booking_start_time': Validator_1.schema.date({
                format: 'yyyy-MM-dd h:m:s'
            }, [
                Validator_1.rules.required()
            ]),
            'booking_end_time': Validator_1.schema.date({
                format: 'yyyy-MM-dd h:m:s'
            }, [
                Validator_1.rules.required()
            ]),
            'capacity': Validator_1.schema.number([
                Validator_1.rules.range(1, 10)
            ]),
            'available': Validator_1.schema.boolean.optional()
        });
        this.messages = {};
    }
}
exports.default = SlotAddValidator;
//# sourceMappingURL=SlotAddValidator.js.map