using CleanArchitecture.Application.ActionPs.Commands.CreateBulkActionP;
using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.Projects.Commands.CreateBulkProject;

public class CreateBulkProjectCommandValidator : AbstractValidator<CreateBulkProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkProjectCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}