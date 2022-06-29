using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class EvaluationProjectDto : IMapFrom<EvaluationProject>
{
 
    public int EvaluationId { get; set; }
    public EvaluationDto Evaluation { get; set; } = new EvaluationDto();

    public int ProjectId { get; set; }
    public ProjectDto Project { get; set; } = new ProjectDto();

    public int? TauxR { get; set; }
}