import os
import xml.etree.ElementTree as ET
import re

# Ścieżka do folderu z plikami XML
folder_path = '/Users/neonknome/Downloads/gamecreators-main/images'  # Zmień na właściwą ścieżkę

# Funkcja do czyszczenia tekstu (usuwanie białych znaków)
def clean_text(text):
    return re.sub(r'\s+', ' ', text.strip()) if text else text

# Funkcja do zmiany słowa "gamecreator" na "gamecreators"
def replace_gamecreator(text, old_word, new_word):
    if text:
        return text.replace(old_word, new_word)
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

        # Iteracja przez elementy XML i zmiana słowa "gamecreator"
        for elem in root.iter():
            if elem.text:
                # Czyścimy tekst, zmieniamy słowo
                cleaned_text = clean_text(elem.text)
                new_text = replace_gamecreator(cleaned_text, "gamecreator", "gamecreators")
                if new_text != cleaned_text:  # Jeśli zmieniliśmy tekst
                    elem.text = new_text
                    found_text = True

            # Sprawdzenie atrybutów (np. href w tagach <a>)
            for attr, value in elem.attrib.items():
                cleaned_value = clean_text(value)
                new_value = replace_gamecreator(cleaned_value, "gamecreator", "gamecreators")
                if new_value != cleaned_value:
                    elem.attrib[attr] = new_value
                    found_text = True
        
        # Jeśli zmiany zostały wprowadzone, zapisujemy plik
        if found_text:
            tree.write(file_path, encoding='utf-8', xml_declaration=True)
            print(f'Zmiana słowa w pliku: {filename}')
        else:
            print(f'Brak zmian w pliku: {filename}')

print("Operacja zakończona.")