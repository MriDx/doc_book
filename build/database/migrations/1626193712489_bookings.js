"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Bookings extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'bookings';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('slot_id').unsigned().references('id').inTable('slots');
            table.integer('requested_by').unsigned().references('id').inTable('users');
            table.enum('status', ['requested', 'accepted', 'rejected']).defaultTo('requested');
            table.string('status_reason').nullable();
            table.integer('action_by').unsigned().references('id').inTable('users');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Bookings;
//# sourceMappingURL=1626193712489_bookings.js.map