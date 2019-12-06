using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //  definimos nossa rota do controller e dizemos que e um controller de api
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class ReservaController : ControllerBase
    {

       ReservaRepository _repositorio = new ReservaRepository();

       // GET:  api/Reserva
       [HttpGet]
       public async Task<ActionResult<List<Reserva>>> Get()
       {
            var Reservas = await _repositorio.Listar();

            if (Reservas == null){
                return NotFound(new {
                    mensagem = "Nenhuma Reserva foi encontrada!"
                });
            }

            return Reservas;
       }
         // GET:  api/Reserva/2
       [HttpGet("{id}")]
       public async Task<ActionResult<Reserva>> Get(int id)
       {

            //findfasync = procurar algo especifico     
            var Reserva = await _repositorio.BuscarPorID(id);

            if (Reserva == null){
                return NotFound(new {
                    mensagem = "Nenhuma Reserva foi encontrada!"
                });
            }

            return Reserva;
       }
        // post api/Reserva
        
        [HttpPost]
        public async Task<ActionResult<Reserva>> post (Reserva Reserva){

            try{
                // tratamos contra ataques de sql injection 
                await _repositorio.Salvar(Reserva);
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }

         return Reserva;
        }

        
        [HttpPut("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put(int id, Reserva Reserva){
            // se o id do objeto nao existir 
            // ele retorna
            
            if(id != Reserva.IdReserva){
                return BadRequest(new {
                    mensagem = "Nenhuma Reserva foi encontrada!"
                });
            }

            try{
                await _repositorio.Alterar(Reserva);   
            }
            catch(DbUpdateConcurrencyException)
            {

                // verificamos se o objeto inserido realmente existe no banco
                var Reserva_valido = await _repositorio.BuscarPorID(id);

                if(Reserva_valido == null){
                    return NotFound(new {
                    mensagem = "Nenhuma Reserva foi encontrada!"
                });
                }else{
                    throw;
                }
                 
            }
            // nocontent = retornar 204 ,sem nada
             return NoContent();
                
                
        }

        //  
        [HttpDelete("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult<Reserva>> Delete(int id){
             var Reserva = await _repositorio.BuscarPorID(id);

             if(Reserva == null){
                return NotFound(new {
                    mensagem = "Nenhuma Reserva foi encontrada!"
                });

        }
        await _repositorio.Excluir(Reserva);

        return Reserva;

        }
    }
}