using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.ActionPs.Commands.CreateActionEvaluation;

public class CreateActionPEvaluationCommandValidator: AbstractValidator<CreateActionPEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateActionPEvaluationCommandValidator(IApplicationDbContext context)
    {
        _context = context;
        RuleFor(v => v.tauxR)
            .NotNull().WithMessage("Remplissez le taux de realisation.")
            .LessThanOrEqualTo(100).WithMessage("taux de realisationn ne doit pas depasser 100%");
        RuleFor(v => v.Id)
            .NotNull().WithMessage("Action must be indicated.");
        RuleFor(v => v.evalId)
            .NotNull().WithMessage("Evaluation must be indicated.");


    }
    
    
}