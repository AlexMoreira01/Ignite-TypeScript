import { Connection, createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then((options) => {
//     const newOptions = options as IOptions;
//     newOptions.host = "database_ignite"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//     createConnection({
//         ...options,
//     });
// });

// Se não for passado nenhum host o seu default sera esse -- mas se fro passado outro ira sobreescrever
export default async (host = "database_ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    // Com o return conseguimos pega-la no admin.ts
    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
};
