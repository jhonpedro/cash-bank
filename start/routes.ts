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

Route.post('/session', 'SessionsController.store')

Route.resource('/admins', 'AdminsController')
  .apiOnly()
  .except(['destroy', 'show'])
  .middleware({ '*': 'auth' })

Route.group(() => {
  Route.post('/', 'ClientsController.store')
}).prefix('/clients')

Route.group(() => {
  Route.post('/', 'ForgotPasswordsController.store')
  Route.put('/', 'ForgotPasswordsController.update')
}).prefix('forgot-passwords')
