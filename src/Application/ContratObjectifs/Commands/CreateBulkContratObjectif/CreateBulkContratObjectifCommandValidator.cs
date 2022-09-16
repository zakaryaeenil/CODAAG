using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.CreateBulkContratObjectif;

public class CreateBulkContratObjectifCommandValidator: AbstractValidator<CreateBulkContratObjectifCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkContratObjectifCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}