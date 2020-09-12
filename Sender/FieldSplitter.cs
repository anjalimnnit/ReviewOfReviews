using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Sender.Logger;


namespace Sender
{
    class FieldSplitter
    {
        readonly List<CommentRecord> _commentRecords = new List<CommentRecord>();
        CommentRecord _currentRecord = new CommentRecord();

        public void SplitFields(List<string> rawCommentRecords)
        {

            foreach (string record in rawCommentRecords)
            {
                var fields = record.Split(new char[] { ',' });
                if (fields.Length == 2 && !fields[0].Equals(""))
                {
                    _commentRecords.Add(_currentRecord);
                }
                ValidateAndAddRecord(fields);
            }

            PersistToLogFile(_commentRecords);
        }

        public void ValidateAndAddRecord(string[] fields)
        {
            if (fields.Length == 2)
            {
                _currentRecord = new CommentRecord(new StringBuilder(fields[0]), new StringBuilder(fields[1]));
            }
            else if (fields.Length == 1)
            {
                _currentRecord.Comment = _currentRecord.Comment.Append(fields[0]);
            }
        }

    }
}