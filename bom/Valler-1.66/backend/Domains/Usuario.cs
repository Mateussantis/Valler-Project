using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Endereco = new HashSet<Endereco>();
            Produto = new HashSet<Produto>();
            Reserva = new HashSet<Reserva>();
            Telefone = new HashSet<Telefone>();
        }

        [Key]
        [Column("id_usuario")]
        public int IdUsuario { get; set; }
        [Column("id_tipo_usuario")]
        public int? IdTipoUsuario { get; set; }
        [Required]
        [Column("nome_razao_social")]
        [StringLength(255)]
        public string NomeRazaoSocial { get; set; }
        [Required]
        [Column("email")]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [Column("senha")]
        [StringLength(255)]
        public string Senha { get; set; }
        [Required]
        [Column("documento")]
        [StringLength(255)]
        public string Documento { get; set; }

        [ForeignKey(nameof(IdTipoUsuario))]
        [InverseProperty(nameof(TipoUsuario.Usuario))]
        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Endereco> Endereco { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Produto> Produto { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Telefone> Telefone { get; set; }
    }
}
