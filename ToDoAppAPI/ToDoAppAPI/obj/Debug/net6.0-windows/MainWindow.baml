   M S B A M L   `   `   `  ����E  AToDoAppAPI, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:ToDoAppAPI
ToDoAppAPI  5   	       ToDoAppAPI.MainWindow   5   	   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   *localclr-namespace:ToDoAppAPI     5   	     � Title$  
ToDo-Liste��5   	   $	��450��6   $	��800��6)    � Icon$ 	ziele.png��65   .��5
      � -   5         �Name$ mainGrid��5
      $��10q�6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $
��Auto �6    � ColumnDefinitions 5   
   �� 5      $	��250 �6   �� 5      $��* �6   .+�5   
   �� -   5         ��Name$ AddData��5      .��68   ToDo hinzufügen6I   �� 5   
   -   5        $ 
DeleteData��5      $��0��6>   $��5��6N   ${�False��6[   .��6m   Löschen eines ToDos6�   �� 5   
   -   5        $ PutData��5      $��1��68   $��5��6H   ${�False��6U   .��6g   Änderung speichern6{   �� 5   
   -   5         ��Name$ ToDoList��5      $��1��6$   $��4��61   6q   �� 5   
   -   5         ��Name$ TbPri��5      $��1��6!   $��1��6.   ${�False��6>   6R   �� 5   
   -   5        $ TbWtd��5      $��2��6!   $��1��6.   ${�False��6>   6R   �� 5   
   -   5        $ TbDes��5      $��3��6!   $��1��6.   ${�False��6>   6R   �� 5    
   -	   5        $ TbDate��5       $��4��6"   $��1��6/   ${�False��6?   6S   5"      5#      