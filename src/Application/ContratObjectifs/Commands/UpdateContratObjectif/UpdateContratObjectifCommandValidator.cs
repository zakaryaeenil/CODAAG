using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.UpdateContratObjectif;

public class UpdateContratObjectifCommandValidator: AbstractValidator<UpdateContratObjectifCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateContratObjectifCommandValidator(IApplicationDbContext context)
    {
        _context = context;
        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(50).WithMessage("Title must not exceed 50 characters.");
      
        RuleFor(m => m.StartD)
            .NotEmpty().WithMessage("Start Date is Required");
 
        RuleFor(m => m.EndD)
            .NotEmpty().WithMessage("End date is required")
            .GreaterThan(m => m.StartD)
            .WithMessage("End date must after Start date")
            .When(m => m.StartD != null);
        
        
    }

    
    
}