using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Queries.GetStatutById;

public class GetStatutByIdQuery: IRequest<StatutByIdVm>
{
    public int ListId { get; set; }
}

public class GetStatutByIdQueryHandler : IRequestHandler<GetStatutByIdQuery, StatutByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStatutByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<StatutByIdVm> Handle(GetStatutByIdQuery request, CancellationToken cancellationToken)
    {
        return new StatutByIdVm
        {
            StatutDto = await _context.Statuts 
                .Include(e =>e.Evaluations)
                .Include(co =>co.ContratObjectifs)
                .Where(t => t.Id == request.ListId)
               // .ProjectTo<StatutDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
}