using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Produto
    {
        public Produto()
        {
            Oferta = new HashSet<Oferta>();
        }

        [Key]
        [Column("id_produto")]
        public int IdProduto { get; set; }
        [Column("id_categoria")]
        public int? IdCategoria { get; set; }
        [Column("id_usuario")]
        public int? IdUsuario { get; set; }
        [Required]
        [Column("nome_produto")]
        [StringLength(50)]
        public string NomeProduto { get; set; }
        [Column("descricao")]
        [StringLength(255)]
        public string Descricao { get; set; }

        [ForeignKey(nameof(IdCategoria))]
        [InverseProperty(nameof(Categoria.Produto))]
        public virtual Categoria IdCategoriaNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Produto))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
        [InverseProperty("IdProdutoNavigation")]
        public virtual ICollection<Oferta> Oferta { get; set; }
    }
}
