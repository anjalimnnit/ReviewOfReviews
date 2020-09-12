using System;
using System.Collections.Generic;
using System.Text;


namespace Receiver
{
    class ConsoleReader
    {
        public List<string> ReadFromConsole()
        {
            List<string> _rawCommentRecords = new List<string>();
            
            while (true)
            {   
                string rawCommentRecord = Convert.ToString(Console.In.ReadLine());
                if (rawCommentRecord == "$")
                {
                    break;
                }
                _rawCommentRecords.Add(rawCommentRecord);
            }
            return _rawCommentRecords;
        }
         

    }
}