using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {

        CategoriaRepository _repositorio = new CategoriaRepository ();

        [HttpGet]
        // [Authorize]
        public async Task<ActionResult<List<Categoria>>> Get () {

            // ToListAsync (Select * from Categoria)
            var Categorias = await _repositorio.Listar ();

            if (Categorias == null) {
                return NotFound (new {
                    mensagem = "Nenhuma Categoria foi encontrada!"
                });
            }
            return Categorias;
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {

            var Categoria = await _repositorio.BuscarPorID (id);

            if (Categoria == null) {
                return NotFound (new {
                    mensagem = "Nenhuma Categoria foi encontrada!"
                });
            }
            return Categoria;
        }

        [HttpPost]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {

            try {
                await _repositorio.Salvar (categoria);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return categoria;
        }

        [HttpPut ("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put (int id, Categoria categoria) {

            if (id != categoria.IdCategoria) {
                return BadRequest ();
            }

            try {
                await _repositorio.Alterar (categoria);
            } catch (DbUpdateConcurrencyException) {

                var categoria_valido = await _repositorio.BuscarPorID (id);

                // Verificamos se o objeto inserido realmente existe no banco
                if (categoria_valido == null) {
                    return NotFound (new {
                    mensagem = "Esse objeto não foi encontrado, digite as credenciais corretamente"
                });
                } else {
                    throw;
                }
            }
            // NoContent() = Retorna 204, sem nada.
            return NoContent ();
        }

        [HttpDelete ("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<Categoria>> Delete (int id) {

            var categoria = await _repositorio.BuscarPorID (id);
            if (categoria == null) {
                return NotFound (new {
                    mensagem = "Nenhuma Categoria foi encontrada!"
                });
            }

            await _repositorio.Excluir (categoria);

            return categoria;
        }
    }
}