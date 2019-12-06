using backend.Domains;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.TelefoneRepository;
using Microsoft.AspNetCore.Authorization;

// Adiciona a arvore de objetos 
// dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson


namespace backend.Controllers
{
    // Define a rota do controller, e diz que é um controller de API
    [Route("api/[controller]")] 
    [ApiController]
    public class TelefoneController : ControllerBase
    {
        TelefoneRepository _repositorio = new TelefoneRepository();

        // GET: api/Telefone

        /// <summary>
        /// Listar Telefones
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<Telefone>>> Get()
        {
            var telefones = await _repositorio.Listar();

            if(telefones == null) {
                return NotFound(new {
                    mensagem = "Nenhum Telefone foi encontrado!"
                });
            }

            return telefones;
        }
        
        // GET: api/Telefone/2

        /// <summary>
        /// Chamar Telefone pelo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Telefone>> Get(int id)
        {
            var Telefone = await _repositorio.BuscarPorID(id);

            if(Telefone == null) {
                return NotFound(new {
                    mensagem = "Nenhum Telefone foi encontrado!"
                });
            }
            return Telefone;
        }

        // POST: api/Telefone

        /// <summary>
        /// Cadastrar Telefone
        /// </summary>
        /// <param name="telefone"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Telefone>> Post(Telefone telefone)
        {
            try
            {
                await _repositorio.Salvar(telefone);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            
            return telefone;
        }

        // PUT

        /// <summary>
        /// Editar Telefone pelo ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="telefone"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put(int id, Telefone telefone)
        {
            if(id != telefone.IdTelefone){
                return BadRequest(new {
                    mensagem = "Nenhum Telefone foi encontrado!"
                });
            }

            try {
                await _repositorio.Alterar(telefone);
            }
            catch (DbUpdateConcurrencyException)
            {
                var telefone_valido = await _repositorio.BuscarPorID(id);

                if(telefone_valido == null){
                return NotFound(new {
                    mensagem = "Nenhum Telefone foi encontrado!"
                });
                }else{
                    throw;
                }
            }
            return NoContent();

        }

        // DELETE api/telefone/id

        /// <summary>
        /// Deletar Telefone
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<Telefone>> Delete(int id)
        {
            var telefone = await _repositorio.BuscarPorID(id);
            
            if(telefone == null) {
                return NotFound(new {
                    mensagem = "Nenhum Telefone foi encontrado!"
                });
            }

            await _repositorio.Excluir(telefone);

            return telefone;
        }
    }
}