using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using backend.Repositories;

namespace BackEnd.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase
    {

        TipoUsuarioRepository _repositorio = new TipoUsuarioRepository();
        
        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> Get() {

            var tipousuarios = await _repositorio.Listar();

            if(tipousuarios == null) {
                return NotFound(new {
                    mensagem = "Nenhum Tipo De Usuario foi encontrado!"
                });
            }
            return tipousuarios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoUsuario>> Get(int id) {

            var tipousuario = await _repositorio.BuscarPorID(id);

            if (tipousuario == null ) {
                return NotFound(new {
                    mensagem = "Nenhum Tipo De Usuario foi encontrado!"
                });
            }
            return tipousuario;
        }

        [HttpPost]
        public async Task<ActionResult<TipoUsuario>> Post(TipoUsuario tipousuario) {
            
            try {
                await _repositorio.Salvar(tipousuario);
            }
            catch (DbUpdateConcurrencyException)
            {
            throw;
            }
            return tipousuario;
        }
        
        [HttpPut("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put(int id, TipoUsuario tipousuario){

            if(id != tipousuario.IdTipoUsuario) {
                return BadRequest(new {
                    mensagem = "Nenhum Tipo De Usuario foi encontrado!"
                });
            }

            try {
                await _repositorio.Alterar(tipousuario);
            }
            catch (DbUpdateConcurrencyException)
            {
                var tipousuario_valido = _repositorio.BuscarPorID(id);
                
                if(tipousuario_valido == null) {
                    return NotFound(new {
                    mensagem = "Nenhum Tipo De Usuario foi encontrado!"
                });
                }
                else {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<TipoUsuario>> Delete(int id){

            var tipousuario = await _repositorio.BuscarPorID(id);
            
            if(tipousuario == null){
                return NotFound(new {
                    mensagem = "Nenhum Tipo De Usuario foi encontrado!"
                });
            }
            await _repositorio.Excluir(tipousuario);

            return tipousuario;
        }
    }
}