using System;
using System.Collections.Generic;
using System.IO;

namespace Sender
{
    class Logger
    {
        public static void PersistToLogFile(List<CommentRecord> commentRecords)
        {
            StreamWriter writer = new StreamWriter("C:\\Users\\Anji\\Source\\Repos\\review-case-s22b4\\LogFile.txt");
            foreach (CommentRecord record in commentRecords)
            {
                writer.WriteLine(record.Timestamp + "     " + record.Comment + "\n");
                Console.Out.WriteLine(record.Timestamp + "     " + record.Comment + "\n");
            }
            Console.Out.WriteLine("$");
            writer.Close();
        }
    }
}