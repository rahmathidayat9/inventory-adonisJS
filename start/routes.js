'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('login')
Route.on('/login').render('login').middleware(['guest'])
Route.post('/login', 'LoginController.authenticated').as('login.post').middleware(['guest'])
Route.get('/logout', ({ response, auth }) => {
	auth.logout()
	return response.redirect('/login')
}).as('logout').middleware(['auth'])

Route.group(() => {
	Route.get('dashboard', 'DashboardController.index').as('dashboard.index')
	Route.get('barang-keluar', 'BarangKeluarController.index').as('barang-keluar.index')
	Route.get('barang-keluar/create/:id', 'BarangKeluarController.create').as('barang-keluar.create')
	Route.post('barang-keluar/create/:id', 'BarangKeluarController.store').as('barang-keluar.store')
	Route.resource('user', 'UserController')
	Route.resource('barang-masuk', 'BarangMasukController')
	Route.resource('satuan', 'SatuanController')
}).prefix('admin').namespace('Admin').middleware(['auth', 'admin'])

Route.group(() => {
	Route.get('profile', 'ProfileController.index').as('profile.index')
	Route.patch('profile', 'ProfileController.update').as('profile.update')
	Route.get('change-password', 'ChangePasswordController.index').as('change-password.index')
	Route.patch('change-password', 'ChangePasswordController.update').as('change-password.update')
}).prefix('user').namespace('User').middleware(['auth'])

Route.group(() => {
	Route.get('dashboard', 'DashboardController.index').as('user.dashboard')
	Route.get('barang/barang-masuk', 'BarangController.barangMasuk').as('barang.barang-masuk')
	Route.get('barang/barang-keluar', 'BarangController.barangKeluar').as('barang.barang-keluar')
}).prefix('user').namespace('User').middleware(['auth', 'user'])