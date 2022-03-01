// Cadadastro padrão do admin
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost"); // Se utiliza assim pois o typeorm tem um conflito com com o docker --  Em momentos se espera que receba o nome do serviço e em outro tem de se usar o localhost

    const id = uuidV4();
    const password = await hash("admin", 8);

    // Inserção manualmente
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br','${password}', true, 'now()', 'XXXXXX')
        `
    );

    await connection.close;
}

create().then(() => console.log("User admin created!"));
