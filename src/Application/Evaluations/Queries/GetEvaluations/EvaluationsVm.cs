
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluations;

public class EvaluationsVm
{
    
    public ICollection<Evaluation> EvaluationDtos { get; set; } = new List<Evaluation>();
}