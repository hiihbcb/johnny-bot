/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);

const express = require('express');
const app = express();

const db = require('./database/models');

const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/',
})

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
app.listen(8080, () => console.log('AdminBro is under localhost:8080/'));
