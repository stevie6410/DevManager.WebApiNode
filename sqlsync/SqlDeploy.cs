using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace EdgeSampleLibrary
{
    public class SqlDeploy
    {
        public async Task<object> Invoke(object input)
        {
            // Edge marshalls data to .NET using an IDictionary<string, object>
            var payload = (IDictionary<string, object>)input;
            var pageNumber = (int)payload["pageNumber"];
            var pageSize = (int)payload["pageSize"];
            return await QueryUsers(pageNumber, pageSize);
        }

        public async Task<List<SampleUser>> QueryUsers(int pageNumber, int pageSize)
        {
            // Use the same connection string env variable
            var connectionString = Environment.GetEnvironmentVariable("EDGE_SQL_CONNECTION_STRING");
            if (connectionString == null)
                throw new ArgumentException("You must set the EDGE_SQL_CONNECTION_STRING environment variable.");

            // Paging the result set using a common table expression (CTE).
            // You may rather do this in a stored procedure or use an 
            // ORM that supports async.
            var sql = @"
                            DECLARE @RowStart int, @RowEnd int;
                            SET @RowStart = (@PageNumber - 1) * @PageSize + 1;
                            SET @RowEnd = @PageNumber * @PageSize;

                            WITH Paging AS
                            (
                                SELECT  ROW_NUMBER() OVER (ORDER BY CreateDate DESC) AS RowNum,
                                        Id, FirstName, LastName, Email, CreateDate
                                FROM    SampleUsers
                            )
                            SELECT  Id, FirstName, LastName, Email, CreateDate
                            FROM    Paging
                            WHERE   RowNum BETWEEN @RowStart AND @RowEnd
                            ORDER BY RowNum;
                            ";
            var users = new List<SampleUser>();

            using (var cnx = new SqlConnection(connectionString))
            {
                using (var cmd = new SqlCommand(sql, cnx))
                {
                    await cnx.OpenAsync();

                    cmd.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int) { Value = pageNumber });
                    cmd.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int) { Value = pageSize });

                    using (var reader = await cmd.ExecuteReaderAsync(CommandBehavior.CloseConnection))
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new SampleUser
                            {
                                Id = reader.GetInt32(0),
                                FirstName = reader.GetString(1),
                                LastName = reader.GetString(2),
                                Email = reader.GetString(3),
                                CreateDate = reader.GetDateTime(4)
                            };
                            users.Add(user);
                        }
                    }
                }
            }
            return users;
        }
    }

    public class SampleUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreateDate { get; set; }
    }
}