using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace backend.Repositories
{
    public class CategoriaRepository : ICategoria
    {
        public async Task<Categoria> Alterar(Categoria categoria)
        {
            using(VallerContext _context = new VallerContext()){
                _context.Entry(categoria).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return categoria;
        }

        public async Task<Categoria> BuscarPorID(int id)
        {
            using(VallerContext _context = new VallerContext()){
                return await _context.Categoria.FindAsync(id);
            }
        }

        public async Task<Categoria> Excluir(Categoria categoria)
        {
            using(VallerContext _context = new VallerContext()){
                _context.Categoria.Remove(categoria);
                await _context.SaveChangesAsync();
                return categoria;                
            }
        }

        public async Task<List<Categoria>> Listar()
        {
            using(VallerContext _context = new VallerContext()){
                return await _context.Categoria.ToListAsync();
            }
        }

        public async Task<Categoria> Salvar(Categoria categoria)
        {
            using(VallerContext _context = new VallerContext()){
                await _context.AddAsync(categoria);
                await _context.SaveChangesAsync();
                return categoria;
            }
        }
    }
}
