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
    }
}