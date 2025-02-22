# Documentation pour la configuration serveur

Ce document décrit la configuration Docker pour un projet Python, incluant l'installation des dépendances, la configuration d'un environnement virtuel, et la décompression d'un fichier ZIP dans un répertoire spécifique.

## Plan des Fichiers

La partie sysadmin est structurée avec les fichiers suivants :

1. **Dockerfile** : Fichier de configuration pour créer l'image Docker.
2. **docker-compose.yml** : Fichier de configuration pour orchestrer les conteneurs Docker.
3. **requirements.txt** : Fichier listant les dépendances Python nécessaires pour le projet.

## Dockerfile

Le `Dockerfile` est configuré pour créer une image Docker qui installe les dépendances nécessaires et configure un environnement virtuel Python.

Il fait référence directe au fichier "requirements.txt" qui contient les informations sur les package à installer lors du build de l'image.
L'image n'est pas à modifier, simplement le fichier txt à uploader dans l'interface pour cook l'image.

## Docker Compose

Le docker-compose est le sigma fichier qui lance l'exécution du container en mode virtualisé.

Il monte le chemin de fichier approprié dans le container pour donner accès au données ChillZone:tm:.

Le port 3000 est attribué par défaut.

## Postman

Pour postman, penser à mettre le / de ses morts à la fin de la requête.
Sinon ça va pas marcher.

![image-20250222123434985](./assets/image1)

## Informations supplémentaires

L'API est protégé par CloudFlare.
Le HTTPS/2 est obligatoire.
Les Common Exploit sont bloqués.



----



<img src="https://staticpaws.awooo.fr/icons/blitz/db.png" alt="wompwolf" style="width:50px;margin:auto;text-align:center"/> fabiengilles.tf





