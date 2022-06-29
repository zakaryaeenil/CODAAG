using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.ContratObjectifs.Commands.CreateContratObjectif;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;

namespace CleanArchitecture.Application.Evaluations.Commands.CreateEvaluation;

public class CreateEvaluationCommand: IRequest<int>
{
    public DateTime startD { get; init; } 

    public DateTime endD { get; init; }
    
    public string? Title { get; init; }
    public string? Comment { get; init; }
    
    public int? statut { get; init; }
}

public class CreateEvaluationCommandHandler : IRequestHandler<CreateEvaluationCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateEvaluationCommand request, CancellationToken cancellationToken)
    {
        Statut statut = _context.Statuts
            .SingleOrDefault(x =>  x.Id == request.statut) ?? throw new InvalidOperationException();
       
        Evaluation entity;
            entity = new Evaluation()
            {
                Title = request.Title,
                Note = request.Comment,
                StartDate = request.startD,
                EndDate = request.endD,
                Statut = statut
            };
            _context.Evaluations.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
}