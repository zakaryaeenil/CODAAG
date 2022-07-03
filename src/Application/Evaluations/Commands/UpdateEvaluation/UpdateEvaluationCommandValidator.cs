using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Evaluations.Commands.CreateEvaluation;
using FluentValidation;

namespace CleanArchitecture.Application.Evaluations.Commands.UpdateEvaluation;

public class UpdateEvaluationCommandValidator: AbstractValidator<UpdateEvaluationCommand>
{
    private readonly IApplicationDbContext _context;
                                             
    public UpdateEvaluationCommandValidator(IApplicationDbContext context)
    {
        _context = context;
                                             
        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(50).WithMessage("Title must not exceed 50 characters.");
        RuleFor(m => m.startD)
            .NotEmpty().WithMessage("Start Date is Required");
                                              
        RuleFor(m => m.endD)
            .NotEmpty().WithMessage("End date is required")
            .GreaterThan(m => m.startD)
            .WithMessage("End date must after Start date")
            .When(m => m.startD != null);
                                                    
        RuleFor(m => m.statut)
            .NotNull().WithMessage("Statut is Required");
                                                     
    }
                                                 
                                                 
}