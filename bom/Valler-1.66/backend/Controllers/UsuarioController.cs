using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//para adicionar a árvore de objeto adicionamos uma nova biblioteca JSON
// dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

namespace Backend.Controllers {

    //Definimos nossa roda do controller e dizemos que é um controller de API
    [Route ("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {

        UsuarioRepository _repositorio = new UsuarioRepository ();

        // GET: api/Usuario

        /// <summary>
        /// Listar Usuarios
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {

            int x = 0;
            List<Usuario> usuarios = new List<Usuario> ();
            usuarios = await _repositorio.Listar ();

            if (usuarios == null) {
                return NotFound (new {
                    mensagem = "Nenhum Usuario foi encontrado!"
                });
            }

            for (x = 0; x < usuarios.Count; x++) {
                usuarios[x].Email = null;
                usuarios[x].Senha = null;
            }

            return usuarios;
        }

        // GET: api/Usuario/2

        /// <summary>
        /// Pegamos usuario pelo ID 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {

            // FindAsync (Select * from Usuario where id = id)
            var Usuario = await _repositorio.BuscarPorID (id);

            if (Usuario == null) {
                return NotFound (new {
                    mensagem = "Nenhum Usuario foi encontrado!"
                });
            }

            Usuario.Email = null;
            Usuario.Senha = null;

            return Usuario;
        }

        // POST api/Usuario

        /// <summary>
        /// Cadastrar Usuario
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post (Usuario usuario) {

            try {
                await _repositorio.Salvar (usuario);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return usuario;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        [Authorize (Roles = "ADM")]
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Usuario usuario) {

            if (id != usuario.IdUsuario) {
                return BadRequest (new {
                    mensagem = "Nenhum Usuario foi encontrado!"
                });
            }

            try {
                await _repositorio.Alterar (usuario);
            } catch (DbUpdateConcurrencyException) {

                var usuario_valido = await _repositorio.BuscarPorID (id);

                // Verificamos se o objeto inserido realmente existe no banco
                if (usuario_valido == null) {
                    return NotFound (new {
                    mensagem = "Nenhum Usuario foi encontrado!"
                });
                } else {
                    throw;
                }
            }
            // NoContent() = Retorna 204, sem nada.
            return NoContent ();

        }

        //DELETE api/evento/id
        [Authorize (Roles = "ADM")]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {

            var usuario = await _repositorio.BuscarPorID (id);
            if (usuario == null) {
                return NotFound (new {
                    mensagem = "Nenhum Usuario foi encontrado!"
                });
            }

            await _repositorio.Excluir (usuario);

            return usuario;
        }

    }
}