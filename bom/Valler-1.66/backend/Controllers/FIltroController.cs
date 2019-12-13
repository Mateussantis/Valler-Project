using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.ViewModelController;
using System.Linq;
using System;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FIltroController : ControllerBase
    {
        VallerContext _context = new VallerContext();

        // [HttpPost]
        // public async Task<ActionResult<List<Oferta>>> listafiltro(FiltroModel filtromodel) {
            
        //     if(filtromodel == null) {
        //         filtromodel = null;
        //     }

        //     var Oferta = await _context.Oferta.Select(
        //        o => new Oferta () {
        //                 IdOferta = o.IdOferta,
        //                     IdProduto = o.IdProduto,
        //                     DataOferta = o.DataOferta,
        //                     DataVencimento = o.DataVencimento,
        //                     Imagem = o.Imagem,
        //                     Preco = o.Preco,
        //                     Quantidade = o.Quantidade,
        //                     Titulo = o.Titulo,

        //                     IdProdutoNavigation = new Produto () {
        //                         IdProduto = o.IdProdutoNavigation.IdProduto,
        //                             Descricao = o.IdProdutoNavigation.Descricao,
        //                             IdCategoria = o.IdProdutoNavigation.IdCategoria,
        //                             IdUsuario = o.IdProdutoNavigation.IdUsuario,
        //                             NomeProduto = o.IdProdutoNavigation.NomeProduto,

        //                             IdUsuarioNavigation = new Usuario () {
        //                                 IdUsuario = o.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
        //                                     NomeRazaoSocial = o.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
        //                                     Endereco = o.IdProdutoNavigation.IdUsuarioNavigation.Endereco,
        //                                     Telefone = o.IdProdutoNavigation.IdUsuarioNavigation.Telefone,
        //                                     Documento = o.IdProdutoNavigation.IdUsuarioNavigation.Documento,
        //                             }
        //                     }
        //        }
        //     ).Where(c => c.Titulo.Contains(filtromodel.filtro)).ToListAsync();

        //     return Oferta;
        // }  


        [HttpPost]
        public async Task<ActionResult<List<Oferta>>> Post(FiltroModel filtromodel){

            if(filtromodel == null) {
                filtromodel = null;
            }

            var Oferta = await _context.Oferta.Select(
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
            ).Where(c => c.Titulo.Contains(filtromodel.filtro)).ToListAsync();

            return Oferta;
        }

        
    }
}