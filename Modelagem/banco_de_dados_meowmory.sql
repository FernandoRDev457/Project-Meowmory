CREATE DATABASE meowmory;

USE meowmory;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fotoPerfil VARCHAR(400),
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
    fotoFelino VARCHAR(400),
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

-- USER MASTER
INSERT INTO usuario (nome, email, senha, dataNasc, data) VALUES
('Fernando Ramirez', 'fer457@gmail.com', 'Meowmory123', '2006-10-04', '2025-01-10 10:12:00');

-- FAZENDO OS INSERT TESTES:
-- INSERINDO USUARIOS
INSERT INTO usuario (nome, email, senha, dataNasc, data) VALUES
('Ana', 'ana@email.com', 'ana123', '1990-01-15', '2025-01-10 10:12:00'),
('Bruno', 'bruno@email.com', 'bruno123', '1987-02-20', '2025-02-05 14:30:00'),
('Carla', 'carla@email.com', 'carla123', '1995-03-08', '2025-03-12 09:45:00'),
('Diego', 'diego@email.com', 'diego123', '1992-04-25', '2025-04-07 08:20:00'),
('Eduarda', 'eduarda@email.com', 'edu123', '1999-05-10', '2025-05-19 11:11:00'),
('Felipe', 'felipe@email.com', 'felipe123', '1991-06-30', '2025-06-03 16:00:00'),
('Guilherme', 'gui@email.com', 'gui123', '1989-01-01', '2025-01-22 17:45:00'),
('Helena', 'helena@email.com', 'helena123', '1996-02-11', '2025-02-16 12:10:00'),
('Igor', 'igor@email.com', 'igor123', '1993-03-20', '2025-03-25 13:50:00'),
('Juliana', 'ju@email.com', 'juliana123', '1990-04-03', '2025-04-11 15:25:00'),
('Kaio', 'kaio@email.com', 'kaio123', '1994-05-18', '2025-05-29 09:00:00'),
('Laura', 'laura@email.com', 'laura123', '1997-06-12', '2025-06-01 18:40:00'),
('Marina', 'marina@email.com', 'marina123', '1998-01-30', '2025-01-08 07:35:00'),
('Nicolas', 'nico@email.com', 'nico123', '1995-02-28', '2025-02-22 13:05:00'),
('Olívia', 'olivia@email.com', 'olivia123', '1992-03-05', '2025-03-15 11:15:00'),
('Pedro', 'pedro@email.com', 'pedro123', '1986-04-14', '2025-04-02 10:30:00'),
('Quésia', 'quesia@email.com', 'quesia123', '1991-05-21', '2025-05-12 14:00:00'),
('Rafael', 'rafa@email.com', 'rafa123', '1993-06-18', '2025-06-05 16:50:00'),
('Sofia', 'sofia@email.com', 'sofia123', '1999-01-07', '2025-01-17 08:10:00'),
('Thiago', 'thiago@email.com', 'thiago123', '1990-02-03', '2025-02-08 10:00:00');


-- INSERINDO FICHA DE GATOS
INSERT INTO fichaGato (nomeFelino, apelido, fotoFelino, raca, dtNascimento, classe, descricao, atk, def, agi, fome, sono, fkUsuario) VALUES
('Lili', 'Lils', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', 'Siamês', '2017-06-12', 'Mestre das Ronronadas Eternas', 'Gatinha carinhosa e contemplativa', 6, 4, 7, 3, 5, 1),
('Thor', '', 'https://cdn.pixabay.com/photo/2018/04/30/21/26/cat-3362443_1280.jpg', 'Persa', '2016-08-01', 'Guardião', 'Silencioso mas atento, protegeu todos os cantos da casa', 8, 9, 5, 4, 5, 2),
('Frajola', 'Frajo', 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg', 'SRD', '2015-11-25', 'Fofoqueiro(a) da janela', 'Passava horas espiando os vizinhos', 7, 4, 6, 2, 3, 3),
('Mel', 'Melzinha', 'https://cdn.pixabay.com/photo/2017/02/01/12/01/cat-2022345_1280.jpg', 'Ragdoll', '2019-03-14', 'Artista do Pãozinho Fofinho', 'A rainha das massagens matinais', 5, 5, 5, 3, 4, 4),
('Kiko', '', 'https://cdn.pixabay.com/photo/2017/11/09/10/38/maine-coon-2934720_1280.jpg', 'Maine Coon', '2014-09-30', 'Caçador(ar) de Ratos Fantasma', 'Sempre alerta e caçador até no sonho', 9, 7, 6, 4, 3, 5),
('Sasha', '', 'https://cdn.pixabay.com/photo/2020/01/13/16/33/cat-4760974_1280.jpg', 'Bengal', '2020-07-05', 'Mestre da Soneca', 'Dormir era sua arte', 4, 6, 3, 2, 6, 6),
('Milo', '', 'https://cdn.pixabay.com/photo/2018/03/31/17/05/cat-3275594_1280.jpg', 'SRD', '2018-01-01', 'Destruidor(a) de Sofás', 'Incansável escalador de almofadas', 6, 5, 9, 4, 2, 7),
('Bella', 'Bel', 'https://cdn.pixabay.com/photo/2017/02/09/15/10/sphynx-2057550_1280.jpg', 'Sphynx', '2019-02-14', 'Fofoqueiro(a) da janela', 'Observadora nata e muito falante', 5, 3, 8, 3, 4, 8),
('Zeca', '', 'https://cdn.pixabay.com/photo/2020/11/10/20/57/cat-5731086_1280.jpg', 'SRD', '2017-05-09', 'Mestre das Ronronadas Eternas', 'Seu ronronar fazia a casa vibrar', 6, 5, 4, 3, 5, 9),
('Nina', '', 'https://cdn.pixabay.com/photo/2018/05/30/19/20/siamese-3440497_1280.jpg', 'Siamesa', '2016-12-03', 'Mestre da Soneca', 'Dormia onde não cabia, e cabia onde não devia', 5, 4, 4, 2, 6, 10),
('Lua', '', 'https://cdn.pixabay.com/photo/2019/09/25/21/14/cat-4504247_1280.jpg', 'British Shorthair', '2021-06-10', 'Caçador(ar) de Ratos Fantasma', 'Caçava sombras e dormia no sol', 8, 5, 7, 3, 4, 11),
('Léo', '', 'https://cdn.pixabay.com/photo/2018/05/16/17/35/cat-3403154_1280.jpg', 'Bengal', '2019-08-17', 'Destruidor(a) de Sofás', 'Amava escalar tudo o que via pela frente', 9, 6, 9, 4, 3, 12),
('Biscoito', '', 'https://cdn.pixabay.com/photo/2016/12/20/08/45/cat-1913437_1280.jpg', 'SRD', '2020-10-25', 'Artista do Pãozinho Fofinho', 'Seu ronronar vinha com massagem grátis', 4, 4, 5, 3, 4, 13),
('Chico', 'Chiquinho', 'https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_1280.jpg', 'Siamês', '2015-04-19', 'Mestre das Ronronadas Eternas', 'Conversava com o universo quando miava', 5, 6, 5, 3, 5, 14),
('Cacau', '', 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', 'Angorá', '2018-06-30', 'Fofoqueiro(a) da janela', 'Sabia tudo do bairro, inclusive o que não devia', 7, 3, 6, 2, 3, 15),
('Nega', '', 'https://cdn.pixabay.com/photo/2020/01/16/15/58/cat-4766395_1280.jpg', 'SRD', '2017-07-21', 'Guardião', 'Silenciosa, mas ninguém passava despercebido por ela', 6, 7, 5, 3, 5, 16),
('Tom', '', 'https://cdn.pixabay.com/photo/2016/03/27/22/22/cat-1285634_1280.jpg', 'Maine Coon', '2016-11-03', 'Mestre da Soneca', 'Dormia feito um rei, roncava como um trovão', 5, 5, 4, 4, 6, 17),
('Luna', '', 'https://cdn.pixabay.com/photo/2016/03/05/19/02/cat-1237002_1280.jpg', 'Siamesa', '2018-02-02', 'Artista do Pãozinho Fofinho', 'Fofa como uma nuvem, firme como pão de ontem', 5, 4, 6, 2, 4, 18),
('Salém', '', 'https://cdn.pixabay.com/photo/2021/05/21/15/00/cat-6270165_1280.jpg', 'Bombay', '2019-10-13', 'Caçador(ar) de Ratos Fantasma', 'Misterioso e rápido como um raio', 8, 5, 8, 4, 4, 19),
('Mimi', 'Mimosa', 'https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg', 'SRD', '2017-08-05', 'Mestre das Ronronadas Eternas', 'Sua ausência ecoa nos cantos mais silenciosos', 6, 5, 4, 3, 5, 20);


-- INSERINDO POSTAGEM DAS FICHAS
INSERT INTO postagem (fkFichaGato, fkUsuario, descricao, dataPublicacao) VALUES
(1, 1, 'Lili, cada miado seu me guiava. Te amo pra sempre.', '2025-01-11 10:20:00'),
(2, 2, 'Thor, o guardião da casa e do meu coração.', '2025-02-07 09:00:00'),
(3, 3, 'Frajola, sua bagunça virou silêncio. Que saudade.', '2025-03-18 14:35:00'),
(4, 4, 'Mel, sua doçura ainda perfuma meus dias.', '2025-04-06 08:55:00'),
(5, 5, 'Kiko, obrigado por cada olhar que dizia tanto.', '2025-05-03 17:10:00'),
(6, 6, 'Sasha, sua presença ainda aquece meu travesseiro.', '2025-06-01 20:15:00'),
(7, 7, 'Milo, a casa ficou muda sem suas aventuras noturnas.', '2025-01-26 13:00:00'),
(8, 8, 'Bella, você foi a melhor amiga de todas as manhãs.', '2025-02-17 11:40:00'),
(9, 9, 'Zeca, você ronronava com a alma, não só com o corpo.', '2025-03-21 10:30:00'),
(10, 10, 'Nina, sua ausência ainda é barulhenta aqui dentro.', '2025-04-20 18:20:00'),
(11, 11, 'Lua, seu nome nunca fez tanto sentido: brilho na escuridão.', '2025-05-09 12:00:00'),
(12, 12, 'Léo, meu pequeno rei de quatro patas.', '2025-06-04 09:45:00'),
(13, 13, 'Biscoito, você foi meu consolo e meu sorriso.', '2025-01-14 16:25:00'),
(14, 14, 'Chico, obrigado pelas manhãs com pãozinho e miado.', '2025-02-28 10:05:00'),
(15, 15, 'Cacau, tua travessura deixou pegadas no meu peito.', '2025-03-30 17:15:00'),
(16, 16, 'Nega, minha guardiã silenciosa.', '2025-04-04 09:10:00'),
(17, 17, 'Tom, sua ausência virou poesia.', '2025-05-18 13:40:00'),
(18, 18, 'Luna, você me ensinou a amar sem palavras.', '2025-06-07 10:50:00'),
(19, 19, 'Salém, seu olhar misterioso ainda me persegue.', '2025-01-19 08:30:00'),
(20, 20, 'Mimi, você será eterna na estante do meu coração.', '2025-02-13 11:20:00');

       


-- INSERINDO COMENTARIOS
INSERT INTO comentario (comentario, dataComentario, fkUsuario, fkPostagem, fkFichaGato) VALUES
('Ela foi especial mesmo, Lili era um doce. Força aí ❤️', '2025-01-11', 2, 21, 1),
('O Thor tinha um olhar que dizia tudo. Sinto com você.', '2025-01-25', 5, 22, 2),
('Frajola era uma figura! A janela ficou mais silenciosa.', '2025-02-04', 4, 23, 3),
('Mel era puro amor. Acordar sem ela deve doer mesmo 😔', '2025-02-21', 6, 24, 4),
('Kiko era o rei da rua. Nunca vi gato mais corajoso!', '2025-03-01', 3, 25, 5),
('Sasha foi uma deusa das sonecas. Muita saudade...', '2025-03-04', 7, 26, 6),
('O Milo era um bagunceiro adorável! Me lembro dele demais.', '2025-03-12', 1, 27, 7),
('Bella deixou um rastro de amor. Sua partida foi sentida aqui também.', '2025-03-26', 8, 28, 8),
('Zeca era tão companheiro... seu silêncio também me dói.', '2025-04-06', 9, 29, 9),
('A Nina tinha um jeitinho só dela. Grande perda 😞', '2025-04-13', 10, 30, 10),
('A Lua iluminava tudo... inclusive nossos dias.', '2025-04-22', 11, 31, 11),
('Léo era impossível de ignorar. Um tornado de amor!', '2025-05-01', 12, 32, 12),
('Nunca vi outro gato como o Biscoito. Que saudade eterna...', '2025-05-05', 13, 33, 13),
('Chiquinho entendia mais que muito humano. Um anjo mesmo.', '2025-05-13', 14, 34, 14),
('Cacau era rainha da casa e dos nossos corações também.', '2025-05-21', 15, 35, 15),
('A Nega era cheia de atitude! Uma lenda felina 🖤', '2025-05-25', 16, 36, 16),
('Tigrão fazia a gente rir muito. Não tem outro igual.', '2025-05-30', 17, 37, 17),
('Mia tinha um jeitinho encantador... muita luz em pouco tempo.', '2025-06-01', 18, 38, 18),
('Panqueca fazia a vida mais leve. Uma estrelinha agora.', '2025-06-04', 19, 39, 19),
('Dudu era pura travessura! Mas também pura ternura.', '2025-06-08', 20, 40, 20);

-- Postagem 21 (ficha 1)
INSERT INTO comentario (comentario, dataComentario, fkUsuario, fkPostagem, fkFichaGato) VALUES
('Lili era uma estrelinha mesmo. Que texto lindo 🥺', '2025-01-12', 4, 21, 1),
('Me emocionei aqui. Que saudade da nossa pequena também.', '2025-01-13', 6, 21, 1),

-- Postagem 22 (ficha 2)
('O Thor sempre foi calmo, né? Parecia meditar 🐱', '2025-01-26', 7, 22, 2),
('Força, irmão. Thor foi muito amado.', '2025-01-27', 8, 22, 2),

-- Postagem 23 (ficha 3)
('Frajola era hilário! Sentava igual gente kkk', '2025-02-05', 9, 23, 3),
('Ele fazia vigília da rua toda. Um ícone!', '2025-02-06', 10, 23, 3),

-- Postagem 24 (ficha 4)
('Mel era minha favorita! Acordava a gente com carinho.', '2025-02-22', 11, 24, 4),
('Que bom que temos fotos dela sorrindo dormindo!', '2025-02-23', 12, 24, 4),

-- Postagem 25 (ficha 5)
('Kiko era o terror das caixas! 😹', '2025-03-02', 13, 25, 5),
('Me lembro dele caçando lagartixa! Nunca falhava.', '2025-03-03', 14, 25, 5),

-- Postagem 26 (ficha 6)
('Sasha dormia no meu colo, lembra? Saudades mesmo.', '2025-03-05', 15, 26, 6),
('Uma rainha das sonecas e dos corações.', '2025-03-06', 16, 26, 6),

-- Postagem 27 (ficha 7)
('O Milo era todo atrapalhado, mas adorável demais.', '2025-03-13', 17, 27, 7),
('Ainda encontro pelo dele no sofá 😿', '2025-03-14', 18, 27, 7),

-- Postagem 28 (ficha 8)
('Bella era uma dama! Tão elegante…', '2025-03-27', 19, 28, 8),
('Ela ficava de olho na cozinha esperando petisco.', '2025-03-28', 20, 28, 8),

-- Postagem 29 (ficha 9)
('Zeca me recebia melhor que muito humano! 🥲', '2025-04-07', 1, 29, 9),
('Era o guardião da casa. Ainda sinto a falta dele.', '2025-04-08', 2, 29, 9),

-- Postagem 30 (ficha 10)
('Nina fazia massagem com as patinhas, né? Que fofa.', '2025-04-14', 3, 30, 10),
('Ela te escolheu e te amou de verdade. Isso é raro.', '2025-04-15', 4, 30, 10),

-- Postagem 31 (ficha 11)
('Lua era encantadora! Sempre curiosa com tudo.', '2025-04-23', 5, 31, 11),
('Ela era luz. Nunca vou esquecer aquele olhar.', '2025-04-24', 6, 31, 11),

-- Postagem 32 (ficha 12)
('Léo parecia ligado no 220V, mas era puro coração.', '2025-05-02', 7, 32, 12),
('Ele era bagunceiro e a gente amava mesmo assim.', '2025-05-03', 8, 32, 12),

-- Postagem 33 (ficha 13)
('Biscoito tinha um ronronar que curava tristeza 🧡', '2025-05-06', 9, 33, 13),
('Foi amado do primeiro ao último dia. Parabéns por isso.', '2025-05-07', 10, 33, 13),

-- Postagem 34 (ficha 14)
('Chiquinho era puro carinho. Sempre presente.', '2025-05-14', 11, 34, 14),
('Até meu cachorro gostava dele, acredita? Um ser especial.', '2025-05-15', 12, 34, 14),

-- Postagem 35 (ficha 15)
('Cacau era a rainha do travesseiro! Sinto falta dela ali.', '2025-05-22', 13, 35, 15),
('Tinha uma alma velha e doce. Muito amor envolvido.', '2025-05-23', 14, 35, 15),

-- Postagem 36 (ficha 16)
('A Nega tinha personalidade. Onde passava, deixava marca.', '2025-05-26', 15, 36, 16),
('Seus olhos eram hipnóticos. Que saudade, viu?', '2025-05-27', 16, 36, 16),

-- Postagem 37 (ficha 17)
('Tigrão fazia festa todo dia! Um amor de gato.', '2025-05-31', 17, 37, 17),
('Deixou boas histórias e muitas risadas.', '2025-06-01', 18, 37, 17),

-- Postagem 38 (ficha 18)
('Mia era tão delicada. Me lembro do jeitinho que andava.', '2025-06-02', 19, 38, 18),
('A casa ficou mais vazia sem ela. Força pra você!', '2025-06-03', 20, 38, 18),

-- Postagem 39 (ficha 19)
('Panqueca era puro dengo. Não tem um dia que eu não lembre.', '2025-06-05', 1, 39, 19),
('Ela foi muito feliz com você. E isso é o mais bonito.', '2025-06-06', 2, 39, 19),

-- Postagem 40 (ficha 20)
('Dudu era um espetáculo de gato! Cheio de manha.', '2025-06-09', 3, 40, 20),
('Deixou rastro de amor por onde passou.', '2025-06-09', 4, 40, 20);



-- INSERINDO CURTIDAS
INSERT INTO curtida (fkPostagem, fkFichaGato, fkUsuario) VALUES
(1, 1, 3),   -- Daniel curtiu post 1 (Mimi/Duda)
(1, 1, 4),   -- Lucas curtiu post 1
(3, 2, 2),   -- Mateus curtiu post 3 (Tobby/Duda)
(5, 4, 1),   -- Duda curtiu post 5 (Nina/Daniel)
(5, 4, 2);   -- Mateus curtiu post 5

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


SELECT * FROM fichaGato;
SELECT * FROM postagem;
SELECT * FROM comentario;

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