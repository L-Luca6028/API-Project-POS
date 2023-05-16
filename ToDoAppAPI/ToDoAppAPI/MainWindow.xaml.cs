using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ToDoAppAPI
{
   
    public partial class MainWindow : Window
    {
        HttpClient httpClient = new HttpClient();

        // Die Get-Methode, Der Client und der data-String sind static, da sich diese beiden Varialen nie ändern
        // Außerdem sind die folgenden drei Zeilen globale VAriablen und somit kann man mit der Put und Delete Funktion
        // darauf zugreifen
        private ToDo[] getApiContent()
        {
            string data = httpClient.GetStringAsync("http://localhost:8080/ToDos/all").Result;   // Ich hole mir die URL von der API, die ich haben will
            ToDo[] toDo = JsonConvert.DeserializeObject<ToDo[]>(data);      // Das JSON-Objekt in ein .Net-Objekt umwandeln

            return toDo;
        }
        
        public MainWindow()
        {
            InitializeComponent();
     
            ToDo[] toDo = getApiContent();
            // Das Alle Elemente in der API in der Liste angezeigt werden
            foreach (ToDo elem in toDo)
            {
                ToDoList.Items.Add(elem.WhatToDo);
            }

        }

        private void AddData_Click(object sender, RoutedEventArgs e)
        {
            // Hier das WindowAddData "verlinken"
            ToDoList.Items.Clear();
            WindowAddData windowAddData = new WindowAddData();
            windowAddData.Show();
            this.Close();
        }

        
        private void ToDoList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            ToDo[] toDo = getApiContent();
            foreach (ToDo elem in toDo)
            {
                if(ToDoList.SelectedItem.Equals(elem.WhatToDo))  // Wenn das ausgewählte Item in der Liste dem WhatToDo von dem Objekt entspricht
                {
                    // Content des Objektes in die Box bringen, damit man diesen ändern kann
                    TbPri.Text = elem.Priority.ToString();
                    TbWtd.Text = elem.WhatToDo;
                    TbDes.Text = elem.Description;
                    TbDate.Text = elem.DeadlineDate;
                    PutData.IsEnabled = true;
                    DeleteData.IsEnabled = true;
                    TbPri.IsEnabled = true;
                    TbWtd.IsEnabled = true;
                    TbDes.IsEnabled = true;
                    TbDate.IsEnabled = true;
                }
            }
        }

        // Die Put-Methode
        private async void PutData_Click(object sender, RoutedEventArgs e)
        {
            ToDo[] toDo = getApiContent();
            foreach (ToDo elem in toDo)
            {
                if (ToDoList.SelectedItem.Equals(elem.WhatToDo))
                {
                    // Die aktualisierten neuen Werte, die in die Text Boxes eingegeben wurden
                    // überschreiben die alten Werte des Objektes
                    elem.Priority = Convert.ToInt32(TbPri.Text);
                    elem.WhatToDo = TbWtd.Text;
                    elem.Description = TbDes.Text;
                    elem.DeadlineDate = TbDate.Text;

                    string toDoToJson = JsonConvert.SerializeObject(elem);                                  // In JSON-Objekt umwandeln      
                    StringContent httpContent = new StringContent(toDoToJson, Encoding.UTF8, "application/json"); //den String der den UTF8 Zeichen entspricht mit dem Header "application/json" in ein String Content speichern
                    var response = await httpClient.PutAsync($"http://localhost:8080/ToDos/{elem.Id}", httpContent); // Die PUT-Methode ausführen

                }
            }

            PutData.IsEnabled = false;
            TbPri.Clear();
            TbWtd.Clear();
            TbDes.Clear();
            TbDate.Clear();

            // Um das Fenster zu aktualisieren
            /*MainWindow newWindow = new MainWindow();
            Application.Current.MainWindow = newWindow;
            newWindow.Show();
            this.Close();*/

        }

        // Die Delete-Methode
        private async void DeleteData_Click(object sender, RoutedEventArgs e)
        {
            ToDo[] toDo = getApiContent();
            foreach (ToDo elem in toDo)
            {
                if (ToDoList.SelectedItem.Equals(elem.WhatToDo))
                {
                    try     
                    {
                        // Es wird ein try-catch-Block benötigt, da sonnst eine Exception geworfen wird weil ein Methodenaufruf für den aktuelle Zustand ungültig wäre
                        // Die DELETE-Methode ausführen und ein Objekt aus der API entfernen
                        using var response = httpClient.DeleteAsync($"http://localhost:8080/ToDos/{elem.Id}");
                        
                    }
                    catch (Exception ex)
                    {
                        Console.Error.WriteLine($"Die Exception: {ex} wurde gefangen");
                        ToDoList.Items.Remove(ToDoList.SelectedItem);   // Das Entfernen der Objekt aus der Liste in dem GUI
                        TbPri.Clear();
                        TbWtd.Clear();
                        TbDes.Clear();
                        TbDate.Clear();
                    }
                }
            }
        }
    }
}
