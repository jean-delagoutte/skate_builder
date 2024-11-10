# <u>SkateBuilder</u>
Mini projet pour sélectionner un shape de skate découpé en 3 partie via un caroussel pour chaque partie :
- Noise
- Central
- Tail

## Techno 
Web Component

## Installation
Inclure les 2 fichiers js :
- caroussel-component.js
- skatebuilder-component.js
  
Créer une arborescence comme suit :<br>
img/<br>
├── noise/<br>
│       ├── 1.png<br>
│       ├── 2.png<br>
│       └── 3.png<br>
├── central/<br>
│       ├── 1.png<br>
│       ├── 2.png<br>
│       └── 3.png<br>
├── tail/<br>
│       ├── 1.png<br>
│       ├── 2.png<br>
│       └── 3.png<br>
<br>
Le nom et type d'image est pour l'exemple, vous pouvez unitliser ce que vous voulez (png, jpg,..)
Toutes les images de chaque partie doivent avoir la même taille.

## Utlisation 
Vous pouvez vous appuyer sur le fichier index.html

### Visuel
Exemple issu de index.html :
- importation du web component :
 ```
<script src="skatebuilder-component.js"></script>
```
- configuration du web component :
```
<skatebuilder-component id="SB600"
    noise='["./img/noise/1.png", "./img/noise/2.png", "./img/noise/3.png", "./img/noise/4.png"]'
    central='["./img/central/1.png", "./img/central/2.png", "./img/central/3.png", "./img/central/4.png"]'
    tail='["./img/tail/1.png", "./img/tail/2.png", "./img/tail/3.png", "./img/tail/4.png"]'
    noise-percentage="16.4%"
    central-percentage="67.2%"
    tail-percentage="16.4%">
</skatebuilder-component>
```
il y a 3x2 paramètres : 
- noise : contient l'ensemble des chemins des images noise que l'on souhaite avoir dans la selection
- central : contient l'ensemble des chemins des images central que l'on souhaite avoir dans la selection
- tail : contient l'ensemble des chemins des images tail que l'on souhaite avoir dans la selection

- noise-percentage + central-percentage + tail-percentage = 100% chaque pourcentage représente la taille de chaque partie.
Imaginons que vous ayez des shapes de depart complet qui fasse 1000 px de hauteur, que vous découpiez de ces shape la parie noise 120 px de hauteur la partie tail 150px de hauteur et la parie central 730 px.
il faudra alors comfigurer le composant avec 
```
 noise-percentage="12%"     
 central-percentage="73%"   
 tail-percentage="15%"     
```
### Récupération sélection
Il existe un evenement change qui est appelé à chaque fois qu'une des partie du skate builder change.
Pour récupérer la valeur du shape en cours, vous pouvez utiliser un input d'un formulaire
Dans le fichier index par exemple vous pourrez trouver des exemples d'utilisation avec
```
<input type="text" id="skatebuilderValue150" readonly> 
...
<script>
    const skatebuilderComponent150 = document.getElementById('SB150');
    const skatebuilderValueInput150 = document.getElementById('skatebuilderValue150');
    skatebuilderComponent150.addEventListener('change', () => {
        skatebuilderValueInput150.value = skatebuilderComponent150.value;
    });
</script>
```







