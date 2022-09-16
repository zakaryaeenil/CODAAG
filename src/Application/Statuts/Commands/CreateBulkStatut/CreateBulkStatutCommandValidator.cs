using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;
using FluentValidation;

namespace CleanArchitecture.Application.Statuts.Commands.CreateBulkStatut;

public class CreateBulkStatutCommandValidator : AbstractValidator<CreateBulkStatutCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkStatutCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}