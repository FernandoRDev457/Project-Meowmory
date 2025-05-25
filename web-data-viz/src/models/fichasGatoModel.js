var database = require("../database/config");

function buscarFichasGato(idUsuario, email, nome) {

  var instrucaoSql =
    `
    SELECT 
      f.*,
      u.nome,
      p.idPostagem,
      p.descricao,
      p.dataPublicacao,
      (SELECT COUNT(*) FROM curtida WHERE fkPostagem = p.idPostagem) AS totalCurtidas,
      (SELECT COUNT(*) FROM comentario WHERE fkPostagem = p.idPostagem) AS totalComentarios,
      CASE
        WHEN EXISTS (
            SELECT 1
            FROM curtida c
            WHERE c.fkPostagem = p.idPostagem
              AND c.fkUsuario = ${idUsuario}
        )
      THEN 1
      ELSE 0
      END AS statusCurtida
    FROM fichaGato AS f
	    LEFT JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
	    LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario
	    LEFT JOIN curtida AS c
	    ON c.fkUsuario = u.idUsuario AND c.fkPostagem = p.idPostagem
    WHERE f.fkUsuario = ${idUsuario} AND u.email = '${email}' AND u.nome = '${nome}'
    ORDER BY p.dataPublicacao DESC;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarFichasGatoAll(id) {

  var instrucaoSql =
    `
    SELECT 
      f.*,
      u.nome,
      p.descricao,
      p.dataPublicacao,
      p.idPostagem,
      (SELECT COUNT(*) FROM curtida WHERE fkPostagem = p.idPostagem) AS totalCurtidas,
      (SELECT COUNT(*) FROM comentario WHERE fkPostagem = p.idPostagem) AS totalComentarios,
      CASE
        WHEN EXISTS (
            SELECT 1
            FROM curtida c
            WHERE c.fkPostagem = p.idPostagem
              AND c.fkUsuario = ${id}
        )
      THEN 1
      ELSE 0
      END AS statusCurtida
    FROM fichaGato AS f
      JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
      LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario
    ORDER BY p.dataPublicacao DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarFicha(nome, apelido, raca, dataNasc, classe, descricao, atk, def, agi, fome, sono, fkUsuario) {
  var instrucaoSql = `INSERT INTO fichaGato (nome, apelido, raca, dtNascimento, classe, descricao, atk, def, agi, fome, sono, fkUsuario) VALUES ('${nome}', '${apelido}', '${raca}', '${dataNasc}', '${classe}', '${descricao}', ${atk}, ${def}, ${agi}, ${fome}, ${sono}, ${fkUsuario});
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



module.exports = {
  buscarFichasGato,
  buscarFichasGatoAll,
  cadastrarFicha
}
