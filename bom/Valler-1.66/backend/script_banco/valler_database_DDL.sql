create database Valler; 

use Valler; 


--TABELA TIPO_USUARIO - MARIANA 
create table Tipo_Usuario(
    id_tipo_usuario int identity primary key,
    tipo  varchar (50) not null
);

--TABELA USUARIO - MARIANA 
create table Usuario (
    id_usuario int identity primary key,
    id_tipo_usuario int foreign key references Tipo_Usuario (id_tipo_usuario),
    nome_razao_social varchar (255) not null,
    email varchar (255) not null,
    senha varchar (255) not null,
    documento  varchar (255) not null,
);

--Categoria - Pietra
CREATE TABLE Categoria(
	id_categoria int identity PRIMARY KEY,
	categoria varchar(255) not null
);


--TABELA PRODUTO - MATEUS
create table Produto(
	id_produto int primary key identity,
	id_categoria int foreign key references Categoria(id_categoria),
	id_usuario int foreign key references Usuario(id_usuario),
	nome_produto varchar(50) not null,
	descricao varchar(255)
);

-- Endereco - Vinicius 
CREATE TABLE Endereco (
	id_endereco INT IDENTITY PRIMARY KEY,
	id_usuario INT FOREIGN KEY REFERENCES Usuario (id_usuario),
	rua VARCHAR (255) NOT NULL,
	numero VARCHAR (255) NOT NULL,
	bairro VARCHAR (255) NOT NULL,
	cidade VARCHAR (255) NOT NULL,
	uf VARCHAR (255) NOT NULL, 
	cep VARCHAR (255) NOT NULL
);      


--Telefone - Pietra
CREATE TABLE Telefone(
	id_telefone int identity  PRIMARY KEY,
	id_usuario int foreign key references Usuario(id_usuario),
	telefone varchar(15)
);

-- Oferta - Vinicius
CREATE TABLE Oferta (
	id_oferta INT IDENTITY PRIMARY KEY,
	id_produto INT FOREIGN KEY REFERENCES Produto (id_produto),
	titulo VARCHAR (255) NOT NULL,
	data_oferta datetime NOT NULL,
	data_vencimento datetime NOT NULL,
	preco float NOT NULL,
	quantidade int NOT NULL,
	imagem VARCHAR (255) NOT NULL
);

--Reserva - Vinius
CREATE TABLE Reserva (
	id_reserva INT IDENTITY PRIMARY KEY,
	id_oferta INT FOREIGN KEY REFERENCES Oferta (id_oferta),
	id_usuario INT FOREIGN KEY REFERENCES Usuario (id_usuario),
	quantidade_reserva int NOT NULL,
	cronometro time(3) NOT NULL,
	status_reserva bit NOT NULL
);




