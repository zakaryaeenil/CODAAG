using CleanArchitecture.Application.Common.Interfaces;

using FluentValidation;

namespace CleanArchitecture.Application.Evaluations.Commands.CreateBulkEvaluation;

public class CreateBulkEvaluationCommandValidator : AbstractValidator<CreateBulkEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkEvaluationCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}