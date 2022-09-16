using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.DashModels;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.DashInfo.Query.GetStatPerStatut;

public class GetStatPerStatutQuery : IRequest<GetStatPerStatutVm>
{
    public int? StructureId { get; set; }
    public int? ConId { get; set; }
}

public class GetStatPerStatutQueryHandler : IRequestHandler<GetStatPerStatutQuery, GetStatPerStatutVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   

    public GetStatPerStatutQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetStatPerStatutVm>  Handle(GetStatPerStatutQuery request, CancellationToken cancellationToken)
    {
        var statuts = _context.Statuts
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.ContratObjectifs)
            .ToListAsync(cancellationToken);
        ICollection<PerStatutModel> perStatutModels = new List<PerStatutModel>();
           foreach (var statut in statuts.Result)
           {
               PerStatutModel newStatut = new PerStatutModel();
               newStatut.statutName = statut.Title;
               if (request.StructureId != null)
               {
                   Structure structure = _context.Structures
                       .Include(s =>s.Projects)
                       .ThenInclude(pp => pp.ContratObjectifs)
                       .Include(s =>s.ContratObjectifs)
                       .Single(x => x.Id == request.StructureId);
                   if (request.ConId == null)
                   {
                       foreach (var sp in structure.Projects)
                       {
                           if (sp.StatutId == statut.Id)
                           {
                               newStatut.taux ++;
                           }
                       }
                   }
                   else if (request.ConId != null)
                   {
                       ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId); 
                       foreach (var sp in structure.Projects)
                       {
                           if (sp.StatutId == statut.Id && sp.ContratObjectifs.Contains(objectif))
                           {
                               newStatut.taux ++;
                           }
              
                       }   
                   }
                   perStatutModels.Add(newStatut);
               }
               else  if (request.StructureId == null)
               {
                   Gestionnaire user = _context.Gestionnaires
                       .Single(x => x.Id == 2);

                   Structure structure =  _context.Structures
                       .Include(p =>p.ParentStructure)
                       .Include(s => s.StructureChildren)
                       .Include(p => p.Projects)
                       .ThenInclude(pp => pp.ContratObjectifs)
                       .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
                   ICollection<Structure> listAll = new List<Structure>();
                   listAll.Add(structure);
                   ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
               
                   if (request.ConId == null)
                   {
                       foreach (var ss in structures)
                       {
                           foreach (var sss in ss.Projects)
                           {
                               if (sss.StatutId == statut.Id)
                               {
                                   newStatut.taux ++; 
                               }
                           }
                       }
                  
                   }
                   else  if (request.ConId != null)
                   {
                       ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId); 
                       foreach (var ss in structures)
                       {
                           foreach (var sss in ss.Projects)
                           {
                               if (sss.StatutId == statut.Id && sss.ContratObjectifs.Contains(objectif))
                               {
                                   newStatut.taux ++; 
                               }
                           }
                       }
                   }
                   perStatutModels.Add(newStatut); 
               }
           }
           return new GetStatPerStatutVm()
           {
              PerStructureModels = perStatutModels
           };
    }
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.ContratObjectifs)
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