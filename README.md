# User-basierte Todo-App
Im Zuge des Abschlussprojektes des Backendmoduls soll eine User-basierte Fullstack Todo-App entstehen.
Das besondere ist, dass es ein Usersystem geben soll und für jeden User eine eigene Todo-Liste entsteht.
Andere User sollen grundsätzlich NICHT in der Lage sein, die persönlichen Todo-Listen der anderen User einzusehen.


## Aufbau des Projektes
Du findest neben dieser README Datei noch zwei Ordner:
- `frontend`
- `backend`

Diese enthalten jeweils eine lauffähige Boilerplate auf der weiter aufgebaut werden kann.


### Backend
Es handelt sich um eine `Express.js` Boilerplate, die `Mongoose` und `JWT` einschließt.

In der Datei `backend/.env` befinden sich bereits einige Konfigurationskonstanten, die aus dem Code heraus via `process.env.KONSTANTE` verwendet werden können.

Die Projektstruktur ist die altbekannte:
- `src/`
    - `controller/`
    - `model/`
    - `routes/`
    - `service/`
    - `index.js`

In den unterschiedlichen Ordnern findest du bereits einige Dateien mit etwas Code. Mach dich dem mit vorhanden Code vertraut und passe ihn ggf. für deine Zwecke an.


### Frontend
Es handelt sich um eine `React.js` Boilerplate mit eingebautem Router und `Zustand.js` als globaler Store.

In der Datei `src/js/hooks/useAuthStore.js` findet ihr bereits einen `zustand` Hook für die Verwaltung Authentifizierung.</br>
Darin wird ein vom Server geliefertes User-Objekt gespeichert und bietet außerdem einige komfortable Methoden für das Speichern und Auslesen des Tokens sowie eine Methode zum Prüfen des Login-Zustands und eine Methode zum Ausloggen des Users.

Die Service Komponente `src/js/services/PrivateRoute.jsx` verwendet den obengenannten Hook zum Authentifizieren des Nutzers.

In der Boilerplate ist außerdem bereits `tailwind.css` eingebaut, ihr könnt es bei Bedarf aber auch entfernen und ein anderes CSS Framework nutzen oder das Styling gar komplett selbst machen.


## Anforderungen
Es gibt einige Mindestanforderungen, die erfüllt werden sollen.
Die Projektidee ist sehr stark skalierbar und erlaubt es natürlich viele zusätzliche Features einzubauen. Solltest du also Zeit und Muße haben, tobe dich gerne aus.


### Backend
Der grundsätzliche Register- u. Login-Mechanismus ist bereits verbaut.
Beim Login wird ein `JWT`-Token generiert und im Response-Body mitgeliefert. Aus Gründen der Komplexität wurde von der Nutzung eines `httpOnly`-Cookies abgesehen.

Folgende Routen sind mindestens einzufügen:
- GET `/todos` - Eine private Route, die alle Todos der Todo-Liste des aufrufenden Users ausliefert
- POST `/todos` - Eine private Route zum Einfügen eines neuen Todos in die Todo-Liste des aufrufenden Users
- PUT `/todos/:id` - Eine private Route zum Updaten eines bestimmten Todos aus der Todo-Liste des aufrufenden Users
- DELETE `/todos/:id` - Eine private Route zum Löschen eines bestimmten Todos aus der Todo-Liste des aufrufenden Users


Mögliche Bonus-Erweiterungen als Beispiel:
- Serverseitige Pagination der Todos
- Mehrere Todo-Listen pro User
- Geteilte Todo-Listen für mehrere User
- Kategorien für Todo-Objekte
- Detailiertere Todo-Objekte mit mehreren Feldern
- Sub-Todo-Listen für Todo-Objekte


### Frontend
Der grundsätzliche Register- u. Login-Mechanismus ist bereits verbaut.
Beim Login wird ein `JWT`-Token aus dem Response-Body entgegen genommen und im `localstorage` gespeichert.
Aus Gründen der Komplexität wurde von der Nutzung eines `httpOnly`-Cookies abgesehen.

Folgende Funktionalität ist einzubauen:
- Eine View für die Übersicht aller Todos der Todo-Liste des eingeloggten Users
- Die Möglichkeit, ein vorhandenes Todo aus dieser Liste zu bearbeiten oder zu entfernen
- Die Möglichkeit, ein neues Todo anzulegen und zu der Todo-Liste des Users hinzuzufügen

Baut diese Funktionalität unter der Benutzung des `react-router` ein.

Auch hier können Bonusfeatures eingebaut werden, die sich teils bereits mit denen des Backends decken.


## Präsentation
Am Montag, den 27.03. präsentierst du dein Projekt kurz (ca. 5-10 Minuten).</br>
Achte darauf, dass deine Lösung zur Präsentation stabil läuft und sauber präsentabel ist.
Plane deine Vorstellung mit guten Beispielen und räume deinen Code vorher gut auf und kommentiere ihn so gut wie möglich.