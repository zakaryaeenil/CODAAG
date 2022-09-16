using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;
using FluentValidation;

namespace CleanArchitecture.Application.Structures.Commands.CreateBulkStructure;

public class CreateBulkStructureCommandValidator : AbstractValidator<CreateBulkStructureCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkStructureCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}