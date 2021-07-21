"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Booking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Booking"));
const BookingActionAdminValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/BookingActionAdminValidator"));
const BookingCancelUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/BookingCancelUserValidator"));
const SlotActionValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/SlotActionValidator"));
const axios_1 = __importDefault(require("axios"));
class BookingsController {
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
    async requests({}) {
        return await Booking_1.default.query()
            .preload('requested_user', (b) => b.select(['id', 'name', 'phone', 'email']))
            .preload('slot', (b) => b.preload('associated_to', (c) => c.select(['id', 'name', 'phone', 'email'])));
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
    async actionAccept({ request, auth, response }) {
        const data = await request.validate(SlotActionValidator_1.default);
        const trx = await Database_1.default.transaction();
        const user = await auth.use('api').authenticate();
        let message = '';
        let status = 200;
        try {
            const bookingData = await Booking_1.default.findByOrFail('id', data.request_id, trx);
            const bookingSlot = await bookingData.related('slot').query().firstOrFail();
            if (bookingSlot.associate_id != user.id) {
                status = 401;
                throw new standalone_1.Exception('');
            }
            if (bookingSlot.capacity <= bookingSlot.current_filled) {
                status = 422;
                message = 'slot capacity filled';
            }
            bookingData.status = 'accepted';
            bookingData.action_by = user.id;
            bookingData.status_reason = data.reason ?? bookingData.status_reason;
            bookingData.useTransaction(trx);
            await bookingData.save();
            bookingSlot.current_filled = bookingSlot.current_filled + 1;
            bookingSlot.useTransaction(trx);
            await bookingSlot.save();
            await trx.commit();
            const d = {
                title: 'Slot booking update !',
                body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
            };
            await this.sendNotification({
                to: `/topics/${bookingData.requested_by}`,
                notification: d,
                data: d
            });
            return response.json({ status: 'success' });
        }
        catch (error) {
            await trx.rollback();
        }
        return response.status(status).json({ status: 'failed', message: message });
    }
    async actionReject({ request, auth, response }) {
        const data = await request.validate(SlotActionValidator_1.default);
        const user = await auth.use('api').authenticate();
        const bookingData = await Booking_1.default.findByOrFail('id', data.request_id);
        const bookingSlot = await bookingData.related('slot').query().firstOrFail();
        if (bookingSlot.associate_id != user.id) {
            return response.status(401).json({ status: 'failed' });
        }
        bookingData.status = 'rejected';
        bookingData.action_by = user.id;
        bookingData.status_reason = data.reason ?? bookingData.status_reason;
        await bookingData.save();
        const d = {
            title: 'Slot booking update !',
            body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
        };
        await this.sendNotification({
            to: `/topics/${bookingData.requested_by}`,
            notification: d,
            data: d
        });
        return response.json({ status: 'success' });
    }
    async admin_action({ request, auth, params: { request_id }, response }) {
        const data = await request.validate(BookingActionAdminValidator_1.default);
        const bookingData = await Booking_1.default.findByOrFail('id', request_id);
        const user = await auth.use('api').authenticate();
        const bookingSlot = await bookingData.related('slot').query().firstOrFail();
        if (bookingSlot.capacity <= bookingSlot.current_filled) {
            return response.status(422).json({ status: 'failed', message: 'slot capacity filled' });
        }
        bookingData.status = data.status;
        bookingData.status_reason = data.reason ?? bookingData.status_reason;
        bookingData.action_by = user.id;
        await bookingData.save();
        const d = {
            title: 'Slot booking update !',
            body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
        };
        await this.sendNotification({
            to: `/topics/${bookingData.requested_by}`,
            notification: d,
            data: d
        });
        return response.json({ status: 'success' });
    }
    async user_cancel({ request, auth, response }) {
        const data = await request.validate(BookingCancelUserValidator_1.default);
        const user = await auth.use('api').authenticate();
        const bookingData = await user.related('requests').query()
            .where('id', data.request_id)
            .firstOrFail();
        if (bookingData.status == 'rejected') {
            return response.json({ status: 'cancelled already !' });
        }
        bookingData.status = 'rejected';
        bookingData.status_reason = data.reason ?? bookingData.status_reason;
        bookingData.action_by = user.id;
        await bookingData.save();
        const d = {
            title: 'Slot booking update !',
            body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}.`
        };
        await this.sendNotification({
            to: `/topics/${bookingData.requested_by}`,
            notification: d,
            data: d
        });
        return response.json({ status: 'success' });
    }
}
exports.default = BookingsController;
//# sourceMappingURL=BookingsController.js.map