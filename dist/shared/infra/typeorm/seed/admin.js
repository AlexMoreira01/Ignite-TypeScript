"use strict";

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cadadastro padrão do admin
async function create() {
  const connection = await (0, _index.default)("localhost"); // Se utiliza assim pois o typeorm tem um conflito com com o docker --  Em momentos se espera que receba o nome do serviço e em outro tem de se usar o localhost

  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)("admin", 8); // Inserção manualmente

  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br','${password}', true, 'now()', 'XXXXXX')
        `);
  await connection.close;
}

create().then(() => console.log("User admin created!"));