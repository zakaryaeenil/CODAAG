using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TypeProjects.Commands.UpdateTypeProject;

public class UpdateTypeProjectCommandValidator : AbstractValidator<UpdateTypeProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateTypeProjectCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title Type Project is required.")
            .NotNull().WithMessage("Title Type Project must be not null.")
            .MaximumLength(100).WithMessage("Title Type Project must not exceed 50 characters.")
            .MustAsync(BeUniqueTitle).WithMessage("The specified title Type Project already exists.");


        RuleFor(v => v.CodeTP)
            .NotEmpty().WithMessage("code Type Project is required.")
            .MaximumLength(50).WithMessage("code Type Project must not exceed 50 characters.");

    }
    public async Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
    {
        return await _context.Structures
            .AllAsync(l => l.Title != title, cancellationToken);
    }
}