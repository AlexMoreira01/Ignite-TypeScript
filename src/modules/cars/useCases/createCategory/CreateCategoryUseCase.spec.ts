// Agrupar os testes
describe("Criar categoria", () => {
    // oque queremos que receba
    it("Espero que 2 + 2 seja 4", () => {
        const soma = 2 + 2;
        const resultado = 4;

        expect(soma).toBe(resultado);
    });

    // O que nao queremos que receba
    it("Espero que 2 + 2 não seja 5", () => {
        const soma = 2 + 2;
        const resultado = 5;

        expect(soma).not.toBe(resultado);
    });
});
