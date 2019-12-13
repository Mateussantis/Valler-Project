using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using backend.Repositories;


//para adicionar a árvore de objeto adicionamos uma nova biblioteca JSON
// dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

namespace Backend.Controllers
{

    //Definimos nossa roda do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        
        // VallerContext _repositorio = new VallerContext();
        EnderecoRepository _repositorio = new EnderecoRepository();

        // GET: api/Endereco
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get(){

            //Include("") = Adiciona efetivamente a árvore de objetos 
            var endereco = await _repositorio.Listar();

            if (endereco == null){
                return NotFound(new {
                    mensagem = "Nenhum Endereço foi encontrado!"
                });
            }

            return endereco;
        }

        // GET: api/Endereco/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> Get(int id){

            //  FindAsync = procura algo específico no banco 
            var endereco = await _repositorio.BuscarPorID(id);

            if (endereco == null){
                return NotFound(new {
                    mensagem = "Nenhum Endereço foi encontrado!"
                });
            }

            return endereco;
        }

        // POST api/Endereco
        [HttpPost]
        public async Task<ActionResult<Endereco>> Post(Endereco endereco){

            try{
                // Tratamos contra ataques de SQL Injection
                await _repositorio.Salvar(endereco);
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }
            
            
            return endereco;
        }

        [HttpPut("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put( int id, Endereco endereco){

            //Se o Id do objeto não existir 
            //ele retorna erro 400
            if(id != endereco.IdEndereco){   
                return BadRequest(new {
                    mensagem = "Nenhum Endereço foi encontrado!"
                });
            }

            try{
                await _repositorio.Alterar(endereco);
            }
            catch(DbUpdateConcurrencyException)
            {

                //Verificamos se o objeto inserido realmente existe no banco
                var endereco_valido = await _repositorio.BuscarPorID(id);

                if(endereco_valido == null){
                    return NotFound(new {
                    mensagem = "Nenhum Endereço foi encontrado!"
                });
                }else{
                    throw;
                }
            }

            // NoContent = retorna 204, sem nada
            return NoContent();

        }

    
        [HttpDelete("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<Endereco>> Delete(int id){

            var endereco = await _repositorio.BuscarPorID(id);
            if(endereco == null){
                return NotFound(new {
                    mensagem = "Nenhum Endereço foi encontrado!"
                });
            }

            await _repositorio.Excluir(endereco);

            return endereco;
        }
    }
}
