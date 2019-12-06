insert into Produto      (id_categoria, id_usuario, nome_produto, descricao) 
values                   (1,3,'Fanta', 'Bebida 2L'), 
                         (1,3,'Coca', 'Bebida 1L'),
                         (2,3,'Batata', 'Alimento fresco'); 

insert into Usuario      (id_tipo_usuario,nome_razao_social, email,senha,documento) 
values                   (1,'Valler-adm','adm@valler.com','23751923','232312342124'),
                         (2,'João Almeida','Joao_almeida@gmail.com','353455344','435625463243'),
                         (3,'EXTRA','extra@extra.com.br','3423453','32434343325');

insert into Tipo_Usuario (tipo) 
values                   ('ADM'),
                         ('Comum'),
                         ('Fornecedor');

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


INSERT INTO Oferta       (id_produto, titulo, data_oferta, data_vencimento, preco, quantidade, imagem)
VALUES                   (3, 'Fanta Laranja 2L', SYSDATETIME(), SYSDATETIME(), 2.60 , 1, 'Fanta_laranja.jpg' ),
                         (3, 'Coca Zero 2L', SYSDATETIME(), SYSDATETIME(), 3.40 , 2 , 'Coca_Cola_zero.jpg'),
                         (3, 'Batata', SYSDATETIME() , SYSDATETIME() , 64.2 , 3, 'Batata.jpg');

INSERT INTO Reserva (id_oferta, id_usuario, quantidade_reserva, cronometro, status_reserva)
VALUES                   (1,  2, 3, GETDATE(), 1),
                         (2,  2, 2, GETDATE(), 0),
                         (3,  2, 5, GETDATE(), 1);


select * from oferta		
