using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class GestionnaireDto : IMapFrom<Gestionnaire>
{
    public GestionnaireDto()
    {
        Structure = new StructureDto();
        
    }
    public int Id { get; set; }
    public string? Nom { get; set; }
    public string? Prenom { get; set; }
    public string Login { get; set; }
  //  public string Password { get; set; }
    public string Code { get; set; }

    public StructureDto? Structure { get; set; }
}