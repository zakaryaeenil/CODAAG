using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.Projects.Commands.UpdateProject;

public class UpdateProjectCommandValidator: AbstractValidator<UpdateProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProjectCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(50).WithMessage("Title must not exceed 50 characters.");
      
        RuleFor(m => m.StartDate)
            .NotEmpty().WithMessage("Start Date is Required");
 
        RuleFor(m => m.EndDate)
            .NotEmpty().WithMessage("End date is required")
            .GreaterThan(m => m.StartDate)
            .WithMessage("End date must after Start date")
            .When(m => m.StartDate != null);
        
        RuleFor(m => m.StartDatePrv)
            .NotEmpty().WithMessage("Start Date Preview is Required");
 
        RuleFor(m => m.EndDatePrv)
            .NotEmpty().WithMessage("End date Preview is required")
            .GreaterThan(m => m.StartDatePrv)
            .WithMessage("End date Preview must after Start date Preview")
            .When(m => m.StartDatePrv != null);


        RuleFor(v => v.TypeProjectId)
            .NotNull().WithMessage("cannot Create Project without Type.");
       
        RuleFor(v => v.Statut)
            .NotNull().WithMessage("cannot Create Project without statut.");
        RuleFor(v => v.TypeProjectId)
            .NotNull().WithMessage("cannot Create Project without statut.");
    }
    
    
}