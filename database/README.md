Ce dossier contient les scripts de migration de base de données gérés par Alembic.

Pour initialiser Alembic:
1. Assure-toi d'être dans le dossier 'backend' (ou que le chemin est configuré correctement).
2. Exécute 'alembic init alembic'. Cela créera un dossier 'alembic' et alembic.ini.
3. Modifie alembic.ini pour pointer vers ton modèle SQLAlchemy.

Pour créer une migration:
alembic revision -m "description de ta migration"

Pour appliquer les migrations:
alembic upgrade head
