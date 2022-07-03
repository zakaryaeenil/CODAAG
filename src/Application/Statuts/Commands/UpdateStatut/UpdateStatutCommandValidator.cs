using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Commands.UpdateStatut;

public class UpdateStatutCommandValidator: AbstractValidator<UpdateStatutCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateStatutCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(50).WithMessage("Title must not exceed 50 characters.")
            .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
        RuleFor(v => v.Color)
            .NotNull().WithMessage("Color is required.");
    }

    public async Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
    {
        return await _context.Structures
            .AllAsync(l => l.Title != title, cancellationToken);
    }
    
    
}