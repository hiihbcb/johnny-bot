/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const bcrypt = require('bcrypt')

AdminBro.registerAdapter(AdminBroSequelize);

const express = require('express');
const app = express();

const {
    sequelize,
    character,
    player,
    quote
} = require('./database/models');

var passwordSet = async (request) => {
    if(request.payload.password) {
        request.payload = {
            ...request.payload,
            encryptedPassword: await bcrypt.hash(request.payload.password, 10),
            password: undefined,
        }
    }
    return request
};

var canEditPlayers = ({ currentAdmin, record }) => {
    return currentAdmin && record && (
        currentAdmin.admin == true
        || currentAdmin.playerid === record.param('playerid')
    )
}

var canEditQuotes = ({ currentAdmin }) => {
    return currentAdmin && currentAdmin.admin == true
}

const adminBro = new AdminBro({
    resources: [{
        resource: character,
        options: {
            properties: {
                characterid: { isVisible: false },
                eddies: {
                    isVisible: {
                        list: false, edit: true, filter: false, show: true,
                    }
                },
                corpo: {
                    isVisible: {
                        list: false, edit: true, filter: false, show: true,
                    }
                },
                notes: {
                    isVisible: {
                        list: false, edit: true, filter: false, show: true,
                    }
                },
            },
            actions: {
                edit: { isAccessible: canEditPlayers },
                new: { isAccessible: canEditPlayers },
                delete: { isAccessible: canEditPlayers },
                show: { isAccessible: canEditPlayers }
            }
        }
    },{
        resource: player,
        options: {
            properties: {
                playerid: {
                    isVisible: {
                        list: false, edit: true, filter: false, show: true,
                    }
                },
                encryptedPassword: { isVisible: false },
                admin: { isVisible: false },
                password: {
                    type: 'string',
                    isVisible: {
                        list: false, edit: true, filter: false, show: false,
                    },
                },
            },
            actions: {
                edit: {
                    isAccessible: canEditPlayers,
                    before: passwordSet
                },
                new: {
                    isAccessible: canEditPlayers,
                    before: passwordSet
                },
                delete: { isAccessible: canEditPlayers },
                show: { isAccessible: canEditPlayers }
            }
        }

    },{
        resource: quote,
        options: {
            actions: {
                edit: { isAccessible: canEditQuotes },
                new: { isAccessible: true },
                delete: { isAccessible: canEditQuotes },
                show: { isAccessible: canEditQuotes }
            }
        }
    }],
    rootPath: '/admin',
});

const router = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
        authenticate: async (username, password) => {
            const user = await player.findOne({ where: { name: username } });
            if (user) {
                const matched = await bcrypt.compare(password, user.encryptedPassword)
                if (matched) {
                    return user;
                }
            }
            return false;
        },
        cookieName: 'adminbro',
        cookiePassword: process.env.CP,
    }
);
app.use(adminBro.options.rootPath, router);
app.listen(8080, () => console.log('Admin is ready.'));
