"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Booking_1 = __importDefault(require("./Booking"));
const short_uuid_1 = __importDefault(require("short-uuid"));
class Slot extends Orm_1.BaseModel {
    static async generateSlug(slot) {
        if (slot.$dirty.associate_id) {
            slot.slot_uid = await short_uuid_1.default.generate();
        }
    }
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Slot.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Slot.prototype, "slot_uid", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Slot.prototype, "associate_id", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "start_time", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "end_time", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Boolean)
], Slot.prototype, "available", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "expires_at", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "booking_start_time", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "booking_end_time", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Slot.prototype, "capacity", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Slot.prototype, "current_filled", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Slot.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.belongsTo(() => User_1.default, {
        foreignKey: 'associate_id',
        localKey: 'id'
    }),
    __metadata("design:type", Object)
], Slot.prototype, "associated_to", void 0);
__decorate([
    Orm_1.hasMany(() => Booking_1.default, {
        foreignKey: 'slot_id',
        localKey: 'id'
    }),
    __metadata("design:type", Object)
], Slot.prototype, "bookings", void 0);
__decorate([
    Orm_1.beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Slot]),
    __metadata("design:returntype", Promise)
], Slot, "generateSlug", null);
exports.default = Slot;
//# sourceMappingURL=Slot.js.map