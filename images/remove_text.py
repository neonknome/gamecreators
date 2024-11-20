import os
import xml.etree.ElementTree as ET

# Ścieżka do folderu z plikami XML
folder_path = '/Users/neonknome/Downloads/gamecreators-main/images'  # Zmień na właściwą ścieżkę

# Tekst do usunięcia
tekst_do_usunięcia = 'http://i.cdn.turner.com/v5cache/CARTOONLA/'

# Przechodzimy po wszystkich plikach XML w folderze
for filename in os.listdir(folder_path):
    if filename.endswith(".xml"):
        file_path = os.path.join(folder_path, filename)
        
        # Wczytanie pliku XML
        tree = ET.parse(file_path)
        root = tree.getroot()

        # Flaga, aby sprawdzić, czy plik zawiera tekst
        found_text = False

        # Iteracja przez elementy XML i usuwanie tekstu
        for elem in root.iter():
            if elem.text and tekst_do_usunięcia in elem.text:
                elem.text = elem.text.replace(tekst_do_usunięcia, '')
                found_text = True
            # Sprawdzenie atrybutów
            for attr, value in elem.attrib.items():
                if tekst_do_usunięcia in value:
                    elem.attrib[attr] = value.replace(tekst_do_usunięcia, '')
                    found_text = True
        
        # Jeśli zmiany zostały wprowadzone, zapisujemy plik
        if found_text:
            tree.write(file_path, encoding='utf-8', xml_declaration=True)
            print(f'Tekst usunięty z pliku: {filename}')
        else:
            print(f'Tekst nie znaleziony w pliku: {filename}')

print("Operacja zakończona.")