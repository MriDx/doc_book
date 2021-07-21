"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Slots extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'slots';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('slot_uid');
            table.integer('associate_id').unsigned().references('id').inTable('users');
            table.timestamp('start_time').notNullable();
            table.timestamp('end_time').notNullable();
            table.boolean('available').defaultTo(false);
            table.timestamp('expires_at');
            table.timestamp('booking_start_time').notNullable();
            table.timestamp('booking_end_time').notNullable();
            table.integer('capacity').defaultTo(1);
            table.integer('current_filled').defaultTo(0);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Slots;
//# sourceMappingURL=1626192799612_slots.js.map