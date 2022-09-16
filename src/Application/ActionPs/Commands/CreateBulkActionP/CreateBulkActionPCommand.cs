using System.Data;
using CleanArchitecture.Application.Common.Interfaces;

using CleanArchitecture.Domain.Entities;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Commands.CreateBulkActionP;

public class CreateBulkActionPCommand : IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkActionPCommandHandler : IRequestHandler<CreateBulkActionPCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkActionPCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkActionPCommand request, CancellationToken cancellationToken)
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
                            var statId = Convert.ToInt32(dtStudentRecords.Rows[i][11]);
                            Statut s = await _context.Statuts.FirstOrDefaultAsync(x => x.Id == statId, cancellationToken) ?? throw new InvalidOperationException();
                            
                            var pId = Convert.ToInt32(dtStudentRecords.Rows[i][5]);
                            Project p = await _context.Projects.FirstOrDefaultAsync(x => x.Id == pId, cancellationToken) ?? throw new InvalidOperationException();
                            
                           
                            
                            ActionP objStudent = new ActionP();
                            objStudent.Title = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException();
                            objStudent.Note = Convert.ToString(dtStudentRecords.Rows[i][1]);
                            objStudent.TauxR = Convert.ToInt32(dtStudentRecords.Rows[i][2]);
                            objStudent.BudgR = Convert.ToInt32(dtStudentRecords.Rows[i][3]);
                            objStudent.BudgPrv = Convert.ToInt32(dtStudentRecords.Rows[i][4]);
                            objStudent.StartDate = Convert.ToDateTime(dtStudentRecords.Rows[i][7]);
                            objStudent.EndDate = Convert.ToDateTime(dtStudentRecords.Rows[i][8]);
                            objStudent.StartDatePrv = Convert.ToDateTime(dtStudentRecords.Rows[i][9]);
                            objStudent.EndDatePrv = Convert.ToDateTime(dtStudentRecords.Rows[i][10]);
                            objStudent.ProjectId = p.Id;
                            objStudent.Project = p;
                            objStudent.StatutId = s.Id;
                            objStudent.Statut = s;
                            //objStudent.Structures =collectionS; 
                            _context.ActionPs.Add(objStudent);
                            string[]? wordsS = Convert.ToString(dtStudentRecords.Rows[i][6])?.Split(';');
                            foreach (var w in wordsS)
                            {
                                //Console.WriteLine(w);
                                Structure structure = await _context.Structures
                                    .Include(i => i.ActionPs)
                                    .FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(w),cancellationToken) ?? throw new InvalidOperationException(); 
                                structure.ActionPs.Add(objStudent);
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