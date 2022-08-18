using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPById;

public class GetActionPByIdQuery: IRequest<ActionPByIdVm>
{
    public int ListId { get; set; }
}

public class GetActionPByIdQueryHandler : IRequestHandler<GetActionPByIdQuery, ActionPByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetActionPByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ActionPByIdVm> Handle(GetActionPByIdQuery request, CancellationToken cancellationToken)
    {
        return new ActionPByIdVm
        {
            ActionPDto = await _context.ActionPs
                .Where(t => t.Id == request.ListId)
                .Include(s =>s.Statut)
                .Include(s => s.Structures)
                .Include(s => s.Evaluations)
                .ThenInclude(ea => ea.Evaluation)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
}