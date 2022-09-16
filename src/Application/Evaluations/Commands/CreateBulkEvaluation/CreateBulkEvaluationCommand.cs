using System.Data;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;
using CleanArchitecture.Domain.Entities;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Evaluations.Commands.CreateBulkEvaluation;

public class CreateBulkEvaluationCommand : IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkEvaluationCommandHandler : IRequestHandler<CreateBulkEvaluationCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkEvaluationCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkEvaluationCommand request, CancellationToken cancellationToken)
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
                            var statId = Convert.ToInt32(dtStudentRecords.Rows[i][4]);
                            var s = await _context.Statuts.FirstOrDefaultAsync(x => x.Id == statId, cancellationToken);

                            Evaluation objStudent = new Evaluation
                            {
                                Title = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException(),
                                Note = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException(),
                                StartDate = Convert.ToDateTime(dtStudentRecords.Rows[i][2]),
                                EndDate = Convert.ToDateTime(dtStudentRecords.Rows[i][3]),
                                StatutId = s.Id,
                                Statut = s
                            };
                            _context.Evaluations.Add(objStudent);
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