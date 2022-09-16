using AutoMapper;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class StructureDto : IMapFrom<Structure>
{
  
    public int Id { get; set; }
    public string CodeStructure { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public StructureDto? ParentStructure { get; set; }
    public ICollection<StructureDto> StructureChildren { get; set; } = new List<StructureDto>();
    public ICollection<ProjectDto> Projects { get; set; } = new List<ProjectDto>();
    public ICollection<ContratObjectifDto> ContratObjectifs { get; set; } = new List<ContratObjectifDto>();
    public ICollection<ActionPDto> ActionPs { get; set; } = new List<ActionPDto>();
    
   
}