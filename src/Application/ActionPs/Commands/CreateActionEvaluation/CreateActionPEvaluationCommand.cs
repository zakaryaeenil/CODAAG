using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Commands.CreateActionEvaluation;

public class CreateActionPEvaluationCommand :  IRequest<Unit>
{
    public int Id { get; set; }
    public int evalId { get; set; }
    public int tauxR { get; set; }
}

public class CreateActionPEvaluationCommandHandler : IRequestHandler<CreateActionPEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateActionPEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateActionPEvaluationCommand request, CancellationToken cancellationToken)
    {
        ActionP act = await _context.ActionPs
            .Include(x => x.Evaluations)
            .SingleAsync(x => x.Id == request.Id, cancellationToken);
        Evaluation eval = await _context.Evaluations
            .Include(x => x.ActionPs)
            .SingleAsync(x => x.Id == request.evalId, cancellationToken);
        if (act == null ||  eval == null)
        {
            if (act == null)
            {
                throw new NotFoundException(nameof(ActionP), request.Id);
            }
            else if (eval == null)
            {
                throw new NotFoundException(nameof(Evaluation), request.evalId); 
            }
            
           
        }
        foreach (var act_eval in eval.ActionPs)
        {
            if (act_eval.EvaluationId == request.evalId && act_eval.ActionPId == request.Id)
            {
                act_eval.TauxR = request.tauxR;
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
        EvaluationActionP evaluationActionP = new EvaluationActionP();
        evaluationActionP.EvaluationId = eval.Id;
        evaluationActionP.Evaluation = eval;
        evaluationActionP.ActionPId = act.Id;
        evaluationActionP.ActionP = act; 
        evaluationActionP.TauxR = request.tauxR;
        act.Evaluations.Add(evaluationActionP);
        //eval.ActionPs.Add(evaluationActionP);
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}