using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Sender.FieldSplitter;

namespace Sender
{
    public class CsvReader
    {
        readonly List<string> _rawCommentRecords = new List<string>();
        private List<string> ReadCsvFile()
        {
            StreamReader reader = new StreamReader(@".\review-report.csv");
            while (reader.EndOfStream != true)
            {
                string rawCommentRecord = reader.ReadLine();
                _rawCommentRecords.Add(rawCommentRecord);
            }
            reader.Close();

            return _rawCommentRecords;
        }

        public static void Main()
        {
            CsvReader reader = new CsvReader();
            List<string> rawCommentRecords = reader.ReadCsvFile();

            FieldSplitter splitter = new FieldSplitter();
            splitter.SplitFields(rawCommentRecords);
        }


    }
}
