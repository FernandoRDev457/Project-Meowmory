var database = require("../database/config")

function pegarDadosGraphicUser() {
    var instrucaoSql = `
        SELECT 
	        COUNT(*) AS qtd_usuario, 
            MONTH(data) AS mes 
        FROM usuario 
        WHERE YEAR(data) = YEAR(CURDATE()) 
        GROUP BY MONTH(data);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT idUsuario, nome, email, dataNasc FROM usuario WHERE email = '${email}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function cadastrar(nome, email, senha, dataNasc) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, dataNasc);

//     var instrucaoSql = `
//         INSERT INTO usuario (nome, email, senha, dataNasc) VALUES ('${nome}', '${email}', '${senha}', '${dataNasc}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    pegarDadosGraphicUser,
    // autenticar,
    // cadastrar
};