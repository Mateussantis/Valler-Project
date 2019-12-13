using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using backend.Repositories;
using backend.ViewModelController;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers {

    
    public class UploadRepository : ControllerBase {

        string n = "a";

        // IActionResult

        [HttpPost, DisableRequestSizeLimit]
        public string Upload (IFormFile a) {

            try {
                
                var folderName = Path.Combine ("Images");
                var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);

                if (a.Length > 0) {
                    var fileName = ContentDispositionHeaderValue.Parse (a.ContentDisposition).FileName.Trim ('"');
                    var fullPath = Path.Combine (pathToSave, fileName);
                    var dbPath = Path.Combine (folderName, fileName);

                    using (var stream = new FileStream (fullPath, FileMode.Create)) {
                        a.CopyTo (stream);
                    }

                    // return Ok (new { fileName });
                    return fileName;

                } else {
                    // return BadRequest ();
                    return n;
                }
                
            } catch (Exception) {
                // return StatusCode (500, "Erro interno de Servidor: " + ex);
                return n;
            }
            
        }
    }
}