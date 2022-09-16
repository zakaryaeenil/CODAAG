using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.DashInfoModel;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.DashInfo.Query.GetStructureInfo;

public class GetStructureInfoQuery : IRequest<StuctureInfoVm>
{
    public int? ItemId { get; set; }
}

public class GetStructureInfoQueryHandler : IRequestHandler<GetStructureInfoQuery, StuctureInfoVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   

    public GetStructureInfoQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StuctureInfoVm>  Handle(GetStructureInfoQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);

        if (request.ItemId != null)
        {
            Structure s = await _context.Structures
                .Include(p => p.Projects)
                .Include(a => a.ActionPs)
                .Include(c => c.ContratObjectifs)
                .FirstOrDefaultAsync(x => x.Id == request.ItemId, cancellationToken) ?? throw new InvalidOperationException();
            StuctureInfoModel stuctureInfoModel = new StuctureInfoModel
            {
                ActionCount = s.ActionPs.Count,
                ProjectCount = s.Projects.Count,
                ContratCount = s.ContratObjectifs.Count
            };
            return new StuctureInfoVm
            {
                _stuctureInfoModel  =  stuctureInfoModel
            };
            
        }
        
        Structure structure =  _context.Structures
                .Include(p =>p.ParentStructure)
                .Include(s => s.StructureChildren)
                .Include(p => p.Projects)
                .Include(a => a.ActionPs)
                .Include(c => c.ContratObjectifs)
                .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
            ICollection<Structure> listAll = new List<Structure>();
            listAll.Add(structure);

            ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
            int a = 0;
            var p = 0;
            var c = 0;
            StuctureInfoModel stuctureInfoModel2 = new StuctureInfoModel();
            foreach (var x in structures)
            {
                stuctureInfoModel2.ActionCount += x.ActionPs.Count;
                stuctureInfoModel2.ProjectCount += x.Projects.Count;
                stuctureInfoModel2.ContratCount += x.ContratObjectifs.Count ;
            }
            
            return new StuctureInfoVm
            {
                _stuctureInfoModel  =  stuctureInfoModel2
            };
        
        
    }
  
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(p => p.Projects)
            .Include(a => a.ActionPs)
            .Include(c => c.ContratObjectifs)
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