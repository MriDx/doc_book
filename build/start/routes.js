"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.group(() => {
    Route_1.default.post('login', 'UsersController.login');
    Route_1.default.post('register', 'UsersController.register');
    Route_1.default.get('me', 'UsersController.show').middleware(['auth']);
    Route_1.default.post('details', 'UserDetailsController.create').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.post('add', 'SlotsController.add').middleware(['adminordoc']);
        Route_1.default.get('/', 'SlotsController.all').middleware(['auth']);
        Route_1.default.get('/my', 'SlotsController.my_slots').middleware(['doctor']);
        Route_1.default.get('/:id/requests', 'SlotsController.requestsBySlot').middleware(['doctor']);
        Route_1.default.get('/my/page/:page_id', 'SlotsController.my_slots_paginated').middleware(['doctor']);
        Route_1.default.get('requests', 'BookingsController.requests').middleware(['admin']);
        Route_1.default.post('action/accept', 'BookingsController.actionAccept').middleware(['doctor']);
        Route_1.default.post('action/reject', 'BookingsController.actionReject').middleware(['doctor']);
        Route_1.default.post('/:request_id/action', 'BookingsController.admin_action').middleware(['admin']);
    }).prefix('slots');
    Route_1.default.group(() => {
        Route_1.default.get('/:id/slots', 'SlotsController.slot_by_doc').middleware(['auth']);
        Route_1.default.get('/:id', 'UsersController.show_doctor').middleware(['auth']);
        Route_1.default.post('/:slot_id/book', 'SlotsController.book').middleware(['auth']);
    }).prefix('doctor');
    Route_1.default.group(() => {
        Route_1.default.get('doctors', 'UsersController.listDoctors');
        Route_1.default.get('my_requests', 'UsersController.requests');
        Route_1.default.get('my_requests/accepted', 'UsersController.requestsAccepted');
        Route_1.default.get('my_requests/pending', 'UsersController.requestsPending');
        Route_1.default.get('my_requests/rejected', 'UsersController.requestsRejected');
        Route_1.default.post('my_requests/cancel', 'BookingsController.user_cancel');
    }).middleware(['auth']);
}).prefix('api/v1');
//# sourceMappingURL=routes.js.map