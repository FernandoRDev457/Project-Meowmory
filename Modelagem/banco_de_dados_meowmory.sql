CREATE DATABASE meowmory;

USE meowmory;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    dataNasc DATE,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fichaGato (
    idFichaGato INT AUTO_INCREMENT,
    nomeFelino VARCHAR(45) NOT NULL,
    apelido VARCHAR(45),
    raca VARCHAR(45),
    dtNascimento DATE,
    classe VARCHAR(60) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    atk INT,
    def INT,
    agi INT,
    fome INT,
    sono INT,
    fkUsuario INT,
    CONSTRAINT pkComposta PRIMARY KEY (idFichaGato, fkUsuario),
    CONSTRAINT fkFichaGatoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE postagem (
    idPostagem INT AUTO_INCREMENT,
    fkFichaGato INT UNIQUE,
    fkUsuario INT,
    CONSTRAINT pkComposta PRIMARY KEY (idPostagem, fkFichaGato, fkUsuario),
    descricao VARCHAR(255),
    dataPublicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkPostagemFichaGato FOREIGN KEY (fkFichaGato) REFERENCES fichaGato(idFichaGato),
    CONSTRAINT fkPostagemUsuario FOREIGN KEY (fkUsuario) REFERENCES fichaGato(fkUsuario)
);

CREATE TABLE comentario (
    idComentario INT AUTO_INCREMENT,
    fkUsuario INT,
    fkPostagem INT,
    fkFichaGato INT,
    CONSTRAINT pkComposta PRIMARY KEY (idComentario, fkUsuario, fkPostagem, fkFichaGato),
    comentario VARCHAR(255),
    dataComentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkComentarioUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkComentarioPostagem FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    CONSTRAINT fkComentarioFichaGato FOREIGN KEY (fkFichaGato) REFERENCES fichaGato(idFichaGato)
);

CREATE TABLE curtida (
    fkPostagem INT,
    fkFichaGato INT,
    fkUsuario INT,
    CONSTRAINT pkComposta PRIMARY KEY (fkPostagem, fkFichaGato, fkUsuario),
    dataCurtida DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkCurtidaPostagem FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    CONSTRAINT fkCurtidaFichaGato FOREIGN KEY (fkFichaGato) REFERENCES fichaGato(idFichaGato),
    CONSTRAINT fkCurtidaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

-- FAZENDO OS INSERT TESTES:
-- INSERINDO USUARIOS
INSERT INTO usuario (nome, email, senha, dataNasc) VALUES
('Duda', 'duda@email.com', 'senha123', '1990-05-10'),
('Mateus', 'mateus@email.com', 'senha456', '1985-08-22'),
('Daniel', 'daniel@email.com', 'senha789', '1992-11-15'),
('Lucas', 'lucas@email.com', 'senha321', '2000-01-30'),
('Filipe', 'filipe@email.com', 'senha654', '1995-07-07'),
('Felipe', 'felipe@email.com', 'senha111', '1993-09-10'),
('Diogo', 'diogo@email.com', 'senha222', '1994-02-25');

-- INSERINDO FICHA DE GATOS
INSERT INTO fichaGato (nomeFelino, apelido, raca, dtNascimento, classe, descricao, atk, def, agi, fome, sono, fkUsuario) VALUES
('Mimi', 'Mi', 'Siamês', '2018-03-12', 'Caçador', 'Gato esperto e ágil', 8, 5, 9, 3, 4, 1),      -- Gato da Duda
('Tobby', NULL, 'Persa', '2016-10-05', 'Guerreiro', 'Grande e forte', 10, 8, 4, 5, 5, 1),         -- Gato da Duda
('Luna', 'Luninha', 'SRD', '2019-06-20', 'Exploradora', 'Curiosa e brincalhona', 7, 4, 8, 2, 3, 2),-- Gato do Mateus
('Nina', NULL, 'Maine Coon', '2017-12-11', 'Guardião', 'Calma e protetora', 6, 9, 3, 4, 6, 3),     -- Gato do Daniel
('Simba', 'Sim', 'Bengal', '2020-04-02', 'Ágil', 'Muito rápido e inteligente', 9, 5, 10, 3, 3, 4);  -- Gato do Lucas

-- INSERINDO POSTAGEM DAS FICHAS
INSERT INTO postagem (fkFichaGato, fkUsuario, descricao) VALUES
(1, 1, 'Mimi, você sempre será minha luz no jardim da vida. Saudades eternas.'),      -- Mimi/Duda 
(2, 1, 'Tobby, ainda te vejo correndo pela casa como um verdadeiro guerreiro.'),      -- Tobby/Duda
(3, 2, 'Luna, cada dia ao seu lado é uma nova descoberta. Obrigado por existir.'),    -- Luna/Mateus
(4, 3, 'Nina, desde que você se foi, a casa nunca mais foi a mesma. Sinto sua falta.'),-- Nina/Daniel
(5, 4, 'Simba, seu jeito brincalhão ainda me arranca sorrisos todos os dias.');       -- Simba/Luca
       


-- INSERINDO COMENTARIOS
INSERT INTO comentario (fkUsuario, fkPostagem, fkFichaGato, comentario) VALUES
(2, 1, 1, 'Que fofura a Mimi!'),                          -- Mateus no post 1 (Mimi/Duda)
(3, 1, 1, 'Adorei a foto!'),                              -- Daniel no post 1
(4, 3, 2, 'Tobby é mesmo forte!'),                        -- Lucas no post 3 (Tobby/Duda)
(1, 4, 3, 'Luna sempre cheia de energia!');               -- Duda no post 4 (Luna/Mateus)

-- INSERINDO CURTIDAS
INSERT INTO curtida (fkPostagem, fkFichaGato, fkUsuario) VALUES
(1, 1, 3),   -- Daniel curtiu post 1 (Mimi/Duda)
(1, 1, 4),   -- Lucas curtiu post 1
(3, 2, 2),   -- Mateus curtiu post 3 (Tobby/Duda)
(5, 4, 1),   -- Duda curtiu post 5 (Nina/Daniel)
(5, 4, 2);   -- Mateus curtiu post 5

INSERT INTO curtida (fkPostagem, fkFichaGato, fkUsuario) VALUES
(1, 1, 1);

SELECT 
  f.*,
  p.idPostagem,
  (SELECT COUNT(*) FROM curtida WHERE fkPostagem = p.idPostagem) AS totalCurtidas,
  (SELECT COUNT(*) FROM comentario WHERE fkPostagem = p.idPostagem) AS totalComentarios
FROM fichaGato AS f
LEFT JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario
WHERE f.fkUsuario = 1 AND u.email = 'duda@email.com' AND u.nome = 'Duda';


SELECT 
  f.*,
  u.nome,
  p.descricao,
  p.dataPublicacao,
  p.idPostagem,
  (SELECT COUNT(*) FROM curtida WHERE fkPostagem = p.idPostagem) AS totalCurtidas,
  (SELECT COUNT(*) FROM comentario WHERE fkPostagem = p.idPostagem) AS totalComentarios
FROM fichaGato AS f
JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario;



INSERT INTO fichaGato (nomeFelino, apelido, raca, dtNascimento, classe, descricao, atk, def, agi, fome, sono, fkUsuario) VALUES
('Leonardo', 'Leo', 'Siamês', '2018-03-12', 'Caçador', 'Gato esperto e ágil', 8, 5, 9, 3, 4, 3);      -- Gato da Duda

SELECT * FROM fichaGato;

-- PEGANDO OS DADOS DE UM UNICO USUARIO PELO ID
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
              AND c.fkUsuario = 1
        )
        THEN 1
        ELSE 0
    END AS statusCurtida
    FROM fichaGato AS f
	    LEFT JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
	    LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario
	    LEFT JOIN curtida AS c
	    ON c.fkUsuario = u.idUsuario AND c.fkPostagem = p.idPostagem
    WHERE f.fkUsuario = 1 AND u.email = 'duda@email.com' AND u.nome = 'duda'
    ORDER BY p.dataPublicacao DESC;
    
-- PEGANDO TODOS OS DADOS DE TODAS AS FICHAS E MOSTRANDO SE JA CURTI OU NÃO
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
              AND c.fkUsuario = 1
        )
        THEN 1
        ELSE 0
    END AS statusCurtida
FROM fichaGato AS f
    JOIN postagem AS p ON p.fkFichaGato = f.idFichaGato
    LEFT JOIN usuario AS u ON f.fkUsuario = u.idUsuario
ORDER BY p.dataPublicacao DESC;

 -- PEGANDO COMENTARIOS
SELECT 
	u.nome, 
    c.* 
FROM comentario AS c JOIN usuario AS u
	ON c.fkUsuario = u.idUsuario
WHERE fkPostagem = 1
ORDER BY c.dataComentario DESC;

SELECT * FROM usuario, postagem;

-- PEGANDO OS DADOS DA DASHBOARD
SELECT
	(SELECT COUNT(*) FROM usuario) as qtd_usuario,
	(SELECT COUNT(*) FROM postagem) as qtd_postagem,
	(SELECT COUNT(*) FROM curtida) as qtd_curtidas;
    
SELECT 
	COUNT(*) AS qtd_usuario, 
    MONTH(data) AS mes 
FROM usuario 
WHERE YEAR(data) = YEAR(CURDATE()) 
GROUP BY MONTH(data);

SELECT 
	COUNT(*) AS qtd_postagem, 
    MONTH(dataPublicacao) AS mes 
FROM postagem 
WHERE YEAR(dataPublicacao) = YEAR(CURDATE()) 
GROUP BY MONTH(dataPublicacao);
