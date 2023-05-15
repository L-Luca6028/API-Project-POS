using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ToDoAppAPI
{
    /// <summary>
    /// Interaktionslogik für WindowAddData.xaml
    /// </summary>
    public partial class WindowAddData : Window
    {
        public WindowAddData()
        {
            InitializeComponent();
        }

        private async void pushBtn_Click(object sender, RoutedEventArgs e)
        {
            HttpClient client = new HttpClient();

            // Dem neuen Objekt werden die Eigenschaften aus den Textfeldern hinzugefügt
            ToDo newToDo = new ToDo();
            newToDo.Priority = int.Parse(priBox.Text);
            newToDo.WhatToDo = wtdBox.Text;
            newToDo.Description = disBox.Text;
            newToDo.DeadlineDate = deadBox.Text;
            //newToDo.Finished = false;             // nicht notwendig da "finished" von Anfang an false ist

            string toDoToJson = JsonConvert.SerializeObject(newToDo);                                  // In JSON-Objekt umwandeln      
            StringContent httpContent = new StringContent(toDoToJson, Encoding.UTF8, "application/json");   // den String der den UTF8 Zeichen entspricht mit dem Header "application/json" in ein String Content speichern
            var response = await client.PostAsync("http://localhost:8080/ToDos/save", httpContent);         // In die API Posten - POST-Methode ausführen

            priBox.Clear();
            wtdBox.Clear();
            disBox.Clear();
            deadBox.Clear();
            
        }

    }
}
