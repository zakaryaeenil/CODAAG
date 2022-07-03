using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Evaluations.Commands.UpdateEvaluation;

public class UpdateEvaluationCommand :  IRequest
{
    public int Id { get; set; }
    public DateTime startD { get; init; } 

    public DateTime endD { get; init; }
    
    public string? Title { get; init; }
    public string? Comment { get; init; }
    
    public int? statut { get; init; } 
}
public class UpdateEvaluationCommandHandler : IRequestHandler<UpdateEvaluationCommand>
{
    private readonly IApplicationDbContext _context;
                                     
    public UpdateEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
                                     
    public async Task<Unit> Handle(UpdateEvaluationCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Evaluations
            .FindAsync(new object[] { request.Id }, cancellationToken);
        Statut statut = _context.Statuts
            .SingleOrDefault(x =>  x.Id == request.statut) ?? throw new InvalidOperationException();

        if (entity == null)
        {
            throw new NotFoundException(nameof(Evaluation), request.Id);
        }
                                     
        entity.Title = request.Title;
        entity.StartDate = request.startD;
        entity.EndDate = request.endD;
        entity.Note = request.Comment;
        entity.Statut = statut;
        
        await _context.SaveChangesAsync(cancellationToken);
                                     
        return Unit.Value;
    }
}