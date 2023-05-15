using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace ToDoAppAPI
{
    internal class ToDo
    {  
        private string id;
        private int priority;
        private string whatToDo;
        private string description;
        private string deadlineDate;
        private bool finished = false;

        public ToDo(int priority, string whatToDo, string description, string deadlineDate, bool finished)
        {
            this.priority = priority;
            this.whatToDo = whatToDo;
            this.description = description;
            this.deadlineDate = deadlineDate;
            this.finished = finished;
        }

        public ToDo()
        {

        }
       
        public int Priority
        {
            get { return priority; }
            set { priority = value; }
        }

        public string Id
        {
            get { return this.id; }
            set { this.id = value; }
        }

        public string WhatToDo { 
            get { return this.whatToDo; } 
            set { this.whatToDo = value; }
        }

        public string Description
        {
            get { return this.description; }
            set { this.description = value; }
        }

        public string DeadlineDate
        {
            get { return this.deadlineDate; }
            set { this.deadlineDate = value; }
        }

        public bool Finished
        {
            get { return this.finished; }
            set { this.finished = value; }
        }

        public string ZumString() { return this.whatToDo; }
    }
}
