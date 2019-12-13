using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UsuarioRepository : IUsuario
    {

        public async Task<Usuario> Alterar(Usuario usuario)
        {
            using(VallerContext _context = new VallerContext()){
                _context.Entry(usuario).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return usuario;
        }

        public async Task<Usuario> BuscarPorID(int id)
        {
            using(VallerContext _context = new VallerContext()){
                return await _context.Usuario.Include(t => t.IdTipoUsuarioNavigation).FirstOrDefaultAsync(c => c.IdUsuario == id);
            }
        }

        public async Task<Usuario> Excluir(Usuario usuario)
        {
            using(VallerContext _context = new VallerContext()){
                _context.Usuario.Remove(usuario);
                await _context.SaveChangesAsync();
                return usuario;                
            }
        }

        public async Task<List<Usuario>> Listar()
        {
            using(VallerContext _context = new VallerContext()){
                
                
                return await _context.Usuario.Include(t => t.IdTipoUsuarioNavigation).ToListAsync();

                // return usuarios;
            }
        }

        public async Task<Usuario> Salvar(Usuario usuario)
        {
            using(VallerContext _context = new VallerContext()){
                await _context.AddAsync(usuario);
                await _context.SaveChangesAsync();
                return usuario;
            }
        }
        
    }
}