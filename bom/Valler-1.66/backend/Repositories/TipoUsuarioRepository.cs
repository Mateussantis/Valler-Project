using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuario
    {
        public async Task<TipoUsuario> Alterar(TipoUsuario TipoUsuario)
        {
            using(VallerContext _context = new VallerContext()){
                _context.Entry(TipoUsuario).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return TipoUsuario;
        }

        public async Task<TipoUsuario> BuscarPorID(int id)
        {
            using(VallerContext _context = new VallerContext()){
                return await _context.TipoUsuario.FindAsync(id);
            }
        }

        public async Task<TipoUsuario> Excluir(TipoUsuario tipoUsuario)
        {
            using(VallerContext _context = new VallerContext()){
                _context.TipoUsuario.Remove(tipoUsuario);
                await _context.SaveChangesAsync();
                return tipoUsuario;
            }
        }

        public async Task<List<TipoUsuario>> Listar()
        {
            using(VallerContext _context = new VallerContext()) {
                return await _context.TipoUsuario.ToListAsync();
            }
        }

        public async Task<TipoUsuario> Salvar(TipoUsuario tipoUsuario)
        {
            using(VallerContext _context = new VallerContext()){
                await _context.AddAsync(tipoUsuario);
                await _context.SaveChangesAsync();
                return tipoUsuario;
            }
        }
    }
}