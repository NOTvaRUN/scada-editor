# [Grapheditor](https://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html) for Angular.

This package contains an editor along with all the required type definitions to modify the editors view to the given requirements.
Original editor can be found in the above link.

And the original editor is available in javascript [here](https://github.com/jgraph/mxgraph).

*Note : this package still uses JS to render the DOM. Type definitions are provided to modify the contents in typescript instead of overriding them in js*

A good example of this editor is [draw.io](https://app.diagrams.net/)



## static url's keep the images from grapheditor
---
```
mxClient.basePath="/assets/library/scada";
mxClient.imageBasePath="/assets/library/scada/resources/images/"
```
###  Component 
---
```
import * as _scada from 'scada-editor/index';
```
---

### import scada.css into your angular.json
---

### Required Variables
---
```
window
    STENCIL_PATH
    RESOURCES_PATH
    IMAGE_PATH
```

### initialization
---

```
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
