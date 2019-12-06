using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Security.Claims;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using backend.ViewModelController;

namespace BackEnd.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase {

        // Chamamos nosso contexto do banco
        VallerContext _context = new VallerContext();

        // Definimos uma variável para percorrer nossos métodos com as configurações obtidas no appsettings.json
        private IConfiguration _config;

        // Definimos um método construtor para poder passar essas configs
        public LoginController(IConfiguration config) {
            _config = config;
        }

        // Chamamos nosso método para validar nosso usuário da aplicação
        private Usuario AuthenticateUser(LoginModelControl login) {

            var usuario = _context.Usuario.Include( c => c.IdTipoUsuarioNavigation).FirstOrDefault(u => u.Email == login.Email && u.Senha == login.Senha);

            if (usuario == null) {
                return null;
            }

            return usuario;
        }

        RC2CryptoServiceProvider rc2CSP = new RC2CryptoServiceProvider();

        // Criamos nosso método que vai gerar nosso Token
        private string GenerateJSONWebToken(Usuario userInfo) {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var credentials = new SigningCredentials(securityKey , SecurityAlgorithms.HmacSha256Signature);
            // Definimos nossas Claims (dados da sessão) para poderem ser capturadas
            // a qualquer momento enquanto o Token for ativo
            var claims = new [] {
                new Claim(JwtRegisteredClaimNames.NameId, userInfo.NomeRazaoSocial),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                new Claim(ClaimTypes.Role, userInfo.IdTipoUsuarioNavigation.Tipo.ToString()),
                new Claim("Role", userInfo.IdTipoUsuarioNavigation.Tipo.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            // Configuramos nosso Token e seu tempo de vida
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires : DateTime.Now.AddMinutes(120),
                signingCredentials : credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Usamos essa anotação para ignorar a autenticação neste método, já que é ele quem fará isso
        [AllowAnonymous]  
        [HttpPost]
        public IActionResult Login([FromBody] LoginModelControl login) {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null) {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok (new { token = tokenString });
            }
            return response;
        }

    }
}