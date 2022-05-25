# BDS Mobile App

Application mobile du BDS de Campus Academy.

---

## 💿 Installation du projet

Après le clone du projet

```
https://github.com/Campus-Academy/bds-mobile-app
```

L'installation des modules et dépendances

```
npm install
```

ou

```
yarn
```

### Compilation pour le dev

```
npm run dev
```

### Compilation pour la prod

```
npm run build
```

---

## 🔧 Accès aux outils du projet :

### Mongo :

https://account.mongodb.com : connexion avec les comptes flowfactory

---

## ⚠️ Les bonnes pratiques à adopter ⚠️

### Git :

- Toujours se créer une branche pour développer **une et une seule** fonctionnalité, une tache ou un bug !
- Chaque branche devra être nommée avec son **type d'US et son nom**, exemple : feature/pagination-table ou bug/statistiques-incorrectes
- Chaque commit devra dire ce qui a été ajouté, exemple :

```
git commit -m "[pagination-table] Ajout de la pagination avec options de filtre par colonne sur tous les tableaux de l'application"
```

- Ne jamais push sur la branche dev/main/prod/pre-prod/, toujours push sur la branche dédiée à la feature et faire un merge request
- Relecture de code et tests obligatoires par un **autre** developpeur afin de valider une merge request

### Code :

- Noms de variables et fonctions en **anglais** + explicite + respect du camelcase ! <br/>_Exemple : **a**n**C**ar, **g**et**U**ser() <br/> Contre-exemple : var1, Var2, ACAr, Getuser(), getuser() <br/>_
- Faire un commentaire en francais pour chaque fonction et partie de code complexe exemple :

```
// fonction qui permet de recupérer un utilisateur via son id
getUserById(){
    ...
}
```

- utilisez de manière privligiée les `forEach` plutôt que des boucles `for`
- utilisez de manière privligiée les `switch case` plutôt que des `if, else if` à répétition
- optimiser votre code pour qu'il soit **le plus compact et lisible possible** (grâce aux `filter`, `findIndex`, `find` ...)
- utilisez des **composants** pour découper votre code
- pensez **programmation orienté object** (si vous passez beaucoup d'attribut d'un object, passez à vos composants des objects entiers plutôt que chaque attribut par exemple)

<br/>

Exemple :

```
// article et user sont des objets ayants toutes les informations respectivement sur l'article et l'utilisateur
<ChildComponent
    article={this.state.article}
    user={this.state.user}
    ...
/>
```

<br/>

Plutôt que :

```
<ChildComponent
    id={this.state.article.id}
    titre={this.state.article.titre}
    description={this.state.article.description}
    ...
    firstname={this.state.user.fistname}
    lastname={this.state.user.lastname}
    friends={this.state.user.friends}
    ...
 />
```

<br/>

- Un Component doit faire une et une seule chose à la fois, sinon le subdivisé en autant de fonctionnalité (cela facilite la lisibilité, les tests et la mainteance)
- Utiliser les opérateurs ternaires plutôt que le `if else`

Exemple

```
const { role } = user;

return role === ADMIN ? <AdminUser /> : <NormalUser />
```

Plutôt que

```
const { role } = user;

if(role === ADMIN) {
  return <AdminUser />
}else{
  return <NormalUser />
}
```

- Utiliser les fragments comme balise global plutôt que des `<div>`

Exemple

```
return (
  <>
     <Component1 />
     <Component2 />
     <Component3 />
  </>
)
```

Plutôt que

```
return (
  <div>
     <Component1 />
     <Component2 />
     <Component3 />
  </div>
)
```

- Définir le CSS dans le Javascript (La minimisation et organisation (build) du JS est plus simple légère que celle du CSS

Exemple

```
const bodyStyle = {
  height: "10px"
}

return <div style={bodyStyle}>

</div>
```

Plutôt que

```
// CSS FILE

.body {
  height: 10px;
}

//JSX

return <div className='body'>content</div>
```
**_NB: Si un module doit être installé, faites-en part à l'équipe, toujours prendre des modules populaires et sous licence libre de préférence (MIT-)_**

- Toutes les images et autres ressources de ce genre doivent être dans le dossier `./public/Assets`

Et pour y accéder, React crée automatiquement une variable d'environnement accessible grâce à : ``${process.env.PUBLIC_URL}/Assets/...``

***NB: Si un module doit être installé, faites-en part à l'équipe, toujours prendre des modules populaires et sous licence libre de préférence (MIT-)***

## Outils conseillés

- VS Code + exentions : React + Liveshare
- Chrome + extension : React devtools
