using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.DashInfo.Query.GetStatPerTp;
using CleanArchitecture.Application.Dto.Helpers.DashModels;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.DashInfo.Query.GetStatPerTri;

public class GetStatPerTriQuery : IRequest<GetStatPerTriVm>
{
    public int? StructureId { get; set; }
    public int? ConId { get; set; }
}

public class GetStatPerTriQueryHandler : IRequestHandler<GetStatPerTriQuery, GetStatPerTriVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   

    public GetStatPerTriQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetStatPerTriVm>  Handle(GetStatPerTriQuery request, CancellationToken cancellationToken)
    {
          int start = 0;
          List<string> trimestres = new List<string>
          {
              "T1",
              "T2",
              "T3",
              "T4"
          };
          ICollection<PerTrimestreModel> perTrimestreModels = new List<PerTrimestreModel>();
          foreach (var tr in trimestres)
          {
          
              PerTrimestreModel perTrimestre = new PerTrimestreModel();
              perTrimestre.trimestreName = tr;
              if (request.StructureId == null)
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
                      foreach (var s in structures)
                      {
                          foreach (var sp in s.Projects)
                          {
                              if (sp.Created.Month > start && sp.Created.Month <= start + 3 )
                              {
                                  perTrimestre.taux++;
                              }
                          }   
                      }
                  }
                  else if (request.ConId != null)
                  {
                      ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId);
                      foreach (var s in structures)
                      {
                          foreach (var sp in s.Projects)
                          {
                              if (sp.Created.Month > start && sp.Created.Month <= start + 3  && sp.ContratObjectifs.Contains(objectif))
                              {
                                  perTrimestre.taux++;
                              }
                          }   
                      } 
                  }
                  perTrimestreModels.Add(perTrimestre);
              }
              else if (request.StructureId != null)
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
                          if (sp.Created.Month > start && sp.Created.Month <= start + 3 )
                          {
                              perTrimestre.taux++;
                          }
                      }   
                   
                  }
                  else if (request.ConId != null)
                  {
                      ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId);
                  
                      foreach (var sp in structure.Projects)
                      {
                          if (sp.Created.Month > start && sp.Created.Month <= start + 3  && sp.ContratObjectifs.Contains(objectif))
                          {
                              perTrimestre.taux++;
                          }
                      }   
                   
                  }
                  perTrimestreModels.Add(perTrimestre);
              }
              start = start + 3;

          }
          return new GetStatPerTriVm()
          {
              PerTrimestreModels = perTrimestreModels
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