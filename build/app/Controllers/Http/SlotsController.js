"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slot_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Slot"));
const SlotAddValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/SlotAddValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Booking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Booking"));
const axios_1 = __importDefault(require("axios"));
class SlotsController {
    async index({}) {
    }
    async create({}) {
    }
    async store({}) {
    }
    async show({}) {
    }
    async edit({}) {
    }
    async update({}) {
    }
    async destroy({}) {
    }
    async add({ request, auth, response }) {
        const data = await request.validate(SlotAddValidator_1.default);
        const user = await auth.use('api').authenticate();
        await user.related('slots').create(data);
        return response.json({ status: 'success' });
    }
    async all({}) {
        return await Slot_1.default.query()
            .where('available', true)
            .where('start_time', '>', new Date())
            .orderBy('start_time', 'asc');
    }
    async slot_by_doc({ params: { id } }) {
        return await (await User_1.default.findByOrFail('id', id)).related('slots').query()
            .where('available', true)
            .where('start_time', '>', new Date())
            .orderBy('start_time', 'asc');
    }
    async my_slots({ auth }) {
        const user = await auth.use('api').authenticate();
        return await user.related('slots').query()
            .preload('bookings', (b) => b.preload('requested_user', (u) => u.select(['id', 'name', 'phone', 'email'])));
    }
    async my_slots_paginated({}) {
    }
    async requestsBySlot({ params: { id } }) {
        return await (await Slot_1.default.findByOrFail('id', id))
            .related('bookings').query()
            .preload('requested_user', (u) => u.select(['id', 'name', 'phone', 'email']));
    }
    async book({ auth, params: { slot_id }, response }) {
        const slot = await Slot_1.default.findByOrFail('id', slot_id);
        const user = await auth.use('api').authenticate();
        let bookingData = await Booking_1.default.query()
            .where('requested_by', user.id)
            .where('slot_id', slot_id)
            .first();
        if (bookingData != null)
            return response.json({ status: 'success', message: 'already requested' });
        if (slot.capacity <= slot.current_filled) {
            return response.status(422).json({ status: 'failed', message: 'slot already filled !' });
        }
        await user.related('requests').updateOrCreate({}, {
            slot_id: slot.id
        });
        const d = {
            title: 'Slot booking received !',
            body: ` You received a new slot booking request against slot id - ${slot.slot_uid}`
        };
        await this.sendNotification({
            to: `/topics/${slot.associate_id}`,
            notification: d,
            data: d
        });
        return response.json({ status: 'success' });
    }
    async sendNotification(data) {
        let d = await axios_1.default({
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAqZEIptE:APA91bFBtnl1y53_1zLBYArz8P9NC981s3D1n7qp9-X_AASL4lW18prDrE0PUxnNoZ96gj7m4qKoUgMEgFa7SdLBKF8x14jFzV4TNtFat_IihyCnEZBX6ZV-E57WXtvN7JC0wwuo4icN'
            }
        });
        console.log(d);
    }
}
exports.default = SlotsController;
//# sourceMappingURL=SlotsController.js.map