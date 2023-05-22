using System;
using System.Collections.Generic;
using System.Collections.Immutable;
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

        // Die Get-Methode
        // Implementation extra in einer Funktion damit alle anderen HTTP-Methoden dies auch verwenden können
        private ToDo[] getApiContent()
        {
            string data = httpClient.GetStringAsync("http://localhost:8080/ToDos/all").Result;   // Ich hole mir die URL von der API, die ich haben will
            ToDo[] toDo = JsonConvert.DeserializeObject<ToDo[]>(data);      // Das JSON-Objekt in ein .Net-Objekt umwandeln
            Array.Sort(toDo, (x, y) => y.Priority.CompareTo(x.Priority));   // Das Array wird absteigend sortiert Lambda Funktion
            return toDo;
        }
        
        public MainWindow()
        {
            InitializeComponent();
     
            ToDo[] toDo = getApiContent();
            addDataToList(toDo);

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
            string selectedWhatToDo = ToDoList.SelectedItem.ToString();
            ToDo selectedToDo = toDo.FirstOrDefault(elem => elem.WhatToDo == selectedWhatToDo); // sucht in der toDo-Liste nach dem ersten Element, das gleich selectedWhatToDo ist

            if (selectedToDo != null)
            {
                // Die aktualisierten neuen Werte, die in die Text Boxes eingegeben wurden,
                // überschreiben die alten Werte des Objekts
                selectedToDo.Priority = Convert.ToInt32(TbPri.Text);
                selectedToDo.WhatToDo = TbWtd.Text;
                selectedToDo.Description = TbDes.Text;
                selectedToDo.DeadlineDate = TbDate.Text;

                // Prüfen der richtigen Eingabe
                if (TbPri.Text.Equals("") || TbWtd.Text.Equals("") || TbDate.Text.Equals(""))
                {
                    getMessageBoxes(0);
                }
                else if (selectedToDo.Priority > 10)
                {
                    getMessageBoxes(1);
                }
                else
                {
                    ToDoList.Items.Clear();
                    string toDoToJson = JsonConvert.SerializeObject(selectedToDo);
                    StringContent httpContent = new StringContent(toDoToJson, Encoding.UTF8, "application/json");
                    var response = await httpClient.PutAsync($"http://localhost:8080/ToDos/{selectedToDo.Id}", httpContent); // Die PUT - Methode ausführen
                    toDo = getApiContent();
                    addDataToList(toDo);

                    DeleteData.IsEnabled = false;
                    PutData.IsEnabled = false;
                    TbPri.Clear();
                    TbWtd.Clear();
                    TbDes.Clear();
                    TbDate.Clear();
                }
            }
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
                        using var response = await httpClient.DeleteAsync($"http://localhost:8080/ToDos/{elem.Id}");
                        ToDoList.Items.Remove(ToDoList.SelectedItem);   // Das Entfernen der Objekt aus der Liste in dem GUI
                        TbPri.Clear();
                        TbWtd.Clear();
                        TbDes.Clear();
                        TbDate.Clear();
                        DeleteData.IsEnabled = false;
                        PutData.IsEnabled = false;
                    }
                    catch (Exception ex)
                    {
                        Console.Error.WriteLine($"Die Exception: {ex} wurde gefangen");
                        ToDoList.Items.Remove(ToDoList.SelectedItem);   // Das Entfernen der Objekt aus der Liste in dem GUI
                        TbPri.Clear();
                        TbWtd.Clear();
                        TbDes.Clear();
                        TbDate.Clear();
                        DeleteData.IsEnabled = false;
                        PutData.IsEnabled = false;
                    }
                }
            }
     
        }

        private void addDataToList(ToDo[] toDo)
        {
            foreach (ToDo elem in toDo)
            {
                ToDoList.Items.Add(elem.WhatToDo);
            }
        }

        public void getMessageBoxes(int i)
        {
            if (i == 0)
            {
                string messageBoxText = "Ein notwendiges Feld wurde nicht ausgefüllt!";
                string caption = "Eingabe Fehler!";
                MessageBoxButton button = MessageBoxButton.OK;
                MessageBoxImage icon = MessageBoxImage.Warning;
                MessageBoxResult result;
                result = MessageBox.Show(messageBoxText, caption, button, icon, MessageBoxResult.Yes);
            }
            else if (i == 1)
            {
                string messageBoxText = "Priorität kann nur zwischen 1 und 10 liegen!";
                string caption = "Eingabe Fehler!";
                MessageBoxButton button = MessageBoxButton.OK;
                MessageBoxImage icon = MessageBoxImage.Information;
                MessageBoxResult result;
                result = MessageBox.Show(messageBoxText, caption, button, icon, MessageBoxResult.Yes);
            }
        }

    }
}
