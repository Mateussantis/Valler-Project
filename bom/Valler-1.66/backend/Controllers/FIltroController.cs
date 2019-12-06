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

        [HttpGet]
        public async Task<ActionResult<List<Produto>>> listafiltro(FiltroModel filtromodel) {
            
            if(filtromodel == null) {
                filtromodel = null;
            }

            var produtos = await _context.Produto.Select(
                c => new Produto() {
                    IdProduto = c.IdProduto,
                    Descricao = c.Descricao,
                    NomeProduto = c.NomeProduto,
                    IdUsuario = c.IdUsuario,
                    IdCategoria = c.IdCategoria,
                    IdCategoriaNavigation = c.IdCategoriaNavigation,

                    IdUsuarioNavigation = new Usuario() {
                        IdUsuario = c.IdUsuarioNavigation.IdUsuario,
                        NomeRazaoSocial = c.IdUsuarioNavigation.NomeRazaoSocial,
                    }
                    
                }
            ).Where(c => c.NomeProduto.Contains(filtromodel.filtro)).ToListAsync();

            return produtos;
        }  

        
    }
}