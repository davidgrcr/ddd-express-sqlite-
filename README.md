# Projecte Express + SQLite amb Estructura DDD

Aquest projecte és una API construïda amb **Express** i **SQLite**, seguint una estructura **DDD (Domain-Driven Design)** per a una millor organització del codi, separació de responsabilitats i escalabilitat. Aquesta aplicació inclou operacions bàsiques CRUD per gestionar usuaris dins d'una base de dades SQLite.

## Índex

- [Estructura del projecte](#estructura-del-projecte)
- [Requisits](#requisits)
- [Instal·lació](#instal·lació)
- [Scripts disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)
  
## Estructura del projecte

El projecte està organitzat seguint els principis de **Domain-Driven Design (DDD)**, separant la lògica de negoci de la infraestructura i els controladors HTTP. L'estructura bàsica és la següent:

```bash
.
├── src
│   ├── application     # Lògica de negoci (serveis d'aplicació)
│   ├── domain          # Definició d'entitats i interfícies del domini
│   ├── infrastructure  # Persistència i integració amb bases de dades
│   │   └── database    # Connexió i configuració de la base de dades SQLite
│   └── interfaces      # Controladors HTTP i gestió de rutes
└── index.js            # Punt d'entrada de l'aplicació
```

### Descripció de les carpetes

- **src/domain**: Conté les entitats del domini (com l'entitat `User`) i les interfícies dels repositoris.
  
- **src/application**: Aquesta carpeta conté la lògica de negoci en forma de serveis. Els serveis encapsulen les regles de negoci i interactuen amb els repositoris.

- **src/infrastructure**: Inclou la implementació dels repositoris, com la connexió a la base de dades **SQLite** i les operacions relacionades amb la persistència de dades.

- **src/interfaces**: Aquí es defineixen els controladors que gestionen les rutes HTTP, rebent les sol·licituds i retornant respostes.

## Requisits

Abans d'executar l'aplicació, assegura't de tenir instal·lades les següents dependències:

- **Node.js** (versió 14 o superior)
- **SQLite3**

## Instal·lació

Segueix els passos següents per instal·lar i arrencar l'aplicació:

1. Clona aquest repositori:

   ```bash
   git clone https://github.com/el_teu_repo/projecte-express-sqlite.git
   ```

2. Accedeix a la carpeta del projecte:
    ```bash
    cd projecte-express-sqlite
    ```

3. Instal·la les dependències:
    ```bash
    npm install
    ```
4. Executa l'aplicació:
    ```bash
    npm start
    ```

Això arrencarà el servidor a http://localhost:3000.


## Executar el projecte amb Docker
Tens dues opcions per executar el projecte amb Docker: una utilitzant només el Dockerfile i l'altra utilitzant docker-compose per a entorns més complexos.

### Opció 1: Utilitzar només el Dockerfile
Aquesta opció és ideal per a una aplicació simple com aquesta, que no depèn d'altres serveis externs com bases de dades separades o serveis addicionals.

**Pasos**:
1. Construir la imatge de Docker:

Des de la carpeta del projecte, executa:

```bash
docker build -t express-sqlite-api .
```
Això crearà una imatge de Docker basada en el Dockerfile.

2. Executar el contenidor:

Un cop la imatge està creada, pots executar l'aplicació amb:

```bash
docker run -p 3000:3000 express-sqlite-api
```
Això exposarà l'aplicació a http://localhost:3000.

***Opcional: Muntar el directori local per a desenvolupament***

Si vols que els canvis al codi es reflecteixin en temps real mentre l'aplicació s'està executant, pots muntar el directori local dins del contenidor:

```bash
docker run -p 3000:3000 -v $(pwd):/app express-sqlite-api
```
Amb aquest enfocament, qualsevol canvi fet al codi font serà vist immediatament pel servidor sense necessitat de reconstruir la imatge.

### Opció 2: Utilitzar docker-compose
Aquesta opció és útil si en el futur la teva aplicació creix i necessita serveis addicionals com una base de dades externa o altres microserveis.

1. Pasos:
Crear el fitxer `docker-compose.yml`:

Afegeix el següent fitxer a la carpeta del projecte:

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app  
      - /app/node_modules
```

2. Executar amb `docker-compose`:

Amb el fitxer docker-compose.yml creat, pots aixecar l'aplicació amb:

```bash
docker-compose up
```
Això construirà i executarà l'aplicació, exposant-la a http://localhost:3000.

### Parar l'aplicació:

Per aturar l'aplicació, només has de prémer Ctrl + C o executar:

```bash
docker-compose down
```

# Documentació de l'API

Aquesta API permet gestionar usuaris utilitzant una base de dades SQLite.

## Índex

- [Obtenir tots els usuaris](#1-obtenir-tots-els-usuaris)
- [Obtenir un usuari per ID](#2-obtenir-un-usuari-per-id)
- [Crear un nou usuari](#3-crear-un-nou-usuari)
- [Eliminar un usuari](#4-eliminar-un-usuari)

---

### 1. Obtenir tots els usuaris

**URL**: `/api/users`

**Mètode**: `GET`

**Descripció**: Obté una llista de tots els usuaris emmagatzemats a la base de dades.

#### Exemples de sol·licitud:

```bash
GET /api/users HTTP/1.1
Host: localhost:3000
```
```bash
curl -X GET http://localhost:3000/api/users
```

### Exemple de resposta exitosa:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]
```

### Codi de resposta: `200 OK`

### 2. Obtenir un usuari per ID
**URL**: `/api/users/:id`

**Mètode**: `GET`

**Descripció**: Obté un usuari específic basat en el seu ID.

**Paràmetres de ruta**: id (integer): ID de l'usuari que vols obtenir.

### Exemples de sol·licitud:

```bash
GET /api/users/1 HTTP/1.1
Host: localhost:3000
```
```bash
curl -X GET http://localhost:3000/api/users/1
```

### Exemple de resposta exitosa:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

### Codi de resposta: `200 OK`

### Codi d'error:
* **404 Not Found**: Si l'usuari amb l'ID especificat no existeix.


### 3. Crear un nou usuari

**URL**: `/api/users`

**Mètode**: `POST`

**Descripció**: Crea un nou usuari.

**Cos de la sol·licitud**:
* **name (string)**: Nom de l'usuari.
* **email (string)**: Correu electrònic de l'usuari.


### Exemples de sol·licitud:

```bash
POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Nou Usuari",
  "email": "nouusuari@example.com"
}
```


```bash
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name": "Nou Usuari", "email": "nouusuari@example.com"}'
```

### Codi de resposta: `201 Created`

### Codi d'error:
* **400 Bad Request**: Si el cos de la sol·licitud és invàlid o falten camps obligatoris.
* **409 Conflict**: Si l'email ja està registrat.

### 4. Eliminar un usuari
**URL**: /api/users/:id

**Mètode**: DELETE

**Descripció**: Elimina un usuari específic basat en el seu ID.

**Paràmetres de ruta**:
+ **id (integer)**: ID de l'usuari que vols eliminar.

### Exemples de sol·licitud:

```bash
DELETE /api/users/1 HTTP/1.1
Host: localhost:3000
```

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Exemple de resposta exitosa:

```json
{
  "message": "Usuari eliminat correctament"
}
```


### Codi de resposta: `200 OK`

### Codi d'error:
* **404 Not Found**: Si l'usuari amb l'ID especificat no existeix.

