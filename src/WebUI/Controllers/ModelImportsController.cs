using CleanArchitecture.Application.ActionPs.Commands.CreateActionP;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.WebUI.Controllers;

public class ModelImportsController : ApiControllerBase
{
    [HttpPost]
    public async Task<bool> Create(IFormFile file)
    {
        string path = "";
        try
        {
            if (file.Length > 0)
            {
                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "UploadedFiles"));
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    ModelImport modelImport = new ModelImport
                    {
                      name = file.FileName,
                      
                      
                    };
                }
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            throw new Exception("File Copy Failed", ex);
        }
        // return await Mediator.Send(command);
    }
}