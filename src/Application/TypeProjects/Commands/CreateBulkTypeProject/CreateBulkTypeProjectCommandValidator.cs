using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;

public class CreateBulkTypeProjectCommandValidator : AbstractValidator<CreateBulkTypeProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkTypeProjectCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.File)
            .NotEmpty().WithMessage("File Type Project is required.")
            .NotNull().WithMessage("File Type Project must be not null.");
    }
}