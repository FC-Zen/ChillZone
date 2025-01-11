<div align="center">
    <h1>API Python - Django</h1>
</div>

## Installation

```bash
cd api
```

### 1 - Créer un environnement virtuel
Créez un environnement virtuel pour isoler les dépendances du projet.
```bash
python -m venv <NAME-ENV>
```
<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; border-radius: 5px; font-family: Arial, sans-serif; color: #856404;">
    ⚠️&nbsp; Utilisez <strong><code style="color: #b58900;">api</code></strong> comme nom pour l'environnement en local afin que le <strong><code style="color: #b58900;">.gitignore</code></strong> le prenne en compte.
</div>

### 2 - Activer l'environnement virtuel
Activez l'environnement virtuel. Utilisez la commande correspondant à votre système d'exploitation :

#### Sur Windows :

```bash
.\<NAME-ENV>\Scripts\activate
```

#### Sur macOS et Linux :

```bash
source <NAME-ENV>/bin/activate
```

### 3 - Installer les dépendances
Installez les dépendances nécessaires en utilisant le fichier `requirements.txt`.

```bash
pip install -r requirements.txt
```

Si vous n'avez pas de fichier `requirements.txt`, vous pouvez installer les dépendances manuellement :

```bash
pip install Django django-debug-toolbar django-filter djangorestframework Markdown mysqlclient pillow python-decouple
```

Une fois executé si vous faites la commande `pip list` vous devriez obtenir quelque chose du style :

```bash
Package              Version
-------------------- -------
Django               5.1.4
django-debug-toolbar 4.4.6
django-filter        24.3
djangorestframework  3.15.2
Markdown             3.7
mysqlclient          2.2.6
pillow               11.0.0
pip                  24.0
python-decouple      3.8
sqlparse             0.5.2
```

<div style="background-color: #e7f3fe; border-left: 4px solid #2196f3; padding: 10px; margin: 10px 0; border-radius: 5px; font-family: Arial, sans-serif; color: #0c5460;">
    &nbsp;&nbsp;ℹ️&nbsp;&nbsp; Il se peut que vous ayez d'autres dépendances comme <strong><code style="color: #004085;">tzdata</code></strong> ou <strong><code style="color: #004085;">asgiref</code></strong> mais le principal est que vous ayez ceux écrit au dessus.
</div>

<br>

## Utilisation

### 1 - Architecture

```bash
api/
├── <NAME-ENV>          # Environnement spécifique
├── chillzone/
│   ├── filters         # Dossier contenant les filtres de recherche et d'interrogation
│   │   └── __init__.py
│   ├── migrations      # Dossier pour les migrations de la base de données
│   │   └── __init__.py
│   ├── models          # Dossier contenant les modèles de la base de données (schémas)
│   │   └── __init__.py
│   ├── serializers     # Dossier pour les sérializers (transformation JSON -> Python)
│   │   └── __init__.py
│   └── views           # Dossier contenant les vues qui gèrent les requêtes HTTP
│       └── __init__.py
│
│   ├── __init__.py     
│   ├── .env            # Fichier contenant les variables d'environnement pour l'environnement
│   ├── .env-dev        # Template pour les variables d'environnement pour l'environnement
│   ├── admin.py        # Enregistrement des modèles dans l'interface admin
│   ├── asgi.py         # NE PAS TOUCHER (Point d'entrée pour les applications asynchrones)
│   ├── settings.py     # Contient les paramètres de configuration du projet
│   ├── urls.py         # Fichier central pour gérer les routes principales du projet
│   └── wsgi.py         # NE PAS TOUCHER (Point d'entrée pour le serveur web en production)
│
├── .gitignore
├── manage.py           # Script de gestion pour les commandes Django (migrations, etc...)
├── README.md           # Documentation de base du projet
└── requirements.txt    # Liste des dépendances du projet
```

### 2 - Mode admin

Pour créer un compte admin Django (équivalent au `Superuser` / `Superamin`) vous devez taper cette commande :
```bash
python manage.py createsuperuser
```

Pour ensuite activer l'interface admin il faut ajouter / créer plusieurs choses (déjà fait pour le github)

#### A - Créer le fichier `admin.py`

```py
from django.contrib import admin
from chillzone.models import ... # Models

admin.site.register(...) # Ajouter le nom de la classe du Model
# Recopier cette ligne pour chaque Model
```

#### B - Modifier le fichier `urls.py`

Ajouter cette ligne dans le tableau `urlpatterns` :
```py
path('admin/', admin.site.urls)
```

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; border-radius: 5px; font-family: Arial, sans-serif; color: #856404;">
    ⚠️&nbsp; N'oubliez d'importer le module admin avec <strong><code style="color: #856404;">from django.contrib import admin</code></strong>.
</div>

### 3 - Modifier l'API

Quand vous modifier un fichier (surtout les models) pour appliquer les modifications à la base de données il faut faire deux choses :

#### A - Créer la migration

```bash
python manage.py makemigrations
```

La migration sera enregistrée dans le dossier `migrations/` dans un fichier `.py`. Ca permet d'avoir une trace des modifications apportées à la base de données.

#### B - Pousser la migration

```bash
python manage.py migrate
```

### 4 - Lancer l'API

#### A - Faire le fichier de configuration `.env`

Copier le fichier `.env-dev`et renommez-le en `.env` puis remplissez avec les données demandées.

<div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 10px; margin: 10px 0; border-radius: 5px; font-family: Arial, sans-serif; color: #721c24;">
    ❗️&nbsp; Pour l'équipe de développement : <strong style="color: #721c24;">Faites attention, vérifiez bien que votre fichier n'est pas push sur le GitHub et que aucun mot de passe ou donnée sensible soit en clair dans le code</strong>.
</div>

#### B - Lancer le serveur Django

Pour lancer l'API, il suffit d'effectuer cette commande :

```bash
python manage.py runserver <HOST>:<PORT>
```

Ce qui donne en local :

```bash
python manage.py runserver 127.0.0.1:5000
```

Accédez à l'url ```HOST:PORT``` que vous avez rentré et ajouter les paths que vous avez dans `urls.py` pour tester vos requêtes.

<div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 10px; margin: 10px 0; border-radius: 5px; font-family: Arial, sans-serif; color: #155724;">
    ✔️&nbsp; <strong>Félicitations !</strong> Vous avez installé et démarrer l'API pour le projet <strong><code style="color: #155724;">ChillZone</code></strong>.
</div>


<div align="center" style="margin-top: 50px; font-size: 0.9em;"> <p><strong>&copy; 2024 FC-Zen. Tous droits réservés.</strong></p> <p>Documenté et écrit par <strong>Kellian Bredeau</strong>.</p> </div>
