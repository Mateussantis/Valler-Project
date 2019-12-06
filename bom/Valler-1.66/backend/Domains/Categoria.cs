using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Categoria
    {
        public Categoria()
        {
            Produto = new HashSet<Produto>();
        }

        [Key]
        [Column("id_categoria")]
        public int IdCategoria { get; set; }
        [Required]
        [Column("categoria")]
        [StringLength(255)]
        public string Categoria1 { get; set; }

        [InverseProperty("IdCategoriaNavigation")]
        public virtual ICollection<Produto> Produto { get; set; }
    }
}
