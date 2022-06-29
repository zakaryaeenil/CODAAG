using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Commands.CreateStructure;

public class CreateStructureCommandValidator : AbstractValidator<CreateStructureCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateStructureCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(50).WithMessage("Title must not exceed 50 characters.")
            .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
       
        RuleFor(m => m.startD)
            .NotEmpty().WithMessage("Start Date is Required");
 
        RuleFor(m => m.endD)
            .NotEmpty().WithMessage("End date is required")
            .GreaterThan(m => m.startD)
            .WithMessage("End date must after Start date")
            .When(m => m.startD != null);
    }

    public async Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
    {
        return await _context.Structures
            .AllAsync(l => l.Title != title, cancellationToken);
    }
    
    
}