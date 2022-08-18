using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPswithEval;

public class ActionPsWithEvalVm
{
    public ICollection<ActionP> ActionPDtos { get; set; } = new List<ActionP>();
    public bool Is  { get; set; } = false;
    
    public ICollection<Evaluation> EvaluationDtos { get; set; } = new List<Evaluation>(); 
}