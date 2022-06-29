using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class ContratObjectifDto : IMapFrom<ContratObjectif>
{
    public int Id { get; set; }
    public string CodeCO { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; }
    
    public int? StatutId { get; set; }
    public StatutDto? Statut { get; set; } 

    public ICollection<ProjectDto> Projects { get; set; } = new List<ProjectDto>();
    public ICollection<StructureDto> Structures { get; set; } = new List<StructureDto>();


}