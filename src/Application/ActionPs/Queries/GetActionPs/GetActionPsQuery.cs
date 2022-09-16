using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPs;

public class GetActionPsQuery: IRequest<ActionPsVm>
{
}

public class GetActionPsQueryHandler : IRequestHandler<GetActionPsQuery, ActionPsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetActionPsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    
    }

    public async Task<ActionPsVm> Handle(GetActionPsQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);
        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(p => p.ActionPs)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);

        ICollection<ActionP> actionPs = new List<ActionP>();

        foreach (var st in structures)
        {
            foreach (var p in st.ActionPs)
            {
                actionPs.Add(p);
            }
        }
        return new ActionPsVm()
        {
            ActionPDtos = actionPs
        };
    }
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(pp => pp.ActionPs)
            .ThenInclude(s =>s.Statut)
            .Include(pp => pp.ActionPs)
            .ThenInclude(p => p.Project)
            .Include(pp => pp.ActionPs)
            .ThenInclude(st => st.Structures)
            .Include(pp => pp.ActionPs)
            .ThenInclude(st => st.Evaluations)
            .ThenInclude(s => s.Evaluation)
            .SingleOrDefault(x => x.Id == k.Id);
        if (t == null)
        {
            return list;
        }
        foreach (Structure child in t.StructureChildren)
        {
            list.Add(child);
            GetChildren<Structure>(child,list);
        }
        return list;
    }

}