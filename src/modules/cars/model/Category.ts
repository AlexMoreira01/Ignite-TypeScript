import { v4 as uuidV4 } from "uuid";

class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            // se for um novo registro e nao tober um id ele cria aqui
            this.id = uuidV4();
        }
    }
}

export { Category };
