using System;
using System.Collections.Generic;
using System.Text;

namespace LearningApp.Data.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isCompleted { get; set; } = false;
        public DateTime UntilDate { get; set; }
        public DateTime ModifiteDate { get; set; }
    }
}
