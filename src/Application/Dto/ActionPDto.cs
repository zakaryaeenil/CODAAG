using CleanArchitecture.Application.Common.Mappings;

using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class ActionPDto : IMapFrom<ActionP>
{
    
    #region Attributes

    public int Id { get; set; }

    public string Title { get; set; }
    public string? Note { get; set; }
    public int? TauxR { get; set; }
    public float? BudgR { get; set; }
    public DateTime? StartDatePrv { get; set; }
    public DateTime? EndDatePrv { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public float? BudgPrv { get; set; }

    public int? StatutId { get; set; }
    public StatutDto? Statut { get; set; }
    
    public int? ProjectId { get; set; }
    public ProjectDto? Project { get; set; }

    public ICollection<StructureDto> Structures { get; set; } = new List<StructureDto>();

    public ICollection<EvaluationActionPDto> Evaluations { get; set; } = new List<EvaluationActionPDto>();


    #endregion
}