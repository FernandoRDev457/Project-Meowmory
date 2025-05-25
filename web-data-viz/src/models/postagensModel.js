var database = require("../database/config")

function enviarCurtida(idFicha, idPost, idUser) {
    console.log("ACESSEI O POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarCurtida():", idFicha, idPost, idUser);

    var instrucaoSql = `
        INSERT INTO curtida (fkPostagem, fkFichaGato, fkUsuario) VALUES ('${idPost}', '${idFicha}', '${idUser}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarComentario(idFicha, idPost, idUser, comentario) {
    console.log("ACESSEI O POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarCurtida():", idUser, idPost, idFicha, comentario);

    var instrucaoSql = `
        INSERT INTO comentario (fkUsuario, fkPostagem, fkFichaGato, comentario) VALUES ('${idUser}', '${idPost}', '${idFicha}', '${comentario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarComentarios(idPost) {
    console.log("ACESSEI O POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarCurtida():", idPost);

    var instrucaoSql = `
        SELECT 
	        u.nome, 
            c.* 
        FROM comentario AS c JOIN usuario AS u
	        ON c.fkUsuario = u.idUsuario
        WHERE fkPostagem = ${idPost}
        ORDER BY c.dataComentario DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    enviarCurtida,
    enviarComentario,
    pegarComentarios
};