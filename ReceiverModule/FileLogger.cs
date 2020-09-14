﻿using System;
using System.Collections.Generic;
using System.IO;

namespace ReceiverModule
{
    public class FileLogger
    {
        private bool CheckWhetherFileExists(string filepath)
        {
            if (File.Exists(filepath))
            {
                return true;
            }
            return false;
        }
        public bool AddCommentCountInACsvFile(Dictionary<string, int> d, string filepath)
        {
            var extension = filepath.Substring(filepath.LastIndexOf('.') + 1).ToLower();
            if (extension == "csv")
            {
                try
                {
                    StreamWriter file = new StreamWriter(filepath, false);
                    foreach (KeyValuePair<string, int> keyValue in d)
                    {
                        file.WriteLine(keyValue.Key + "," + keyValue.Value);
                    }
                }
                catch (Exception ex)
                {
                    throw new ApplicationException("Something is wrong", ex);
                }

            }
            //AddToDic(filepath);
            return CheckWhetherFileExists(filepath);
        }

    }
}
