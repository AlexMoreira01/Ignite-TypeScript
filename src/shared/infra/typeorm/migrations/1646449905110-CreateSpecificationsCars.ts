import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1646449905110
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            // Tabela de relacionamentos

            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "specification_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        // Segundo jeito de se criar foreing keys -- Criação por partes -- 1 tabela 2 foreignKey 3 foreingKey
        await queryRunner.createForeignKey(
            "specifications_cars", // Nome tabela -- mesmo que a criada acima
            new TableForeignKey({
                name: "FKSpecificationCar",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specification_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars", // Nome tabela -- mas a tabela é a mesma
            new TableForeignKey({
                name: "FKCarSpecification", // Nome foreingKey Precisa ser diferente -- mas a tabela é a mesma
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Para se dar o down precisa se fazer o processo reverso -- removendo primeiro as foreingKeys dps a tabela
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKCarSpecification"
        );

        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKSpecificationCar"
        );

        await queryRunner.dropTable("specifications_cars");
    }
}
