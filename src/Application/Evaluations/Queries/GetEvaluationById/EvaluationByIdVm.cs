using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluationById;

public class EvaluationByIdVm
{
    public Evaluation EvaluationDto { get; set; }
}