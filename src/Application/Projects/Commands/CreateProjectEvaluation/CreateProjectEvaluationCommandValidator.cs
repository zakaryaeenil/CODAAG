using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.CreateProjectEvaluation;

public class CreateProjectEvaluationCommandValidator: AbstractValidator<CreateProjectEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateProjectEvaluationCommandValidator(IApplicationDbContext context)
    {
        _context = context;
        RuleFor(v => v.tauxR)
            .NotNull().WithMessage("Remplissez le taux de realisation.")
            .LessThanOrEqualTo(100).WithMessage("taux de realisationn ne doit pas depasser 100%");

        RuleFor(v => v.Id)
            .NotNull().WithMessage("Project must be indicated.");
        RuleFor(v => v.evalId)
            .NotNull().WithMessage("Evaluation must be indicated.")
            .NotEmpty().WithMessage("Evaluation must be indicated.");


    }
    
}