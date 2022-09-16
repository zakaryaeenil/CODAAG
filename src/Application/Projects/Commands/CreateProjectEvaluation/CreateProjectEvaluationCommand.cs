using CleanArchitecture.Application.ActionPs.Commands.CreateActionEvaluation;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.CreateProjectEvaluation;

public class CreateProjectEvaluationCommand :  IRequest<bool>
{
    public int Id { get; set; }
    public int evalId { get; set; }
    public int tauxR { get; set; }
}

public class CreateProjectEvaluationCommandHandler : IRequestHandler<CreateProjectEvaluationCommand , bool>
{
    private readonly IApplicationDbContext _context;

    public CreateProjectEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(CreateProjectEvaluationCommand request, CancellationToken cancellationToken)
    {
        Project proj = await _context.Projects
            .Include(x => x.Evaluations)
            .SingleAsync(x => x.Id == request.Id, cancellationToken);
        Evaluation eval = await _context.Evaluations
            .Include(x => x.Projects)
            .SingleAsync(x => x.Id == request.evalId, cancellationToken);
        
            if (proj == null ||  eval == null)
            {
                if (proj == null)
                {
                    throw new NotFoundException(nameof(Project), request.Id);
                }
                else if (eval == null)
                {
                    throw new NotFoundException(nameof(Evaluation), request.evalId); 
                }
            
           
            }
            if (proj.TauxR < request.tauxR)
            {
                foreach (var proj_eval in eval.Projects)
                {
                    if (proj_eval.EvaluationId == request.evalId && proj_eval.ProjectId == request.Id)
                    {
                        proj_eval.TauxR = request.tauxR;
                        proj.TauxR = request.tauxR;
                        await _context.SaveChangesAsync(cancellationToken);
                        return true;
                    }
                }
                EvaluationProject evaluationProject= new EvaluationProject();
                evaluationProject.EvaluationId = eval.Id;
                evaluationProject.Evaluation = eval;
                evaluationProject.ProjectId = proj.Id;
                evaluationProject.Project = proj; 
                evaluationProject.TauxR = request.tauxR;
                proj.Evaluations.Add(evaluationProject);
                proj.TauxR = request.tauxR;
        
                await _context.SaveChangesAsync(cancellationToken);
                return true; 
            }
            else
            {
                return false;
            }
        
        
    }
}