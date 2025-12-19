#!/usr/bin/env python3
"""Script pour tourner toutes les images de 90° dans le dossier assets/img/images/"""

from PIL import Image
import os
from pathlib import Path

# Chemin du dossier images
images_dir = Path("assets/img/images")

# Créer le dossier s'il n'existe pas
images_dir.mkdir(parents=True, exist_ok=True)

# Extensions d'images supportées
image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}

# Compter les images traitées
count = 0

# Parcourir tous les fichiers du dossier
for file_path in images_dir.iterdir():
    # Exclure img4.jpg
    if file_path.name == "img4.jpg":
        continue
    
    if file_path.is_file() and file_path.suffix.lower() in image_extensions:
        try:
            print(f"Rotation de {file_path.name}...", end=" ")
            
            # Ouvrir l'image
            img = Image.open(file_path)
            
            # Tourner de 180° supplémentaires (270° au total)
            img_rotated = img.rotate(180, expand=True)
            
            # Sauvegarder l'image
            img_rotated.save(file_path)
            
            print("✓")
            count += 1
            
        except Exception as e:
            print(f"✗ Erreur: {e}")

print(f"\n{count} image(s) tournée(s) avec succès!")
