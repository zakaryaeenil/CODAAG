using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifById;

public class GetContratObjectifByIdQuery: IRequest<ContratObjectifByIdVm>
{
    public int ListId { get; set; }
}

public class GetContratObjectifByIdQueryHandler : IRequestHandler<GetContratObjectifByIdQuery, ContratObjectifByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetContratObjectifByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ContratObjectifByIdVm> Handle(GetContratObjectifByIdQuery request, CancellationToken cancellationToken)
    {
        return new ContratObjectifByIdVm
        {
          ContratObjectifDto    = await _context.ContratObjectifs 
                .Where(t => t.Id == request.ListId)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
}