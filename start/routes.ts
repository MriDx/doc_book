/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.post('login', 'UsersController.login')
  Route.post('register', 'UsersController.register')
  Route.get('me', 'UsersController.show').middleware(['auth'])

  Route.post('details', 'UserDetailsController.create').middleware(['auth'])


  Route.group(() => {
    Route.post('add', 'SlotsController.add').middleware(['adminordoc'])
    Route.get('/', 'SlotsController.all').middleware(['auth'])
    Route.get('/my', 'SlotsController.my_slots').middleware(['doctor'])
    Route.get('/my/page/:page_id', 'SlotsController.my_slots_paginated').middleware(['doctor'])

    Route.get('requests', 'BookingsController.requests').middleware(['admin'])

    Route.post('action/accept', 'BookingsController.actionAccept').middleware(['doctor'])
    Route.post('action/reject', 'BookingsController.actionReject').middleware(['doctor'])

    Route.post('/:request_id/action', 'BookingsController.admin_action').middleware(['admin'])

  }).prefix('slots')


  Route.group(() => {

    Route.get('/:id/slots', 'SlotsController.slot_by_doc').middleware(['auth'])

    Route.get('/:id', 'UsersController.show_doctor').middleware(['auth'])

    Route.post('/:id/book', 'SlotsController.book').middleware(['auth'])

  }).prefix('doctor')

  Route.group(() => {
    Route.get('my_requests', 'UsersController.requests')
    Route.get('my_requests/accepted', 'UsersController.requestsAccepted')
    Route.get('my_requests/pending', 'UsersController.requestsPending')
    Route.get('my_requests/rejected', 'UsersController.requestsRejected')
    Route.post('my_requests/cancel', 'BookingsController.user_cancel')
  }).middleware(['auth'])





}).prefix('api/v1')
