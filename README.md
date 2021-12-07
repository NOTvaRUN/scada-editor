# [Grapheditor](https://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html) for Angular.

This package contains an editor along with all the required type definitions to modify the editors view to the given requirements.

And the original editor is available in javascript [here](https://github.com/jgraph/mxgraph).

## static url's to place the images from grapheditor
```ts
mxClient.basePath="/assets/library/scada";
mxClient.imageBasePath="/assets/library/scada/resources/images/"
```
###  Component 
```ts
import * as _scada from 'scada-editor/index';
```
Download mxGraph [typeDefinitions](https://www.npmjs.com/package/mxgraph-type-definitions) and store it in a folder that will not be included in build.

### import `scada.css` into your `angular.json`

```json
        "build": {
          "options": {
            "styles": [
              "node_modules/flowchart-diagram-editor/scada.css"
            ]
          },
         }
        "development": {
          "options": {
            "styles": [
              "node_modules/flowchart-diagram-editor/scada.css"
            ]
          },
        },
```

### Declare Variables (go through grapheditor github package for a better understanding on what resources are required.)
---
```
window
    STENCIL_PATH
    RESOURCES_PATH
    IMAGE_PATH
```

### initialization
```ts
_scada.mxUtils.getAll(
    [
        _scada.mxResources.getDefaultBundle('.txt file for language', mxLanguage),
        'default.xml path'
    ],
    (xhr) => {
        _scada.mxResources.parse(xhr[0].getText());
        const themes = new Object();
        themes['default'] = xhr[1].getDocumentElement();
        Graph = new _scada.Graph(null, null, null, null, themes, null);
        Graph['transparentBackground'] = false;
        const renderContainer = new _scada.EditorUi(
        new _scada.Editor(false, themes['default'], null, Graph, true),
        **Dom Element**
        );
    },
    () => {
        **Failed Toaster**
        }
    );
```

### Screenshots

```Place where you can create flow charts.```
![https://i.ibb.co/pxKfrcK/Screenshot-1.jpg](https://i.ibb.co/pxKfrcK/Screenshot-1.jpg)


```Let your creativity flow```
![https://i.ibb.co/yNGhYZv/Screenshot-2.jpg](https://i.ibb.co/yNGhYZv/Screenshot-2.jpg)

### customize it with your heart's content with the help of type definitions following diagram shows **examples** for the possiblities of customization.

# Important :
<ul>
  <li> <samp>Current package does not include ways to convert the editor into the images shown below.</samp> </li>
  <li> <samp> The websites below do not use this npm package nor are they in angular</samp> </li>
  <li> <samp>But they use the editor that is provided as a base and have build on it.So you can customize it as required.</samp></li>
</ul>

#  [draw.io](https://app.diagrams.net/)
![https://i.ibb.co/7Sqw0Sr/Screenshot-3.jpg](https://i.ibb.co/7Sqw0Sr/Screenshot-3.jpg)

#  [Visual design paradigm](https://online.visual-paradigm.com/)
![https://i.ibb.co/4RZ8qpD/Screenshot-4.jpg](https://i.ibb.co/4RZ8qpD/Screenshot-4.jpg)

## Development repo for this package is included [here](https://github.com/NOTvaRUN/scada-editor-dev) feel free to submit issues or fork it and create your own version of this package.
https://github.com/NOTvaRUN/scada-editor-dev

# Good luck

![https://media3.giphy.com/media/citBl9yPwnUOs/giphy.gif?cid=ecf05e47zt5kb8p4a6l1szj3ttbbsw644umsw5qrj12hp5lr&rid=giphy.gif&ct=g](https://media3.giphy.com/media/citBl9yPwnUOs/giphy.gif?cid=ecf05e47zt5kb8p4a6l1szj3ttbbsw644umsw5qrj12hp5lr&rid=giphy.gif&ct=g)
