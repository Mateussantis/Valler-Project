using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using backend.ViewModelController;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FIltroTrueController
    {
        VallerContext _context = new VallerContext();

        [HttpGet]
        public async Task<List<Produto>> listafiltro(FiltroModel filtromodel) {
            
            if(filtromodel == null) {
                filtromodel = null;
            }

            var produtos = await _context.Produto.Select(
                c => new Produto() {
                    IdProduto = c.IdProduto,
                    Descricao = c.Descricao,
                    NomeProduto = c.NomeProduto,
                    IdCategoria = c.IdCategoria,
                    IdUsuario = c.IdUsuario,
                    IdCategoriaNavigation = c.IdCategoriaNavigation,

                    IdUsuarioNavigation = new Usuario() {
                        IdUsuario = c.IdUsuarioNavigation.IdUsuario,
                        NomeRazaoSocial = c.IdUsuarioNavigation.NomeRazaoSocial
                    }
                    
                }
            ).Where(c => c.IdCategoriaNavigation.Categoria1.StartsWith(filtromodel.filtro)).ToListAsync();

            return produtos;
        } 




        // [HttpPost]
        // public async Task<List<Oferta>> listafiltro(FiltroModel filtromodel) {
            
        //     if(filtromodel == null) {
        //         filtromodel = null;
        //     }

        //     var oferta = await _context.Oferta.Select(
        //          o => new Oferta () {
        //                 IdOferta = o.IdOferta,
        //                     IdProduto = o.IdProduto,
        //                     Titulo = o.Titulo,
        //                     DataVencimento = o.DataVencimento,
        //                     DataOferta = o.DataOferta,
        //                     Preco = o.Preco,
        //                     Quantidade = o.Quantidade,
        //                     Imagem = o.Imagem,
        //                     IdUsuario = o.IdUsuario,

        //                     IdProdutoNavigation = new Produto () {
        //                         IdProduto = o.IdProdutoNavigation.IdProduto,
        //                             Descricao = o.IdProdutoNavigation.Descricao,
        //                             IdCategoria = o.IdProdutoNavigation.IdCategoria,
        //                             IdUsuario = o.IdProdutoNavigation.IdUsuario,
        //                             NomeProduto = o.IdProdutoNavigation.NomeProduto,

        //                             IdCategoriaNavigation = new Categoria() {
        //                                 IdCategoria = o.IdProdutoNavigation.IdCategoriaNavigation.IdCategoria,
        //                                 Categoria1 = o.IdProdutoNavigation.IdCategoriaNavigation.Categoria1
        //                             },

        //                             IdUsuarioNavigation = new Usuario () {
        //                                 IdUsuario = o.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
        //                                     NomeRazaoSocial = o.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
        //                                     Endereco = o.IdProdutoNavigation.IdUsuarioNavigation.Endereco,
        //                                     Telefone = o.IdProdutoNavigation.IdUsuarioNavigation.Telefone,
        //                                     Documento = o.IdProdutoNavigation.IdUsuarioNavigation.Documento,
        //                             }
        //                     }
        //             }
        //     ).Where(c => c.IdCategoriaNavigation.Categoria1.StartsWith(filtromodel.filtro)).ToListAsync();

        //     return oferta;
        // }  
    }
}