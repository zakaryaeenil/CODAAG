using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjectById;

public class GetTypeProjectByIdQuery: IRequest<TypeProjectByIdVm>
{
    public int ListId { get; set; }
}

public class GetTypeProjectByIdQueryHandler : IRequestHandler<GetTypeProjectByIdQuery, TypeProjectByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTypeProjectByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<TypeProjectByIdVm> Handle(GetTypeProjectByIdQuery request, CancellationToken cancellationToken)
    {
        return new TypeProjectByIdVm
        {
            TypeProjectDto    = await _context.TypeProjects 
                .Where(t => t.Id == request.ListId)
                //.ProjectTo<TypeProjectDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
}