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

function pegarDadosGraphicPost() {
    var instrucaoSql = `
        SELECT 
	        COUNT(*) AS qtd_postagem, 
            MONTH(dataPublicacao) AS mes 
        FROM postagem 
        WHERE YEAR(dataPublicacao) = YEAR(CURDATE()) 
        GROUP BY MONTH(dataPublicacao);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDadosGraphicKpis() {
    var instrucaoSql = `
        SELECT
	        (SELECT COUNT(*) FROM usuario) as qtd_usuario,
	        (SELECT COUNT(*) FROM postagem) as qtd_postagem,
	        (SELECT COUNT(*) FROM curtida) as qtd_curtidas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarDadosGraphicUser,
    pegarDadosGraphicPost,
    pegarDadosGraphicKpis
    // autenticar,
    // cadastrar
};