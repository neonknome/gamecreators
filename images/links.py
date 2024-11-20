import os
import xml.etree.ElementTree as ET
import re

# Ścieżka do folderu z plikami XML
folder_path = '/Users/neonknome/Downloads/gamecreators-main/images'  # Zmień na właściwą ścieżkę

# Fragment URL, który chcemy usunąć
tekst_do_usunięcia = 'http://i.cdn.turner.com/v5cache/CARTOONLA/'

# Funkcja do czyszczenia tekstu (usuwanie białych znaków)
def clean_text(text):
    return re.sub(r'\s+', ' ', text.strip()) if text else text

# Funkcja do usuwania linku z tekstu (zastąpienie URL pustym miejscem)
def remove_links_in_text(text, link_to_remove):
    if text:
        # Usuwamy link, jeśli znajduje się w tekście
        return text.replace(link_to_remove, '')
    return text

# Przechodzimy po wszystkich plikach XML w folderze
for filename in os.listdir(folder_path):
    if filename.endswith(".xml"):
        file_path = os.path.join(folder_path, filename)
        
        # Wczytanie pliku XML
        tree = ET.parse(file_path)
        root = tree.getroot()

        # Flaga, aby sprawdzić, czy plik zawiera tekst do zmiany
        found_text = False

        # Iteracja przez elementy XML i usuwanie linków z tekstów
        for elem in root.iter():
            if elem.text:
                # Usuwamy URL z tekstu
                cleaned_text = clean_text(elem.text)
                new_text = remove_links_in_text(cleaned_text, tekst_do_usunięcia)
                if new_text != cleaned_text:  # Jeśli zmieniliśmy tekst
                    elem.text = new_text
                    found_text = True

            # Sprawdzenie atrybutów (np. href w tagach <a>)
            for attr, value in elem.attrib.items():
                cleaned_value = clean_text(value)
                new_value = remove_links_in_text(cleaned_value, tekst_do_usunięcia)
                if new_value != cleaned_value:
                    elem.attrib[attr] = new_value
                    found_text = True
        
        # Jeśli zmiany zostały wprowadzone, zapisujemy plik
        if found_text:
            tree.write(file_path, encoding='utf-8', xml_declaration=True)
            print(f'Tekst usunięty z pliku: {filename}')
        else:
            print(f'Tekst nie znaleziony w pliku: {filename}')

print("Operacja zakończona.")