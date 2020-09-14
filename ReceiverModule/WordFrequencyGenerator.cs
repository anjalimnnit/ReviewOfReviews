﻿using System.Collections.Generic;



namespace ReceiverModule
{
    public class WordFrequencyGenerator
    {
         readonly Dictionary<string, int> _frequencyList = new Dictionary<string, int>();
         public Dictionary<string, int> GenerateFrequencyList(List<CommentRecord> commentRecord,string outputFilePath)
            {
                foreach (var comment in commentRecord)
                {
                    var words = comment.Comment.ToString().ToLower().Split(new char[] { ' ' });
                var wordList = new List<string>();
                    foreach (var item in words)
                    {
                        wordList.Add(item);
                    }
                    var processedList  = StopWords.RemoveStopWords(wordList);

                    foreach (var processedWord in processedList)
                    {
                        if (_frequencyList.ContainsKey(processedWord))
                        {
                            _frequencyList[processedWord] = ++_frequencyList[processedWord];
                        }
                        else
                        {
                            _frequencyList.Add(processedWord, 1);
                        }
                    }
                }
            var fileLogger = new FileLogger();
            fileLogger.AddCommentCountInACsvFile(_frequencyList,outputFilePath);
            return _frequencyList;
            }
        }
    }
