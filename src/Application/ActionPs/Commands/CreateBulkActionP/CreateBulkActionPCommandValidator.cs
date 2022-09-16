using CleanArchitecture.Application.Common.Interfaces;

using FluentValidation;

namespace CleanArchitecture.Application.ActionPs.Commands.CreateBulkActionP;

public class CreateBulkActionPCommandValidator : AbstractValidator<CreateBulkActionPCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkActionPCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}