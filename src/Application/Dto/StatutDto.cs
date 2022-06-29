using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class StatutDto : IMapFrom<Statut>
{

    public int Id { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }

    public ICollection<ContratObjectifDto> ContratObjectifs { get; set; } = new List<ContratObjectifDto>();
    public ICollection<ActionPDto> ActionPs { get; set; } = new List<ActionPDto>();
    public ICollection<ProjectDto> Projects { get; set; } = new List<ProjectDto>();
    public ICollection<EvaluationDto> Evaluations { get; set; } = new List<EvaluationDto>();

}