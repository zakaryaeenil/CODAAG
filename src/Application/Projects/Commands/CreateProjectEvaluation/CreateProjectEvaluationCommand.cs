using CleanArchitecture.Application.ActionPs.Commands.CreateActionEvaluation;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.CreateProjectEvaluation;

public class CreateProjectEvaluationCommand:  IRequest<Unit>
{
    public int Id { get; set; }
    public int evalId { get; set; }
    public int tauxR { get; set; }
}

public class CreateActionPEvaluationCommandHandler : IRequestHandler<CreateProjectEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateActionPEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateProjectEvaluationCommand request, CancellationToken cancellationToken)
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
        foreach (var proj_eval in eval.Projects)
        {
            if (proj_eval.EvaluationId == request.evalId && proj_eval.ProjectId == request.Id)
            {
                proj_eval.TauxR = request.tauxR;
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
        EvaluationProject evaluationProject = new EvaluationProject();
        evaluationProject.EvaluationId = eval.Id;
        evaluationProject.Evaluation = eval;
        evaluationProject.ProjectId= proj.Id;
        evaluationProject.Project = proj; 
        evaluationProject.TauxR = request.tauxR;
        proj.Evaluations.Add(evaluationProject);
        //eval.ActionPs.Add(evaluationActionP);
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}