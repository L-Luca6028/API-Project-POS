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
            ToDo newToDo = new ToDo();       

            // Den try-catch-Block benötigt man um die Exception zu fangen, die bei einer falschen Eingabe von der Priorotät ausgelöst wird
            try
            {
                // Dem neuen Objekt werden die Eigenschaften aus den Textfeldern hinzugefügt
                newToDo.Priority = int.Parse(priBox.Text);
                newToDo.WhatToDo = wtdBox.Text;
                newToDo.Description = disBox.Text;
                newToDo.DeadlineDate = datePick.SelectedDate?.ToString("dd.MM.yyy"); 
                // ? wird verwendet, um sicherzustellen, dass datePick.SelectedDate nicht null ist, bevor die ToString()-Methode aufgerufen wird.
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Die Exception: {ex} wurde gefangen");
            }
            
            // Prüfen der richtigen Eingabe
            if (priBox.Text.Equals("") || wtdBox.Text.Equals("") || datePick.SelectedDate.ToString().Equals(""))
            {
                getMessageBoxes(0);
            }
            else if (newToDo.Priority > 10 || newToDo.Priority < 0)
            {
                getMessageBoxes(1);
            }
            else
            {   
                string toDoToJson = JsonConvert.SerializeObject(newToDo);                                  // In JSON-Objekt umwandeln      
                StringContent httpContent = new StringContent(toDoToJson, Encoding.UTF8, "application/json");   // den String der den UTF8 Zeichen entspricht mit dem Header "application/json" in ein String Content speichern
                var response = await client.PostAsync("http://localhost:8080/ToDos/save", httpContent);         // In die API Posten - POST-Methode ausführen

                priBox.Clear();
                wtdBox.Clear();
                disBox.Clear();
                deadBox.Clear();

                // das Main fenster wieder starten
                MainWindow mainWindow = new MainWindow();
                mainWindow.Show();
                this.Close();
            }
            
        }

        private void cancelBtn_Click(object sender, RoutedEventArgs e)
        {
            // das Main fenster wieder starten
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }


        // Funktione für verschiedene MessageBoxes
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
