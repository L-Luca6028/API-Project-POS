   M S B A M L   `   `   `  ����E  AToDoAppAPI, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:ToDoAppAPI
ToDoAppAPI  5   	       ToDoAppAPI.WindowAddData   5   	   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   *localclr-namespace:ToDoAppAPI     5   	     � Title$   ��5   	   $	��375��6   $	��550��6    � Icon$ 	ziele.png��6+   .��5	      � -   5         �Name$ 	WindowAdd��5	      $��10q�6    � RowDefinitions 5
   
   �� 5      $��* �6   6)   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��25 �6    � ColumnDefinitions 5   
   �� 5      $	��200 �6   �� 5      $��* �6   .+�5   
   �� -   5         ��Name$ labl1��5      $��0��6   $��0��6/   $��Center=�6<   $��Center=�6^   .��6�   %#Welche Priorität hat ihr Vorhaben?6�   �� 5   
   -   5        $ labl2��5      $��0��6   $��1��6/   $��Center=�6<   $��Center=�6^   .��6�   Was müssen Sie erledigen?6�   �� 5   
   -   5        $ labl3��5      $��0��6   $��2��6/   $��Center=�6<   $��Center=�6^   .��6�   Zusätzliche Informationen?6�   �� 5   
   -   5        $ labl4��5      $��0��6   $��3��6/   $��Center=�6<   $��Center=�6^   .��6�   Wann müssen Sie fertig sein?6�   �� 5   
   -   5         ��Name$ priBox��5      $��1��6"   $��0��62   6A   �� 5   
   -   5        $ wtdBox��5      $��1��6"   $��1��62   6A   �� 5   
   -   5        $ disBox��5      $��1��6"   $��2��62   6A   (  "System.Windows.Controls.DatePicker  5   
   -	   5          Name$ datePick��5      $��1��6'   $��3��67   �� 5    
   -
   5        $ deadBox��5       $��1��6#   $��3��63   ${�False��6@   $y�Hidden=�6R   6h   �� 5"   
   -   5         ��Name$ pushBtn��5"      $��1��6"   $��4��62   $
{�True��6U   .��6f   Daten in Liste hinzufügen6�   �� 5#   
   -   5        $ 	cancelBtn��5#      $��4��6$   .��6I   	Abbrechen6T   5$      5%      