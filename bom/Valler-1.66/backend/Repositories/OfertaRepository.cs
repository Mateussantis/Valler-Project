using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using backend.Controllers;
using backend.Domains;
using backend.Interfaces;
using Backend.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class OfertaRepository : IOferta {
        public async Task<Oferta> Alterar ([FromForm] Oferta oferta) {
            using (VallerContext _contexto = new VallerContext ()) {
                _contexto.Entry (oferta).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();
            }
            return oferta;
        }

        public async Task<Oferta> BuscarPorID (int id) {
            using (VallerContext _contexto = new VallerContext ()) {
                return await _contexto.Oferta.Select (
                    o => new Oferta () {
                        IdOferta = o.IdOferta,
                            IdProduto = o.IdProduto,
                            DataOferta = o.DataOferta,
                            DataVencimento = o.DataVencimento,
                            Imagem = o.Imagem,
                            Preco = o.Preco,
                            Quantidade = o.Quantidade,
                            Titulo = o.Titulo,

                            IdProdutoNavigation = new Produto () {
                                IdProduto = o.IdProdutoNavigation.IdProduto,
                                    Descricao = o.IdProdutoNavigation.Descricao,
                                    IdCategoria = o.IdProdutoNavigation.IdCategoria,
                                    IdUsuario = o.IdProdutoNavigation.IdUsuario,
                                    NomeProduto = o.IdProdutoNavigation.NomeProduto,

                                    IdUsuarioNavigation = new Usuario () {
                                        IdUsuario = o.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
                                            NomeRazaoSocial = o.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
                                            Endereco = o.IdProdutoNavigation.IdUsuarioNavigation.Endereco,
                                            Telefone = o.IdProdutoNavigation.IdUsuarioNavigation.Telefone,
                                            Documento = o.IdProdutoNavigation.IdUsuarioNavigation.Documento,
                                    }
                            }
                    }

                ).FirstOrDefaultAsync (o => o.IdOferta == id);
            }
        }

        public async Task<Oferta> Excluir (Oferta oferta) {
            using (VallerContext _contexto = new VallerContext ()) {
                _contexto.Oferta.Remove (oferta);
                await _contexto.SaveChangesAsync ();
                return oferta;
            }
        }

        public async Task<List<Oferta>> Listar () {
            using (VallerContext _contexto = new VallerContext ()) {
                return await _contexto.Oferta.Select (

                    o => new Oferta () {
                        IdOferta = o.IdOferta,
                            IdProduto = o.IdProduto,
                            IdUsuario = o.IdUsuario,
                            Titulo = o.Titulo,
                            DataVencimento = o.DataVencimento,
                            DataOferta = o.DataOferta,
                            Preco = o.Preco,
                            Quantidade = o.Quantidade,
                            Imagem = o.Imagem,
                            


                            IdProdutoNavigation = new Produto () {
                                IdProduto = o.IdProdutoNavigation.IdProduto,
                                    Descricao = o.IdProdutoNavigation.Descricao,
                                    IdCategoria = o.IdProdutoNavigation.IdCategoria,
                                    IdUsuario = o.IdProdutoNavigation.IdUsuario,
                                    NomeProduto = o.IdProdutoNavigation.NomeProduto,

                                    IdUsuarioNavigation = new Usuario () {
                                        IdUsuario = o.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
                                            NomeRazaoSocial = o.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
                                            Endereco = o.IdProdutoNavigation.IdUsuarioNavigation.Endereco,
                                            Telefone = o.IdProdutoNavigation.IdUsuarioNavigation.Telefone,
                                            Documento = o.IdProdutoNavigation.IdUsuarioNavigation.Documento,
                                    }
                            }
                    }
                ).ToListAsync ();
            }

        }

        public async Task<Oferta> Salvar ([FromForm] Oferta oferta) {
            using (VallerContext _contexto = new VallerContext ()) {

                await _contexto.AddAsync (oferta);

                await _contexto.SaveChangesAsync ();
                return oferta;
            }
        }

        public async Task<List<Oferta>> ListarOnlyId (int IdUsuario) {
            using (VallerContext _context = new VallerContext ()) {
                return await _context.Oferta.Select(
                    o => new Oferta () {
                        IdOferta = o.IdOferta,
                            IdProduto = o.IdProduto,
                            Titulo = o.Titulo,
                            DataVencimento = o.DataVencimento,
                            DataOferta = o.DataOferta,
                            Preco = o.Preco,
                            Quantidade = o.Quantidade,
                            Imagem = o.Imagem,
                            IdUsuario = o.IdUsuario,

                            IdProdutoNavigation = new Produto () {
                                IdProduto = o.IdProdutoNavigation.IdProduto,
                                    Descricao = o.IdProdutoNavigation.Descricao,
                                    IdCategoria = o.IdProdutoNavigation.IdCategoria,
                                    IdUsuario = o.IdProdutoNavigation.IdUsuario,
                                    NomeProduto = o.IdProdutoNavigation.NomeProduto,

                                    IdUsuarioNavigation = new Usuario () {
                                        IdUsuario = o.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
                                            NomeRazaoSocial = o.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
                                            Endereco = o.IdProdutoNavigation.IdUsuarioNavigation.Endereco,
                                            Telefone = o.IdProdutoNavigation.IdUsuarioNavigation.Telefone,
                                            Documento = o.IdProdutoNavigation.IdUsuarioNavigation.Documento,
                                    }
                            }
                    }
                ).Where(o => o.IdUsuario == IdUsuario).ToListAsync();
            }
        }
    }
}