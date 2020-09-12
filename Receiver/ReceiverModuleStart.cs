using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
namespace Receiver
{
    class ReceiverModuleStart
    {

      
        static void Main(string[] args)
        {
            
            ConsoleReader consoleReader = new ConsoleReader();
            List<string> comments = consoleReader.ReadFromConsole();


            FieldSplitter fieldSplitter = new FieldSplitter();
            List<CommentRecord> c=fieldSplitter.SplitFields(comments);

           /*
            foreach (CommentRecord record in c)
            {
         
                Console.WriteLine("Date" + record.Date + " " + "Time" + record.Time + "     " + "Comment" + record.Comment + "\n");
            }
           */
            WordCount wordCount = new WordCount();
            Dictionary<string, int> dictionary= wordCount.CountWordsInTheList(c);
            WordCountToCsvAdder wc = new WordCountToCsvAdder();
            foreach (KeyValuePair<string, int> kv in dictionary)
                Console.WriteLine(kv.Key + " " + kv.Value);
            wc.AddCommentCountInACsvFile(dictionary, "CommentRecord.csv");
           
           /* WordCountToCsvAdder wc = new WordCountToCsvAdder();
            Dictionary<string, int> wordCount1 = new Dictionary<string, int> { ["Comments"] = 1, ["Additional"] = 2, ["No"] = 3, ["Fault"] = 1 };
            wc.AddCommentCountInACsvFile(wordCount1, "CommentsCountTest.csv");
            Dictionary<string, int> word = wc.AddToDic("CommentsCountTest.csv");

            foreach (KeyValuePair<string, int> kv in word)
                Console.WriteLine(kv.Key + " "+ kv.Value);
            foreach (KeyValuePair<string, int> kv in wordCount1)
                Console.WriteLine(kv.Key + " " + kv.Value);
            Console.WriteLine(word.SequenceEqual(wordCount1));
            WordCount wordCount = new WordCount();
            CommentRecord commentInfo1 = new CommentRecord("1/1/2020", "12:30", "Code should be decoupled");
            CommentRecord commentInfo2 = new CommentRecord("20/2/2020", "13:10", "No additional Comments");
            CommentRecord commentInfo3 = new CommentRecord("10/3/2020", "19:09", "No additional Comments");
            List<CommentRecord> commentrecord = new List<CommentRecord> { commentInfo1, commentInfo2, commentInfo3 };
            Dictionary<string, int> wordCountInDictionary = new Dictionary<string, int> { ["Code"] = 1, ["should"] = 1, ["be"] = 1, ["decoupled"] = 1, ["No"] = 2, ["Additional"] = 2, ["Comments"] = 2 };
            Dictionary<string, int> d = wordCount.CountWordsInTheList(commentrecord);
            foreach(KeyValuePair<string, int> kv in d)
                Console.WriteLine(kv.Key + " " + kv.Value);
            foreach (KeyValuePair<string, int> kv in wordCountInDictionary)
                Console.WriteLine(kv.Key + " " + kv.Value);

            //Console.WriteLine(wordCount.CountWordsInTheList(commentrecord).SequenceEqual(wordCountInDictionary));
*/
        }
    }
}
