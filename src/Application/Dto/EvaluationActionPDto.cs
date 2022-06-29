using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class EvaluationActionPDto : IMapFrom<EvaluationActionP>
{

   
    public int EvaluationId { get; set; }
    public EvaluationDto Evaluation { get; set; } 

    public int ActionPId { get; set; }
    public ActionPDto ActionP { get; set; } 

    public int? TauxR { get; set; }
}