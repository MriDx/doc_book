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
const Slot_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Slot"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class Booking extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "slot_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "requested_by", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Booking.prototype, "status_reason", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "action_by", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.belongsTo(() => Slot_1.default, {
        foreignKey: 'slot_id',
        localKey: 'id'
    }),
    __metadata("design:type", Object)
], Booking.prototype, "slot", void 0);
__decorate([
    Orm_1.belongsTo(() => User_1.default, {
        foreignKey: 'requested_by',
        localKey: 'id'
    }),
    __metadata("design:type", Object)
], Booking.prototype, "requested_user", void 0);
__decorate([
    Orm_1.hasOne(() => User_1.default, {
        foreignKey: 'id',
        localKey: 'action_by'
    }),
    __metadata("design:type", Object)
], Booking.prototype, "action_performed_by", void 0);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map