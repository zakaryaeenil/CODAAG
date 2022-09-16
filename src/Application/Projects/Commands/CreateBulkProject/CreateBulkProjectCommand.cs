using System.Data;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.CreateBulkProject;

public class CreateBulkProjectCommand : IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkProjectCommandHandler : IRequestHandler<CreateBulkProjectCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkProjectCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkProjectCommand request, CancellationToken cancellationToken)
    {
        #region Variable Declaration
            string message = "";
            DataSet dsexcelRecords = new DataSet();
            IExcelDataReader reader = null;
            Stream FileStream = null;
            #endregion

            #region Save Student Detail From Excel


            if (request.File.Length > 0)
            {
                FileStream = request.File.OpenReadStream();

                if (request.File != null && FileStream != null)
                {
                    if (request.File.FileName.EndsWith(".xls"))
                        reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
                    else if (request.File.FileName.EndsWith(".xlsx"))
                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                    else
                        message = "The file format is not supported.";

                    dsexcelRecords = reader.AsDataSet();
                    reader.Close();

                    if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                    {
                        DataTable dtStudentRecords = dsexcelRecords.Tables[0];
                        for (int i = 5; i < dtStudentRecords.Rows.Count; i++)
                        {
                            Console.WriteLine("Statut");
                            var statId = Convert.ToInt32(dtStudentRecords.Rows[i][12]);
                            var s = await _context.Statuts.FirstOrDefaultAsync(x => x.Id == statId, cancellationToken);
                            Console.WriteLine("tp"); 
                            var tpId = Convert.ToInt32(dtStudentRecords.Rows[i][4]);
                            var tp = await _context.TypeProjects.FirstOrDefaultAsync(x => x.Id == tpId, cancellationToken);
                            ICollection<ContratObjectif> collectionCo = new List<ContratObjectif>();
                            ICollection<Structure> collectionS = new List<Structure>();
                           
                            Console.WriteLine("Proj");
                            Project objStudent = new Project();
                            objStudent.Title = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException();
                            objStudent.Note = Convert.ToString(dtStudentRecords.Rows[i][1]);
                            objStudent.IsInitial = true;
                            objStudent.TauxR = 0;
                            objStudent.ModeReel = Convert.ToString(dtStudentRecords.Rows[i][5]);
                            objStudent.StartDate = Convert.ToDateTime(dtStudentRecords.Rows[i][7]);
                            objStudent.EndDate = Convert.ToDateTime(dtStudentRecords.Rows[i][8]);
                            objStudent.StartDatePrv = Convert.ToDateTime(dtStudentRecords.Rows[i][9]);
                            objStudent.EndDatePrv = Convert.ToDateTime(dtStudentRecords.Rows[i][10]);
                            objStudent.TypeProjectId = tp.Id;
                            objStudent.TypeProject = tp;
                            objStudent.StatutId = s.Id;
                            objStudent.Statut = s;
                            objStudent.CodeProject = Convert.ToString(dtStudentRecords.Rows[i][0]) + "-" + Convert.ToDateTime(dtStudentRecords.Rows[i][7]).Year;
                            _context.Projects.Add(objStudent);
                            Console.WriteLine("Co");
                            string[]? words = Convert.ToString(dtStudentRecords.Rows[i][11])?.Split(';');
                            foreach (var w in words)
                            {
                                //Console.WriteLine(w);
                                ContratObjectif contratObjectif = await _context.ContratObjectifs
                                    .Include(i => i.Projects)
                                    .FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(w),cancellationToken) ?? throw new InvalidOperationException(); 
                                contratObjectif.Projects.Add(objStudent);
                            }
                            
                            Console.WriteLine("S");
                            string[]? wordsS = Convert.ToString(dtStudentRecords.Rows[i][6])?.Split(';');
                            foreach (var ws in wordsS)
                            {
                                //Console.WriteLine(w);
                                Structure structure = await _context.Structures
                                    .Include(i => i.Projects)
                                    .FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(ws),cancellationToken) ?? throw new InvalidOperationException(); 
                                structure.Projects.Add(objStudent);
                            }
                        }

                        int output = await _context.SaveChangesAsync(cancellationToken);
                        if (output > 0)
                            message = "The Excel file has been successfully uploaded.";
                        else
                            message = "Something Went Wrong!, The Excel file uploaded has faild.";
                    }
                    else
                        message = "Selected file is empty.";
                }
                else
                    message = "Invalid File.";
            }
            else
                message = "Bad Request";
            return message;
            #endregion
        }
    
}