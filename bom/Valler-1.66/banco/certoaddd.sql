insert into Tipo_Usuario (tipo) 
values                   ('ADM'),
                         ('Comum'),
                         ('Fornecedor');

insert into Usuario      (id_tipo_usuario,nome_razao_social, email,senha,documento) 
values                   (1,'Valler-adm','adm@valler.com','23751923','232312342124'),
                         (2,'Mateus Santis','mateussantiss@gmail.com','123','435625463243'),
						 (3,'Extra','extra','123','32434343325'),
                         (3,'Carrefur','carrefur','123','32434343325');

INSERT INTO Categoria    (categoria)  
values                   ('Bebidas'),
                         ('Alimentos'),
                         ('Frutas');
                          
INSERT INTO Telefone     (id_usuario,telefone) 
values                   (1, '4653-3466'), 
                         (2, '2254-2735'),
                         (3, '2752-3543');

INSERT INTO Endereco     (id_usuario, rua, numero, bairro, cidade, uf, cep)
VALUES                   (1, 'Getulio', 731, 'Jardim Belval', 'Barueri', 'SP', '731'),
                         (2, 'Papagaio', 32, 'America', 'Jandira', 'RJ', '543'), 
                         (1, 'Franca', 81, 'Auvorada', 'Quero', 'PQ', '10');




select * from tipo_usuario;
