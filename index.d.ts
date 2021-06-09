
declare class mxResources {

  static get(key: string, params?: Array<string | number | boolean>, defaultValue?: string): string;
  loadDefaultBundle:Boolean;
  static parse(text: any): any;
  static getDefaultBundle(path:string, type:any):any;
}

declare class DiagramFormatPanel{
constructor(format:any, editorUi:any, container:any);

showPageView:boolean;
showBackgroundImageOption:boolean;
public init():void;
public addView(div:any);
public addOptions(div:any);
public addGridOption(container:any);
public addDocumentProperties(div:any);
public addPaperSize(div:any);
public addStyleOps(div:any);
public destroy(div:any);
}

declare class ChangePageSetup{
constructor(ui:any, color:any, image?:any, format?:any, pageScale?:any);
public execute():void;
}

declare class ArrangePanel{
constructor(format:any, editorUi?:any, container?:any);
public init():void;
public addTable(div:any):void;
public addLayerOps(div:any):void;
public addGrpupOps(div:any):void;
public addAlign(div:any):void;
public addFlip(div:any):void;
public addDistribute(div:any):void;
public addAngle(div:any):void;
}


declare class mxKeyHandler {


/**
 * Constructs an event handler that executes functions bound to specific keystrokes.
 * @author 鸿则 <hungtcs@163.com>
 * @date 2020-01-09
 * @param {mxGraph} graph Reference to the associated mxGraph.
 * @param {*} target      Optional reference to the event target.
 *                        If null, the document element is used as the event target, that is,
 *                        the object where the key event listener is installed.
 */
constructor(graph: mxGraph, target?: EventTarget);

/**
 * Reference to the mxGraph associated with this handler.
 */
public graph: mxGraph;

/**
 * Reference to the target DOM, that is, the DOM node where the key event listeners are installed.
 */
public target: EventTarget;

/**
 * Maps from keycodes to functions for non-pressed control keys.
 */
public normalKeys: [(event: KeyboardEvent) => void];

/**
 * Maps from keycodes to functions for pressed shift keys.
 */
public shiftKeys: [(event: KeyboardEvent) => void];


/**
 * Maps from keycodes to functions for pressed control keys.
 */
public controlKeys: [(event: KeyboardEvent) => void];

/**
 * Maps from keycodes to functions for pressed control and shift keys.
 */
public controlShiftKeys: [(event: KeyboardEvent) => void];

/**
 * Specifies if events are handled.  Default is true.
 */
public enabled: boolean;

/**
 * Returns true if events are handled.  This implementation returns enabled.
 */
public isEnabled(): boolean

/**
 * Enables or disables event handling by updating enabled.
 */
public setEnabled(enabled: boolean): void;

/**
 * Binds the specified keycode to the given function.  This binding is used if the control key is not pressed.
 */
public bindKey(code: number, funct: (event: KeyboardEvent) => void): void;

/**
 * Binds the specified keycode to the given function.  This binding is used if the shift key is pressed.
 */
public bindShiftKey(code: number, funct: (event: KeyboardEvent) => void): void;

/**
 * Binds the specified keycode to the given function.  This binding is used if the control key is pressed.
 */
public bindControlKey(code: number, funct: (event: KeyboardEvent) => void): void;

/**
 * Binds the specified keycode to the given function.  This binding is used if the control and shift key are pressed.
 */
public bindControlShiftKey(code: number, funct: (event: KeyboardEvent) => void): number


/**
 * Returns true if the control key is pressed.  This uses mxEvent.isControlDown.
 */
public isControlDown(evt: KeyboardEvent): boolean;

/**
 * Returns the function associated with the given key event or null if no function is associated with the given event.
 */
public getFunction(evt: KeyboardEvent): ((event: KeyboardEvent) => void);

/**
 * Returns true if the event should be processed by this handler, that is, if the event source is either the target, one of its direct children, a descendant of the <mxGraph.container>, or the mxGraph.cellEditor of the graph.
 */
public isGraphEvent(evt: KeyboardEvent): boolean;

/**
 * Handles the event by invoking the function bound to the respective keystroke if isEnabledForEvent returns true for the given event and if isEventIgnored returns false, except for escape for which isEventIgnored is not invoked.
 */
public keyDown(evt: KeyboardEvent): boolean;

/**
 * Returns true if the given event should be handled.  isEventIgnored is called later if the event is not an escape key stroke, in which case escape is called.  This implementation returns true if isEnabled returns true for both, this handler and graph, if the event is not consumed and if isGraphEvent returns true.
 */
public isEnabledForEvent(evt: KeyboardEvent): boolean

/**
 * Returns true if the given keystroke should be ignored.  This returns graph.isEditing().
 */
public isEventIgnored(evt: KeyboardEvent): boolean;

/**
 * Hook to process ESCAPE keystrokes.  This implementation invokes mxGraph.stopEditing to cancel the current editing, connecting and/or other ongoing modifications.
 */
public escape(evt: KeyboardEvent): void;

/**
 * Destroys the handler and all its references into the DOM.  This does normally not need to be called, it is called automatically when the window unloads (in IE).
 */
public destroy(): void;

}

/**
* XML codec for JavaScript object graphs. See {@link mxObjectCodec} for a
* description of the general encoding/decoding scheme. This class uses the
* codecs registered in {@link mxCodecRegistry} for encoding/decoding each object.
*
* ### References
*
* In order to resolve references, especially forward references, the mxCodec
* constructor must be given the document that contains the referenced
* elements.
*
* ### Examples
*
* The following code is used to encode a graph model.
*
* @example
* ```javascript
* var encoder = new mxCodec();
* var result = encoder.encode(graph.getModel());
* var xml = mxUtils.getXml(result);
* ```
*
* #### Example
*
* Using the code below, an XML document is decoded into an existing model. The
* document may be obtained using one of the functions in mxUtils for loading
* an XML file, eg. {@link mxUtils.get}, or using {@link mxUtils.parseXml} for parsing an
* XML string.
*
* @example
* ```javascript
* var doc = mxUtils.parseXml(xmlString);
* var codec = new mxCodec(doc);
* codec.decode(doc.documentElement, graph.getModel());
* ```
*
* #### Example
*
* This example demonstrates parsing a list of isolated cells into an existing
* graph model. Note that the cells do not have a parent reference so they can
* be added anywhere in the cell hierarchy after parsing.
*
* @example
* ```javascript
* var xml = '<root><mxCell id="2" value="Hello," vertex="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="World!" vertex="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" edge="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root>';
* var doc = mxUtils.parseXml(xml);
* var codec = new mxCodec(doc);
* var elt = doc.documentElement.firstChild;
* var cells = [];
*
* while (elt != null)
* {
*   cells.push(codec.decode(elt));
*   elt = elt.nextSibling;
* }
*
* graph.addCells(cells);
* ```
*
* #### Example
*
* Using the following code, the selection cells of a graph are encoded and the
* output is displayed in a dialog box.
*
* @example
* ```javascript
* var enc = new mxCodec();
* var cells = graph.getSelectionCells();
* mxUtils.alert(mxUtils.getPrettyXml(enc.encode(cells)));
* ```
*
* Newlines in the XML can be converted to <br>, in which case a '<br>' argument
* must be passed to {@link mxUtils.getXml} as the second argument.
*
* ### Debugging
*
* For debugging I/O you can use the following code to get the sequence of
* encoded objects:
*
* @example
* ```javascript
* var oldEncode = encode;
* encode(obj)
* {
*   mxLog.show();
*   mxLog.debug('mxCodec.encode: obj='+mxUtils.getFunctionName(obj.constructor));
*
*   return oldEncode.apply(this, arguments);
* };
* ```
*
* Note that the I/O system adds object codecs for new object automatically. For
* decoding those objects, the constructor should be written as follows:
*
* @example
* ```javascript
* var MyObj(name)
* {
*   // ...
* };
* ```
*
* @class mxCodec
*/
declare class mxCodec {

/**
 * @constructor
 *
 * Constructs an XML encoder/decoder for the specified
 * owner document.
 *
 * @param document - Optional XML document that contains the data.
 * If no document is specified then a new document is created
 * using {@link mxUtils.createXmlDocument}.
 */
constructor(document?: XMLDocument);

/**
 * The owner document of the codec.
 */
document: XMLDocument;

/**
 * Maps from IDs to objects.
 */
objects: Array<string>;

/**
 * Lookup table for resolving IDs to elements.
 */
elements: Array<any>;

/**
 * Specifies if default values should be encoded. Default is false.
 */
encodeDefaults: boolean;

/**
 * Assoiates the given object with the given ID and returns the given object.
 *
 * @param id ID for the object to be associated with.
 * @param obj Object to be associated with the ID.
 */
putObject(id: string, obj: any): any;

/**
 * Returns the decoded object for the element with the specified ID in
 * {@link document}. If the object is not known then {@link lookup} is used to find an
 * object. If no object is found, then the element with the respective ID
 * from the document is parsed using {@link decode}.
 */
getObject(id: string): any;

/**
 * Hook for subclassers to implement a custom lookup mechanism for cell IDs.
 * This implementation always returns null.
 *
 * Example:
 *
 * ```javascript
 * var codec = new mxCodec();
 * codec.lookup(id)
 * {
 *   return model.getCell(id);
 * };
 * ```
 *
 * @param id ID of the object to be returned.
 */
lookup(id: string): any;

/**
 * Returns the element with the given ID from {@link document}.
 *
 * @param id String that contains the ID.
 */
getElementById(id: string): Element;

/**
 * Returns the element with the given ID from {@link document}.
 *
 * @param id String that contains the ID.
 */
updateElements(): void;

/**
 * Adds the given element to {@link elements} if it has an ID.
 */
addElement(node: Node): void;

/**
 * Returns the ID of the specified object. This implementation
 * calls {@link reference} first and if that returns null handles
 * the object as an {@link mxCell} by returning their IDs using
 * {@link mxCell.getId}. If no ID exists for the given cell, then
 * an on-the-fly ID is generated using {@link mxCellPath.create}.
 *
 * @param obj Object to return the ID for.
 */
getId(obj: any): string;

/**
 * Hook for subclassers to implement a custom method
 * for retrieving IDs from objects. This implementation
 * always returns null.
 *
 * Example:
 *
 * ```javascript
 * var codec = new mxCodec();
 * codec.reference(obj)
 * {
 *   return obj.getCustomId();
 * };
 * ```
 *
 * @param obj Object whose ID should be returned.
 */
reference(obj: any): any;

/**
 * Encodes the specified object and returns the resulting
 * XML node.
 *
 * @param obj Object to be encoded.
 */
encode(obj: any): XMLDocument;

/**
 * Decodes the given XML node. The optional "into"
 * argument specifies an existing object to be
 * used. If no object is given, then a new instance
 * is created using the constructor from the codec.
 *
 * The function returns the passed in object or
 * the new instance if no object was given.
 *
 * @param node XML node to be decoded.
 * @param into Optional object to be decodec into.
 */
decode(node: Node, into?: any): any;

/**
 * Encoding of cell hierarchies is built-into the core, but
 * is a higher-level function that needs to be explicitely
 * used by the respective object encoders (eg. {@link mxModelCodec},
 * {@link mxChildChangeCodec} and {@link mxRootChangeCodec}). This
 * implementation writes the given cell and its children as a
 * (flat) sequence into the given node. The children are not
 * encoded if the optional includeChildren is false. The
 * function is in charge of adding the result into the
 * given node and has no return value.
 *
 * @param cell {@link mxCell} to be encoded.
 * @param node Parent XML node to add the encoded cell into.
 * @param includeChildren Optional boolean indicating if the
 * function should include all descendents. Default is true.
 */
encodeCell(cell: mxCell, node: Node, includeChildren?: boolean): void;

/**
 * Returns true if the given codec is a cell codec. This uses
 * {@link mxCellCodec.isCellCodec} to check if the codec is of the
 * given type.
 */
isCellCodec(codec: mxCodec): boolean;

/**
 * Decodes cells that have been encoded using inversion, ie.
 * where the user object is the enclosing node in the XML,
 * and restores the group and graph structure in the cells.
 * Returns a new {@link mxCell} instance that represents the
 * given node.
 *
 * @param node XML node that contains the cell data.
 * @param restoreStructures Optional boolean indicating whether
 * the graph structure should be restored by calling insert
 * and insertEdge on the parent and terminals, respectively.
 * Default is true.
 */
decodeCell(node: Node, restoreStructures?: boolean): mxCell;

/**
 * Inserts the given cell into its parent and terminal cells.
 */
insertIntoGraph(cell: mxCell): void;

/**
 * Sets the attribute on the specified node to value. This is a
 * helper method that makes sure the attribute and value arguments
 * are not null.
 *
 * @param node XML node to set the attribute for.
 * @param attributes Attributename to be set.
 * @param value New value of the attribute.
 */
setAttribute(node: Node, attribute: string, value: any): void;

}

declare class mxUtils {

  static mod(n: number, m: number): number;

  /**
   * Returns the value for the given key in the given associative array or the given default value if the value is null.
   * @param array           Associative array that contains the value for the key.
   * @param key             Key whose value should be returned.
   * @param defaultValue    Value to be returned if the value for the given key is null.
   */
  static getValue(array: any, key: any, defaultValue: any): any;

  /**
   * Returns true if the specified point (x, y) is contained in the given rectangle.
   * @param bounds  mxRectangle that represents the area
   * @param x       X-coordinate of the point.
   * @param y       Y-coordinate of the point.
   */
  static contains(bounds: mxRectangle, x: number, y: number): boolean;

  /**
   * Returns a wrapper function that locks the execution scope of the given function to the specified scope.  Inside funct, the “this” keyword becomes a reference to that scope.
   * @param scope
   * @param func
   */
  static bind(scope: any, func: Function): Function;

  /**
   * Converts the specified point (x, y) using the offset of the specified container and returns a new mxPoint with the result.
   * @param container DOM node to use for the offset.
   * @param x         X-coordinate of the point to be converted.
   * @param y         Y-coordinate of the point to be converted.
   */
  static convertPoint(container: HTMLElement, x: number, y: number): mxPoint;

  /**
   * Sets the opacity of the specified DOM node to the given value in %.
   * @param node    DOM node to set the opacity for.
   * @param value   Opacity in %.  Possible values are between 0 and 100.
   */
  static setOpacity(node: HTMLElement, value: number): void;

  /**
   * Creates and returns an image (IMG node) or VML image (v:image) in IE6 in
   * quirks mode.
   *
   * @static
   * @param {string} src          URL that points to the image to be displayed.
   * @returns {HTMLImageElement}
   */
  public static createImage(src: string): HTMLImageElement;

  /**
   * Sorts the given cells according to the order in the cell hierarchy.
   * Ascending is optional and defaults to true.
   *
   * @static
   * @param {Array<mxCell>} cells
   * @param {boolean} [ascending]
   * @returns {Array<mxCell>}
   */
  public static sortCells(cells: Array<mxCell>, ascending?: boolean): Array<mxCell>;

  /**
   * Returns the stylename in a style of the form [(stylename|key=value);] or
   * an empty string if the given style does not contain a stylename.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style    String of the form [(stylename|key=value);]
   * @returns {string}
   */
  public static getStylename(style: string): string;

  /**
   * Returns the stylenames in a style of the form [(stylename|key=value);]
   * or an empty array if the given style does not contain any stylenames.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style        String of the form [(stylename|key=value);]
   * @returns {Array<string>}
   */
  public static getStylenames(style: string): Array<string>;

  /**
   * Returns the index of the given stylename in the given style. This
   * returns -1 if the given stylename does not occur (as a stylename) in the
   * given style, otherwise it returns the index of the first character.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style
   * @param {string} stylename
   * @returns {number}
   */
  public static indexOfStylename(style: string, stylename: string): number;

  /**
   * Adds the specified stylename to the given style if it does not already
   * contain the stylename.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style
   * @param {string} stylename
   * @returns {string}
   */
  public static addStylename(style: string, stylename: string): string;

  /**
   * Removes all occurrences of the specified stylename in the given style
   * and returns the updated style. Trailing semicolons are not preserved.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style
   * @param {string} stylename
   * @returns {string}
   */
  public static removeStylename(style: string, stylename: string): string;

  /**
   * Removes all stylenames from the given style and returns the updated style.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style
   * @returns {string}
   */
  public static removeAllStylenames(style: string): string;

  /**
   * Assigns the value for the given key in the styles of the given cells, or
   * removes the key from the styles if the value is null.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {mxGraphModel} model                {@link mxGraphModel} to execute the transaction in.
   * @param {Array<mxCell>} cells               Array of {@link mxCell } to be updated.
   * @param {string} key                        Key of the style to be changed.
   * @param {(string | number | null)} value    New value for the given key.
   */
  public static setCellStyles(model: mxGraphModel, cells: Array<mxCell>, key: string, value: string | number | null): void;

  /**
   * Adds or removes the given key, value pair to the style and returns the
   * new style. If value is null or zero length then the key is removed from
   * the style. This is for cell styles, not for CSS styles.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-07-17
   * @static
   * @param {string} style                  String of the form [(stylename|key=value);].
   * @param {string} key                    Key of the style to be changed.
   * @param {(string|number|null)} value    New value for the given key.
   * @returns {string}
   */
  public static setStyle(style: string, key: string, value: string|number|null): string;

  /**
   * Loads the specified URL asynchronously and invokes the given functions depending on the request status.
   * Returns the mxXmlRequest in use.
   * Both functions take the mxXmlRequest as the only parameter.
   * See mxUtils.load for a synchronous implementation.
   */
  static get(url: string,
    onload?: (req: mxXmlRequest) => void,
    onerror?: (req: mxXmlRequest) => void,
    binary?: boolean,
    timeout?: number,
    ontimeout?: (req: mxXmlRequest) => void): void;

  /**
   * Loads the specified URL synchronously and returns the mxXmlRequest.
   * Throws an exception if the file cannot be loaded.
   * See mxUtils.get for an asynchronous implementation.
   * @param url URL to get the data from.
   */
  static load(url: string): mxXmlRequest;

  /**
   * Loads the URLs in the given array asynchronously and invokes the given function if all requests returned with a valid 2xx status.
   * The error handler is invoked once on the first error or invalid response.
   */
  static getAll(urls: Array<string>, onload: (req: mxXmlRequest) => void, onerror: (err: mxXmlRequest) => void): void;

  /**
   * Returns the XML content of the specified node.
   * For Internet Explorer, all \r\n\t[\t]* are removed from the XML string and the remaining \r\n are replaced by \n.
   * All \n are then replaced with linefeed, or &#xa; if no linefeed is defined.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2019-12-27
   * @static
   * @param {XMLDocument} node      DOM node to return the XML for.
   * @param {*} linefeed            Optional string that linefeeds are converted into.  Default is &#xa;
   */
  static getXml(node: XMLDocument, linefeed?: string): string;

  static getPrettyXml(node:any, tab?:any, indent?:any, newline?:any, ns?:any);
  /**
   * Parses the specified XML string into a new XML document and returns the new document.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2019-12-27
   * @static
   * @param {string} xml
   * @returns {XMLDocument}
   */
  static parseXml(xml: string): XMLDocument;

  /**
   * Returns true if the given ancestor is an ancestor of the given DOM node in the DOM.
   * This also returns true if the child is the ancestor.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-01-07
   * @static
   * @param {Node} ancestor DOM node that represents the ancestor.
   * @param {Node} child    DOM node that represents the child.
   * @returns {boolean}
   */
  static isAncestorNode(ancestor: Node, child: Node): boolean;

  static makeDraggable(
    element: HTMLElement,
    graphF: mxGraph,
    funct: Function,
    dragElement?: Node,
    dx?: number,
    dy?: number,
    autoscroll?: boolean,
    scalePreview?: boolean,
    highlightDropTargets?: boolean,
    getDropTarget?: (graph: mxGraph, x: number, y: number, evt: PointerEvent) => mxCell,
  ): mxDragSource;

  static createXmlDocument(): XMLDocument;

  /**
   * Returns the offset for the specified container as an mxPoint.
   * The offset is the distance from the top left corner of the container to the top left corner of the document.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-01-09
   * @static
   * @param {HTMLElement} container
   * @param {boolean} scrollOffset
   * @returns {mxPoint}
   */
  static getOffset(container: HTMLElement, scrollOffset?: boolean): mxPoint;

  /**
   * Returns the top, left corner of the viewrect as an mxPoint.
   *
   * @author 鸿则 <hungtcs@163.com>
   * @date 2020-01-09
   * @static
   * @param {HTMLElement} node
   * @param {boolean} [includeAncestors]
   * @param {boolean} [includeDocument]
   * @returns {mxPoint}
   */
  static getScrollOrigin(node: HTMLElement, includeAncestors?: boolean, includeDocument?: boolean): mxPoint;

  static importNode(doc: Document, node: any, allChildren: any): any;

  static removeWhitespace(node: any, before: boolean): void;

  static hasScrollbars(container: HTMLElement): boolean;

  /**
   * Recursively clones the specified object ignoring all field names in the given array of transient fields.
   * {@link mxObjectIdentity.FIELD_NAME} is always ignored by this function.
   *
   *
   * @param obj Object to be cloned.
   * @param transients Optional array of strings representing the field name to be ignored.
   * @param shallow Optional boolean argument to specify if a shallow clone should be created, that is, one where all
   *                object references are not cloned or, in other words, one where only atomic (strings, numbers) values
   *                are cloned. Default is false.
   */
  static clone(obj: any, transients?: Array<string>, shallow?: boolean): any;

  /**
   * Displays the given alert in a new dialog. This implementation uses the
   * built-in alert function. This is used to display validation errors when
   * connections cannot be changed or created.
   *
   * @param message The message to be displayed.
   */
  static alert(message: string): void;

  /**
   * Displays the given error message in a new <mxWindow> of the given width.
   * If close is true then an additional close button is added to the window.
   * The optional icon specifies the icon to be used for the window. Default
   * is {@link mxUtils.errorImage}.
   *
   * @param message The message to be displayed.
   * @param width   The width of the window.
   * @param close   Optional boolean indicating whether to add a close button.
   * @param icon    Optional icon for the window decoration (path to the icon).
   */
  static error(message: string, width: number, close?: boolean, icon?: string): void;

}

declare class mxEventObject {
  constructor(name: string, ...args: any[]);

  /**
   * Variable: name
   *
   * Holds the name.
   */
  name: string;

  /**
   * Variable: properties
   *
   * Holds the properties as an associative array.
   */
  properties: any[];

  /**
   * Variable: consumed
   *
   * Holds the consumed state. Default is false.
   */
  consumed: boolean;

  /**
   * Function: getName
   *
   * Returns <name>.
   */
  getName(): string;

  /**
   * Function: getProperties
   *
   * Returns <properties>.
   */
  getProperties(): any[];

  /**
   * Function: getProperty
   *
   * Returns the property for the given key.
   */
  getProperty(key: string): any;

  /**
   * Function: isConsumed
   *
   * Returns true if the event has been consumed.
   */
  isConsumed(): boolean;

  /**
   * Function: consume
   *
   * Consumes the event.
   */
  consume(): void;
}



/**
* Actions
*/
export class Actions extends mxEventSource {
  constructor(editorUi?: EditorUi);

  //set of addAction function calls to add actions to items created in Menu.js
  init(): void;

  //method used to addActions to the keys created in menus
  addAction(key: string, funct: void, enabled?: number, iconCls?: number, shortcut?: string): any;

  //to Register the given action under the given name.
  put(name: string, action: void): any;
}

export class Action extends mxEventSource {
  constructor(label: string, enabled?: boolean, iconCls?: any, shortcut?: any);
  /**
   * Sets the enabled state of the action and fires a stateChanged event
   */
  createFunction(funct: any): any;

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setEnabled(value: any);

  /**
   * Sets the enabled state of the action and fires a stateCHanged event;
   */
  isEnabled(): any;
  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setToggleAction(value: string): any;
  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setSelectedCallback(funct: any);
  /**
   * Sets the enabled state of the action and fires a stateChanged event
   */
  isSelected();
}

/**
* Dialogs
*/
export class OpenDialog {
  constructor();
}
/**
* Constructs a new color dialog.
*/
export class ColorDialog {
  constructor(editorUi: EditorUi, color?: string, apply?: any, cancelFn?: any);

  /**
   * Creates function to apply value.
   */

  presetColors: Array<string>
  /**
   * Creates function to apply value
   */
  defaultColors: Array<string>
  /**
   * Creates function to apply value
   */
  createApplyFunction(): mxUtils;
  /**
   * 
   */
  recentColors: Array<string>
  /**
   * Adds recent color for later use.
   */
  addRecentColor(color: string, max: number): void;
  /**
   * Clears recent color.
   */
  resentRecentColors(): void;

}
/**
* Contructs a new about dialog.
*/
export class AboutDialog {
  constructor(editorUi: EditorUi);
}

/**
* Contructs a new textarea dialog.
*/
export class TextareaDialog {
  constructor(editorUi: EditorUi, title: string, url?: string, fn?: any, cancelFn?: any, cancelTitle?: any, w?: number, h?: number, addButtons?: any, noHide?: any, noWrap?: any, applyTitle?: any, helpLink?: any, customButtons?: any)
}
/**
* Contructs a new edit file dialog.
*/
export class EditDiagramDialog {
  constructor(editorUi: EditorUi);

  showNewWindowOption: boolean;
}
/**
* Constructs a new export dialog.
*/
export class ExportDialog {
  constructor(editorUi);
  /**
   * Remembers last value for border.
   */
  lastBorderValue: number;
  /**
   * Global switched for the export dialog.
   */
  showGifOption: boolean;
  /**
   * Global switches for the export dialog.
   */
  showXmlOption: boolean;
  /**
   * Hook for getting the export format. Returns null for the default
   * intermediate XML export format or a function that returns the
   * parameter and value to be used in the request in the form
   * key=value, where value should be URL encoded
   */
  exportfile(editorUi: EditorUi, name: string, format?: string, bg?: string, s?: any, b?: any, dpi?: any): void;
  /**
   * Hook for getting the export format. Returns null for the default
   * intermediate XML export format or a function that returns the
   * parameter and value to be used in the request in the form
   * key=value, where value should be URL encoded.
   */
  saveLocalFile(editorUi: EditorUi, data?: any, filename?: string, format?: string): void;
}
/**
* Constructs a new metadta dialog.
*/
export class EditDataDialog {
  constructor();
  /**
   * Optional help link.
   */
  getDisplayIdForCell(ui: EditorUi, cell: mxCell): any;
  /**
   * Optional help link.
   */
  placeholderHelpLink: any;
}
/**
* Contructs a new link dialog.
*/
export class LinkDialog {
  constructor(editorUi: EditorUi, initialValue?: any, btnLabel?: any, fn?: any)
}
/**
* 
*/
export class OutlineWindow {
  constructor(editorUi: EditorUi, x?: number, y?: number, w?: any, h?: any)
}
/**
* 
*/
export class LayersWindow {
  constructor(editorUi: EditorUi, x?: number, y?: number, w?: any, h?: any)
}


/**
* Editor
*/


export class Editor extends mxEventSource {
  constructor(chromeless: any, themes: Object, model?: any, graph?: any, editable?: any);
  /**
   * Counts open editor tabs (must be global for cross-window access)
   */
  pageCounter: number;
  /**
   * Specifies if local storage should be used (eg. on the iPad which has no filesystem)
   */
  undoManager:any;
  useLocalStorage: any;
  moveImage: string;
  helpImage: string;
  checkmarkImage: string;
  maximizeImage: string;
  zoomOutImage: string;
  zoomInImage: string;
  zoomFitImage: string;
  layersImage: string;
  previousImage: string;
  nextImage: string;
  editImage: string;
  zoomOutLargeImage: string;
  zoomInLargeImage: string;
  actualSizeLargeImage: string;
  printLargeImage: string;
  layersLargeImage: string;
  closeLargeImage: string;
  editLargeImage: string;
  previousLargeImage: string;
  nextLargeImage: string;
  refreshLargeImage: string;
  backLargeImage: string;
  fullscreenLargeImage: string;
  ctrlKey: string;
  hintOffset: number;
  popupsAllowed: boolean;

  /**
   * Stores initial state of mxClient.NO_FO.
   */
  originalNoForeignObject: any;
  /**
   * Specifies the image URL to be used for the transparent background.
   */
  transparentImage: string;
  /**
   * Specifies if the canvas should be extended in all directions. Default is true.
   */
  extendCanvas: boolean;
  /**
   * Specifies if the app should run in chromeless mode. Default is false.
   * This default is only used if the contructor argument is null.
   */
  chromeless: boolean;
  /**
   * Specifies the order of OK/Cancel buttons in dialogs. Default is true.
   * Cancel first is used on Macs, Windows/Confluence uses cancel last.
   */
  cancelFirst: boolean;
  /**
   * Specifies if the editor is enabled. Default is true.
   */
  enabled: boolean;
  /**
   * Contains the name which was used for the last save. Default value is null.
   * @default null
   */
  filename: any;
  /**
   * Contains the current modified state of the diagram. This is false for
   * new diagrams and after the diagram was saved.
   */
  modified: boolean;
  /**
   * Specifies if the diagram should be saved automatically if possible.
   * @default true
   */
  autosave: boolean;
  /**
   * Specifies the top spacing for the initial page view. Default is 0.
   * @default 0
   */
  initialTopSpacing: number;
  /**
   * Specifies the app name. Default is document.title.
   * @default document.title
   */
  appName: any;
  editBlankUrl: string;
  /**
   * Default value for the graph container overflow style.
   */
  defaultGraphOverflow: string;
  /**
   * Initializes the environment.
   */
  init(): void;
  /**
   * Sets the XML node for the current diagram.
   */
  isChromelessView(): any;
  /**
   * Sets the XML node for the current diagram.
   */
  setAutosave(value): void;
  getEditBlankUrl(params: any);
  editAsNew(xml: any, title: any): void;
  /**
   * Sets the XML node for the current diagram.
   */
  createGraph(themes: any, model: Graph): Graph;
  /**
   * Sets the XML node for the current diagram.
   */
  resetGraph(): void;
  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node: Node): void;
  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node: Node): void;

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(ignoreSelection: string): Node;
  /**
   * Keeps the graph container in sync with the persistent graph state
   */
  updateGraphComponents(): void;
  /**
   * Sets the modified flag.
   */
  setModified(value: boolean): void;
  /**
   * Sets the filename.
   */
  setFilename(value: boolean): void;
  /**
   * Creates and returns a new undo manager.
   */
  createUndoManager(): any;
  /**
   * Adds basic stencil set (no namespace).
   */
  initStencilRegistry(): void;
}

/**
* EditorUi
*/


export class EditorUi {
  constructor(editor: Editor, container?: any, lightbox?: any);


  /**
   * Global config that specifies if the compact UI elements should be used.
   */
  compactUi: boolean;

  /**Specifies the size of the split bar.
   */
  splitSize: number;

  /**
  * Specifies the height of the menubar
  * @default true
  */
  menubarHeight: number;

  /**
   * Specifies the width of the format panel should be enabled
   * @default true
   */
  formatEnabled: boolean;

  /**
   * Specifies the width of the format panel
   * @default 240
   */
  formatWidth: number;

  /**
   * Specifies the height of the toolbar
   * @default 38
   */
  toolbarHeight: number;

  /**
   * Specifies the height of the footer
   * @default 28
   */
  footerHeight: number;

  /**
   * Specifies the height of the optional sidebarFooterContainer
   * @default 34
   */
  sidebarFooterContainer: number;

  /**
   * Specifies the position of the horizontal split bar
   */
  hsplitPosition: number;

  /**
   * Specifies if animation are allowed in <executeLayout>
   * @default true
   */
  allowAnimation: boolean;

  /**
   * @default 2
   */
  lightBoxMaxFitScale: number;

  /**
   * Specifies if single click on horizontal split should collapse sidebar.
   * @default false
   */
  hsplitClickEnabled: boolean;

  /**
   * Installs the listeners to update the action states.
   */
  init(): void;
  /**
   * Returns true if the given event should start editing
   */
  onKeyDown(evt: Event): boolean;
  /**
   * Returns true if the given event should start editing. This implementation returns true.
   */
  onKeyPress(evt: Event): boolean;
  /**
   * Returns true if the given event should start editing. This implementation returns true.
   */
  isImmediateEditingEvent(evt: Event): boolean;
  /**
   * Private helper method.
   */
  getCssClassForMarker(prefix: string, shape: string, marker: string, fill: string): string;
  /**
   * Overridden in Menus.js
   */
  createMenus(): Menus;
  /**
   * Hook for allowing selection and context menu for certain events.
   */
  updatePasteActionStates(): void;
  /**
   * Hook for allowing selection and context menu for certain events.
   */
  initClipboard(): void;
  /**
   * Delay between zoom steps when not using preview.
   */
  lazyZoomDelay: number;
  /**
   * Delay before update of DOM when using preview.
   */
  wheelZoomDelay: number;
  /**
   * Delay before update of DOM when using preview.
   */
  buttonZoomDelay: number;
  /**
   * Initializes the infinite canvas.
   */
  initCanvas(): void;
  /**
   * Creates a temporary graph instance for rendering off-screen content.
   */
  addChromelessToolbarItems(addButton: any): void;

  /**
   * Creates a temporary graph instance for rendering off-screen content.
   */
  createTemporaryGraph(stylesheet: string): Graph;
  /**
   *
   */
  addChromelessClickHandler(): void;
  /**
   * Toggle Right side panel
   */
  toggleFormatPanel(forceHide: number);
  /**
   * Adds support for placeholders in labels.
   */
  lightboxFit(maxHeight: number): void;
  /**
   * Translates this point by the given vector.
   * look for return type 
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  isDiagramEmpty(): any;
  /**
   * Hook for allowing selection and context menu for certain events.
   */
  isSelectionAllowed(evt: Event): any;
  /**
   * Installs dialog if browser window is closed without saving
   * This must be disabled during save and image export.
   */
  addBeforeUnloadListener(): any;
  /**
   * Sets the onbeforeunload for the application
   */
  onBeforeUnload(): any;
  /**
   * Opens the current diagram via the window.opener if one exists.
   */
  open(): void;
  /**
   * Sets the current menu and element.
   * menu:MENU,elt:element?
   */
  setCurrentMenu(menu: any, elt: any): void;

  /**
   * Resets the current menu and element.
   */
  resetCurrentMenu(): void;
  /**
   * Hides and destroys the current menu.
   */
  hideCurrentMenu(): void;
  /**
   * Updates the document title.
   */
  updateDocumentTitle(): void;
  /**
   * creates hover icons.
   * HoverIcons
   */
  createHoverIcons(): any;
  /**
   * Returns the URL for a copy of this editor with no state.
   */
  redo(): void;
  /**
   * Returns the URL for a copy of this editor with no state.
   */
  undo(): void;
  /**
   * Returns the URL for a copy of this editor with no state.
   */
  canRedo(): any;
  /**
   * Returns the URL for a copy of this editor with no state.
   */
  canUndo(): any;
  /**
   * 
   */
  getEditBlankXml(): any;
  /**
   * Returns the URL for a copy of this editor with no state.
   */
  getUrl(pathname: string): string;
  /**
    * Specifies if the graph has scrollbars.
    */
  setScrollbars(value: any): void;
  /**
   * Returns true if the graph has scrollbars.
   */
  hasScrollbars(): any;
  /**
   * Resets the state of the scrollbars.
   */
  resetScrollbars(): void;
  /**
   * Loads the stylesheet for this graph.
   */
  setPageVisible(value: any): void;


  /**ChangePageSetup function on 2380 think about it. */

  /**
   * Loads the stylesheet for this graph.
   */
  setBackgroundColor(value: any): void;
  /**
    * Loads the stylesheet for this graph.
    */
  setFoldingEnabled(value: any): void;
  /**
   * Loads the stylesheet for this graph.
   */
  setPageFormat(value: any): void;
  /**
   * Loads the stylesheet for this graph.
   */
  setPageScale(value: any): void;
  /**
   * Loads the stylesheet for this graph.
   */
  setGridColor(value: any): void
  /**
   * Updates the states of the given undo/redo items.
   */
  addUndoListener(): void;
  /**
   * Updates the states of the given toolbar items based on the selection.
   */
  updateActionStates(): void;

  zeroOffset: any;

  getDiagramContainerOffset(): any;
  /**
   * Refreshes the viewport.
   */
  refresh(sizeDidChange: boolean): void;
  /**
   * Creates the required containers.
   */
  createTabContainer(): null;
  /**
   * Creates the required containers.
   */
  createDivs(): void;
  /**
   * Hook for sidebar footer container. This implementation returns null.
   */
  createSidebarFooterContainer(): null;
  /**
   * Creates the required containers.
   */
  createUi(): void;
  /**
   * Creates a new toolbar for the given container.
   */
  createStatusContainer(): any;
  /**
   * Creates a new toolbar for the given container.
   */
  setStatusText(value: string): void;
  /**
   * Creates a new toolbar for the given container.
   */
  createToolbar(container: any): any;

  /**
* Creates a new sidebar for the given container.
*/
  createSidebar(container: any): any;

  /**
   * Creates a new sidebar for the given container.
   */
  createFormat(container: any): any;

  /**
   * Creates and returns a new footer.
   */
  createFooter(): any;

  /**
   * Creates the actual toolbar for the toolbar container.
   */
  createDiv(classname: string): any;

  /**
   * Updates the states of the given undo/redo items.
   */
  addSplitHandler(elt: any, horizontal: any, dx: any, onChange: any): void;
  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  handleError(resp: any, title: any, fn: any, invokeFnOnClose: any, notFoundMessage: any): void;
  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  showError(title: string, msg: string, btn: any, fn: any, retry: any, btn2: any, fn2: any, btn3: any, fn3: any, w: number, h: number, hide: any, onClose: any): void;
  /**
   * Displays a print dialog.
   */
  showDialog(elt: any, w: number, h: number, modal: any, closable: any, onClose: any, noScroll: any, transparent: any, onResize: any, ignoreBgClick: any): void;
  /**
   * Displays a print dialog.
   */
  hideDialog(cancel: any, isEsc: any): void;
  /**
   * Display a color dialog.
   */
  pickColor(color: string, apply: any): void;
  /**
   * Adds the label menu items to the given menu and parent.
   */
  openFile(): void;
  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extractGraphModelFromHtml(data: string): string;
  /**
   * Opens the given files in the editor.
   */
  extractGraphModelFromEvent(evt: Event): any;
  /**
   * Hook for subclassers to return true if event data is a supported format.
   * This implementation always returns false.
   */
  isCompatibleString(data): boolean;
  /**
   * Adds the label menu items to the given menu and parent.
   */
  saveFile(forceDialog: any): boolean;
  /**
   * Saves the current graph under the given filename.
   */
  save(name: string): any;
  /**
   * Executes the given layout.
   */
  executeLayout(exec: any, animate: any, post: any): void;
  /**
   * Hides the current menu.
   */
  showImageDialog(title: string, value: any, fn: any, ignoreExisting: any): void;
  /**
   * Hides the current menu.
   */
  showLinkDialog(value: any, btnLabel: string, fn: any): void;
  /**
  * Hides the current menu.
  */
  showDataDialog(cell: any): void;
  /**
   * Hides the current menu.
   */
  showBackgroundImageDialog(apply: any): void;
  /**
   * Loads the stylesheet for this graph.
   */
  setBackgroundImage(image: any): void;
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  confirm(msg: string, okFn: any, cancelFn: any): void;
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  createOutline(wnd: any): any;
  // Alt+Shift+Keycode mapping to action
  altShiftActions: object;
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  createKeyHandler(editor: any): any;
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  destroy(): void;
}

/**
 * Format
 */


export class Format {
  constructor(editorUi: EditorUi, container: any)

  /**
   * Returns information about the current selection.
   */
  labelIndex: number;
  /**
   * Returns information about the current selection.
   */
  currentIndex: number;
  /**
   * Returns information about the current selection.
   */
  showCloseButton: boolean;
  /**
   * Background color for inactive tabs.
   */
  inactiveTabBackgroundColor: string;
  /**
   * Background color for inactive tabs.
   */
  roundableShapes: Array<string>;
  /**
   * Adds the label menu items to the given menu and parent.
   */
  init(): void;
  /**
   * Returns information about the current selection.
   */
  clearSelectionState(): void;
  /**
   * Returns information about the current selection.
   */
  getSelectionState(): any;
  /**
   * Returns information about the current selection.
   */
  createSelectionState(): any;
  /**
   * Returns information about the current selection.
   */
  initSelectionState(): Object;
  /**
   * Returns information about the current selection.
   */
  updateSelectionStateForCell(result: any, cell?: mxCell, cells?: any): void;
  /**
   * Returns information about the current selection.
   */
  isFillState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isGlassState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isRoundedState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isLineJumpState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isComicState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isAutoSizeState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isImageState(state: any): any;
  /**
   * Returns information about the current selection.
   */
  isShadowState(state: any): any;
  /**
   * Adds the label menu items to the given menu and parent.
   */
  clear(): void;
  /**
   * Adds the label menu items to the given menu and parent.
   */
  refresh(): any;
}

export class BaseFormatPanel {
  constructor(format: Format, editorUi?: EditorUi, container?: any)

  buttonBackgroundColor: string;

  /**
   * Adds the given color option.
   */
  getSelectionState(): any;
  /**
   * Install input handler.
   */
  installInputHandler(input: any, key?: any, defaultValue?: any, min?: any, max?: any, unit?: any, textEditFallback?: any, isFloat?: any)
  /**
   * Adds the given option.
   */
  createPanel(): any;
  /**
   * Adds the given option.
   */
  createTitle(title: string): HTMLElement;
  /**
   * 
   */
  createStepper(input: any, update: any, step?: any, height?: number, disableFocus?: boolean, defaultValue?: string, isFloat?: boolean);
  /**
   * Adds the given option.
   */
  createOption(label:string,isCheckedFn:any,setCheckedFn:any,listner:any)
}

/**
* Graph
*/


export class Graph {
  constructor(container: any, model: any, renderHint: any, stylesheet: any, themes: any, standalone: any)
  /**
   * Specifies if the touch UI should be used (cannot detect touch in FF so always on for Windows/Linux)
   */
  touchStyle: string;
  /**
    * Shortcut for capability check.
    */
  fileSupport: string;
  /**
   * Default size for line jumps.
   */
  lineJumpsEnabled: boolean;
  /**
   * Default size for line jumps.
   */
  defaultJumpSize: number;
  /**
   * Minimum width for table columns.
   */
  minTableColumnWidth: number;
  /**
   * Minimum height for table rows.
   */
  minTableRowHeight: number;
  /**
   * Text for foreign object warning.
   */
  foreignObjectWarningText: string;
  /**
   * Link for foreign object warning.
   */
  foreignObjectWarningLink: string;
  /**
   * Helper function for creating SVG data URI.
   */
  createSvgImage(w: number, h: number, data: string, coordWidth: number, coordHeight: number): any;
  /**
   * Removes all illegal control characters with ASCII code <32 except TAB, LF
   * and CR.
   */
  zapGremlins(text: Array<any>): Array<any>;
  /**
   * Turns the given string into an array.
   */
  stringToBytes(str: string): Array<any>;
  /**
   * Turns the given array into a string.
   */
  bytesToString(arr: Array<any>): string;
  /**
   * Returns a base64 encoded version of the compressed outer XML of the given node.
   */
  compressNode(node: Node, checked: any): Graph;
  /**
   * Returns a base64 encoded version of the compressed string.
   */
  compress(data: any, deflate: any): any;
  /**
   * Returns a decompressed version of the base64 encoded string.
   */
  decompress(data: any, inflate: any, checked: any): any;
  /**
   * Redirects to Graph.zapGremlins.
   */
  zapGremlins(text: any): any;

  /**Hovericons */
  tableResized(table: any): void;

  /**
   * Updates column width and row height.
   */
  setRowHeight(row: any, height: number): void;
  /**
    * Updates column width and row height.
    */
  tableRowResized(row: any, bounds: any, prev: any): void;

  defaultVertexStyle: object;

  /**
   * Contains the default style for edges.
   */
  defaultEdgeStyle: object;
  /**
 * Returns the current edge style as a string.
  */
  createCurrentEdgeStyle(): string;
  /**
   * Hook for subclassers.
   */
  getPagePadding(): mxPoint;
  /**
   * Loads the stylesheet for this graph.
   */
  loadStylesheet(): void;
  /**
   * Creates lookup from object IDs to cell IDs.
   */
  createCellLookup(cells: any, lookup?: Object): Object;
  /**
   * Creates lookup from original to cloned cell IDs where mapping is
   * the mapping used in cloneCells and lookup is a mapping from
   * object IDs to cell IDs.
   */
  createCellMapping(mapping: any, lookup?: Object, cellMapping?: Object): Object;
  importGraphModel(node: Node, dx: number, dy: number, crop?: any): any;

  /**
* Translates this point by the given vector.
* 
* @param {number} dx X-coordinate of the translation.
* @param {number} dy Y-coordinate of the translation.
*/

  encodeCells(cells: any): any;
  /**
   * Overrides cloning cells in moveCells.
   */

  /**
   * @param cells Array of {@link mxCell} to be moved, cloned or added to the target.
   * @param dx Integer that specifies the x-coordinate of the vector. Default is 0.
   * @param dy Integer that specifies the y-coordinate of the vector. Default is 0.
   * @param clone Boolean indicating if the cells should be cloned. Default is false.
   * @param target {@link mxCell} that represents the new parent of the cells.
   * @param evt Mouseevent that triggered the invocation.
   * @param mapping Optional mapping for existing clones.
   */
  moveCells(cells: any, dx: number, dy: number, clone: boolean, target?: any, evt?: Event, mapping?: any): any;
  /**
* Updates cells IDs for custom links in the given cells.
*/
  updateCustomLinks(mapping: any, cells: any): any;
}

/**
* Init
*/

export class window {
  MAX_REQUEST_SIZE: number;

  CSS_STYLE: string;
}
/**
* Menus
*/

export class Menus extends EditorUi {
  constructor(EditorUI: EditorUi);

  /**
   * Sets the default font family
   */
  defaultFont: string;
  /**
   * Sets the default font size
   */
  defaultFontSoze: string;
  /**
   * Sets the default font size
   */
  defaultMenuItems: Array<string>;
  /**
   * Adds the label menu items to the given menu and parent
   */
  defaultFonts: Array<string>;
  /**
   * Adds the label menu items to the given menu and parent
   */
  init(): void;
  /**
   * Adds the label menu items to the given menu and parent
   */
  put(name: string, menu?: any): any;
  /**
   * Adds the label menu items to the given menu and parent
   */
  get(name: string): Object;
  /**
   * Adds the given submenu
   */
  addSubmenu(name: string, menu: Menus, parent: any, label: any): any;
  /**
   * Adds the label menu items to the given menu and parent
   */
  addMenu(name: string, menu: any, submenu: any): void;
  /**
   * Adds a menu item to insert a table
   */
  addInsertTableItem(menu: any, insertFn: any): void;
  /**
   * Adds a style change item to the given menu
   */
  edgeStyleChange(menu: any, label?: string, keys?: Array<string>, values?: any, sprite?: any, parent?: any, reset?: any): any;
  /**
   * Adds a style change item to the given menu.
   */
  styleChange(menu: any, label: any, keys?: any, values?: any, sprite?: any, parent?: any, fn?: any, post?: any)

  createStyleChangeFunction(keys: any, values: any): void;
  /**
 * Creates the keyboard event handler for the current graph and history.
 */
  addMenuItem(menu: any, key: any, parent?: any, trigger?: any, sprite?: any, label?: any)
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  addMenuItems(menu: any, keys: any, parent?: any, trigger?: any, sprites?: any)
  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  createPopupMenu(menu: any, cell: any, evt: any)



  createMenus(): Menus;

}

export class Menu extends mxEventSource {
  constructor(funct: any, enabled?: boolean)
  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  isEnabled(): any;

  /**
   * Sets the enabled state of the action and fires a stateChanged event
   */
  setEnabled(value: any): void;
  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  execute(menu: Menus, parent: any): void;
}

/**
* Sidebar
*/

export class Sidebar{
  constructor(editorUi: EditorUi, container: Object);

  /**
   * Adds all palettes to the sidebar.
   */
  init(): void;
  /**
   * Sets the default font size.
   */
  collapsedImage: string;
  /**
   * Sets the default font size.
   */
  expandedImage: string;
  /**
   * 
   */
  searchImage: string;
  /**
   * Specifies if tooltips should be visible. Default is true.
   */
  dragPreviewBorder: boolean;
  /**
   * Specifies if tooltips should be visible
   * @default true
   */
  enableTooltips: boolean;
  /**
   * Specifies the delay for the tooltip.
   * @default 16
   */
  tooltipBorder: number;
  /**
   * Specifies the delay for the tooltip.
   * @default 300
   */
  tooltipDelay: number;
  /**
   * Specifies the delay for the drop target icons.
   * @default 200
   */
  dropTargetDelay: number;
  /**
   * Specifies the URL of the gear image.
   */
  gearImage: string;
  /**
   * Specifies the width of the thumbnails.
   */
  thumbWidth: number;
  /**
   * Specifies the height of the thumbnails.
   */
  thumbHeight: number;
  /**
   * Specifies the widht of the thumbnails.
   */
  minThumbStrokeWidth: number;
  /**
   * Specifies the padding for the thumbnails.
   * @default 3
   */
  thumbPadding: number;
  /**
   * Specifies the delay for the tooltip
   * @default 2
   */
  thumbBorder: number;
  /**
   * Specifies the size of the sidebar titles.
   */
  sidebarTitleSize: number;
  /**
   * Specifies if titles in the sidebar should be enabled.
   */
  sidebarTitles: boolean;
  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  tooltipTitles: boolean;
  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  maxTooltipWidth: number;
  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  maxTooltipHeight: number;
  /**
   * Specifies if stencils files should be loaded and added to the search index
   * when stencil palettes are added. If this is false when the stencilfiles
   * are lazy-loaded when the palette is shown.
   */
  addStencilsToIndex: boolean;
  /**
   * Specifies the width for clipart images.
   * @default 80
   */
  defaultImageWidth: number;
  /**
   * SPecifies the height for clipart images.
   * @default 80
   */
  defaultImageHeight: number;
  /**
   * Adds all palettes to the sidebar.
   */
  getTooltipOffset(): mxPoint;
  /**
   * Adds app palettes to the sidebar11
   */
  showTooltip(elt: any, cells: mxCell[], w: number, h: number, title?: string, showLabel?: boolean)
  /**
   * Hides the current tooltip
   */
  hideTooltip(): void;
  /**
   * Hides the current tooltip
   */
  addDataEntry(tags: string, width: number, height: number, title?: string, data?: any): any;
  /**
   * Adds the given entries to the search index.
   */
  addEntries(images: Array<any>): any;
  /**
   * Hides the current tooltip.
   */
  addEntry(tags: string, fn: any): any;
  /**
   * Adds shape search UI.
   */
  searchEntries(searchTerms: string, count: number, page?: number, success?: any, error?: any): any;
  /**
   * Adds shape search UI
   */
  filterTags(tags: string): any;
  /**
   * Adds the general palette to the sidebar.
   */
  cloneCell(cell: mxCell, value: any): mxCell;
  /**
   * Adds shape search UI.
   */
  addSearchPalette(expand: boolean);
  /**
   * Adds the general palette to hthe sidebar.
   */
  insertSearchHint(div: HTMLElement, searchTerm?: any, count?: any, page?: any, results?: any, len?: any, more?: any, terms?: any);
  /**
   * Adds the genral palette to the sidebar.
   */
  addGeneralPalette(expand: boolean): void;
  /**
   * Adds the general palette tot he sidebar.
   */
  addMiscPalette(expand: boolean): any;
  /**
   * Adds the container palette to the sidebar.
   */
  addAdvancedPalette(expand: boolean): any;
  /**
   * Adds the container palette to the sidebar.
   */
  createAdvancedShaped(): Array<any>;
  /**
   * Adds the general palette to the sidebar.
   */
  addUmlPalette(expand: boolean): any;
  /**
   * Adds the BPMN library to the sidebar.
   */
  addBpmnPalette(dir: any, expand: any): any;
  /**
   * Creates and returns the given title element.
   */
  createTitle(label: string): any;
  /**
   * Creates a thumbnail for the given cells.
   */
  createThumb(cells: mxCell, width: number, height: number, parent?: any, title?: any, showLable?: boolean, showTitle?: boolean, realWidth?: any, realHeight?: any): any;
  /**
   * Creates and returns a new palette item for the given image.
   */
  createItem(cells: mxCell, title: string, showLabel?: boolean, showTitle?: boolean, width?: number, height?: number, allowCellsInserted?: any): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  updateShapes(source: any, targets?: any): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createDropHandler(cells: mxCell, allowSplit?: boolean, allowCellsInserted?: boolean, bounds?: any): any;
  /**
   * Creates and returns a preview element for the given width and height.
   */
  createDragPreview(width: number, height: number): any;
  /**
   * Creates a drag source for the given element.
   */
  dropAndConnect(source?: any, targets?: any, direction?: any, dropCellIndex?: any, evt?: any): any;
  /**
   * Creates a drag source for the given element.
   */
  getDropAndConnectGeometry(source: any, target?: any, direction?: any, targets?: any): any;
  /**
   * Limits drop style to non-transparent source shapes.
   */
  isDropStyleEnabled(cells: mxCell, firstVertex?: string): boolean;
  /**
   * Ignored swimlanes as drop style targets.
   */
  isDropStyleTargetIgnored(state?: any): any;
  /**
   * Creates a drag source for the given element.
   */
  createDragSource(elt: any, dropHandler?: any, preview?: any, cells?: any, bounds?: any): any;
  /**
   * Adds a handler for inserting the cell with a single click.
   */
  itemClicked(cells: mxCell, ds?: any, evt?: any, elt?: any): void;
  /**
   * Adds a handler for inserting the cell with a single click.
   */
  addClickHandler(elt: HTMLElement, ds?: any, cells?: mxCell): void;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createVertexTemplateEntry(style: string, width: number, height: number, value?: string, title?: string, showLabel?: boolean, showTitle?: boolean, tags?: string): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createVertexTemplate(style: string, width: number, height: number, value?: string, title?: string, showLabel?: boolean, showTitle?: boolean, allowCellsInserted?: boolean): any;
  /**
   * Creates a drop handle for inserting the given cells.
   */
  createVertexTemplateFromData(data: string, width: number, height: number, title: string, showLabel?: boolean, showTitle?: boolean, allowCellsInserted?: boolean): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createVertexTemplateFromCells(cells: mxCell, width: number, height: number, title?: string, showLabel?: boolean, showTitle?: boolean, allowCellsInserted?: boolean): any;
  /**
   * 
   */
  createEdgeTemplateEntry(style: string, width: number, height: number, value?: string, title?: string, showLabel?: boolean, tags?: any, allowCellsInserted?: boolean): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createEdgeTemplate(style: string, width: number, height: number, value?: string, title?: string, showLabel?: boolean, allowCellsInserted?: boolean): any;
  /**
   * Creates a drop handler for inserting the given cells.
   */
  createEdgeTemplateFromCells(cells: mxCell, width: number, height: number, title?: string, showLabel?: boolean, allowCellsInserted?: boolean): any;
  /**
   * Adds the given palette.
   */
  addPaletteFunctions(id: string, title: string, expanded?: boolean, fns?: any): void;
  /**
   * Adds the given palette.
   */
  addPalette(id: string, title: string, expanded?: boolean, onInit?: any): HTMLElement;
  /**
   * Create the given title element.
   */
  addFoldingHandler(title: string, content: any, funct: any): any;
  /**
   * Removes the palette for the given ID.
   */
  removePalette(id: any): boolean;
  /**
   * Adds the given image palette.
   */
  addImagePalette(id: string, title: string, prefix: string, postfix: string, items?: Array<string>, titles?: any, tags?: any): void;
  /**
   * Creates the array of tags for the given stencil. Duplicates are allowed and wil be filtered out later.
   */
  getTagsForStencil(packageName: string, stencilName: string, moreTags?: string): string;
  /**
   * Adds the given stencil palette.
   */
  addStencilPalette(id: string, title: string, stencilFile: string, stye: string, ignore?: boolean, onInit?: boolean, scale?: boolean, tags?: any, customFns?: any): void;
  /**
   * Adds the given stencil palette
   */
  destroy();

}


/**
* Toolbar
*/

export class Toolbar{
  /**
   * Image for the dropdown arrow.
   */
  dropdownImage: string;
  /**
   * Image element for the dropdown arrow.
   */
  dropdownImageHtml: string;
  /**
   * Defines the background for selected buttons.
   */
  selectedBackground: string;
  /**
   * Defines the background for selected buttons.
   */
  unselectedBackground: string;
  /**
   * Array that contains the DOM nodes that should never be removed.
   */
  staticElements: boolean;
  /**
   * Adds the toolbar elements.
   */
  init(): void;
  /**
   * Adds the toolbar elements.
   */
  addDropDownArrow(menu: HTMLElement, sprite: string, width: number, atlasWidth?: number, left?: number, top?: number, atlasLeft?: number): void;
  /**
   * Sets the current font name.
   */
  setFontName(value: string): void;
  /**
   * Sets the current font name.
   */
  setFontSize(value: string): void;
  /**
   * Hides the current Menu.
   */
  createTextToolbar(): void;
  /**
   * Hides the current menu.
   */
  hideMenu(): void;
  /**
   * Adds a lable to the toolbar.
   */
  addMenu(label: string, tooltip: string, showLabels: boolean, name?: string, c?: boolean, showAll?: boolean, ignoreState?: boolean): any;
  /**
   * Adds a label to the toolbar.
   */
  addMenuFunction(label: string, tooltip: string, showLabels: boolean, funct: any, c: boolean, showAll: boolean): any;
  /**
   * Adds a label to the toolbar.
   */
  addMenuFunctionInContainer(container: any, label: string, tooltip: string, showLabels: boolean, funct: any, showAll: boolean): any;
  /**
   * Adds a separator to the separator.
   */
  addSperator(c?: any): any;
  /**
   * Adds given action item
   */
  addItems(keys: Array<string>, c?: any, ignoreDisabled?: boolean): any;
  /**
   * Adds a button to the toolbar.
   */
  addButton(classname: string, tooltip?: any, funct?: any, c?: boolean): any;
  /**
   * Initialized the given toolbar element.
   */
  initElement(elt: any, tooltip: string): void;
  /**
   * Adds enabled state with setter to DOM node (avaoids JS wrapper).
   */
  addEnabledState(elt: any): void;
  /**
   * Adds enabled state with setter to DOM node (avoids JS wrapper).
   */
  addClickHandler(elt: any, funct: any): void;
  /**
   * Creates and returns a new button.
   */
  createButton(classname: string): any;
  /**
   * Creates and returns a new button.
   */
  createLabel(label: string, tooltip?: boolean): any;
  /**
   * Adds a handler for showing a menu in the given element.
   */
  addMenuHandler(elt: any, showLabels?: string, funct?: any, showAll?: any): void;
  /**
   * Adds a handler for showing a menu in the given element.
   */
  destroy(): void;
}


/**
* @class mxEvent
*
* Cross-browser DOM event support. For internal event handling,
* {@link mxEventSource} and the graph event dispatch loop in {@link mxGraph} are used.
*
* ### Memory Leaks:
*
* Use this class for adding and removing listeners to/from DOM nodes. The
* {@link removeAllListeners} function is provided to remove all listeners that
* have been added using {@link addListener}. The function should be invoked when
* the last reference is removed in the JavaScript code, typically when the
* referenced DOM node is removed from the DOM.
*/
declare class mxEvent {

/**
 * Binds the function to the specified event on the given element. Use
 * {@link mxUtils.bind} in order to bind the "this" keyword inside the function
 * to a given execution scope.
 */
static addListener(element: Node | Window, eventName: string, funct: Function): void;

/**
 * Removes the specified listener from the given element.
 */
static removeListener(element: Node | Window, eventName: string, funct: Function): void;

/**
 * Removes all listeners from the given element.
 */
static removeAllListeners(element: Node | Window): void;

/**
 * Adds the given listeners for touch, mouse and/or pointer events. If
 * {@link mxClient.IS_POINTER} is true then pointer events will be registered,
 * else the respective mouse events will be registered. If {@link mxClient.IS_POINTER}
 * is false and {@link mxClient.IS_TOUCH} is true then the respective touch events
 * will be registered as well as the mouse events.
 */
static addGestureListeners(node: Node | Window, startListener: Function, moveListener?: Function, endListener?: Function): void;

/**
 * Removes the given listeners from mousedown, mousemove, mouseup and the
 * respective touch events if {@link mxClient.IS_TOUCH} is true.
 */
static removeGestureListeners(node: Node | Window, startListener: Function, moveListener?: Function, endListener?: Function): void;

/**
 * Redirects the mouse events from the given DOM node to the graph dispatch
 * loop using the event and given state as event arguments. State can
 * either be an instance of {@link mxCellState} or a function that returns an
 * {@link mxCellState}. The down, move, up and dblClick arguments are optional
 * functions that take the trigger event as arguments and replace the
 * default behaviour.
 */
static redirectMouseEvents(node: Node | Window, graph: mxGraph,
  state: ((event: Event) => mxCellState) | mxCellState,
  down?: Function, move?: Function, up?: Function, dblClick?: Function): void;

/**
 * Removes the known listeners from the given DOM node and its descendants.
 *
 * @param element DOM node to remove the listeners from.
 */
static release(element: Node | Window): void;

/**
 * Installs the given function as a handler for mouse wheel events. The
 * function has two arguments: the mouse event and a boolean that specifies
 * if the wheel was moved up or down.
 *
 * This has been tested with IE 6 and 7, Firefox (all versions), Opera and
 * Safari. It does currently not work on Safari for Mac.
 *
 * ### Example
 *
 * @example
 * ```javascript
 * mxEvent.addMouseWheelListener(function (evt, up)
 * {
 *   mxLog.show();
 *   mxLog.debug('mouseWheel: up='+up);
 * });
 * ```
 *
 * @param funct Handler function that takes the event argument and a boolean up
 * argument for the mousewheel direction.
 * @param target Target for installing the listener in Google Chrome. See
 * https://www.chromestatus.com/features/6662647093133312.
 */
static addMouseWheelListener(funct: (event: Event, up: boolean) => void, target?: Node | Window): void;

/**
 * Disables the context menu for the given element.
 */
static disableContextMenu(element: Node): void;

/**
 * Returns the event's target or srcElement depending on the browser.
 */
static getSource<T extends EventTarget = any>(evt: Event): T;

/**
 * Returns true if the event has been consumed using {@link consume}.
 */
static isConsumed(evt: mxEventObject | mxMouseEvent | Event): boolean;

/**
 * Returns true if the event was generated using a touch device (not a pen or mouse).
 */
static isTouchEvent(evt: Event): boolean;

/**
 * Returns true if the event was generated using a pen (not a touch device or mouse).
 */
static isPenEvent(evt: Event): boolean;

/**
 * Returns true if the event was generated using a touch device (not a pen or mouse).
 */
static isMultiTouchEvent(evt: Event): boolean;

/**
 * Returns true if the event was generated using a mouse (not a pen or touch device).
 */
static isMouseEvent(evt: Event): boolean;

/**
 * Returns true if the left mouse button is pressed for the given event.
 * To check if a button is pressed during a mouseMove you should use the
 * {@link mxGraph.isMouseDown} property. Note that this returns true in Firefox
 * for control+left-click on the Mac.
 */
static isLeftMouseButton(evt: MouseEvent): boolean;

/**
 * Returns true if the middle mouse button is pressed for the given event.
 * To check if a button is pressed during a mouseMove you should use the
 * {@link mxGraph.isMouseDown} property.
 */
static isMiddleMouseButton(evt: MouseEvent): boolean;

/**
 * Returns true if the right mouse button was pressed. Note that this
 * button might not be available on some systems. For handling a popup
 * trigger {@link isPopupTrigger} should be used.
 */
static isRightMouseButton(evt: MouseEvent): boolean;

/**
 * Returns true if the event is a popup trigger. This implementation
 * returns true if the right button or the left button and control was
 * pressed on a Mac.
 */
static isPopupTrigger(evt: Event): boolean;

/**
 * Returns true if the shift key is pressed for the given event.
 */
static isShiftDown(evt: MouseEvent): boolean;

/**
 * Returns true if the alt key is pressed for the given event.
 */
static isAltDown(evt: MouseEvent): boolean;

/**
 * Returns true if the control key is pressed for the given event.
 */
static isControlDown(evt: MouseEvent): boolean;

/**
 * Returns true if the meta key is pressed for the given event.
 */
static isMetaDown(evt: MouseEvent): boolean;

/**
 * Returns the touch or mouse event that contains the mouse coordinates.
 */
static getMainEvent(e: TouchEvent): Touch;
static getMainEvent(e: MouseEvent): MouseEvent;

/**
 * Returns true if the meta key is pressed for the given event.
 */
static getClientX(e: TouchEvent | MouseEvent): number

/**
 * Returns true if the meta key is pressed for the given event.
 */
static getClientY(e: TouchEvent | MouseEvent): number;

/**
 * Consumes the given event.
 *
 * @param evt Native event to be consumed.
 * @param preventDefault Optional boolean to prevent the default for the event.
 * Default is true.
 * @param stopPropagation Option boolean to stop event propagation. Default is
 * true.
 */
static consume(evt: Event, preventDefault?: boolean, stopPropagation?: boolean): void;

/**
 * Index for the label handle in an mxMouseEvent. This should be a negative
 * value that does not interfere with any possible handle indices.
 * @default -1
 */
static LABEL_HANDLE: -1;

/**
 * Index for the rotation handle in an mxMouseEvent. This should be a
 * negative value that does not interfere with any possible handle indices.
 * @default -2
 */
static ROTATION_HANDLE: -2;

/**
 * Start index for the custom handles in an mxMouseEvent. This should be a
 * negative value and is the start index which is decremented for each
 * custom handle.
 * @default -100
 */
static CUSTOM_HANDLE: -100;

/**
 * Start index for the virtual handles in an mxMouseEvent. This should be a
 * negative value and is the start index which is decremented for each
 * virtual handle.
 * This assumes that there are no more
 * than VIRTUAL_HANDLE - CUSTOM_HANDLE custom handles.
 *
 * @default -100000
 */
static VIRTUAL_HANDLE: -100000;

//
// Event names
//

/**
 * Specifies the event name for mouseDown.
 */
static MOUSE_DOWN: 'mouseDown';

/**
 * Specifies the event name for mouseMove.
 */
static MOUSE_MOVE: 'mouseMove';

/**
 * Specifies the event name for mouseUp.
 */
static MOUSE_UP: 'mouseUp';

/**
 * Specifies the event name for activate.
 */
static ACTIVATE: 'activate';

/**
 * Specifies the event name for resizeStart.
 */
static RESIZE_START: 'resizeStart';

/**
 * Specifies the event name for resize.
 */
static RESIZE: 'resize';

/**
 * Specifies the event name for resizeEnd.
 */
static RESIZE_END: 'resizeEnd';

/**
 * Specifies the event name for moveStart.
 */
static MOVE_START: 'moveStart';

/**
 * Specifies the event name for move.
 */
static MOVE: 'move';

/**
 * Specifies the event name for moveEnd.
 */
static MOVE_END: 'moveEnd';

/**
 * Specifies the event name for panStart.
 */
static PAN_START: 'panStart';

/**
 * Specifies the event name for pan.
 */
static PAN: 'pan';

/**
 * Specifies the event name for panEnd.
 */
static PAN_END: 'panEnd';

/**
 * Specifies the event name for minimize.
 */
static MINIMIZE: 'minimize';

/**
 * Specifies the event name for normalize.
 */
static NORMALIZE: 'normalize';

/**
 * Specifies the event name for maximize.
 */
static MAXIMIZE: 'maximize';

/**
 * Specifies the event name for hide.
 */
static HIDE: 'hide';

/**
 * Specifies the event name for show.
 */
static SHOW: 'show';

/**
 * Specifies the event name for close.
 */
static CLOSE: 'close';

/**
 * Specifies the event name for destroy.
 */
static DESTROY: 'destroy';

/**
 * Specifies the event name for refresh.
 */
static REFRESH: 'refresh';

/**
 * Specifies the event name for size.
 */
static SIZE: 'size';

/**
 * Specifies the event name for select.
 */
static SELECT: 'select';

/**
 * Specifies the event name for fired.
 */
static FIRED: 'fired';

/**
 * Specifies the event name for fireMouseEvent.
 */
static FIRE_MOUSE_EVENT: 'fireMouseEvent';

/**
 * Specifies the event name for gesture.
 */
static GESTURE: 'gesture';

/**
 * Specifies the event name for tapAndHold.
 */
static TAP_AND_HOLD: 'tapAndHold';

/**
 * Specifies the event name for get.
 */
static GET: 'get';

/**
 * Specifies the event name for receive.
 */
static RECEIVE: 'receive';

/**
 * Specifies the event name for connect.
 */
static CONNECT: 'connect';

/**
 * Specifies the event name for disconnect.
 */
static DISCONNECT: 'disconnect';

/**
 * Specifies the event name for suspend.
 */
static SUSPEND: 'suspend';

/**
 * Specifies the event name for suspend.
 */
static RESUME: 'resume';

/**
 * Specifies the event name for mark.
 */
static MARK: 'mark';

/**
 * Specifies the event name for root.
 */
static ROOT: 'root';

/**
 * Specifies the event name for post.
 */
static POST: 'post';

/**
 * Specifies the event name for open.
 */
static OPEN: 'open';

/**
 * Specifies the event name for open.
 */
static SAVE: 'save';

/**
 * Specifies the event name for beforeAddVertex.
 */
static BEFORE_ADD_VERTEX: 'beforeAddVertex';

/**
 * Specifies the event name for addVertex.
 */
static ADD_VERTEX: 'addVertex';

/**
 * Specifies the event name for afterAddVertex.
 */
static AFTER_ADD_VERTEX: 'afterAddVertex';

/**
 * Specifies the event name for done.
 */
static DONE: 'done';

/**
 * Specifies the event name for execute.
 */
static EXECUTE: 'execute';

/**
 * Specifies the event name for executed.
 */
static EXECUTED: 'executed';

/**
 * Specifies the event name for beginUpdate.
 */
static BEGIN_UPDATE: 'beginUpdate';

/**
 * Specifies the event name for startEdit.
 */
static START_EDIT: 'startEdit';

/**
 * Specifies the event name for endUpdate.
 */
static END_UPDATE: 'endUpdate';

/**
 * Specifies the event name for endEdit.
 */
static END_EDIT: 'endEdit';

/**
 * Specifies the event name for beforeUndo.
 */
static BEFORE_UNDO: 'beforeUndo';

/**
 * Specifies the event name for undo.
 */
static UNDO: 'undo';

/**
 * Specifies the event name for redo.
 */
static REDO: 'redo';

/**
 * Specifies the event name for change.
 */
static CHANGE: 'change';

/**
 * Specifies the event name for notify.
 */
static NOTIFY: 'notify';

/**
 * Specifies the event name for layoutCells.
 */
static LAYOUT_CELLS: 'layoutCells';

/**
 * Specifies the event name for click.
 */
static CLICK: 'click';

/**
 * Specifies the event name for scale.
 */
static SCALE: 'scale';

/**
 * Specifies the event name for translate.
 */
static TRANSLATE: 'translate';

/**
 * Specifies the event name for scaleAndTranslate.
 */
static SCALE_AND_TRANSLATE: 'scaleAndTranslate';

/**
 * Specifies the event name for up.
 */
static UP: 'up';

/**
 * Specifies the event name for down.
 */
static DOWN: 'down';

/**
 * Specifies the event name for add.
 */
static ADD: 'add';

/**
 * Specifies the event name for remove.
 */
static REMOVE: 'remove';

/**
 * Specifies the event name for clear.
 */
static CLEAR: 'clear';

/**
 * Specifies the event name for addCells.
 */
static ADD_CELLS: 'addCells';

/**
 * Specifies the event name for cellsAdded.
 */
static CELLS_ADDED: 'cellsAdded';

/**
 * Specifies the event name for moveCells.
 */
static MOVE_CELLS: 'moveCells';

/**
 * Specifies the event name for cellsMoved.
 */
static CELLS_MOVED: 'cellsMoved';

/**
 * Specifies the event name for resizeCells.
 */
static RESIZE_CELLS: 'resizeCells';

/**
 * Specifies the event name for cellsResized.
 */
static CELLS_RESIZED: 'cellsResized';

/**
 * Specifies the event name for toggleCells.
 */
static TOGGLE_CELLS: 'toggleCells';

/**
 * Specifies the event name for cellsToggled.
 */
static CELLS_TOGGLED: 'cellsToggled';

/**
 * Specifies the event name for orderCells.
 */
static ORDER_CELLS: 'orderCells';

/**
 * Specifies the event name for cellsOrdered.
 */
static CELLS_ORDERED: 'cellsOrdered';

/**
 * Specifies the event name for removeCells.
 */
static REMOVE_CELLS: 'removeCells';

/**
 * Specifies the event name for cellsRemoved.
 */
static CELLS_REMOVED: 'cellsRemoved';

/**
 * Specifies the event name for groupCells.
 */
static GROUP_CELLS: 'groupCells';

/**
 * Specifies the event name for ungroupCells.
 */
static UNGROUP_CELLS: 'ungroupCells';

/**
 * Specifies the event name for removeCellsFromParent.
 */
static REMOVE_CELLS_FROM_PARENT: 'removeCellsFromParent';

/**
 * Specifies the event name for foldCells.
 */
static FOLD_CELLS: 'foldCells';

/**
 * Specifies the event name for cellsFolded.
 */
static CELLS_FOLDED: 'cellsFolded';

/**
 * Specifies the event name for alignCells.
 */
static ALIGN_CELLS: 'alignCells';

/**
 * Specifies the event name for labelChanged.
 */
static LABEL_CHANGED: 'labelChanged';

/**
 * Specifies the event name for connectCell.
 */
static CONNECT_CELL: 'connectCell';

/**
 * Specifies the event name for cellConnected.
 */
static CELL_CONNECTED: 'cellConnected';

/**
 * Specifies the event name for splitEdge.
 */
static SPLIT_EDGE: 'splitEdge';

/**
 * Specifies the event name for flipEdge.
 */
static FLIP_EDGE: 'flipEdge';

/**
 * Specifies the event name for startEditing.
 */
static START_EDITING: 'startEditing';

/**
 * Specifies the event name for editingStarted.
 */
static EDITING_STARTED: 'editingStarted';

/**
 * Specifies the event name for editingStopped.
 */
static EDITING_STOPPED: 'editingStopped';

/**
 * Specifies the event name for addOverlay.
 */
static ADD_OVERLAY: 'addOverlay';

/**
 * Specifies the event name for removeOverlay.
 */
static REMOVE_OVERLAY: 'removeOverlay';

/**
 * Specifies the event name for updateCellSize.
 */
static UPDATE_CELL_SIZE: 'updateCellSize';

/**
 * Specifies the event name for escape.
 */
static ESCAPE: 'escape';

/**
 * Specifies the event name for doubleClick.
 */
static DOUBLE_CLICK: 'doubleClick';

/**
 * Specifies the event name for start.
 */
static START: 'start';

/**
 * Specifies the event name for reset.
 */
static RESET: 'reset';

}


/**
* @class mxConstants
*/
declare class mxConstants {

/**
 * Defines the portion of the cell which is to be used as a connectable
 * region. Default is 0.3. Possible values are 0 < x <= 1.
 * @default 0.3
 */
static DEFAULT_HOTSPOT: number;

/**
 * Defines the minimum size in pixels of the portion of the cell which is
 * to be used as a connectable region. Default is 8.
 * @default 8
 */
static MIN_HOTSPOT_SIZE: number;

/**
 * Defines the maximum size in pixels of the portion of the cell which is
 * to be used as a connectable region. Use 0 for no maximum. Default is 0.
 * @default 0
 */
static MAX_HOTSPOT_SIZE: number;

/**
 * Defines the exact rendering hint.
 */
static RENDERING_HINT_EXACT: 'exact';

/**
 * Defines the faster rendering hint.
 */
static RENDERING_HINT_FASTER: 'faster';

/**
 * Defines the fastest rendering hint.
 */
static RENDERING_HINT_FASTEST: 'fastest';

/**
 * Defines the SVG display dialect name.
 */
static DIALECT_SVG: 'svg';

/**
 * Defines the VML display dialect name.
 */
static DIALECT_VML: 'vml';

/**
 * Defines the mixed HTML display dialect name.
 */
static DIALECT_MIXEDHTML: 'mixedHtml';

/**
 * Defines the preferred HTML display dialect name.
 */
static DIALECT_PREFERHTML: 'preferHtml';

/**
 * Defines the strict HTML display dialect.
 */
static DIALECT_STRICTHTML: 'strictHtml';

/**
 * Defines the SVG namespace.
 */
static NS_SVG: 'http://www.w3.org/2000/svg';

/**
 * Defines the XHTML namespace.
 */
static NS_XHTML: 'http://www.w3.org/1999/xhtml';

/**
 * Defines the XLink namespace.
 */
static NS_XLINK: 'http://www.w3.org/1999/xlink';

/**
 * Defines the color to be used to draw shadows in shapes and windows.
 * @default gray
 */
static SHADOWCOLOR: string;

/**
 * Used for shadow color in filters where transparency is not supported
 * (Microsoft Internet Explorer). Default is gray.
 *
 * @default gray
 */
static VML_SHADOWCOLOR: string;

/**
 * Specifies the x-offset of the shadow. Default is 2.
 * @default 2
 */
static SHADOW_OFFSET_X: number;

/**
 * Specifies the y-offset of the shadow. Default is 3.
 * @default 3
 */
static SHADOW_OFFSET_Y: number;

/**
 * Defines the opacity for shadows. Default is 1.
 * @default 1
 */
static SHADOW_OPACITY: number;

/**
 * DOM node of type ELEMENT.
 * @default 1
 */
static NODETYPE_ELEMENT: 1;

/**
 * DOM node of type ATTRIBUTE.
 * @default 2
 */
static NODETYPE_ATTRIBUTE: number;

/**
 * DOM node of type TEXT.
 * @default 3
 */
static NODETYPE_TEXT: number;

/**
 * DOM node of type CDATA.
 * @default 4
 */
static NODETYPE_CDATA: number;

/**
 * DOM node of type ENTITY_REFERENCE.
 * @default 5
 */
static NODETYPE_ENTITY_REFERENCE: number;

/**
 * DOM node of type ENTITY.
 * @default 6
 */
static NODETYPE_ENTITY: number;

/**
 * DOM node of type PROCESSING_INSTRUCTION.
 * @default 7
 */
static NODETYPE_PROCESSING_INSTRUCTION: number;

/**
 * DOM node of type COMMENT.
 * @default 8
 */
static NODETYPE_COMMENT: number;

/**
 * DOM node of type DOCUMENT.
 * @default 9
 */
static NODETYPE_DOCUMENT: number;

/**
 * DOM node of type DOCUMENTTYPE.
 * @default 10
 */
static NODETYPE_DOCUMENTTYPE: number;

/**
 * DOM node of type DOCUMENT_FRAGMENT.
 * @default 11
 */
static NODETYPE_DOCUMENT_FRAGMENT: number;

/**
 * DOM node of type NOTATION.
 * @default 12
 */
static NODETYPE_NOTATION: number;

/**
 * Defines the vertical offset for the tooltip.
 * Default is 16.
 * @default 16
 */
static TOOLTIP_VERTICAL_OFFSET: number;

/**
 * Specifies the default valid color. Default is #0000FF.
 * @default #00FF00
 */
static DEFAULT_VALID_COLOR: string;

/**
 * Specifies the default invalid color. Default is #FF0000.
 * @default #FF0000
 */
static DEFAULT_INVALID_COLOR: string;

/**
 * Specifies the default highlight color for shape outlines.
 * Default is #0000FF. This is used in <mxEdgeHandler>.
 * @default #00FF00
 */
static OUTLINE_HIGHLIGHT_COLOR: string;

/**
 * Defines the strokewidth to be used for shape outlines.
 * Default is 5. This is used in <mxEdgeHandler>.
 * @default 5
 */
static OUTLINE_HIGHLIGHT_STROKEWIDTH: number;

/**
 * Defines the strokewidth to be used for the highlights.
 * Default is 3.
 * @default 3
 */
static HIGHLIGHT_STROKEWIDTH: number;

/**
 * Size of the constraint highlight (in px). Default is 2.
 * @default 2
 */
static HIGHLIGHT_SIZE: number;

/**
 * Opacity (in %) used for the highlights (including outline).
 * Default is 100.
 * @default 100
 */
static HIGHLIGHT_OPACITY: number;

/**
 * Defines the cursor for a movable vertex. Default is 'move'.
 */
static CURSOR_MOVABLE_VERTEX: 'move';

/**
 * Defines the cursor for a movable edge. Default is 'move'.
 */
static CURSOR_MOVABLE_EDGE: 'move';

/**
 * Defines the cursor for a movable label. Default is 'default'.
 */
static CURSOR_LABEL_HANDLE: 'default';

/**
 * Defines the cursor for a terminal handle. Default is 'pointer'.
 */
static CURSOR_TERMINAL_HANDLE: 'pointer';

/**
 * Defines the cursor for a movable bend. Default is 'crosshair'.
 */
static CURSOR_BEND_HANDLE: 'crosshair';

/**
 * Defines the cursor for a movable bend. Default is 'crosshair'.
 */
static CURSOR_VIRTUAL_BEND_HANDLE: 'crosshair';

/**
 * Defines the cursor for a connectable state. Default is 'pointer'.
 */
static CURSOR_CONNECT: 'pointer';

/**
 * Defines the color to be used for the cell highlighting.
 * Use 'none' for no color. Default is #00FF00.
 * @default #00FF00
 */
static HIGHLIGHT_COLOR: string;

/**
 * Defines the color to be used for highlighting a target cell for a new
 * or changed connection. Note that this may be either a source or
 * target terminal in the graph. Use 'none' for no color.
 * Default is #0000FF.
 * @default #0000FF
 */
static CONNECT_TARGET_COLOR: string;

/**
 * Defines the color to be used for highlighting a invalid target cells
 * for a new or changed connections. Note that this may be either a source
 * or target terminal in the graph. Use 'none' for no color. Default is
 * #FF0000.
 * @default #FF0000
 */
static INVALID_CONNECT_TARGET_COLOR: string;

/**
 * Defines the color to be used for the highlighting target parent cells
 * (for drag and drop). Use 'none' for no color. Default is #0000FF.
 * @default #0000FF
 */
static DROP_TARGET_COLOR: string;

/**
 * Defines the color to be used for the coloring valid connection
 * previews. Use 'none' for no color. Default is #FF0000.
 * @default #00FF00
 */
static VALID_COLOR: string;

/**
 * Defines the color to be used for the coloring invalid connection
 * previews. Use 'none' for no color. Default is #FF0000.
 * @default #FF0000
 */
static INVALID_COLOR: string;

/**
 * Defines the color to be used for the selection border of edges. Use
 * 'none' for no color. Default is #00FF00.
 * @default #00FF00
 */
static EDGE_SELECTION_COLOR: string;

/**
 * Defines the color to be used for the selection border of vertices. Use
 * 'none' for no color. Default is #00FF00.
 * @default #00FF00
 */
static VERTEX_SELECTION_COLOR: string;

/**
 * Defines the strokewidth to be used for vertex selections.
 * Default is 1.
 * @default 1
 */
static VERTEX_SELECTION_STROKEWIDTH: number;

/**
 * Defines the strokewidth to be used for edge selections.
 * Default is 1.
 * @default 1
 */
static EDGE_SELECTION_STROKEWIDTH: number;

/**
 * Defines the dashed state to be used for the vertex selection
 * border. Default is true.
 */
static VERTEX_SELECTION_DASHED: true;

/**
 * Defines the dashed state to be used for the edge selection
 * border. Default is true.
 */
static EDGE_SELECTION_DASHED: true;

/**
 * Defines the color to be used for the guidelines in mxGraphHandler.
 * Default is #FF0000.
 * @default #FF0000
 */
static GUIDE_COLOR: string;

/**
 * Defines the strokewidth to be used for the guidelines in mxGraphHandler.
 * Default is 1.
 * @default 1
 */
static GUIDE_STROKEWIDTH: number;

/**
 * Defines the color to be used for the outline rectangle
 * border.  Use 'none' for no color. Default is #0099FF.
 * @default #0099FF
 */
static OUTLINE_COLOR: string;

/**
 * Defines the strokewidth to be used for the outline rectangle
 * stroke width. Default is 3.
 */
static OUTLINE_STROKEWIDTH: number;

/**
 * Defines the default size for handles. Default is 6.
 * @default 6
 */
static HANDLE_SIZE: number;

/**
 * Defines the default size for label handles. Default is 4.
 * @default 4
 */
static LABEL_HANDLE_SIZE: number;

/**
 * Defines the color to be used for the handle fill color. Use 'none' for
 * no color. Default is #00FF00 (green).
 * @default #00FF00
 */
static HANDLE_FILLCOLOR: string;

/**
 * Defines the color to be used for the handle stroke color. Use 'none' for
 * no color. Default is black.
 */
static HANDLE_STROKECOLOR: 'black';

/**
 * Defines the color to be used for the label handle fill color. Use 'none'
 * for no color. Default is yellow.
 */
static LABEL_HANDLE_FILLCOLOR: 'yellow';

/**
 * Defines the color to be used for the connect handle fill color. Use
 * 'none' for no color. Default is #0000FF (blue).
 * @default #0000FF
 */
static CONNECT_HANDLE_FILLCOLOR: string;

/**
 * Defines the color to be used for the locked handle fill color. Use
 * 'none' for no color. Default is #FF0000 (red).
 * @default #FF0000
 */
static LOCKED_HANDLE_FILLCOLOR: string;

/**
 * Defines the color to be used for the outline sizer fill color. Use
 * 'none' for no color. Default is #00FFFF.
 * @default #00FFFF
 */
static OUTLINE_HANDLE_FILLCOLOR: string;

/**
 * Defines the color to be used for the outline sizer stroke color. Use
 * 'none' for no color. Default is #0033FF.
 * @default #0033FF
 */
static OUTLINE_HANDLE_STROKECOLOR: string;

/**
 * Defines the default family for all fonts. Default is Arial,Helvetica.
 * @default 'Arial,Helvetica'
 */
static DEFAULT_FONTFAMILY: string;

/**
 * Defines the default size (in px). Default is 11.
 * @default 11
 */
static DEFAULT_FONTSIZE: number;

/**
 * Defines the default value for the <STYLE_TEXT_DIRECTION> if no value is
 * defined for it in the style. Default value is an empty string which means
 * the default system setting is used and no direction is set.
 */
static DEFAULT_TEXT_DIRECTION: '';

/**
 * Defines the default line height for text labels. Default is 1.2.
 * @default 1.2
 */
static LINE_HEIGHT: number;

/**
 * Defines the CSS value for the word-wrap property. Default is "normal".
 * Change this to "break-word" to allow long words to be able to be broken
 * and wrap onto the next line.
 */
static WORD_WRAP: 'normal';

/**
 * Specifies if absolute line heights should be used (px) in CSS. Default
 * is false. Set this to true for backwards compatibility.
 */
static ABSOLUTE_LINE_HEIGHT: false;

/**
 * Defines the default style for all fonts. Default is 0. This can be set
 * to any combination of font styles as follows.
 *
 * (code)
 * mxConstants.DEFAULT_FONTSTYLE = mxConstants.FONT_BOLD | mxConstants.FONT_ITALIC;
 * (end)
 * @default 0
 */
static DEFAULT_FONTSTYLE: number;

/**
 * Defines the default start size for swimlanes. Default is 40.
 * @default 40
 */
static DEFAULT_STARTSIZE: number;

/**
 * Defines the default size for all markers. Default is 6.
 * @default 6
 */
static DEFAULT_MARKERSIZE: number;

/**
 * Defines the default width and height for images used in the
 * label shape. Default is 24.
 * @default 24
 */
static DEFAULT_IMAGESIZE: number;

/**
 * Defines the length of the horizontal segment of an Entity Relation.
 * This can be overridden using <mxConstants.STYLE_SEGMENT> style.
 * Default is 30.
 */
static ENTITY_SEGMENT: number;

/**
 * Defines the rounding factor for rounded rectangles in percent between
 * 0 and 1. Values should be smaller than 0.5. Default is 0.15.
 * @default 0.15
 */
static RECTANGLE_ROUNDING_FACTOR: number;

/**
 * Defines the size of the arcs for rounded edges. Default is 20.
 * @default 20
 */
static LINE_ARCSIZE: number;

/**
 * Defines the spacing between the arrow shape and its terminals. Default is 0.
 * @default 0
 */
static ARROW_SPACING: number;

/**
 * Defines the width of the arrow shape. Default is 30.
 * @default 30
 */
static ARROW_WIDTH: number;

/**
 * Defines the size of the arrowhead in the arrow shape. Default is 30.
 * @default 30
 */
static ARROW_SIZE: number;

/**
 * Defines the rectangle for the A4 portrait page format. The dimensions
 * of this page format are 826x1169 pixels.
 */
static PAGE_FORMAT_A4_PORTRAIT: mxRectangle;

/**
 * Defines the rectangle for the A4 portrait page format. The dimensions
 * of this page format are 826x1169 pixels.
 */
static PAGE_FORMAT_A4_LANDSCAPE: mxRectangle;

/**
 * Defines the rectangle for the Letter portrait page format. The
 * dimensions of this page format are 850x1100 pixels.
 */
static PAGE_FORMAT_LETTER_PORTRAIT: mxRectangle;

/**
 * Defines the rectangle for the Letter portrait page format. The dimensions
 * of this page format are 850x1100 pixels.
 */
static PAGE_FORMAT_LETTER_LANDSCAPE: mxRectangle;

/**
 * Defines the value for none. Default is "none".
 */
static NONE: 'none';

/**
 * Defines the key for the perimeter style. This is a function that defines
 * the perimeter around a particular shape. Possible values are the
 * functions defined in <mxPerimeter>. Alternatively, the constants in this
 * class that start with "PERIMETER_" may be used to access
 * perimeter styles in <mxStyleRegistry>. Value is "perimeter".
 */
static STYLE_PERIMETER: 'perimeter';

/**
 * Defines the ID of the cell that should be used for computing the
 * perimeter point of the source for an edge. This allows for graphically
 * connecting to a cell while keeping the actual terminal of the edge.
 * Value is "sourcePort".
 */
static STYLE_SOURCE_PORT: 'sourcePort';

/**
 * Defines the ID of the cell that should be used for computing the
 * perimeter point of the target for an edge. This allows for graphically
 * connecting to a cell while keeping the actual terminal of the edge.
 * Value is "targetPort".
 */
static STYLE_TARGET_PORT: 'targetPort';

/**
 * Defines the direction(s) that edges are allowed to connect to cells in.
 * Possible values are "DIRECTION_NORTH, DIRECTION_SOUTH,
 * DIRECTION_EAST" and "DIRECTION_WEST". Value is
 * "portConstraint".
 */
static STYLE_PORT_CONSTRAINT: 'portConstraint';

/**
 * Define whether port constraint directions are rotated with vertex
 * rotation. 0 (default) causes port constraints to remain absolute,
 * relative to the graph, 1 causes the constraints to rotate with
 * the vertex. Value is "portConstraintRotation".
 */
static STYLE_PORT_CONSTRAINT_ROTATION: 'portConstraintRotation';

/**
 * Defines the direction(s) that edges are allowed to connect to sources in.
 * Possible values are "DIRECTION_NORTH, DIRECTION_SOUTH, DIRECTION_EAST"
 * and "DIRECTION_WEST". Value is "sourcePortConstraint".
 */
static STYLE_SOURCE_PORT_CONSTRAINT: 'sourcePortConstraint';

/**
 * Defines the direction(s) that edges are allowed to connect to targets in.
 * Possible values are "DIRECTION_NORTH, DIRECTION_SOUTH, DIRECTION_EAST"
 * and "DIRECTION_WEST". Value is "targetPortConstraint".
 */
static STYLE_TARGET_PORT_CONSTRAINT: 'targetPortConstraint';

/**
 * Defines the key for the opacity style. The type of the value is
 * numeric and the possible range is 0-100. Value is "opacity".
 */
static STYLE_OPACITY: 'opacity';

/**
 * Defines the key for the fill opacity style. The type of the value is
 * numeric and the possible range is 0-100. Value is "fillOpacity".
 */
static STYLE_FILL_OPACITY: 'fillOpacity';

/**
 * Defines the key for the stroke opacity style. The type of the value is
 * numeric and the possible range is 0-100. Value is "strokeOpacity".
 */
static STYLE_STROKE_OPACITY: 'strokeOpacity';

/**
 * Defines the key for the text opacity style. The type of the value is
 * numeric and the possible range is 0-100. Value is "textOpacity".
 */
static STYLE_TEXT_OPACITY: 'textOpacity';

/**
 * Defines the key for the text direction style. Possible values are
 * "TEXT_DIRECTION_DEFAULT, TEXT_DIRECTION_AUTO, TEXT_DIRECTION_LTR"
 * and "TEXT_DIRECTION_RTL". Value is "textDirection".
 * The default value for the style is defined in <DEFAULT_TEXT_DIRECTION>.
 * It is used is no value is defined for this key in a given style. This is
 * an experimental style that is currently ignored in the backends.
 */
static STYLE_TEXT_DIRECTION: 'textDirection';

/**
 * Defines the key for the overflow style. Possible values are 'visible';
 * 'hidden', 'fill' and 'width'. The default value is 'visible'. This value
 * specifies how overlapping vertex labels are handled. A value of
 * 'visible' will show the complete label. A value of 'hidden' will clip
 * the label so that it does not overlap the vertex bounds. A value of
 * 'fill' will use the vertex bounds and a value of 'width' will use the
 * the vertex width for the label. See <mxGraph.isLabelClipped>. Note that
 * the vertical alignment is ignored for overflow fill and for horizontal
 * alignment, left should be used to avoid pixel offsets in Internet Explorer
 * 11 and earlier or if foreignObjects are disabled. Value is "overflow".
 */
static STYLE_OVERFLOW: 'overflow';

/**
 * Defines if the connection points on either end of the edge should be
 * computed so that the edge is vertical or horizontal if possible and
 * if the point is not at a fixed location. Default is false. This is
 * used in <mxGraph.isOrthogonal>, which also returns true if the edgeStyle
 * of the edge is an elbow or entity. Value is "orthogonal".
 */
static STYLE_ORTHOGONAL: 'orthogonal';

/**
 * Defines the key for the horizontal relative coordinate connection point
 * of an edge with its source terminal. Value is "exitX".
 */
static STYLE_EXIT_X: 'exitX';

/**
 * Defines the key for the vertical relative coordinate connection point
 * of an edge with its source terminal. Value is "exitY".
 */
static STYLE_EXIT_Y: 'exitY';

/**
 * Defines if the perimeter should be used to find the exact entry point
 * along the perimeter of the source. Possible values are 0 (false) and
 * 1 (true). Default is 1 (true). Value is "exitPerimeter".
 */
static STYLE_EXIT_PERIMETER: 'exitPerimeter';

/**
 * Defines the key for the horizontal relative coordinate connection point
 * of an edge with its target terminal. Value is "entryX".
 */
static STYLE_ENTRY_X: 'entryX';

/**
 * Defines the key for the vertical relative coordinate connection point
 * of an edge with its target terminal. Value is "entryY".
 */
static STYLE_ENTRY_Y: 'entryY';

/**
 * Defines if the perimeter should be used to find the exact entry point
 * along the perimeter of the target. Possible values are 0 (false) and
 * 1 (true). Default is 1 (true). Value is "entryPerimeter".
 */
static STYLE_ENTRY_PERIMETER: 'entryPerimeter';

/**
 * Defines the key for the white-space style. Possible values are 'nowrap'
 * and 'wrap'. The default value is 'nowrap'. This value specifies how
 * white-space inside a HTML vertex label should be handled. A value of
 * 'nowrap' means the text will never wrap to the next line until a
 * linefeed is encountered. A value of 'wrap' means text will wrap when
 * necessary. This style is only used for HTML labels.
 * See <mxGraph.isWrapping>. Value is "whiteSpace".
 */
static STYLE_WHITE_SPACE: 'whiteSpace';

/**
 * Defines the key for the rotation style. The type of the value is
 * numeric and the possible range is 0-360. Value is "rotation".
 */
static STYLE_ROTATION: 'rotation';

/**
 * Defines the key for the fill color. Possible values are all HTML color
 * names or HEX codes, as well as special keywords such as 'swimlane;
 * 'inherit' or 'indicated' to use the color code of a related cell or the
 * indicator shape. Value is "fillColor".
 */
static STYLE_FILLCOLOR: 'fillColor';

/**
 * Specifies if pointer events should be fired on transparent backgrounds.
 * This style is currently only supported in <mxRectangleShape>. Default
 * is true. Value is "pointerEvents". This is typically set to
 * false in groups where the transparent part should allow any underlying
 * cells to be clickable.
 */
static STYLE_POINTER_EVENTS: 'pointerEvents';

/**
 * Defines the key for the fill color of the swimlane background. Possible
 * values are all HTML color names or HEX codes. Default is no background.
 * Value is "swimlaneFillColor".
 */
static STYLE_SWIMLANE_FILLCOLOR: 'swimlaneFillColor';

/**
 * Defines the key for the margin between the ellipses in the double ellipse shape.
 * Possible values are all positive numbers. Value is "margin".
 */
static STYLE_MARGIN: 'margin';

/**
 * Defines the key for the gradient color. Possible values are all HTML color
 * names or HEX codes, as well as special keywords such as 'swimlane;
 * 'inherit' or 'indicated' to use the color code of a related cell or the
 * indicator shape. This is ignored if no fill color is defined. Value is
 * "gradientColor".
 */
static STYLE_GRADIENTCOLOR: 'gradientColor';

/**
 * Defines the key for the gradient direction. Possible values are
 * <DIRECTION_EAST>, <DIRECTION_WEST>, <DIRECTION_NORTH> and
 * <DIRECTION_SOUTH>. Default is <DIRECTION_SOUTH>. Generally, and by
 * default in mxGraph, gradient painting is done from the value of
 * <STYLE_FILLCOLOR> to the value of <STYLE_GRADIENTCOLOR>. Taking the
 * example of <DIRECTION_NORTH>, this means <STYLE_FILLCOLOR> color at the
 * bottom of paint pattern and <STYLE_GRADIENTCOLOR> at top, with a
 * gradient in-between. Value is "gradientDirection".
 */
static STYLE_GRADIENT_DIRECTION: 'gradientDirection';

/**
 * Defines the key for the strokeColor style. Possible values are all HTML
 * color names or HEX codes, as well as special keywords such as 'swimlane;
 * 'inherit', 'indicated' to use the color code of a related cell or the
 * indicator shape or 'none' for no color. Value is "strokeColor".
 */
static STYLE_STROKECOLOR: 'strokeColor';

/**
 * Defines the key for the separatorColor style. Possible values are all
 * HTML color names or HEX codes. This style is only used for
 * <SHAPE_SWIMLANE> shapes. Value is "separatorColor".
 */
static STYLE_SEPARATORCOLOR: 'separatorColor';

/**
 * Defines the key for the strokeWidth style. The type of the value is
 * numeric and the possible range is any non-negative value larger or equal
 * to 1. The value defines the stroke width in pixels. Note: To hide a
 * stroke use strokeColor none. Value is "strokeWidth".
 */
static STYLE_STROKEWIDTH: 'strokeWidth';

/**
 * Defines the key for the align style. Possible values are <ALIGN_LEFT>;
 * <ALIGN_CENTER> and <ALIGN_RIGHT>. This value defines how the lines of
 * the label are horizontally aligned. <ALIGN_LEFT> mean label text lines
 * are aligned to left of the label bounds, <ALIGN_RIGHT> to the right of
 * the label bounds and <ALIGN_CENTER> means the center of the text lines
 * are aligned in the center of the label bounds. Note this value doesn't
 * affect the positioning of the overall label bounds relative to the
 * vertex, to move the label bounds horizontally, use
 * <STYLE_LABEL_POSITION>. Value is "align".
 */
static STYLE_ALIGN: 'align';

/**
 * Defines the key for the verticalAlign style. Possible values are
 * <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>. This value defines how
 * the lines of the label are vertically aligned. <ALIGN_TOP> means the
 * topmost label text line is aligned against the top of the label bounds;
 * <ALIGN_BOTTOM> means the bottom-most label text line is aligned against
 * the bottom of the label bounds and <ALIGN_MIDDLE> means there is equal
 * spacing between the topmost text label line and the top of the label
 * bounds and the bottom-most text label line and the bottom of the label
 * bounds. Note this value doesn't affect the positioning of the overall
 * label bounds relative to the vertex, to move the label bounds
 * vertically, use <STYLE_VERTICAL_LABEL_POSITION>. Value is "verticalAlign".
 */
static STYLE_VERTICAL_ALIGN: 'verticalAlign';

/**
 * Defines the key for the width of the label if the label position is not
 * center. Value is "labelWidth".
 */
static STYLE_LABEL_WIDTH: 'labelWidth';

/**
 * Defines the key for the horizontal label position of vertices. Possible
 * values are <ALIGN_LEFT>, <ALIGN_CENTER> and <ALIGN_RIGHT>. Default is
 * <ALIGN_CENTER>. The label align defines the position of the label
 * relative to the cell. <ALIGN_LEFT> means the entire label bounds is
 * placed completely just to the left of the vertex, <ALIGN_RIGHT> means
 * adjust to the right and <ALIGN_CENTER> means the label bounds are
 * vertically aligned with the bounds of the vertex. Note this value
 * doesn't affect the positioning of label within the label bounds, to move
 * the label horizontally within the label bounds, use <STYLE_ALIGN>.
 * Value is "labelPosition".
 */
static STYLE_LABEL_POSITION: 'labelPosition';

/**
 * Defines the key for the vertical label position of vertices. Possible
 * values are <ALIGN_TOP>, <ALIGN_BOTTOM> and <ALIGN_MIDDLE>. Default is
 * <ALIGN_MIDDLE>. The label align defines the position of the label
 * relative to the cell. <ALIGN_TOP> means the entire label bounds is
 * placed completely just on the top of the vertex, <ALIGN_BOTTOM> means
 * adjust on the bottom and <ALIGN_MIDDLE> means the label bounds are
 * horizontally aligned with the bounds of the vertex. Note this value
 * doesn't affect the positioning of label within the label bounds, to move
 * the label vertically within the label bounds, use
 * <STYLE_VERTICAL_ALIGN>. Value is "verticalLabelPosition".
 */
static STYLE_VERTICAL_LABEL_POSITION: 'verticalLabelPosition';

/**
 * Defines the key for the image aspect style. Possible values are 0 (do
 * not preserve aspect) or 1 (keep aspect). This is only used in
 * <mxImageShape>. Default is 1. Value is "imageAspect".
 */
static STYLE_IMAGE_ASPECT: 'imageAspect';

/**
 * Defines the key for the align style. Possible values are <ALIGN_LEFT>;
 * <ALIGN_CENTER> and <ALIGN_RIGHT>. The value defines how any image in the
 * vertex label is aligned horizontally within the label bounds of a
 * <SHAPE_LABEL> shape. Value is "imageAlign".
 */
static STYLE_IMAGE_ALIGN: 'imageAlign';

/**
 * Defines the key for the verticalAlign style. Possible values are
 * <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>. The value defines how
 * any image in the vertex label is aligned vertically within the label
 * bounds of a <SHAPE_LABEL> shape. Value is "imageVerticalAlign".
 */
static STYLE_IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign';

/**
 * Defines the key for the glass style. Possible values are 0 (disabled) and
 * 1(enabled). The default value is 0. This is used in <mxLabel>. Value is
 * "glass".
 */
static STYLE_GLASS: 'glass';

/**
 * Defines the key for the image style. Possible values are any image URL;
 * the type of the value is String. This is the path to the image that is
 * to be displayed within the label of a vertex. Data URLs should use the
 * following format: data:image/png,xyz where xyz is the base64 encoded
 * data (without the "base64"-prefix). Note that Data URLs are only
 * supported in modern browsers. Value is "image".
 */
static STYLE_IMAGE: 'image';

/**
 * Defines the key for the imageWidth style. The type of this value is
 * int, the value is the image width in pixels and must be greater than 0.
 * Value is "imageWidth".
 */
static STYLE_IMAGE_WIDTH: 'imageWidth';

/**
 * Defines the key for the imageHeight style. The type of this value is
 * int, the value is the image height in pixels and must be greater than 0.
 * Value is "imageHeight".
 */
static STYLE_IMAGE_HEIGHT: 'imageHeight';

/**
 * Defines the key for the image background color. This style is only used
 * in <mxImageShape>. Possible values are all HTML color names or HEX
 * codes. Value is "imageBackground".
 */
static STYLE_IMAGE_BACKGROUND: 'imageBackground';

/**
 * Defines the key for the image border color. This style is only used in
 * <mxImageShape>. Possible values are all HTML color names or HEX codes.
 * Value is "imageBorder".
 */
static STYLE_IMAGE_BORDER: 'imageBorder';

/**
 * Defines the key for the horizontal image flip. This style is only used
 * in <mxImageShape>. Possible values are 0 and 1. Default is 0. Value is
 * "flipH".
 */
static STYLE_FLIPH: 'flipH';

/**
 * Defines the key for the vertical flip. Possible values are 0 and 1.
 * Default is 0. Value is "flipV".
 */
static STYLE_FLIPV: 'flipV';

/**
 * Defines the key for the noLabel style. If this is true then no label is
 * visible for a given cell. Possible values are true or false (1 or 0).
 * Default is false. Value is "noLabel".
 */
static STYLE_NOLABEL: 'noLabel';

/**
 * Defines the key for the noEdgeStyle style. If this is true then no edge
 * style is applied for a given edge. Possible values are true or false
 * (1 or 0). Default is false. Value is "noEdgeStyle".
 */
static STYLE_NOEDGESTYLE: 'noEdgeStyle';

/**
 * Defines the key for the label background color. Possible values are all
 * HTML color names or HEX codes. Value is "labelBackgroundColor".
 */
static STYLE_LABEL_BACKGROUNDCOLOR: 'labelBackgroundColor';

/**
 * Defines the key for the label border color. Possible values are all
 * HTML color names or HEX codes. Value is "labelBorderColor".
 */
static STYLE_LABEL_BORDERCOLOR: 'labelBorderColor';

/**
 * Defines the key for the label padding, ie. the space between the label
 * border and the label. Value is "labelPadding".
 */
static STYLE_LABEL_PADDING: 'labelPadding';

/**
 * Defines the key for the indicator shape used within an <mxLabel>.
 * Possible values are all SHAPE_* constants or the names of any new
 * shapes. The indicatorShape has precedence over the indicatorImage.
 * Value is "indicatorShape".
 */
static STYLE_INDICATOR_SHAPE: 'indicatorShape';

/**
 * Defines the key for the indicator image used within an <mxLabel>.
 * Possible values are all image URLs. The indicatorShape has
 * precedence over the indicatorImage. Value is "indicatorImage".
 */
static STYLE_INDICATOR_IMAGE: 'indicatorImage';

/**
 * Defines the key for the indicatorColor style. Possible values are all
 * HTML color names or HEX codes, as well as the special 'swimlane' keyword
 * to refer to the color of the parent swimlane if one exists. Value is
 * "indicatorColor".
 */
static STYLE_INDICATOR_COLOR: 'indicatorColor';

/**
 * Defines the key for the indicator stroke color in <mxLabel>.
 * Possible values are all color codes. Value is "indicatorStrokeColor".
 */
static STYLE_INDICATOR_STROKECOLOR: 'indicatorStrokeColor';

/**
 * Defines the key for the indicatorGradientColor style. Possible values
 * are all HTML color names or HEX codes. This style is only supported in
 * <SHAPE_LABEL> shapes. Value is "indicatorGradientColor".
 */
static STYLE_INDICATOR_GRADIENTCOLOR: 'indicatorGradientColor';

/**
 * The defines the key for the spacing between the label and the
 * indicator in <mxLabel>. Possible values are in pixels. Value is
 * "indicatorSpacing".
 */
static STYLE_INDICATOR_SPACING: 'indicatorSpacing';

/**
 * Defines the key for the indicator width. Possible values start at 0 (in
 * pixels). Value is "indicatorWidth".
 */
static STYLE_INDICATOR_WIDTH: 'indicatorWidth';

/**
 * Defines the key for the indicator height. Possible values start at 0 (in
 * pixels). Value is "indicatorHeight".
 */
static STYLE_INDICATOR_HEIGHT: 'indicatorHeight';

/**
 * Defines the key for the indicatorDirection style. The direction style is
 * used to specify the direction of certain shapes (eg. <mxTriangle>).
 * Possible values are <DIRECTION_EAST> (default), <DIRECTION_WEST>;
 * <DIRECTION_NORTH> and <DIRECTION_SOUTH>. Value is "indicatorDirection".
 */
static STYLE_INDICATOR_DIRECTION: 'indicatorDirection';

/**
 * Defines the key for the shadow style. The type of the value is Boolean.
 * Value is "shadow".
 */
static STYLE_SHADOW: 'shadow';

/**
 * Defines the key for the segment style. The type of this value is float
 * and the value represents the size of the horizontal segment of the
 * entity relation style. Default is ENTITY_SEGMENT. Value is "segment".
 */
static STYLE_SEGMENT: 'segment';

/**
 * Defines the key for the end arrow marker. Possible values are all
 * constants with an ARROW-prefix. This is only used in <mxConnector>.
 * Value is "endArrow".
 *
 * Example:
 * (code)
 * style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
 * (end)
 */
static STYLE_ENDARROW: 'endArrow';

/**
 * Defines the key for the start arrow marker. Possible values are all
 * constants with an ARROW-prefix. This is only used in <mxConnector>.
 * See <STYLE_ENDARROW>. Value is "startArrow".
 */
static STYLE_STARTARROW: 'startArrow';

/**
 * Defines the key for the endSize style. The type of this value is numeric
 * and the value represents the size of the end marker in pixels. Value is
 * "endSize".
 */
static STYLE_ENDSIZE: 'endSize';

/**
 * Defines the key for the startSize style. The type of this value is
 * numeric and the value represents the size of the start marker or the
 * size of the swimlane title region depending on the shape it is used for.
 * Value is "startSize".
 */
static STYLE_STARTSIZE: 'startSize';

/**
 * Defines the key for the swimlaneLine style. This style specifies whether
 * the line between the title regio of a swimlane should be visible. Use 0
 * for hidden or 1 (default) for visible. Value is "swimlaneLine".
 */
static STYLE_SWIMLANE_LINE: 'swimlaneLine';

/**
 * Defines the key for the endFill style. Use 0 for no fill or 1 (default)
 * for fill. (This style is only exported via <mxImageExport>.) Value is
 * "endFill".
 */
static STYLE_ENDFILL: 'endFill';

/**
 * Defines the key for the startFill style. Use 0 for no fill or 1 (default)
 * for fill. (This style is only exported via <mxImageExport>.) Value is
 * "startFill".
 */
static STYLE_STARTFILL: 'startFill';

/**
 * Defines the key for the dashed style. Use 0 (default) for non-dashed or 1
 * for dashed. Value is "dashed".
 */
static STYLE_DASHED: 'dashed';

/**
 * Defines the key for the dashed pattern style in SVG and image exports.
 * The type of this value is a space separated list of numbers that specify
 * a custom-defined dash pattern. Dash styles are defined in terms of the
 * length of the dash (the drawn part of the stroke) and the length of the
 * space between the dashes. The lengths are relative to the line width: a
 * length of "1" is equal to the line width. VML ignores this style and
 * uses dashStyle instead as defined in the VML specification. This style
 * is only used in the <mxConnector> shape. Value is "dashPattern".
 */
static STYLE_DASH_PATTERN: 'dashPattern';

/**
 * Defines the key for the fixDash style. Use 0 (default) for dash patterns
 * that depend on the linewidth and 1 for dash patterns that ignore the
 * line width. Value is "fixDash".
 */
static STYLE_FIX_DASH: 'fixDash';

/**
 * Defines the key for the rounded style. The type of this value is
 * Boolean. For edges this determines whether or not joins between edges
 * segments are smoothed to a rounded finish. For vertices that have the
 * rectangle shape, this determines whether or not the rectangle is
 * rounded. Use 0 (default) for non-rounded or 1 for rounded. Value is
 * "rounded".
 */
static STYLE_ROUNDED: 'rounded';

/**
 * Defines the key for the curved style. The type of this value is
 * Boolean. It is only applicable for connector shapes. Use 0 (default)
 * for non-curved or 1 for curved. Value is "curved".
 */
static STYLE_CURVED: 'curved';

/**
 * Defines the rounding factor for a rounded rectangle in percent (without
 * the percent sign). Possible values are between 0 and 100. If this value
 * is not specified then RECTANGLE_ROUNDING_FACTOR * 100 is used. For
 * edges, this defines the absolute size of rounded corners in pixels. If
 * this values is not specified then LINE_ARCSIZE is used.
 * (This style is only exported via <mxImageExport>.) Value is "arcSize".
 */
static STYLE_ARCSIZE: 'arcSize';

/**
 * Defines the key for the absolute arc size style. This specifies if
 * arcSize for rectangles is abolute or relative. Possible values are 1
 * and 0 (default). Value is "absoluteArcSize".
 */
static STYLE_ABSOLUTE_ARCSIZE: 'absoluteArcSize';

/**
 * Defines the key for the source perimeter spacing. The type of this value
 * is numeric. This is the distance between the source connection point of
 * an edge and the perimeter of the source vertex in pixels. This style
 * only applies to edges. Value is "sourcePerimeterSpacing".
 */
static STYLE_SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing';

/**
 * Defines the key for the target perimeter spacing. The type of this value
 * is numeric. This is the distance between the target connection point of
 * an edge and the perimeter of the target vertex in pixels. This style
 * only applies to edges. Value is "targetPerimeterSpacing".
 */
static STYLE_TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing';

/**
 * Defines the key for the perimeter spacing. This is the distance between
 * the connection point and the perimeter in pixels. When used in a vertex
 * style, this applies to all incoming edges to floating ports (edges that
 * terminate on the perimeter of the vertex). When used in an edge style;
 * this spacing applies to the source and target separately, if they
 * terminate in floating ports (on the perimeter of the vertex). Value is
 * "perimeterSpacing".
 */
static STYLE_PERIMETER_SPACING: 'perimeterSpacing';

/**
 * Defines the key for the spacing. The value represents the spacing, in
 * pixels, added to each side of a label in a vertex (style applies to
 * vertices only). Value is "spacing".
 */
static STYLE_SPACING: 'spacing';

/**
 * Defines the key for the spacingTop style. The value represents the
 * spacing, in pixels, added to the top side of a label in a vertex (style
 * applies to vertices only). Value is "spacingTop".
 */
static STYLE_SPACING_TOP: 'spacingTop';

/**
 * Defines the key for the spacingLeft style. The value represents the
 * spacing, in pixels, added to the left side of a label in a vertex (style
 * applies to vertices only). Value is "spacingLeft".
 */
static STYLE_SPACING_LEFT: 'spacingLeft';

/**
 * Defines the key for the spacingBottom style The value represents the
 * spacing, in pixels, added to the bottom side of a label in a vertex
 * (style applies to vertices only). Value is "spacingBottom".
 */
static STYLE_SPACING_BOTTOM: 'spacingBottom';

/**
 * Defines the key for the spacingRight style The value represents the
 * spacing, in pixels, added to the right side of a label in a vertex (style
 * applies to vertices only). Value is "spacingRight".
 */
static STYLE_SPACING_RIGHT: 'spacingRight';

/**
 * Defines the key for the horizontal style. Possible values are
 * true or false. This value only applies to vertices. If the <STYLE_SHAPE>
 * is "SHAPE_SWIMLANE" a value of false indicates that the
 * swimlane should be drawn vertically, true indicates to draw it
 * horizontally. If the shape style does not indicate that this vertex is a
 * swimlane, this value affects only whether the label is drawn
 * horizontally or vertically. Value is "horizontal".
 */
static STYLE_HORIZONTAL: 'horizontal';

/**
 * Defines the key for the direction style. The direction style is used
 * to specify the direction of certain shapes (eg. <mxTriangle>).
 * Possible values are <DIRECTION_EAST> (default), <DIRECTION_WEST>;
 * <DIRECTION_NORTH> and <DIRECTION_SOUTH>. Value is "direction".
 */
static STYLE_DIRECTION: 'direction';

/**
 * Defines the key for the anchorPointDirection style. The defines if the
 * direction style should be taken into account when computing the fixed
 * point location for connected edges. Default is 1 (yes). Set this to 0
 * to ignore the direction style for fixed connection points. Value is
 * "anchorPointDirection".
 */
static STYLE_ANCHOR_POINT_DIRECTION: 'anchorPointDirection';

/**
 * Defines the key for the elbow style. Possible values are
 * <ELBOW_HORIZONTAL> and <ELBOW_VERTICAL>. Default is <ELBOW_HORIZONTAL>.
 * This defines how the three segment orthogonal edge style leaves its
 * terminal vertices. The vertical style leaves the terminal vertices at
 * the top and bottom sides. Value is "elbow".
 */
static STYLE_ELBOW: 'elbow';

/**
 * Defines the key for the fontColor style. Possible values are all HTML
 * color names or HEX codes. Value is "fontColor".
 */
static STYLE_FONTCOLOR: 'fontColor';

/**
 * Defines the key for the fontFamily style. Possible values are names such
 * as Arial; Dialog; Verdana; Times New Roman. The value is of type String.
 * Value is fontFamily.
 */
static STYLE_FONTFAMILY: 'fontFamily';

/**
 * Defines the key for the fontSize style (in px). The type of the value
 * is int. Value is "fontSize".
 */
static STYLE_FONTSIZE: 'fontSize';

/**
 * Defines the key for the fontStyle style. Values may be any logical AND
 * (sum) of <FONT_BOLD>, <FONT_ITALIC> and <FONT_UNDERLINE>.
 * The type of the value is int. Value is "fontStyle".
 */
static STYLE_FONTSTYLE: 'fontStyle';

/**
 * Defines the key for the aspect style. Possible values are empty or fixed.
 * If fixed is used then the aspect ratio of the cell will be maintained
 * when resizing. Default is empty. Value is "aspect".
 */
static STYLE_ASPECT: 'aspect';

/**
 * Defines the key for the autosize style. This specifies if a cell should be
 * resized automatically if the value has changed. Possible values are 0 or 1.
 * Default is 0. See <mxGraph.isAutoSizeCell>. This is normally combined with
 * <STYLE_RESIZABLE> to disable manual sizing. Value is "autosize".
 */
static STYLE_AUTOSIZE: 'autosize';

/**
 * Defines the key for the foldable style. This specifies if a cell is foldable
 * using a folding icon. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellFoldable>. Value is "foldable".
 */
static STYLE_FOLDABLE: 'foldable';

/**
 * Defines the key for the editable style. This specifies if the value of
 * a cell can be edited using the in-place editor. Possible values are 0 or
 * 1. Default is 1. See <mxGraph.isCellEditable>. Value is "editable".
 */
static STYLE_EDITABLE: 'editable';

/**
 * Defines the key for the backgroundOutline style. This specifies if a
 * only the background of a cell should be painted when it is highlighted.
 * Possible values are 0 or 1. Default is 0. Value is "backgroundOutline".
 */
static STYLE_BACKGROUND_OUTLINE: 'backgroundOutline';

/**
 * Defines the key for the bendable style. This specifies if the control
 * points of an edge can be moved. Possible values are 0 or 1. Default is
 * 1. See <mxGraph.isCellBendable>. Value is "bendable".
 */
static STYLE_BENDABLE: 'bendable';

/**
 * Defines the key for the movable style. This specifies if a cell can
 * be moved. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellMovable>. Value is "movable".
 */
static STYLE_MOVABLE: 'movable';

/**
 * Defines the key for the resizable style. This specifies if a cell can
 * be resized. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellResizable>. Value is "resizable".
 */
static STYLE_RESIZABLE: 'resizable';

/**
 * Defines the key for the resizeWidth style. This specifies if a cell's
 * width is resized if the parent is resized. If this is 1 then the width
 * will be resized even if the cell's geometry is relative. If this is 0
 * then the cell's width will not be resized. Default is not defined. Value
 * is "resizeWidth".
 */
static STYLE_RESIZE_WIDTH: 'resizeWidth';

/**
 * Defines the key for the resizeHeight style. This specifies if a cell's
 * height if resize if the parent is resized. If this is 1 then the height
 * will be resized even if the cell's geometry is relative. If this is 0
 * then the cell's height will not be resized. Default is not defined. Value
 * is "resizeHeight".
 */
static STYLE_RESIZE_HEIGHT: 'resizeHeight';

/**
 * Defines the key for the rotatable style. This specifies if a cell can
 * be rotated. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellRotatable>. Value is "rotatable".
 */
static STYLE_ROTATABLE: 'rotatable';

/**
 * Defines the key for the cloneable style. This specifies if a cell can
 * be cloned. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellCloneable>. Value is "cloneable".
 */
static STYLE_CLONEABLE: 'cloneable';

/**
 * Defines the key for the deletable style. This specifies if a cell can be
 * deleted. Possible values are 0 or 1. Default is 1. See
 * <mxGraph.isCellDeletable>. Value is "deletable".
 */
static STYLE_DELETABLE: 'deletable';

/**
 * Defines the key for the shape. Possible values are all constants with
 * a SHAPE-prefix or any newly defined shape names. Value is "shape".
 */
static STYLE_SHAPE: 'shape';

/**
 * Defines the key for the edge style. Possible values are the functions
 * defined in <mxEdgeStyle>. Value is "edgeStyle".
 */
static STYLE_EDGE: 'edgeStyle';

/**
 * Defines the key for the jetty size in <mxEdgeStyle.OrthConnector>.
 * Default is 10. Possible values are all numeric values or "auto".
 * Value is "jettySize".
 */
static STYLE_JETTY_SIZE: 'jettySize';

/**
 * Defines the key for the jetty size in <mxEdgeStyle.OrthConnector>.
 * Default is 10. Possible values are numeric values or "auto". This has
 * precedence over <STYLE_JETTY_SIZE>. Value is "sourceJettySize".
 */
static STYLE_SOURCE_JETTY_SIZE: 'sourceJettySize';

/**
 * Defines the key for the jetty size in <mxEdgeStyle.OrthConnector>.
 * Default is 10. Possible values are numeric values or "auto". This has
 * precedence over <STYLE_JETTY_SIZE>. Value is "targetJettySize".
 */
static STYLE_TARGET_JETTY_SIZE: 'targetJettySize';

/**
 * Defines the key for the loop style. Possible values are the functions
 * defined in <mxEdgeStyle>. Value is "loopStyle".
 */
static STYLE_LOOP: 'loopStyle';

/**
 * Defines the key for the orthogonal loop style. Possible values are 0 and
 * 1. Default is 0. Value is "orthogonalLoop". Use this style to specify
 * if loops should be routed using an orthogonal router. Currently, this
 * uses <mxEdgeStyle.OrthConnector> but will be replaced with a dedicated
 * orthogonal loop router in later releases.
 */
static STYLE_ORTHOGONAL_LOOP: 'orthogonalLoop';

/**
 * Defines the key for the horizontal routing center. Possible values are
 * between -0.5 and 0.5. This is the relative offset from the center used
 * for connecting edges. The type of this value is numeric. Value is
 * "routingCenterX".
 */
static STYLE_ROUTING_CENTER_X: 'routingCenterX';

/**
 * Defines the key for the vertical routing center. Possible values are
 * between -0.5 and 0.5. This is the relative offset from the center used
 * for connecting edges. The type of this value is numeric. Value is
 * "routingCenterY".
 */
static STYLE_ROUTING_CENTER_Y: 'routingCenterY';

/**
 * Constant for bold fonts. Default is 1.
 * @default 1
 */
static FONT_BOLD: number;

/**
 * Constant for italic fonts. Default is 2.
 * @default 2
 */
static FONT_ITALIC: number;

/**
 * Constant for underlined fonts. Default is 4.
 * @default 4
 */
static FONT_UNDERLINE: number;

/**
 * Constant for strikthrough fonts. Default is 8.
 * @since mxgraph 4.1.0
 * @default 8
 */
static FONT_STRIKETHROUGH: number;

/**
 * Name under which <mxRectangleShape> is registered in <mxCellRenderer>.
 * Default is rectangle.
 */
static SHAPE_RECTANGLE: 'rectangle';

/**
 * Name under which <mxEllipse> is registered in <mxCellRenderer>.
 * Default is ellipse.
 */
static SHAPE_ELLIPSE: 'ellipse';

/**
 * Name under which <mxDoubleEllipse> is registered in <mxCellRenderer>.
 * Default is doubleEllipse.
 */
static SHAPE_DOUBLE_ELLIPSE: 'doubleEllipse';

/**
 * Name under which <mxRhombus> is registered in <mxCellRenderer>.
 * Default is rhombus.
 */
static SHAPE_RHOMBUS: 'rhombus';

/**
 * Name under which <mxLine> is registered in <mxCellRenderer>.
 * Default is line.
 */
static SHAPE_LINE: 'line';

/**
 * Name under which <mxImageShape> is registered in <mxCellRenderer>.
 * Default is image.
 */
static SHAPE_IMAGE: 'image';

/**
 * Name under which <mxArrow> is registered in <mxCellRenderer>.
 * Default is arrow.
 */
static SHAPE_ARROW: 'arrow';

/**
 * Name under which <mxArrowConnector> is registered in <mxCellRenderer>.
 * Default is arrowConnector.
 */
static SHAPE_ARROW_CONNECTOR: 'arrowConnector';

/**
 * Name under which <mxLabel> is registered in <mxCellRenderer>.
 * Default is label.
 */
static SHAPE_LABEL: 'label';

/**
 * Name under which <mxCylinder> is registered in <mxCellRenderer>.
 * Default is cylinder.
 */
static SHAPE_CYLINDER: 'cylinder';

/**
 * Name under which <mxSwimlane> is registered in <mxCellRenderer>.
 * Default is swimlane.
 */
static SHAPE_SWIMLANE: 'swimlane';

/**
 * Name under which <mxConnector> is registered in <mxCellRenderer>.
 * Default is connector.
 */
static SHAPE_CONNECTOR: 'connector';

/**
 * Name under which <mxActor> is registered in <mxCellRenderer>.
 * Default is actor.
 */
static SHAPE_ACTOR: 'actor';

/**
 * Name under which <mxCloud> is registered in <mxCellRenderer>.
 * Default is cloud.
 */
static SHAPE_CLOUD: 'cloud';

/**
 * Name under which <mxTriangle> is registered in <mxCellRenderer>.
 * Default is triangle.
 */
static SHAPE_TRIANGLE: 'triangle';

/**
 * Name under which <mxHexagon> is registered in <mxCellRenderer>.
 * Default is hexagon.
 */
static SHAPE_HEXAGON: 'hexagon';

/**
 * Constant for classic arrow markers.
 */
static ARROW_CLASSIC: 'classic';

/**
 * Constant for thin classic arrow markers.
 */
static ARROW_CLASSIC_THIN: 'classicThin';

/**
 * Constant for block arrow markers.
 */
static ARROW_BLOCK: 'block';

/**
 * Constant for thin block arrow markers.
 */
static ARROW_BLOCK_THIN: 'blockThin';

/**
 * Constant for open arrow markers.
 */
static ARROW_OPEN: 'open';

/**
 * Constant for thin open arrow markers.
 */
static ARROW_OPEN_THIN: 'openThin';

/**
 * Constant for oval arrow markers.
 */
static ARROW_OVAL: 'oval';

/**
 * Constant for diamond arrow markers.
 */
static ARROW_DIAMOND: 'diamond';

/**
 * Constant for thin diamond arrow markers.
 */
static ARROW_DIAMOND_THIN: 'diamondThin';

/**
 * Constant for left horizontal alignment. Default is left.
 */
static ALIGN_LEFT: 'left';

/**
 * Constant for center horizontal alignment. Default is center.
 */
static ALIGN_CENTER: 'center';

/**
 * Constant for right horizontal alignment. Default is right.
 */
static ALIGN_RIGHT: 'right';

/**
 * Constant for top vertical alignment. Default is top.
 */
static ALIGN_TOP: 'top';

/**
 * Constant for middle vertical alignment. Default is middle.
 */
static ALIGN_MIDDLE: 'middle';

/**
 * Constant for bottom vertical alignment. Default is bottom.
 */
static ALIGN_BOTTOM: 'bottom';

/**
 * Constant for direction north. Default is north.
 */
static DIRECTION_NORTH: 'north';

/**
 * Constant for direction south. Default is south.
 */
static DIRECTION_SOUTH: 'south';

/**
 * Constant for direction east. Default is east.
 */
static DIRECTION_EAST: 'east';

/**
 * Constant for direction west. Default is west.
 */
static DIRECTION_WEST: 'west';

/**
 * Constant for text direction default. Default is an empty string. Use
 * this value to use the default text direction of the operating system.
 */
static TEXT_DIRECTION_DEFAULT: '';

/**
 * Constant for text direction automatic. Default is auto. Use this value
 * to find the direction for a given text with <mxText.getAutoDirection>.
 */
static TEXT_DIRECTION_AUTO: 'auto';

/**
 * Constant for text direction left to right. Default is ltr. Use this
 * value for left to right text direction.
 */
static TEXT_DIRECTION_LTR: 'ltr';

/**
 * Constant for text direction right to left. Default is rtl. Use this
 * value for right to left text direction.
 */
static TEXT_DIRECTION_RTL: 'rtl';

/**
 * Constant for no direction.
 * @default 0
 */
static DIRECTION_MASK_NONE: number;

/**
 * Bitwise mask for west direction.
 * @default 1
 */
static DIRECTION_MASK_WEST: number;

/**
 * Bitwise mask for north direction.
 * @default 2
 */
static DIRECTION_MASK_NORTH: number;

/**
 * Bitwise mask for south direction.
 * @default 4
 */
static DIRECTION_MASK_SOUTH: number;

/**
 * Bitwise mask for east direction.
 * @default 8
 */
static DIRECTION_MASK_EAST: number;

/**
 * Bitwise mask for all directions.
 * @default 15
 */
static DIRECTION_MASK_ALL: number;

/**
 * Constant for elbow vertical. Default is horizontal.
 */
static ELBOW_VERTICAL: 'vertical';

/**
 * Constant for elbow horizontal. Default is horizontal.
 */
static ELBOW_HORIZONTAL: 'horizontal';

/**
 * Name of the elbow edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_ELBOW: 'elbowEdgeStyle';

/**
 * Name of the entity relation edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_ENTITY_RELATION: 'entityRelationEdgeStyle';

/**
 * Name of the loop edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_LOOP: 'loopEdgeStyle';

/**
 * Name of the side to side edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_SIDETOSIDE: 'sideToSideEdgeStyle';

/**
 * Name of the top to bottom edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_TOPTOBOTTOM: 'topToBottomEdgeStyle';

/**
 * Name of the generic orthogonal edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_ORTHOGONAL: 'orthogonalEdgeStyle';

/**
 * Name of the generic segment edge style. Can be used as a string value
 * for the STYLE_EDGE style.
 */
static EDGESTYLE_SEGMENT: 'segmentEdgeStyle';

/**
 * Name of the ellipse perimeter. Can be used as a string value
 * for the STYLE_PERIMETER style.
 */
static PERIMETER_ELLIPSE: 'ellipsePerimeter';

/**
 * Name of the rectangle perimeter. Can be used as a string value
 * for the STYLE_PERIMETER style.
 */
static PERIMETER_RECTANGLE: 'rectanglePerimeter';

/**
 * Name of the rhombus perimeter. Can be used as a string value
 * for the STYLE_PERIMETER style.
 */
static PERIMETER_RHOMBUS: 'rhombusPerimeter';

/**
 * Name of the hexagon perimeter. Can be used as a string value
 * for the STYLE_PERIMETER style.
 */
static PERIMETER_HEXAGON: 'hexagonPerimeter';

/**
 * Name of the triangle perimeter. Can be used as a string value
 * for the STYLE_PERIMETER style.
 */
static PERIMETER_TRIANGLE: 'trianglePerimeter'

}

declare type mxDialectConstants = 'svg' | 'vml' | 'mixedHtml' | 'preferHtml' | 'strictHtml';


/**
* @class mxGeometry
*
* @extends {mxRectangle}
*
* For vertices, the geometry consists of the x- and y-location, and the width
* and height. For edges, the geometry consists of the optional terminal- and
* control points. The terminal points are only required if an edge is
* unconnected, and are stored in the {@link sourcePoint} and {@link targetPoint}
* variables, respectively.
*
* ### Example
*
* If an edge is unconnected, that is, it has no source or target terminal,
* then a geometry with terminal points for a new edge can be defined as
* follows.
*
* ```javascript
* geometry.setTerminalPoint(new mxPoint(x1, y1), true);
* geometry.points: [new mxPoint(x2, y2)];
* geometry.setTerminalPoint(new mxPoint(x3, y3), false);
* ```
*
* Control points are used regardless of the connected state of an edge and may
* be ignored or interpreted differently depending on the edge's {@link mxEdgeStyle}.
*
* To disable automatic reset of control points after a cell has been moved or
* resized, the the {@link mxGraph.resizeEdgesOnMove} and
* {@link mxGraph.resetEdgesOnResize} may be used.
*
* ### Edge Labels
*
* Using the x- and y-coordinates of a cell's geometry, it is possible to
* position the label on edges on a specific location on the actual edge shape
* as it appears on the screen. The x-coordinate of an edge's geometry is used
* to describe the distance from the center of the edge from -1 to 1 with 0
* being the center of the edge and the default value. The y-coordinate of an
* edge's geometry is used to describe the absolute, orthogonal distance in
* pixels from that point. In addition, the {@link mxGeometry.offset} is used as an
* absolute offset vector from the resulting point.
*
* This coordinate system is applied if {@link relative} is true, otherwise the
* offset defines the absolute vector from the edge's center point to the
* label and the values for {@link x} and {@link y} are ignored.
*
* The width and height parameter for edge geometries can be used to set the
* label width and height (eg. for word wrapping).
*
* ### Ports
*
* The term "port" refers to a relatively positioned, connectable child cell,
* which is used to specify the connection between the parent and another cell
* in the graph. Ports are typically modeled as vertices with relative
* geometries.
*
* ### Offsets
*
* The {@link offset} field is interpreted in 3 different ways, depending on the cell
* and the geometry. For edges, the offset defines the absolute offset for the
* edge label. For relative geometries, the offset defines the absolute offset
* for the origin (top, left corner) of the vertex, otherwise the offset
* defines the absolute offset for the label inside the vertex or group.
*/

declare class mxGeometry extends mxRectangle {

constructor(x?: number, y?: number, width?: number, height?: number);

/**
 * Global switch to translate the points in translate. Default is true.
 */
TRANSLATE_CONTROL_POINTS: boolean;

/**
 * Stores alternate values for x, y, width and height in a rectangle.
 * See {@link swap} to exchange the values. Default is null.
 *
 * @see {@link swap}
 */
alternateBounds: mxRectangle;

/**
 * Defines the source {@link mxPoint} of the edge. This is used if the
 * corresponding edge does not have a source vertex. Otherwise it is
 * ignored. Default is  null.
 */
sourcePoint: mxPoint;

/**
 * Defines the target {@link mxPoint} of the edge. This is used if the
 * corresponding edge does not have a target vertex. Otherwise it is
 * ignored. Default is null.
 */
targetPoint: mxPoint;

/**
 * Array of {@link mxPoints} which specifies the control points along the edge.
 * These points are the intermediate points on the edge, for the endpoints
 * use {@link targetPoint} and {@link sourcePoint} or set the terminals of the edge to
 * a non-null value. Default is null.
 */
points: Array<mxPoint>;

/**
 * For edges, this holds the offset (in pixels) from the position defined
 * by {@link x} and {@link y} on the edge. For relative geometries (for vertices), this
 * defines the absolute offset from the point defined by the relative
 * coordinates. For absolute geometries (for vertices), this defines the
 * offset for the label. Default is null.
 */
offset: mxPoint;

/**
 * Specifies if the coordinates in the geometry are to be interpreted as
 * relative coordinates. For edges, this is used to define the location of
 * the edge label relative to the edge as rendered on the display. For
 * vertices, this specifies the relative location inside the bounds of the
 * parent cell.
 *
 * If this is false, then the coordinates are relative to the origin of the
 * parent cell or, for edges, the edge label position is relative to the
 * center of the edge as rendered on screen.
 *
 * Default is false.
 */
relative: boolean;

setRelative(relative: boolean): void;

/**
 * Swaps the x, y, width and height with the values stored in
 * {@link alternateBounds} and puts the previous values into {@link alternateBounds} as
 * a rectangle. This operation is carried-out in-place, that is, using the
 * existing geometry instance. If this operation is called during a graph
 * model transactional change, then the geometry should be cloned before
 * calling this method and setting the geometry of the cell using
 * {@link mxGraphModel.setGeometry}.
 */
swap(): void;

/**
 * Returns the {@link mxPoint} representing the source or target point of this
 * edge. This is only used if the edge has no source or target vertex.
 *
 * @param {Boolean} isSource that specifies if the source or target point should be returned.
 */
getTerminalPoint(isSource: boolean): mxPoint;

/**
 * Sets the {@link sourcePoint} or {@link targetPoint} to the given {@link mxPoint} and
 * returns the new point.
 *
 * @param {Point} point to be used as the new source or target point.
 * @param {Boolean} isSource that specifies if the source or target point should be set.
 */
setTerminalPoint(point: mxPoint, isSource: boolean): mxPoint;

/**
 * Rotates the geometry by the given angle around the given center. That is,
 * {@link x} and {@link y} of the geometry, the {@link sourcePoint}, {@link targetPoint} and all
 * {@link points} are translated by the given amount. {@link x} and {@link y} are only
 * translated if {@link relative} is false.
 *
 * @param {Number} angle that specifies the rotation angle in degrees.
 * @param {mxPoint} cx   that specifies the center of the rotation.
 */
rotate(angle: number, cx: mxPoint): void;

/**
 * Translates the geometry by the specified amount. That is, {@link x} and {@link y} of the
 * geometry, the {@link sourcePoint}, {@link targetPoint} and all {@link points} are translated
 * by the given amount. {@link x} and {@link y} are only translated if {@link relative} is false.
 * If {@link TRANSLATE_CONTROL_POINTS} is false, then {@link points} are not modified by
 * this function.
 *
 * @param {Number} dx that specifies the x-coordinate of the translation.
 * @param {Number} dy that specifies the y-coordinate of the translation.
 */
translate(dx: number, dy: number): void;

/**
 * Scales the geometry by the given amount. That is, {@link x} and {@link y} of the
 * geometry, the {@link sourcePoint}, {@link targetPoint} and all {@link points} are scaled
 * by the given amount. {@link x}, {@link y}, {@link width} and {@link height} are only scaled if
 * {@link relative} is false. If {@link fixedAspect} is true, then the smaller value
 * is used to scale the width and the height.
 *
 * @param {Number} sx that specifies the horizontal scale factor.
 * @param {Number} sy that specifies the vertical scale factor.
 * @param {Optional} fixedAspect boolean to keep the aspect ratio fixed.
 */
scale(sx: number, sy: number, fixedAspect: boolean): void;

/**
 * Returns true if the given object equals this geometry.
 */
equals(obj: mxGeometry): boolean;

clone(): mxGeometry;

}

declare class mxPoint {
constructor(x?: number, y?: number);

/**
 * Variable: x
 *
 * Holds the x-coordinate of the point. Default is 0.
 */
x: number;

/**
 * Variable: y
 *
 * Holds the y-coordinate of the point. Default is 0.
 */
y: number;

/**
 * Function: equals
 *
 * Returns true if the given object equals this point.
 */
equals(obj: mxPoint): boolean;

/**
 * Function: clone
 *
 * Returns a clone of this <mxPoint>.
 */
clone(): mxPoint;
}
/// <reference path="./mxGeometry.d.ts" />

/**
* Cells are the elements of the graph model. They represent the state
* of the groups, vertices and edges in a graph.
*
* ### Custom attributes
* For custom attributes we recommend using an XML node as the value of a cell.
* The following code can be used to create a cell with an XML node as the value:
* @example
* ```javascript
* var doc = mxUtils.createXmlDocument();
* var node = doc.createElement('MyNode')
* node.setAttribute('label', 'MyLabel');
* node.setAttribute('attribute1', 'value1');
* graph.insertVertex(graph.getDefaultParent(), null, node, 40, 40, 80, 30);
* ```
*
* For the label to work, {@link mxGraph.convertValueToString} and
* {@link mxGraph.cellLabelChanged} should be overridden as follows:
*
* @example
* ```javascript
* graph.convertValueToString(cell)
* {
*   if (mxUtils.isNode(cell.value))
*   {
*     return cell.getAttribute('label', '')
*   }
* };
*
* var cellLabelChanged = graph.cellLabelChanged;
* graph.cellLabelChanged(cell, newValue, autoSize)
* {
*   if (mxUtils.isNode(cell.value))
*   {
*     // Clones the value for correct undo/redo
*     var elt = cell.value.cloneNode(true);
*     elt.setAttribute('label', newValue);
*     newValue = elt;
*   }
*
*   cellLabelChanged.apply(this, arguments);
* };
* ```
* @class mxCell
*/
declare class mxCell {

/**
 * @param {*} value               Optional object that represents the cell value.
 * @param {mxGeometry} geometry   Optional <mxGeometry> that specifies the geometry.
 * @param {string} style          Optional formatted string that defines the style.
 */
constructor(value?: any, geometry?: mxGeometry, style?: string);

/**
 * @see {mxGraph.getCellOverlays}
 *
 * @type {Array<mxCellOverlay>}
 */
overlays: Array<mxCellOverlay>;

/**
 * Holds the Id. Default is null.
 */
id: string;

/**
 * Holds the user object. Default is null.
 */
value: any;

/**
 * Holds the <mxGeometry>. Default is null.
 */
geometry: mxGeometry;

/**
 * Holds the style as a string of the form [(stylename|key=value);]. Default is
 * null.
 */
style: string;

/**
 * Specifies whether the cell is a vertex. Default is false.
 */
vertex: boolean;

/**
 * Specifies whether the cell is an edge. Default is false.
 */
edge: boolean;

/**
 * Specifies whether the cell is connectable. Default is true.
 */
connectable: boolean;

/**
 * Specifies whether the cell is visible. Default is true.
 */
visible: boolean;

/**
 * Specifies whether the cell is collapsed. Default is false.
 */
collapsed: boolean;

/**
 * Reference to the parent cell.
 */
parent: mxCell;

/**
 * Reference to the source terminal.
 */
source: mxCell;

/**
 * Reference to the target terminal.
 */
target: mxCell;

/**
 * Holds the child cells.
 */
children: Array<mxCell>;

/**
 * Holds the edges.
 */
edges: Array<mxCell>;

/**
 * List of members that should not be cloned inside <clone>. This field is
 * passed to <mxUtils.clone> and is not made persistent in <mxCellCodec>.
 * This is not a convention for all classes, it is only used in this class
 * to mark transient fields since transient modifiers are not supported by
 * the language.
 */
mxTransient: Array<string>;

/**
 * Returns the Id of the cell as a string.
 */
getId(): string;

/**
 * Sets the Id of the cell to the given string.
 */
setId(id: string): void;

/**
 * Returns the user object of the cell. The user
 * object is stored in <value>.
 */
getValue(): any;

/**
 * Sets the user object of the cell. The user object
 * is stored in <value>.
 */
setValue(value: any): void;

/**
 * Changes the user object after an in-place edit
 * and returns the previous value. This implementation
 * replaces the user object with the given value and
 * returns the old user object.
 */
valueChanged(newValue: any): any;

/**
 * Returns the <mxGeometry> that describes the <geometry>.
 */
getGeometry(): mxGeometry;

/**
 * Sets the <mxGeometry> to be used as the <geometry>.
 */
setGeometry(geometry: mxGeometry): void;

/**
 * Returns a string that describes the <style>.
 */
getStyle(): string;

/**
 * Sets the string to be used as the <style>.
 */
setStyle(style: string): void;

/**
 * Returns true if the cell is a vertex.
 */
isVertex(): boolean;

/**
 * Specifies if the cell is a vertex. This should only be assigned at
 * construction of the cell and not be changed during its lifecycle.
 *
 * Parameters:
 *
 * @param vertexBoolean that specifies if the cell is a vertex.
 */
setVertex(vertex: boolean): void;

/**
 * Returns true if the cell is an edge.
 */
isEdge(): boolean;

/**
 * Specifies if the cell is an edge. This should only be assigned at
 * construction of the cell and not be changed during its lifecycle.
 *
 * Parameters:
 *
 * @param edgeBoolean that specifies if the cell is an edge.
 */
setEdge(edge: boolean): void;

/**
 * Returns true if the cell is connectable.
 */
isConnectable(): boolean;

/**
 * Sets the connectable state.
 *
 * Parameters:
 *
 * @param connectableBoolean that specifies the new connectable state.
 */
setConnectable(connectable: boolean): void;

/**
 * Returns true if the cell is visibile.
 */
isVisible(): boolean;

/**
 * Specifies if the cell is visible.
 *
 * Parameters:
 *
 * @param visibleBoolean that specifies the new visible state.
 */
setVisible(visible: boolean): void;

/**
 * Returns true if the cell is collapsed.
 */
isCollapsed(): boolean;

/**
 * Sets the collapsed state.
 *
 * Parameters:
 *
 * @param collapsedBoolean that specifies the new collapsed state.
 */
setCollapsed(collapsed: boolean): void;

/**
 * Returns the cell's parent.
 */
getParent(): mxCell;

/**
 * Sets the parent cell.
 *
 * Parameters:
 *
 * @param parent<mxCell> that represents the new parent.
 */
setParent(parent: mxCell): void;

/**
 * Returns the source or target terminal.
 *
 * Parameters:
 *
 * @param sourceBoolean that specifies if the source terminal should be
 * returned.
 */
getTerminal(source: mxCell): mxCell;

/**
 * Sets the source or target terminal and returns the new terminal.
 *
 * Parameters:
 *
 * @param terminal<mxCell> that represents the new source or target terminal.
 * @param isSourceBoolean that specifies if the source or target terminal
 * should be set.
 */
setTerminal(terminal: mxCell, isSource: mxCell): mxCell;

/**
 * Returns the number of child cells.
 */
getChildCount(): number;

/**
 * Returns the index of the specified child in the child array.
 *
 * Parameters:
 *
 * @param childChild whose index should be returned.
 */
getIndex(child: mxCell): number;

/**
 * Returns the child at the specified index.
 *
 * Parameters:
 *
 * @param indexInteger that specifies the child to be returned.
 */
getChildAt(index: number): mxCell;

/**
 * Inserts the specified child into the child array at the specified index
 * and updates the parent reference of the child. If not childIndex is
 * specified then the child is appended to the child array. Returns the
 * inserted child.
 *
 * Parameters:
 *
 * @param child<mxCell> to be inserted or appended to the child array.
 * @param indexOptional integer that specifies the index at which the child
 * should be inserted into the child array.
 */
insert(child: mxCell, index: number): mxCell;

/**
 * Removes the child at the specified index from the child array and
 * returns the child that was removed. Will remove the parent reference of
 * the child.
 *
 * Parameters:
 *
 * @param indexInteger that specifies the index of the child to be
 * removed.
 */
remove(index: number): mxCell;

/**
 * Removes the cell from its parent.
 */
removeFromParent(): mxCell;

/**
 * Returns the number of edges in the edge array.
 */
getEdgeCount(): number;

/**
 * Returns the index of the specified edge in <edges>.
 *
 * Parameters:
 *
 * @param edge<mxCell> whose index in <edges> should be returned.
 */
getEdgeIndex(edge: mxCell): number;

/**
 * Returns the edge at the specified index in <edges>.
 *
 * Parameters:
 *
 * @param indexInteger that specifies the index of the edge to be returned.
 */
getEdgeAt(index: number): mxCell;

/**
 * Inserts the specified edge into the edge array and returns the edge.
 * Will update the respective terminal reference of the edge.
 *
 * Parameters:
 *
 * @param edge              <mxCell> to be inserted into the edge array.
 * @param isOutgoingBoolean that specifies if the edge is outgoing.
 */
insertEdge(edge: mxCell, isOutgoing: boolean): mxCell;

/**
 * Removes the specified edge from the edge array and returns the edge.
 * Will remove the respective terminal reference from the edge.
 *
 * Parameters:
 *
 * @param edge<mxCell> to be removed from the edge array.
 * @param isOutgoingBoolean that specifies if the edge is outgoing.
 */
removeEdge(edge: mxCell, isOutgoing: boolean): mxCell;

/**
 * Removes the edge from its source or target terminal.
 *
 * Parameters:
 *
 * @param isSourceBoolean that specifies if the edge should be removed from its source or target terminal.
 */
removeFromTerminal(isSource: boolean): mxCell;

/**
 * Returns true if the user object is an XML node that contains the given
 * attribute.
 *
 * Parameters:
 *
 * @param nameName nameName of the attribute.
 */
hasAttribute(name: string): boolean;

/**
 * Returns the specified attribute from the user object if it is an XML
 * node.
 *
 * Parameters:
 *
 * @param nameName              of the attribute whose value should be returned.
 * @param defaultValueOptional  default value to use if the attribute has no
 * value.
 */
getAttribute(name: string, defaultValue: any): any;

/**
 * Sets the specified attribute on the user object if it is an XML node.
 *
 * Parameters:
 *
 * @param nameName    of the attribute whose value should be set.
 * @param valueNew    value of the attribute.
 */
setAttribute(name: string, value: any): void;

/**
 * Returns a clone of the cell. Uses <cloneValue> to clone
 * the user object. All fields in <mxTransient> are ignored
 * during the cloning.
 */
clone(): mxCell;

/**
 * Returns a clone of the cell's user object.
 */
cloneValue(): any;

[key: string]: any;

}

/// <reference path="./mxStencil.d.ts" />

/**
* A singleton class that provides a registry for stencils and the methods
* for painting those stencils onto a canvas or into a DOM.
*
* @class mxStencilRegistry
*/
declare class mxStencilRegistry {

static stencils: { [key: string]: mxStencil };

/**
 * Adds the given <mxStencil>.
 * @static
 * @param {string} name
 * @param {mxStencil} stencil
 */
static addStencil(name: string, stencil: mxStencil): void;

/**
 * Returns the <mxStencil> for the given name.
 * @static
 * @param {string} name
 * @returns {mxStencil}
 */
static getStencil(name: string): mxStencil;

}


/**
* @class mxGraphView
* @extends {mxEventSource}
*
* Extends {@link mxEventSource} to implement a view for a graph. This class is in
* charge of computing the absolute coordinates for the relative child
* geometries, the points for perimeters and edge styles and keeping them
* cached in {@link mxCellStates} for faster retrieval. The states are updated
* whenever the model or the view state (translate, scale) changes. The scale
* and translate are honoured in the bounds.
*
* #### Event: mxEvent.UNDO
*
* Fires after the root was changed in {@link setCurrentRoot}. The `edit`
* property contains the {@link mxUndoableEdit} which contains the
* {@link mxCurrentRootChange}.
*
* #### Event: mxEvent.SCALE_AND_TRANSLATE
*
* Fires after the scale and translate have been changed in {@link scaleAndTranslate}.
* The `scale`, `previousScale`, `translate`
* and `previousTranslate` properties contain the new and previous
* scale and translate, respectively.
*
* #### Event: mxEvent.SCALE
*
* Fires after the scale was changed in {@link setScale}. The `scale` and
* `previousScale` properties contain the new and previous scale.
*
* #### Event: mxEvent.TRANSLATE
*
* Fires after the translate was changed in {@link setTranslate}. The
* `translate` and `previousTranslate` properties contain
* the new and previous value for translate.
*
* #### Event: mxEvent.DOWN and mxEvent.UP
*
* Fire if the current root is changed by executing an {@link mxCurrentRootChange}.
* The event name depends on the location of the root in the cell hierarchy
* with respect to the current root. The `root` and
* `previous` properties contain the new and previous root,
* respectively.
*/
declare class mxGraphView extends mxEventSource {

constructor(graph: mxGraph);

canvas: SVGSVGElement;

EMPTY_POINT: mxPoint;

/**
 * Specifies the resource key for the status message after a long operation.
 * If the resource for this key does not exist then the value is used as
 * the status message. Default is 'done'.
 */
doneResource: 'done' | '';

/**
 * Specifies the resource key for the status message while the document is
 * being updated. If the resource for this key does not exist then the
 * value is used as the status message. Default is 'updatingDocument'.
 */
updatingDocumentResource: 'updatingDocument' | '';

/**
 * Specifies if string values in cell styles should be evaluated using
 * {@link mxUtils.eval}. This will only be used if the string values can't be mapped
 * to objects using {@link mxStyleRegistry}. Default is false. NOTE: Enabling this
 * switch carries a possible security risk.
 */
allowEval: boolean;

/**
 * Specifies if a gesture should be captured when it goes outside of the
 * graph container. Default is true.
 */
captureDocumentGesture: boolean;

/**
 * Specifies if the {@link canvas} should be hidden while rendering in IE8 standards
 * mode and quirks mode. This will significantly improve rendering performance.
 * Default is true.
 */
optimizeVmlReflows: boolean;

/**
 * Specifies if shapes should be created, updated and destroyed using the
 * methods of {@link mxCellRenderer} in {@link graph}. Default is true.
 */
rendering: boolean;

/**
 * Reference to the enclosing {@link mxGraph}.
 */
graph: mxGraph;

/**
 * {@link mxCell} that acts as the root of the displayed cell hierarchy.
 */
currentRoot: mxCell;

/**
 * {@link mxRectangle} that caches the scales, translated bounds of the current view.
 */
graphBounds: mxRectangle;

/**
 * Specifies the scale. Default is 1 (100%).
 */
scale: number;

/**
 * {@link mxPoint} that specifies the current translation. Default is a new
 * empty {@link mxPoint}.
 */
translate: mxPoint;

/**
 * {@link mxDictionary} that maps from cell IDs to {@link mxCellStates}.
 */
states: mxDictionary<mxCellState>;

/**
 * Specifies if the style should be updated in each validation step. If this
 * is false then the style is only updated if the state is created or if the
 * style of the cell was changed. Default is false.
 */
updateStyle: boolean;

/**
 * During validation, this contains the last DOM node that was processed.
 */
lastNode: Element;

/**
 * During validation, this contains the last HTML DOM node that was processed.
 */
lastHtmlNode: HTMLElement;

/**
 * During validation, this contains the last edge's DOM node that was processed.
 */
lastForegroundNode: Element;

/**
 * During validation, this contains the last edge HTML DOM node that was processed.
 */
lastForegroundHtmlNode: HTMLElement;

/**
 * Returns {@link graphBounds}.
 */
getGraphBounds(): mxRectangle;

/**
 * Sets {@link graphBounds}.
 */
setGraphBounds(value: mxRectangle): void;

/**
 * Returns the union of all {@link mxCellStates} for the given array of {@link mxCell}.
 *
 * @param cells Array of {@link mxCell} whose bounds should be returned.
 */
getBounds(cells: mxCell[]): mxRectangle;

/**
 * Sets and returns the current root and fires an {@link undo} event before
 * calling {@link mxGraph.sizeDidChange}.
 *
 * @param root {@link mxCell} that specifies the root of the displayed cell hierarchy.
 */
setCurrentRoot(root: mxCell): mxCell;

/**
 * Sets the scale and translation and fires a {@link scale} and {@link translate} event
 * before calling {@link revalidate} followed by {@link mxGraph.sizeDidChange}.
 *
 * @param scale Decimal value that specifies the new scale (1 is 100%).
 * @param dx X-coordinate of the translation.
 * @param dy Y-coordinate of the translation.
 */
scaleAndTranslate(scale: number, dx: number, dy: number): void;

/**
 * Returns the {@link scale}.
 */
getScale(): number;

/**
 * Sets the scale and fires a {@link scale} event before calling {@link revalidate} followed
 * by {@link mxGraph.sizeDidChange}.
 *
 * @param value Decimal value that specifies the new scale (1 is 100%).
 */
setScale(value: number): void;

/**
 * Returns the {@link translate}.
 */
getTranslate(): mxPoint;

/**
 * Sets the translation and fires a {@link translate} event before calling
 * {@link revalidate} followed by {@link mxGraph.sizeDidChange}. The translation is the
 * negative of the origin.
 *
 * @param dx X-coordinate of the translation.
 * @param dy Y-coordinate of the translation.
 */
setTranslate(dx: number, dy: number): void;

/**
 * Invoked after {@link scale} and/or {@link translate} has changed.
 */
viewStateChanged(): void;

/**
 * Clears the view if {@link currentRoot} is not null and revalidates.
 */
refresh(): void;

/**
 * Revalidates the complete view with all cell states.
 */
revalidate(): void;

/**
 * Removes the state of the given cell and all descendants if the given
 * cell is not the current root.
 *
 * @param cell Optional {@link mxCell} for which the state should be removed. Default
 * is the root of the model.
 * @param force Boolean indicating if the current root should be ignored for
 * recursion.
 */
clear(cell?: mxCell, force?: boolean, recurse?: boolean): void;

/**
 * Invalidates the state of the given cell, all its descendants and
 * connected edges.
 *
 * @param cell Optional {@link mxCell} to be invalidated. Default is the root of the
 * model.
 */
invalidate(cell: mxCell, recurse: boolean, includeEdges: boolean): void;

/**
 * Calls {@link validateCell} and {@link validateCellState} and updates the {@link graphBounds}
 * using {@link getBoundingBox}. Finally the background is validated using
 * {@link validateBackground}.
 *
 * @param cell Optional {@link mxCell} to be used as the root of the validation.
 * Default is {@link currentRoot} or the root of the model.
 */
validate(cell?: mxCell): void;

/**
 * Returns the bounds for an empty graph. This returns a rectangle at
 * {@link translate} with the size of 0 x 0.
 */
getEmptyBounds(): mxRectangle;

/**
 * Returns the bounding box of the shape and the label for the given
 * {@link mxCellState} and its children if recurse is true.
 *
 * @param state {@link mxCellState} whose bounding box should be returned.
 * @param recurse Optional boolean indicating if the children should be included.
 * Default is true.
 */
getBoundingBox(state: mxCellState, recurse: boolean): mxRectangle;

/**
 * Creates and returns the shape used as the background page.
 *
 * @param bounds {@link mxRectangle} that represents the bounds of the shape.
 */
createBackgroundPageShape(bounds: mxRectangle): mxRectangleShape;

/**
 * Calls {@link validateBackgroundImage} and {@link validateBackgroundPage}.
 */
validateBackground(): void;

/**
 * Validates the background image.
 */
validateBackgroundImage(): void;

/**
 * Validates the background page.
 */
validateBackgroundPage(): void;

/**
 * Returns the bounds for the background page.
 */
getBackgroundPageBounds(): mxRectangle;

/**
 * Updates the bounds and redraws the background image.
 *
 * Example:
 *
 * If the background image should not be scaled, this can be replaced with
 * the following.
 *
 * @example
* ```javascript
 * redrawBackground(backgroundImage, bg)
 * {
 *   backgroundImage.bounds.x = this.translate.x;
 *   backgroundImage.bounds.y = this.translate.y;
 *   backgroundImage.bounds.width = bg.width;
 *   backgroundImage.bounds.height = bg.height;
 *
 *   backgroundImage.redraw();
 * };
 * ```
 *
 * @param backgroundImage {@link mxImageShape} that represents the background image.
 * @param bg {@link mxImage} that specifies the image and its dimensions.
 */
redrawBackgroundImage(backgroundImage: mxImageShape, bg: mxImage): void;

/**
 * Recursively creates the cell state for the given cell if visible is true and
 * the given cell is visible. If the cell is not visible but the state exists
 * then it is removed using {@link removeState}.
 *
 * @param cell {@link mxCell} whose {@link mxCellState} should be created.
 * @param visible Optional boolean indicating if the cell should be visible. Default
 * is true.
 */
validateCell(cell: mxCell, visible?: boolean): void;

/**
 * Validates and repaints the {@link mxCellState} for the given {@link mxCell}.
 *
 * @param cell {@link mxCell} whose {@link mxCellState} should be validated.
 * @param recurse Optional boolean indicating if the children of the cell should be
 * validated. Default is true.
 */
validateCellState(cell: mxCell, recurse?: boolean): void;
/**
 * Updates the given {@link mxCellState}.
 *
 * @param state {@link mxCellState} to be updated.
 */
updateCellState(state: mxCellState): void;

/**
 * Returns true if the children of the given cell should not be visible in the
 * view. This implementation uses {@link mxGraph.isCellVisible} but it can be
 * overidden to use a separate condition.
 */
isCellCollapsed(cell: mxCell): boolean;

/**
 * Validates the given cell state.
 */
updateVertexState(state: mxCellState, geo: mxGeometry): void;

/**
 * Validates the given cell state.
 */
updateEdgeState(state: mxCellState, geo: mxGeometry): void;

/**
 * Updates the absoluteOffset of the given vertex cell state. This takes
 * into account the label position styles.
 *
 * @param state {@link mxCellState} whose absolute offset should be updated.
 */
updateVertexLabelOffset(state: mxCellState): void;

/**
 * Resets the current validation state.
 */
resetValidationState(): void;

/**
 * Invoked when a state has been processed in {@link validatePoints}. This is used
 * to update the order of the DOM nodes of the shape.
 *
 * @param state {@link mxCellState} that represents the cell state.
 */
stateValidated(state: mxCellState): void;

/**
 * Sets the initial absolute terminal points in the given state before the edge
 * style is computed.
 *
 * @param edge {@link mxCellState} whose initial terminal points should be updated.
 * @param source {@link mxCellState} which represents the source terminal.
 * @param target {@link mxCellState} which represents the target terminal.
 */
updateFixedTerminalPoints(edge: mxCellState, source: mxCellState, target: mxCellState): void;

/**
 * Sets the fixed source or target terminal point on the given edge.
 *
 * @param edge {@link mxCellState} whose terminal point should be updated.
 * @param terminal {@link mxCellState} which represents the actual terminal.
 * @param source Boolean that specifies if the terminal is the source.
 * @param constraint {@link mxConnectionConstraint} that specifies the connection.
 */
updateFixedTerminalPoint(edge: mxCellState, terminal: mxCellState, source: boolean, constraint: mxConnectionConstraint): void;

/**
 * Returns the fixed source or target terminal point for the given edge.
 *
 * @param edge {@link mxCellState} whose terminal point should be returned.
 * @param terminal {@link mxCellState} which represents the actual terminal.
 * @param source Boolean that specifies if the terminal is the source.
 * @param constraint {@link mxConnectionConstraint} that specifies the connection.
 */
getFixedTerminalPoint(edge: mxCellState, terminal: mxCellState, source: boolean, constraint: mxConnectionConstraint): void;

/**
 * Updates the bounds of the given cell state to reflect the bounds of the stencil
 * if it has a fixed aspect and returns the previous bounds as an {@link mxRectangle} if
 * the bounds have been modified or null otherwise.
 *
 * @param edge {@link mxCellState} whose bounds should be updated.
 */
updateBoundsFromStencil(state: mxCellState): mxRectangle;

/**
 * Updates the absolute points in the given state using the specified array
 * of {@link mxPoints} as the relative points.
 *
 * @param edge {@link mxCellState} whose absolute points should be updated.
 * @param points Array of {@link mxPoints} that constitute the relative points.
 * @param source {@link mxCellState} that represents the source terminal.
 * @param target {@link mxCellState} that represents the target terminal.
 */
updatePoints(edge: mxCellState, points: mxPoint[], source: mxCellState, target: mxCellState): void;

/**
 * Transforms the given control point to an absolute point.
 */
transformControlPoint(state: mxCellState, pt: mxPoint): mxPoint;

/**
 * Returns true if the given edge should be routed with {@link mxGraph.defaultLoopStyle}
 * or the {@link mxConstants.STYLE_LOOP} defined for the given edge. This implementation
 * returns true if the given edge is a loop and does not
 */
isLoopStyleEnabled(edge: mxCellState, points: mxPoint[], source: mxCellState, target: mxCellState): boolean;

/**
 * Returns the edge style function to be used to render the given edge state.
 */
getEdgeStyle(edge: mxCellState, points: mxPoint[], source: mxCellState, target: mxCellState): any;

/**
 * Updates the terminal points in the given state after the edge style was
 * computed for the edge.
 *
 * @param state {@link mxCellState} whose terminal points should be updated.
 * @param source {@link mxCellState} that represents the source terminal.
 * @param target {@link mxCellState} that represents the target terminal.
 */
updateFloatingTerminalPoints(state: mxCellState, source: mxCellState, target: mxCellState): void;

/**
 * Updates the absolute terminal point in the given state for the given
 * start and end state, where start is the source if source is true.
 *
 * @param edge {@link mxCellState} whose terminal point should be updated.
 * @param start {@link mxCellState} for the terminal on "this" side of the edge.
 * @param end {@link mxCellState} for the terminal on the other side of the edge.
 * @param source Boolean indicating if start is the source terminal state.
 */
updateFloatingTerminalPoint(edge: mxCellState, start: mxCellState, end: mxCellState, source: boolean): void;

/**
 * Returns the floating terminal point for the given edge, start and end
 * state, where start is the source if source is true.
 *
 * @param edge {@link mxCellState} whose terminal point should be returned.
 * @param start {@link mxCellState} for the terminal on "this" side of the edge.
 * @param end {@link mxCellState} for the terminal on the other side of the edge.
 * @param source Boolean indicating if start is the source terminal state.
 */
getFloatingTerminalPoint(edge: mxCellState, start: mxCellState, end: mxCellState, source: boolean): mxPoint;

/**
 * Returns an {@link mxCellState} that represents the source or target terminal or
 * port for the given edge.
 *
 * @param state {@link mxCellState} that represents the state of the edge.
 * @param terminal {@link mxCellState} that represents the terminal.
 * @param source Boolean indicating if the given terminal is the source terminal.
 */
getTerminalPort(state: mxCellState, terminal: mxCellState, source: boolean): mxCellState;

/**
 * Returns an {@link mxPoint} that defines the location of the intersection point between
 * the perimeter and the line between the center of the shape and the given point.
 *
 * @param terminal {@link mxCellState} for the source or target terminal.
 * @param next {@link mxPoint} that lies outside of the given terminal.
 * @param orthogonal Boolean that specifies if the orthogonal projection onto
 * the perimeter should be returned. If this is false then the intersection
 * of the perimeter and the line between the next and the center point is
 * returned.
 * @param border Optional border between the perimeter and the shape.
 */
getPerimeterPoint(terminal: mxCellState, next: mxPoint, orthogonal: boolean, border: number): mxPoint;

/**
 * Returns the x-coordinate of the center point for automatic routing.
 */
getRoutingCenterX(state: mxCellState): number

/**
 * Returns the y-coordinate of the center point for automatic routing.
 */
getRoutingCenterY(state: mxCellState): number

/**
 * Returns the perimeter bounds for the given terminal, edge pair as an
 * {@link mxRectangle}.
 *
 * If you have a model where each terminal has a relative child that should
 * act as the graphical endpoint for a connection from/to the terminal, then
 * this method can be replaced as follows:
 *
 * @example
* ```javascript
 * var oldGetPerimeterBounds = getPerimeterBounds;
 * getPerimeterBounds(terminal, edge, isSource)
 * {
 *   var model = this.graph.getModel();
 *   var childCount = model.getChildCount(terminal.cell);
 *
 *   if (childCount > 0)
 *   {
 *     var child = model.getChildAt(terminal.cell, 0);
 *     var geo = model.getGeometry(child);
 *
 *     if (geo != null &&
 *         geo.relative)
 *     {
 *       var state = this.getState(child);
 *
 *       if (state != null)
 *       {
 *         terminal = state;
 *       }
 *     }
 *   }
 *
 *   return oldGetPerimeterBounds.apply(this, arguments);
 * };
 * ```
 *
 * @param {mxCellState} terminal mxCellState that represents the terminal.
 * @param {number} border Number that adds a border between the shape and the perimeter.
 */
getPerimeterBounds(terminal: mxCellState, border?: number): mxRectangle;

/**
 * Returns the perimeter function for the given state.
 */
getPerimeterFunction(state: mxCellState): any;

/**
 * Returns the nearest point in the list of absolute points or the center
 * of the opposite terminal.
 *
 * @param edge {@link mxCellState} that represents the edge.
 * @param opposite {@link mxCellState} that represents the opposite terminal.
 * @param source Boolean indicating if the next point for the source or target
 * should be returned.
 */
getNextPoint(edge: mxCellState, opposite: mxCellState, source: boolean): mxPoint;

/**
 * Returns the nearest ancestor terminal that is visible. The edge appears
 * to be connected to this terminal on the display. The result of this method
 * is cached in {@link mxCellState.getVisibleTerminalState}.
 *
 * @param edge {@link mxCell} whose visible terminal should be returned.
 * @param source Boolean that specifies if the source or target terminal
 * should be returned.
 */
getVisibleTerminal(edge: mxCell, source: boolean): mxCell;

/**
 * Updates the given state using the bounding box of t
 * he absolute points.
 * Also updates {@link mxCellState.terminalDistance}, {@link mxCellState.length} and
 * {@link mxCellState.segments}.
 *
 * @param state {@link mxCellState} whose bounds should be updated.
 */
updateEdgeBounds(state: mxCellState): void;

/**
 * Returns the absolute point on the edge for the given relative
 * {@link mxGeometry} as an {@link mxPoint}. The edge is represented by the given
 * {@link mxCellState}.
 *
 * @param state {@link mxCellState} that represents the state of the parent edge.
 * @param geometry {@link mxGeometry} that represents the relative location.
 */
getPoint(state: mxCellState, geometry: mxGeometry): mxPoint;

/**
 * Gets the relative point that describes the given, absolute label
 * position for the given edge state.
 *
 * @param state {@link mxCellState} that represents the state of the parent edge.
 * @param x Specifies the x-coordinate of the absolute label location.
 * @param y Specifies the y-coordinate of the absolute label location.
 */
getRelativePoint(edgeState: mxCellState, x: number, y: number): mxPoint;

/**
 * Updates {@link mxCellState.absoluteOffset} for the given state. The absolute
 * offset is normally used for the position of the edge label. Is is
 * calculated from the geometry as an absolute offset from the center
 * between the two endpoints if the geometry is absolute, or as the
 * relative distance between the center along the line and the absolute
 * orthogonal distance if the geometry is relative.
 *
 * @param state {@link mxCellState} whose absolute offset should be updated.
 */
updateEdgeLabelOffset(state: mxCellState): void;

/**
 * Returns the {@link mxCellState} for the given cell. If create is true, then
 * the state is created if it does not yet exist.
 *
 * @param cell {@link mxCell} for which the {@link mxCellState} should be returned.
 * @param create Optional boolean indicating if a new state should be created
 * if it does not yet exist. Default is false.
 */
getState(cell: mxCell, create?: boolean): mxCellState;

/**
 * Returns {@link rendering}.
 */
isRendering(): boolean;

/**
 * Sets {@link rendering}.
 */
setRendering(value: boolean): void

/**
 * Returns {@link allowEval}.
 */
isAllowEval(): boolean;

/**
 * Sets {@link allowEval}.
 */
setAllowEval(value: boolean): void;

/**
 * Returns {@link states}.
 */
getStates(): mxDictionary<mxCellState>;

/**
 * Sets {@link states}.
 */
setStates(value: mxDictionary<mxCellState>): void;

/**
 * Returns the {@link mxCellStates} for the given array of {@link mxCell}. The array
 * contains all states that are not null, that is, the returned array may
 * have less elements than the given array. If no argument is given, then
 * this returns {@link states}.
 */
getCellStates(cells: mxCell[]): mxCellState[];

/**
 * Removes and returns the {@link mxCellState} for the given cell.
 *
 * @param cell {@link mxCell} for which the {@link mxCellState} should be removed.
 */
removeState(cell: mxCell): mxCellState;

/**
 * Creates and returns an {@link mxCellState} for the given cell and initializes
 * it using {@link mxCellRenderer.initialize}.
 *
 * @param cell {@link mxCell} for which a new {@link mxCellState} should be created.
 */
createState(cell: mxCell): mxCellState;

/**
 * Returns the DOM node that contains the background-, draw- and
 * overlay- and decoratorpanes.
 */
getCanvas(): SVGElement;

/**
 * Returns the DOM node that represents the background layer.
 */
getBackgroundPane(): Element;

/**
 * Returns the DOM node that represents the main drawing layer.
 */
getDrawPane(): Element;

/**
 * Returns the DOM node that represents the layer above the drawing layer.
 */
getOverlayPane(): Element;

/**
 * Returns the DOM node that represents the topmost drawing layer.
 */
getDecoratorPane(): Element;

/**
 * Returns true if the event origin is one of the drawing panes or
 * containers of the view.
 */
isContainerEvent(evt: Event): boolean;

/**
 * Returns true if the event origin is one of the scrollbars of the
 * container in IE. Such events are ignored.
 */
isScrollEvent(evt: Event): boolean;

/**
 * Initializes the graph event dispatch loop for the specified container
 * and invokes {@link create} to create the required DOM nodes for the display.
 */
init(): void;

/**
 * Installs the required listeners in the container.
 */
installListeners(): void;

/**
 * Creates the DOM nodes for the HTML display.
 */
createHtml(): void;

/**
 * Updates the size of the HTML canvas.
 */
updateHtmlCanvasSize(width: number, height: number): void;

/**
 * Creates and returns a drawing pane in HTML (DIV).
 */
createHtmlPane(width: number, height: number): Element;

/**
 * Creates the DOM nodes for the VML display.
 */
createVml(): Element

/**
 * Creates a drawing pane in VML (group).
 */
createVmlPane(width: number, height: number): Element;

/**
 * Creates and returns the DOM nodes for the SVG display.
 */
createSvg(): Element;

/**
 * Updates the style of the container after installing the SVG DOM elements.
 */
updateContainerStyle(container: Element): void;

/**
 * Destroys the view and all its resources.
 */
destroy(): void;

}

/**
* Class: mxCurrentRootChange
*
* Action to change the current root in a view.
*/
declare class mxCurrentRootChange {

/**
 * @constructor mxCurrentRootChange
 *
 * Constructs a change of the current root in the given view.
 */
constructor(view: mxGraphView, root: mxCell);

/**
 * Changes the current root of the view.
 */
execute(): void;

}


declare class mxRectangle extends mxPoint {

constructor(x: number, y: number, width: number, height: number);

/**
 * Variable: width
 *
 * Holds the width of the rectangle. Default is 0.
 */
width: number;

/**
 * Variable: height
 *
 * Holds the height of the rectangle. Default is 0.
 */
height: number;

/**
 * Function: setRect
 *
 * Sets this rectangle to the specified values
 */
setRect(x: number, y: number, w: number, h: number): void;

/**
 * Function: getCenterX
 *
 * Returns the x-coordinate of the center point.
 */
getCenterX(): number;

/**
 * Function: getCenterY
 *
 * Returns the y-coordinate of the center point.
 */
getCenterY(): number;

/**
 * Function: add
 *
 * Adds the given rectangle to this rectangle.
 */
add(rect: mxRectangle): void;

/**
 * Function: intersect
 *
 * Changes this rectangle to where it overlaps with the given rectangle.
 */
intersect(rect: mxRectangle): void;

/**
 * Function: grow
 *
 * Grows the rectangle by the given amount, that is, this method subtracts
 * the given amount from the x- and y-coordinates and adds twice the amount
 * to the width and height.
 */
grow(amount: number): void;

/**
 * Function: getPoint
 *
 * Returns the top, left corner as a new <mxPoint>.
 */
getPoint(): mxPoint;

/**
 * Function: rotate90
 *
 * Rotates this rectangle by 90 degree around its center point.
 */
rotate90(): void;

/**
 * Function: equals
 *
 * Returns true if the given object equals this rectangle.
 */
equals(obj: mxRectangle): boolean;

/**
 * Function: fromRectangle
 *
 * Returns a new <mxRectangle> which is a copy of the given rectangle.
 */
fromRectangle(rect: mxRectangle): mxRectangle;

clone(): mxRectangle;

static fromRectangle(rect: mxRectangle): mxRectangle;

}
declare class mxPolyline extends mxShape {

/**
 * Constructs a new polyline shape.
 * @param {Array<mxPoint>} points   Array of mxPoints that define the points.  This is stored in mxShape.points.
 * @param {string} stroke           String that defines the stroke color.  Default is ‘black’.  This is stored in <stroke>.
 * @param {number} [strokewidth]    Optional integer that defines the stroke width.  Default is 1.  This is stored in <strokewidth>.
 */
constructor(points: Array<mxPoint>, stroke: string, strokewidth?: number);

/**
 * Returns 0.
 */
getRotation(): number;

/**
 * Returns 0.
 */
getShapeRotation(): number;

/**
 * Returns false.
 */
isPaintBoundsInverted(): boolean;

/**
 * Paints the line shape.
 */
paintEdgeShape(c: mxAbstractCanvas2D, pts: Array<mxPoint>): void;

/**
 * Paints the line shape.
 */
paintLine(c: mxAbstractCanvas2D, pts: Array<mxPoint>, rounded?: boolean): void;

/**
 * Paints the line shape.
 */
paintCurvedLine(c: mxAbstractCanvas2D, pts: Array<mxPoint>): void;

}

/**
* Extends {@link mxShape} to implement a rectangle shape.
* This shape is registered under {@link mxConstants.SHAPE_RECTANGLE} in {@link mxCellRenderer}.
* @class mxRectangleShape
* @extends {mxShape}
*/
declare class mxRectangleShape extends mxShape {

/**
 * @param {mxRectangle} bounds
 * @param {string} fill
 * @param {string} stroke
 * @param {number} [strokewidth]
 */
constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number);

/**
 * Returns true for non-rounded, non-rotated shapes with no glass gradient.
 */
isHtmlAllowed(): boolean;

/**
 * Generic background painting implementation.
 */
paintBackground(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Adds roundable support.
 */
isRoundable(c?: mxAbstractCanvas2D, x?: number, y?: number, w?: number, h?: number): boolean;

/**
 * Generic background painting implementation.
 */
paintForeground(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;
}


declare class mxPopupMenu extends mxEventSource {
constructor(factoryMethod: (handler: mxPopupMenuHandler, cell: mxCell, me: mxMouseEvent) => any);

/**
 * Variable: submenuImage
 *
 * URL of the image to be used for the submenu icon.
 */
submenuImage: string;

/**
 * Variable: zIndex
 *
 * Specifies the zIndex for the popupmenu and its shadow. Default is 1006.
 */
zIndex: number;

/**
 * Variable: factoryMethod
 *
 * Function that is used to create the popup menu. The function takes the
 * current panning handler, the <mxCell> under the mouse and the mouse
 * event that triggered the call as arguments.
 */
factoryMethod: (handler: mxPopupMenuHandler, cell: mxCell, me: mxMouseEvent) => any;

/**
 * Variable: useLeftButtonForPopup
 *
 * Specifies if popupmenus should be activated by clicking the left mouse
 * button. Default is false.
 */
useLeftButtonForPopup: boolean;

/**
 * Variable: enabled
 *
 * Specifies if events are handled. Default is true.
 */
enabled: boolean;

/**
 * Variable: itemCount
 *
 * Contains the number of times <addItem> has been called for a new menu.
 */
itemCount: number;

/**
 * Variable: autoExpand
 *
 * Specifies if submenus should be expanded on mouseover. Default is false.
 */
autoExpand: boolean;

/**
 * Variable: smartSeparators
 *
 * Specifies if separators should only be added if a menu item follows them.
 * Default is false.
 */
smartSeparators: boolean;

/**
 * Variable: labels
 *
 * Specifies if any labels should be visible. Default is true.
 */
labels: boolean;

/**
 * Function: init
 *
 * Initializes the shapes required for this vertex handler.
 */
init(): void;

/**
 * Function: isEnabled
 *
 * Returns true if events are handled. This implementation
 * returns <enabled>.
 */
isEnabled(): boolean;

/**
 * Function: setEnabled
 *
 * Enables or disables event handling. This implementation
 * updates <enabled>.
 */
setEnabled(enabled: boolean): void;

/**
 * Function: isPopupTrigger
 *
 * Returns true if the given event is a popupmenu trigger for the optional
 * given cell.
 *
 * Parameters:
 *
 * me - <mxMouseEvent> that represents the mouse event.
 */
isPopupTrigger(me: mxMouseEvent): boolean;

/**
 * Function: addItem
 *
 * Adds the given item to the given parent item. If no parent item is specified
 * then the item is added to the top-level menu. The return value may be used
 * as the parent argument, ie. as a submenu item. The return value is the table
 * row that represents the item.
 *
 * Paramters:
 *
 * title - String that represents the title of the menu item.
 * image - Optional URL for the image icon.
 * funct - Function associated that takes a mouseup or touchend event.
 * parent - Optional item returned by <addItem>.
 * iconCls - Optional string that represents the CSS class for the image icon.
 * IconsCls is ignored if image is given.
 * enabled - Optional boolean indicating if the item is enabled. Default is true.
 * active - Optional boolean indicating if the menu should implement any event handling.
 * Default is true.
 */
addItem(title: string, image?: string, funct?: (me: mxMouseEvent) => void, parent?: mxPopupMenu, iconCls?: string, enabled?: boolean, active?: boolean): Element;

/**
 * Adds a checkmark to the given menuitem.
 */
addCheckmark(item: Element, img: string): void;

/**
 * Function: createSubmenu
 *
 * Creates the nodes required to add submenu items inside the given parent
 * item. This is called in <addItem> if a parent item is used for the first
 * time. This adds various DOM nodes and a <submenuImage> to the parent.
 *
 * Parameters:
 *
 * parent - An item returned by <addItem>.
 */
createSubmenu(parent: Element): void;

/**
 * Function: showSubmenu
 *
 * Shows the submenu inside the given parent row.
 */
showSubmenu(parent: Element, row: Element): void;

/**
 * Function: addSeparator
 *
 * Adds a horizontal separator in the given parent item or the top-level menu
 * if no parent is specified.
 *
 * Parameters:
 *
 * parent - Optional item returned by <addItem>.
 * force - Optional boolean to ignore <smartSeparators>. Default is false.
 */
addSeparator(parent?: Element, force?: boolean): void;

/**
 * Function: popup
 *
 * Shows the popup menu for the given event and cell.
 *
 * Example:
 *
 * (code)
 * graph.panningHandler.popup(x, y, cell, evt)
 * {
 *   mxUtils.alert('Hello, World!');
 * }
 * (end)
 */
popup(x: number, y: number, cell: mxCell, evt: Event): void;

/**
 * Function: isMenuShowing
 *
 * Returns true if the menu is showing.
 */
isMenuShowing(): boolean;

/**
 * Function: showMenu
 *
 * Shows the menu.
 */
showMenu(): void;

/**
 * Function: hideMenu
 *
 * Removes the menu and all submenus.
 */
hideMenu(): void;

/**
 * Function: hideSubmenu
 *
 * Removes all submenus inside the given parent.
 *
 * Parameters:
 *
 * parent - An item returned by <addItem>.
 */
hideSubmenu(parent: Element): void;

/**
 * Function: destroy
 *
 * Destroys the handler and all its resources and DOM nodes.
 */
destroy(): void;

}



declare class mxGraphHandler {
cell: mxCell;
cells: Array<mxCell>;
first: mxPoint;
bounds: mxRectangle;
pBounds: mxRectangle;
allCells: mxDictionary<any>;
cloning: boolean;
cellCount: number;

/**
 * Variable: graph
 *
 * Reference to the enclosing <mxGraph>.
 */
graph: mxGraph;

/**
 * Variable: maxCells
 *
 * Defines the maximum number of cells to paint subhandles
 * for. Default is 50 for Firefox and 20 for IE. Set this
 * to 0 if you want an unlimited number of handles to be
 * displayed. This is only recommended if the number of
 * cells in the graph is limited to a small number, eg.
 * 500.
 */
maxCells: number;

/**
 * Variable: enabled
 *
 * Specifies if events are handled. Default is true.
 */
enabled: boolean;

/**
 * Variable: highlightEnabled
 *
 * Specifies if drop targets under the mouse should be enabled. Default is
 * true.
 */
highlightEnabled: boolean;

/**
 * Variable: cloneEnabled
 *
 * Specifies if cloning by control-drag is enabled. Default is true.
 */
cloneEnabled: boolean;

/**
 * Variable: moveEnabled
 *
 * Specifies if moving is enabled. Default is true.
 */
moveEnabled: boolean;

/**
 * Variable: guidesEnabled
 *
 * Specifies if other cells should be used for snapping the right, center or
 * left side of the current selection. Default is false.
 */
guidesEnabled: boolean;

/**
 * Variable: guide
 *
 * Holds the <mxGuide> instance that is used for alignment.
 */
guide: mxGuide;

/**
 * Variable: currentDx
 *
 * Stores the x-coordinate of the current mouse move.
 */
currentDx: number;

/**
 * Variable: currentDy
 *
 * Stores the y-coordinate of the current mouse move.
 */
currentDy: number;

/**
 * Variable: updateCursor
 *
 * Specifies if a move cursor should be shown if the mouse is over a movable
 * cell. Default is true.
 */
updateCursor: boolean;

/**
 * Variable: selectEnabled
 *
 * Specifies if selecting is enabled. Default is true.
 */
selectEnabled: boolean;

/**
 * Variable: removeCellsFromParent
 *
 * Specifies if cells may be moved out of their parents. Default is true.
 */
removeCellsFromParent: boolean;

/**
 * Variable: connectOnDrop
 *
 * Specifies if drop events are interpreted as new connections if no other
 * drop action is defined. Default is false.
 */
connectOnDrop: boolean;

/**
 * Variable: scrollOnMove
 *
 * Specifies if the view should be scrolled so that a moved cell is
 * visible. Default is true.
 */
scrollOnMove: boolean;

/**
 * Variable: minimumSize
 *
 * Specifies the minimum number of pixels for the width and height of a
 * selection border. Default is 6.
 */
minimumSize: number;

/**
 * Variable: previewColor
 *
 * Specifies the color of the preview shape. Default is black.
 */
previewColor: string;

/**
 * Variable: htmlPreview
 *
 * Specifies if the graph container should be used for preview. If this is used
 * then drop target detection relies entirely on <mxGraph.getCellAt> because
 * the HTML preview does not "let events through". Default is false.
 */
htmlPreview: boolean;

/**
 * Variable: shape
 *
 * Reference to the <mxShape> that represents the preview.
 */
shape: mxShape;

/**
 * Variable: scaleGrid
 *
 * Specifies if the grid should be scaled. Default is false.
 */
scaleGrid: boolean;

/**
 * Variable: rotationEnabled
 *
 * Specifies if the bounding box should allow for rotation. Default is true.
 */
rotationEnabled: boolean;

constructor(graph: mxGraph);

/**
 * Function: isEnabled
 *
 * Returns <enabled>.
 */
isEnabled(): boolean;

/**
 * Function: setEnabled
 *
 * Sets <enabled>.
 */
setEnabled(value: boolean): void;

/**
 * Function: isCloneEnabled
 *
 * Returns <cloneEnabled>.
 */
isCloneEnabled(): boolean;

/**
 * Function: setCloneEnabled
 *
 * Sets <cloneEnabled>.
 *
 * Parameters:
 *
 * value - Boolean that specifies the new clone enabled state.
 */
setCloneEnabled(value: boolean): void;

/**
 * Function: isMoveEnabled
 *
 * Returns <moveEnabled>.
 */
isMoveEnabled(): boolean;

/**
 * Function: setMoveEnabled
 *
 * Sets <moveEnabled>.
 */
setMoveEnabled(value: boolean): void;

/**
 * Function: isSelectEnabled
 *
 * Returns <selectEnabled>.
 */
isSelectEnabled(): boolean;

/**
 * Function: setSelectEnabled
 *
 * Sets <selectEnabled>.
 */
setSelectEnabled(value: boolean): void;

/**
 * Function: isRemoveCellsFromParent
 *
 * Returns <removeCellsFromParent>.
 */
isRemoveCellsFromParent(): boolean;

/**
 * Function: setRemoveCellsFromParent
 *
 * Sets <removeCellsFromParent>.
 */
setRemoveCellsFromParent(value: boolean): void;

/**
 * Function: getInitialCellForEvent
 *
 * Hook to return initial cell for the given event.
 */
getInitialCellForEvent(me: mxMouseEvent): mxCell;

/**
 * Function: isDelayedSelection
 *
 * Hook to return true for delayed selections.
 */
isDelayedSelection(cell: mxCell, me: mxMouseEvent): boolean;

/**
 * Function: consumeMouseEvent
 *
 * Consumes the given mouse event. NOTE: This may be used to enable click
 * events for links in labels on iOS as follows as consuming the initial
 * touchStart disables firing the subsequent click evnent on the link.
 *
 * <code>
 * consumeMouseEvent(evtName, me)
 * {
 *   var source = mxEvent.getSource(me.getEvent());
 *
 *   if (!mxEvent.isTouchEvent(me.getEvent()) || source.nodeName != 'A')
 *   {
 *     me.consume();
 *   }
 * }
 * </code>
 */
consumeMouseEvent(evtName: string, me: mxMouseEvent): void;

/**
 * Function: mouseDown
 *
 * Handles the event by selecing the given cell and creating a handle for
 * it. By consuming the event all subsequent events of the gesture are
 * redirected to this handler.
 */
mouseDown(sender: any, me: mxMouseEvent): void;

/**
 * Adds the states for the given cell recursively to the given dictionary.
 * @param cell
 * @param dict
 */
addStates(cell: mxCell, dict: any): number;

/**
 * Function: getGuideStates
 *
 * Creates an array of cell states which should be used as guides.
 */
getGuideStates(): Array<mxCellState|mxPoint>;

/**
 * Function: getCells
 *
 * Returns the cells to be modified by this handler. This implementation
 * returns all selection cells that are movable, or the given initial cell if
 * the given cell is not selected and movable. This handles the case of moving
 * unselectable or unselected cells.
 *
 * Parameters:
 *
 * initialCell - <mxCell> that triggered this handler.
 */
getCells(initialCell: mxCell): mxCell[];

/**
 * Function: getPreviewBounds
 *
 * Returns the <mxRectangle> used as the preview bounds for
 * moving the given cells.
 */
getPreviewBounds(cells: mxCell[]): mxRectangle;

/**
 * Function: getBoundingBox
 *
 * Returns the union of the <mxCellStates> for the given array of <mxCells>.
 * For vertices, this method uses the bounding box of the corresponding shape
 * if one exists. The bounding box of the corresponding text label and all
 * controls and overlays are ignored. See also: <mxGraphView.getBounds> and
 * <mxGraph.getBoundingBox>.
 *
 * Parameters:
 *
 * cells - Array of <mxCells> whose bounding box should be returned.
 */
getBoundingBox(cells: mxCell[]): mxRectangle;

/**
 * Function: createPreviewShape
 *
 * Creates the shape used to draw the preview for the given bounds.
 */
createPreviewShape(bounds: mxRectangle): mxRectangleShape;

/**
 * Function: start
 *
 * Starts the handling of the mouse gesture.
 */
start(cell: mxCell, x: number, y: number): void;

/**
 * Function: useGuidesForEvent
 *
 * Returns true if the guides should be used for the given <mxMouseEvent>.
 * This implementation returns <mxGuide.isEnabledForEvent>.
 */
useGuidesForEvent(me: mxMouseEvent): boolean;


/**
 * Function: snap
 *
 * Snaps the given vector to the grid and returns the given mxPoint instance.
 */
snap(vector: mxPoint): mxPoint;

/**
 * Function: getDelta
 *
 * Returns an <mxPoint> that represents the vector for moving the cells
 * for the given <mxMouseEvent>.
 */
getDelta(me: mxMouseEvent): mxPoint;

/**
 * Function: updateHint
 *
 * Hook for subclassers do show details while the handler is active.
 */
updateHint(me: mxMouseEvent): void;

/**
 * Function: removeHint
 *
 * Hooks for subclassers to hide details when the handler gets inactive.
 */
removeHint(): void;

/**
 * Function: roundLength
 *
 * Hook for rounding the unscaled vector. This uses Math.round.
 */
roundLength(length: number): number;

/**
 * Function: mouseMove
 *
 * Handles the event by highlighting possible drop targets and updating the
 * preview.
 */
mouseMove(sender: any, me: mxMouseEvent): void;

/**
 * Function: updatePreviewShape
 *
 * Updates the bounds of the preview shape.
 */
updatePreviewShape(): void;

/**
 * Function: setHighlightColor
 *
 * Sets the color of the rectangle used to highlight drop targets.
 *
 * Parameters:
 *
 * color - String that represents the new highlight color.
 */
setHighlightColor(color: string): void;

/**
 * Function: mouseUp
 *
 * Handles the event by applying the changes to the selection cells.
 */
mouseUp(sender: any, me: mxMouseEvent): void;

/**
 * Function: selectDelayed
 *
 * Implements the delayed selection for the given mouse event.
 */
selectDelayed(me: mxMouseEvent): void;

/**
 * Function: reset
 *
 * Resets the state of this handler.
 */
reset(): void;

/**
 * Function: shouldRemoveCellsFromParent
 *
 * Returns true if the given cells should be removed from the parent for the specified
 * mousereleased event.
 */
shouldRemoveCellsFromParent(parent: mxCell, cells: mxCell[], evt: Event): boolean;

/**
 * Function: moveCells
 *
 * Moves the given cells by the specified amount.
 */
moveCells(cells: mxCell[], dx: number, dy: number, clone: boolean, target: mxCell, evt: Event): void;

/**
 * Function: destroyShapes
 *
 * Destroy the preview and highlight shapes.
 */
destroyShapes(): void;

/**
 * Function: destroy
 *
 * Destroys the handler and all its resources and DOM nodes.
 */
destroy(): void;
}

declare class mxPopupMenuHandler extends mxPopupMenu {

constructor(graph: mxGraph, factoryMethod?: (handler: mxPopupMenuHandler, cell: mxCell, me: mxMouseEvent) => any);

/**
 * Variable: graph
 *
 * Reference to the enclosing <mxGraph>.
 */
graph: mxGraph;

/**
 * Variable: selectOnPopup
 *
 * Specifies if cells should be selected if a popupmenu is displayed for
 * them. Default is true.
 */
selectOnPopup: boolean;

/**
 * Variable: clearSelectionOnBackground
 *
 * Specifies if cells should be deselected if a popupmenu is displayed for
 * the diagram background. Default is true.
 */
clearSelectionOnBackground: boolean;

/**
 * Variable: triggerX
 *
 * X-coordinate of the mouse down event.
 */
triggerX: number;

/**
 * Variable: triggerY
 *
 * Y-coordinate of the mouse down event.
 */
triggerY: number;

/**
 * Variable: screenX
 *
 * Screen X-coordinate of the mouse down event.
 */
screenX: number;

/**
 * Variable: screenY
 *
 * Screen Y-coordinate of the mouse down event.
 */
screenY: number;

/**
 * Function: init
 *
 * Initializes the shapes required for this vertex handler.
 */
init(): void;

/**
 * Function: isSelectOnPopup
 *
 * Hook for returning if a cell should be selected for a given <mxMouseEvent>.
 * This implementation returns <selectOnPopup>.
 */
isSelectOnPopup(me: mxMouseEvent): boolean;

/**
 * Function: mouseDown
 *
 * Handles the event by initiating the panning. By consuming the event all
 * subsequent events of the gesture are redirected to this handler.
 */
mouseDown(sender: any, me: mxMouseEvent): void;

/**
 * Function: mouseMove
 *
 * Handles the event by updating the panning on the graph.
 */
mouseMove(sender: any, me: mxMouseEvent): void;

/**
 * Function: mouseUp
 *
 * Handles the event by setting the translation on the view or showing the
 * popupmenu.
 */
mouseUp(sender: any, me: mxMouseEvent): void;

/**
 * Function: getCellForPopupEvent
 *
 * Hook to return the cell for the mouse up popup trigger handling.
 */
getCellForPopupEvent(me: mxMouseEvent): mxCell;

/**
 * Function: destroy
 *
 * Destroys the handler and all its resources and DOM nodes.
 */
destroy(): void;
}
/**
* Base class for all shapes.
* A shape in mxGraph is a separate implementation for SVG, VML and HTML.
* Which implementation to use is controlled by the dialect property which
* is assigned from within the mxCellRenderer when the shape is created.
* The dialect must be assigned for a shape, and it does normally depend on
* the browser and the configuration of the graph (see mxGraph rendering hint).
*
* For each supported shape in SVG and VML, a corresponding shape exists in
* mxGraph, namely for text, image, rectangle, rhombus, ellipse and polyline.
* The other shapes are a combination of these shapes (eg. label and swimlane)
* or they consist of one or more (filled) path objects (eg. actor and cylinder).
* The HTML implementation is optional but may be required for a HTML-only view
* of the graph.
*
* ### Custom Shapes
* To extend from this class, the basic code looks as follows.
* In the special case where the custom shape consists only of one filled region
* or one filled region and an additional stroke the mxActor and mxCylinder
* should be subclassed, respectively.
* @example
* ```javascript
* function CustomShape() { }
*
* CustomShape.prototype = new mxShape();
* CustomShape.prototype.constructor = CustomShape;
* ```
* To register a custom shape in an existing graph instance, one must register the
* shape under a new name in the graph’s cell renderer as follows:
* @example
* ```javascript
* mxCellRenderer.registerShape('customShape', CustomShape);
* ```
* The second argument is the name of the constructor.
* In order to use the shape you can refer to the given name above in a stylesheet.
* For example, to change the shape for the default vertex style, the following code
* is used:
* @example
* ```javascript
* var style = graph.getStylesheet().getDefaultVertexStyle();
* style[mxConstants.STYLE_SHAPE] = 'customShape';
* ```
*/
declare class mxShape {

/**
 * Constructs a new shape.
 * @param {mxStencil} stencil
 */
constructor(stencil: mxStencil);

/**
 * Fill color.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
fill: string;

/**
 * Gradient color.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
gradient: string;

/**
 * Gradient direction.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
gradientDirection: string;

/**
 * Opacity. Possible range is `0-100`.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
opacity: number;

/**
 * Fill opacity. Possible range is `0-100`.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
fillOpacity: number;

/**
 * Stroke opacity. Possible range is `0-100`.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
strokeOpacity: number;

/**
 * Stroke color.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
stroke: string;

/**
 * Stroke width.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
strokewidth: number;

/**
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
isShadow: boolean;

/**
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
isDashed: boolean;

/**
 * The value represents the spacing, in pixels, added to each side of a label in a vertex (style applies to vertices only).<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
spacing: number;

/**
 *  Size of the start marker or the size of the swimlane title region depending on the shape it is used for.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
startSize: number;

/**
 *  Size of the end marker in pixels.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
endSize: number;

/**
 * For edges this determines whether or not joins between edges segments are smoothed to a rounded finish.<br>
 * For vertices that have the rectangle shape, this determines whether or not the rectangle is rounded.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
isRounded: boolean;

/**
 * Possible values are all constants with an ARROW-prefix.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
startArrow: string;

/**
 * Possible values are all constants with an ARROW-prefix.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
endArrow: string;

/**
 * Possible range is 0-360.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
rotation: number;

/**
 * Specify the direction of certain shapes (eg. {@link mxTriangle}). Possible values are {@link mxConstants.DIRECTION_EAST} (default),
 * {@link mxConstants.DIRECTION_WEST}, {@link mxConstants.DIRECTION_NORTH}, and {@link mxConstants.DIRECTION_SOUTH}.<br>
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
direction: string;

/**
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply}).
 */
glass: boolean;

/**
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply} implementation).
 */
flipH: boolean;

/**
 * <b>Note:</b> this property is not documented in the JavaScript API but it does exist and is necessary (see {@link apply} implementation).
 */
flipV: boolean;

// TODO where does this come from?? not found in the mxgraph@4.1.1 and mxgraph@4.2.0
constraints: Array<mxConnectionConstraint>;

/**
 * Variable: dialect
 *
 * Holds the dialect in which the shape is to be painted.
 * This can be one of the DIALECT constants in <mxConstants>.
 */
dialect: string;

/**
 * Variable: scale
 *
 * Holds the scale in which the shape is being painted.
 */
scale: number;

/**
 * Variable: antiAlias
 *
 * Rendering hint for configuring the canvas.
 */
antiAlias: boolean;

/**
 * Variable: minSvgStrokeWidth
 *
 * Minimum stroke width for SVG output.
 */
minSvgStrokeWidth: number;

/**
 * Variable: bounds
 *
 * Holds the <mxRectangle> that specifies the bounds of this shape.
 */
bounds: mxRectangle;

/**
 * Variable: points
 *
 * Holds the array of <mxPoints> that specify the points of this shape.
 */
points: mxPoint[];

/**
 * Variable: node
 *
 * Holds the outermost DOM node that represents this shape.
 */
node: HTMLElement;

/**
 * Variable: state
 *
 * Optional reference to the corresponding <mxCellState>.
 */
state?: mxCellState;

/**
 * Variable: style
 *
 * Optional reference to the style of the corresponding <mxCellState>.
 */
style?: { [key: string]: any };

/**
 * Variable: boundingBox
 *
 * Contains the bounding box of the shape, that is, the smallest rectangle
 * that includes all pixels of the shape.
 */
boundingBox: mxRectangle;

/**
 * Variable: stencil
 *
 * Holds the <mxStencil> that defines the shape.
 */
stencil: mxStencil;

/**
 * Variable: svgStrokeTolerance
 *
 * Event-tolerance for SVG strokes (in px). Default is 8. This is only passed
 * to the canvas in <createSvgCanvas> if <pointerEvents> is true.
 */
svgStrokeTolerance: number;

/**
 * Variable: pointerEvents
 *
 * Specifies if pointer events should be handled. Default is true.
 */
pointerEvents: boolean;

/**
 * Variable: svgPointerEvents
 *
 * Specifies if pointer events should be handled. Default is true.
 */
svgPointerEvents: 'all';

/**
 * Variable: shapePointerEvents
 *
 * Specifies if pointer events outside of shape should be handled. Default
 * is false.
 */
shapePointerEvents: boolean;

/**
 * Variable: stencilPointerEvents
 *
 * Specifies if pointer events outside of stencils should be handled. Default
 * is false. Set this to true for backwards compatibility with the 1.x branch.
 */
stencilPointerEvents: boolean;

/**
 * Variable: vmlScale
 *
 * Scale for improving the precision of VML rendering. Default is 1.
 */
vmlScale: number;

/**
 * Variable: outline
 *
 * Specifies if the shape should be drawn as an outline. This disables all
 * fill colors and can be used to disable other drawing states that should
 * not be painted for outlines. Default is false. This should be set before
 * calling <apply>.
 */
outline: boolean;

/**
 * Variable: visible
 *
 * Specifies if the shape is visible. Default is true.
 */
visible: boolean;

/**
 * Variable: useSvgBoundingBox
 *
 * Allows to use the SVG bounding box in SVG. Default is false for performance
 * reasons.
 */
useSvgBoundingBox: boolean;

/**
 * Function: init
 *
 * Initializes the shape by creaing the DOM node using <create>
 * and adding it into the given container.
 *
 * Parameters:
 *
 * container - DOM node that will contain the shape.
 */
init(container: Element): void;

/**
 * Function: initStyles
 *
 * Sets the styles to their default values.
 */
initStyles(container: Element): void;

/**
 * Function: isParseVml
 *
 * Specifies if any VML should be added via insertAdjacentHtml to the DOM. This
 * is only needed in IE8 and only if the shape contains VML markup. This method
 * returns true.
 */
isParseVml(): boolean;

/**
 * Function: isHtmlAllowed
 *
 * Returns true if HTML is allowed for this shape. This implementation always
 * returns false.
 */
isHtmlAllowed(): boolean;

/**
 * Function: getSvgScreenOffset
 *
 * Returns 0, or 0.5 if <strokewidth> % 2 == 1.
 */
getSvgScreenOffset(): number;

/**
 * Function: create
 *
 * Creates and returns the DOM node(s) for the shape in
 * the given container. This implementation invokes
 * <createSvg>, <createHtml> or <createVml> depending
 * on the <dialect> and style settings.
 *
 * Parameters:
 *
 * container - DOM node that will contain the shape.
 */
create(container: Element): Element;

/**
 * Function: createSvg
 *
 * Creates and returns the SVG node(s) to represent this shape.
 */
createSvg(): Element;

/**
 * Function: createVml
 *
 * Creates and returns the VML node to represent this shape.
 */
createVml(): Element;

/**
 * Function: createHtml
 *
 * Creates and returns the HTML DOM node(s) to represent
 * this shape. This implementation falls back to <createVml>
 * so that the HTML creation is optional.
 */
createHtml(): HTMLElement;

/**
 * Function: reconfigure
 *
 * Reconfigures this shape. This will update the colors etc in
 * addition to the bounds or points.
 */
reconfigure(): void;

/**
 * Function: redraw
 *
 * Creates and returns the SVG node(s) to represent this shape.
 */
redraw(): void;

/**
 * Function: clear
 *
 * Removes all child nodes and resets all CSS.
 */
clear(): void;

/**
 * Function: updateBoundsFromPoints
 *
 * Updates the bounds based on the points.
 */
updateBoundsFromPoints(): void;

/**
 * Function: getLabelBounds
 *
 * Returns the <mxRectangle> for the label bounds of this shape, based on the
 * given scaled and translated bounds of the shape. This method should not
 * change the rectangle in-place. This implementation returns the given rect.
 */
getLabelBounds(rect: mxRectangle): mxRectangle;

/**
 * Function: getLabelMargins
 *
 * Returns the scaled top, left, bottom and right margin to be used for
 * computing the label bounds as an <mxRectangle>, where the bottom and right
 * margin are defined in the width and height of the rectangle, respectively.
 */
getLabelMargins(rect: mxRectangle): mxRectangle;

/**
 * Function: checkBounds
 *
 * Returns true if the bounds are not null and all of its variables are numeric.
 */
checkBounds(): boolean;

/**
 * Function: createVmlGroup
 *
 * Returns the temporary element used for rendering in IE8 standards mode.
 */
createVmlGroup(): Element;

/**
 * Function: redrawShape
 *
 * Updates the SVG or VML shape.
 */
redrawShape(): void;

/**
 * Function: createCanvas
 *
 * Creates a new canvas for drawing this shape. May return null.
 */
createCanvas(): Element;

/**
 * Function: createSvgCanvas
 *
 * Creates and returns an <mxSvgCanvas2D> for rendering this shape.
 */
createSvgCanvas(): mxSvgCanvas2D;

/**
 * Function: createVmlCanvas
 *
 * Creates and returns an <mxVmlCanvas2D> for rendering this shape.
 */
createVmlCanvas(): mxVmlCanvas2D;

/**
 * Function: updateVmlContainer
 *
 * Updates the bounds of the VML container.
 */
updateVmlContainer(): void;

/**
 * Function: redrawHtml
 *
 * Allow optimization by replacing VML with HTML.
 */
redrawHtmlShape(): void;

/**
 * Function: updateHtmlFilters
 *
 * Allow optimization by replacing VML with HTML.
 */
updateHtmlFilters(node: HTMLElement): void;

/**
 * Function: mixedModeHtml
 *
 * Allow optimization by replacing VML with HTML.
 */
updateHtmlColors(node: HTMLElement): void;

/**
 * Function: mixedModeHtml
 *
 * Allow optimization by replacing VML with HTML.
 */
updateHtmlBounds(node: HTMLElement): void;

/**
 * Generic rendering code.
 */
paint(c: mxAbstractCanvas2D): void;

/**
 * Sets the state of the canvas for drawing the shape.
 */
configureCanvas(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Function: getGradientBounds
 *
 * Returns the bounding box for the gradient box for this shape.
 */
getGradientBounds(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): mxRectangle;

/**
 * Function: updateTransform
 *
 * Sets the scale and rotation on the given canvas.
 */
updateTransform(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Function: paintVertexShape
 *
 * Paints the vertex shape.
 */
paintVertexShape(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Function: paintBackground
 *
 * Hook for subclassers. This implementation is empty.
 */
paintBackground(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Hook for subclassers. This implementation is empty.
 */
paintForeground(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void;

/**
 * Function: paintEdgeShape
 *
 * Hook for subclassers. This implementation is empty.
 */
paintEdgeShape(c: mxAbstractCanvas2D, pts: mxPoint[]): void;

/**
 * Function: getArcSize
 *
 * Returns the arc size for the given dimension.
 */
getArcSize(w: number, h: number): number;

/**
 * Function: paintGlassEffect
 *
 * Paints the glass gradient effect.
 */
paintGlassEffect(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number, arc: number): void;
/**
 * Paints the given points with rounded corners.
 */
addPoints(c: mxAbstractCanvas2D, pts: mxPoint[], rounded: boolean, arcSize: number, close: boolean, exclude: mxPoint[], initialMove: boolean): void;

/**
 * Function: resetStyles
 *
 * Resets all styles.
 */
resetStyles(): void;

/**
 * Function: apply
 *
 * Applies the style of the given <mxCellState> to the shape. This
 * implementation assigns the following styles to local fields:
 *
 * - <mxConstants.STYLE_FILLCOLOR> => fill
 * - <mxConstants.STYLE_GRADIENTCOLOR> => gradient
 * - <mxConstants.STYLE_GRADIENT_DIRECTION> => gradientDirection
 * - <mxConstants.STYLE_OPACITY> => opacity
 * - <mxConstants.STYLE_FILL_OPACITY> => fillOpacity
 * - <mxConstants.STYLE_STROKE_OPACITY> => strokeOpacity
 * - <mxConstants.STYLE_STROKECOLOR> => stroke
 * - <mxConstants.STYLE_STROKEWIDTH> => strokewidth
 * - <mxConstants.STYLE_SHADOW> => isShadow
 * - <mxConstants.STYLE_DASHED> => isDashed
 * - <mxConstants.STYLE_SPACING> => spacing
 * - <mxConstants.STYLE_STARTSIZE> => startSize
 * - <mxConstants.STYLE_ENDSIZE> => endSize
 * - <mxConstants.STYLE_ROUNDED> => isRounded
 * - <mxConstants.STYLE_STARTARROW> => startArrow
 * - <mxConstants.STYLE_ENDARROW> => endArrow
 * - <mxConstants.STYLE_ROTATION> => rotation
 * - <mxConstants.STYLE_DIRECTION> => direction
 * - <mxConstants.STYLE_GLASS> => glass
 *
 * This keeps a reference to the <style>. If you need to keep a reference to
 * the cell, you can override this method and store a local reference to
 * state.cell or the <mxCellState> itself. If <outline> should be true, make
 * sure to set it before calling this method.
 *
 * Parameters:
 *
 * state - <mxCellState> of the corresponding cell.
 */
apply(state: mxCellState): void;

/**
 * Function: setCursor
 *
 * Sets the cursor on the given shape.
 *
 * Parameters:
 *
 * cursor - The cursor to be used.
 */
setCursor(cursor: string): void;

/**
 * Function: getCursor
 *
 * Returns the current cursor.
 */
getCursor(): string;

/**
 * Hook for subclassers.
 */
isRoundable(): boolean;

/**
 * Function: updateBoundingBox
 *
 * Updates the <boundingBox> for this shape using <createBoundingBox> and
 * <augmentBoundingBox> and stores the result in <boundingBox>.
 */
updateBoundingBox(): void;

/**
 * Function: createBoundingBox
 *
 * Returns a new rectangle that represents the bounding box of the bare shape
 * with no shadows or strokewidths.
 */
createBoundingBox(): mxRectangle;

/**
 * Augments the bounding box with the strokewidth and shadow offsets.
 */
augmentBoundingBox(bbox: mxRectangle): void;

/**
 * Function: isPaintBoundsInverted
 *
 * Returns true if the bounds should be inverted.
 */
isPaintBoundsInverted(): boolean;

/**
 * Function: getRotation
 *
 * Returns the rotation from the style.
 */
getRotation(): number;

/**
 * Function: getTextRotation
 *
 * Returns the rotation for the text label.
 */
getTextRotation(): number;

/**
 * Function: getShapeRotation
 *
 * Returns the actual rotation of the shape.
 */
getShapeRotation(): number;

/**
 * Function: createTransparentSvgRectangle
 *
 * Adds a transparent rectangle that catches all events.
 */
createTransparentSvgRectangle(x: number, y: number, w: number, h: number): Element;

/**
 * Function: setTransparentBackgroundImage
 *
 * Sets a transparent background CSS style to catch all events.
 *
 * Paints the line shape.
 */
setTransparentBackgroundImage(node: Element): void;

/**
 * Function: releaseSvgGradients
 *
 * Paints the line shape.
 */
releaseSvgGradients(grads: any[]): void;

/**
 * Function: destroy
 *
 * Destroys the shape by removing it from the DOM and releasing the DOM
 * node associated with the shape using <mxEvent.release>.
 */
destroy(): void;

}
/**
* Extends {@link mxAbstractCanvas2D} to implement a canvas for SVG. This canvas writes all calls as SVG output to the
* given SVG root node.
*
* @example
* ```javascript
* var svgDoc = mxUtils.createXmlDocument();
* var root = (svgDoc.createElementNS != null) ?
* 		svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
*
* if (svgDoc.createElementNS == null)
* {
*   root.setAttribute('xmlns', mxConstants.NS_SVG);
*   root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
* }
* else
* {
*   root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
* }
*
* var bounds = graph.getGraphBounds();
* root.setAttribute('width', (bounds.x + bounds.width + 4) + 'px');
* root.setAttribute('height', (bounds.y + bounds.height + 4) + 'px');
* root.setAttribute('version', '1.1');
*
* svgDoc.appendChild(root);
*
* var svgCanvas = new mxSvgCanvas2D(root);
* ```
*
*
* To disable anti-aliasing in the output, use the following code.
* @example
* ```javascript
* graph.view.canvas.ownerSVGElement.setAttribute('shape-rendering', 'crispEdges');
* ```
* Or set the respective attribute in the SVG element directly.
*/
declare class mxSvgCanvas2D extends mxAbstractCanvas2D {
/**
 * @param root          SVG container for the output
 * @param styleEnabled  Optional boolean that specifies if a style section should be added.
 *                      The style section sets the default font-size, font-family and stroke-miterlimit globally.
 *                      Default is `false`.
 */
constructor(root: Element, styleEnabled?: boolean, state?:any);

/**
 * Reference to the container for the SVG content.
 */
root: Element;

/**
 * Local cache of gradients for quick lookups.
 */
gradients: Element[];

cellState:any;
/**
 * Reference to the defs section of the SVG document. Only for export.
 */
defs: Element;

/**
 * Stores the value of styleEnabled passed to the constructor.
 * @default false
 */
styleEnabled: boolean;

/**
 * Holds the current DOM node.
 */
node: Element;

/**
 * Specifies if plain text output should match the vertical HTML alignment.
 * @default true.
 */
matchHtmlAlignment: boolean;

/**
 * Specifies if text output should be enabled.
 * @default true
 */
textEnabled: boolean;

/**
 * Specifies if use of foreignObject for HTML markup is allowed.
 * @default true
 */
foEnabled: boolean;

/**
 * Specifies the fallback text for unsupported foreignObjects in exported documents.
 * If this is set to `null` then no fallback text is added to the exported document.
 * @default [Object]
 */
foAltText: string;

/**
 * Offset to be used for foreignObjects.
 * @default 0
 */
foOffset: number;

/**
 * Offset to be used for text elements.
 * @default 0
 */
textOffset: number;

/**
 * Offset to be used for image elements.
 * @default 0
 */
imageOffset: number;

/**
 * Adds transparent paths for strokes.
 * @default 0
 */
strokeTolerance: number;

/**
 * Minimum stroke width for output.
 * @default 1
 */
minStrokeWidth: number;

/**
 * Local counter for references in SVG export.
 * @default 0
 */
refCount: number;

/**
 * Correction factor for {@link mxConstants.LINE_HEIGHT} in HTML output.
 * @default 1
 */
lineHeightCorrection: number;

/**
 * Default value for active pointer events.
 * @default all
 */
pointerEventsValue: string;

/**
 * Padding to be added for text that is not wrapped to account for differences in font metrics on different platforms in pixels.
 * @default 10.
 */
fontMetricsPadding: number;

/**
 * Specifies if offsetWidth and offsetHeight should be cached. This is used to speed up repaint of text in {@link updateText}.
 * @default true
 */
cacheOffsetSize: boolean;

/**
 * Rounds all numbers to 2 decimal points.
 */
format(value: string): number;

/**
 * Returns the URL of the page without the hash part. This needs to use href to
 * include any search part with no params (ie question mark alone). This is a
 * workaround for the fact that window.location.search is empty if there is
 * no search string behind the question mark.
 */
getBaseUrl(): string;

/**
 * Returns any offsets for rendering pixels.
 */
reset(): void;

/**
 * Creates the optional style section.
 */
// TODO the x parameter is not used in mxGraph 4.1.1, so unable to infer the type
createStyle(x?: any): HTMLElement;

/**
 * Private helper function to create SVG elements
 */
createElement(tagName: string, namespace?: string): HTMLElement;

/**
 * Returns the alternate text string for the given foreignObject.
 * @since mxgraph 4.1.0
 */
getAlternateText(fo: Element, x: number, y: number, w: number, h: number, str: string, align: string, valign: string, wrap: string, format: string, overflow: string, clip: string, rotation: number): string;

/**
 * Returns the alternate content for the given foreignObject.
 */
createAlternateContent(fo: Element, x: number, y: number, w: number, h: number, str: string, align: string, valign: string, wrap: string, format: string, overflow: string, clip: string, rotation: number): Element;

/**
 * Private helper function to create SVG elements
 */
createGradientId(start: string, end: string, alpha1: string, alpha2: string, direction: string): string;

/**
 * Private helper function to create SVG elements
 */
getSvgGradient(start: string, end: string, alpha1: string, alpha2: string, direction: string): string;

/**
 * Creates the given SVG gradient.
 */
createSvgGradient(start: string, end: string, alpha1: string, alpha2: string, direction: string): Element;

/**
 * Private helper function to create SVG elements
 */
addNode(filled: boolean, stroked: boolean): void;

/**
 * Transfers the stroke attributes from <state> to <node>.
 */
updateFill(): void;

/**
 * Returns the current stroke width (>= 1), ie. max(1, this.format(this.state.strokeWidth * this.state.scale)).
 */
getCurrentStrokeWidth(): number;

/**
 * Transfers the stroke attributes from {@link mxAbstractCanvas2D.state} to {@link node}.
 */
updateStroke(): void;

/**
 * Transfers the stroke attributes from {@link mxAbstractCanvas2D.state} to {@link node}.
 */
updateStrokeAttributes(): void;

/**
 * Creates the SVG dash pattern for the given state.
 */
createDashPattern(scale: number): string;

/**
 * Creates a hit detection tolerance shape for the given node.
 */
createTolerance(node: Element): Element;

/**
 * Creates a shadow for the given node.
 */
createShadow(node: Element): Element;

/**
 * Experimental implementation for hyperlinks.
 */
setLink(link: string): void;

/**
 * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
 */
rotate(theta: number, flipH: boolean, flipV: boolean, cx: number, cy: number): void;

/**
 * Extends superclass to create path.
 */
begin(): void;

/**
 * Private helper function to create SVG elements
 */
rect(x: number, y: number, w: number, h: number): void;

/**
 * Private helper function to create SVG elements
 */
roundrect(x: number, y: number, w: number, h: number, dx: number, dy: number): void;

/**
 * Private helper function to create SVG elements
 */
ellipse(x: number, y: number, w: number, h: number): void;

/**
 * Private helper function to create SVG elements
 */
image(x: number, y: number, w: number, h: number, src: string, aspect: boolean, flipH: boolean, flipV: boolean): void;

/**
 * Converts the given HTML string to XHTML.
 */
convertHtml(val: string): string;

/**
 * Private helper function to create SVG elements
 * Note: signature changed in mxgraph 4.1.0
 */
createDiv(str: string): HTMLElement;

/**
 * Updates existing DOM nodes for text rendering. LATER: Merge common parts with text function below.
 */
updateText(x: number, y: number, w: number, h: number, align: string, valign: string, wrap: string, overflow: string, clip: string, rotation: number, node: Element): void;

/**
 * Creates a foreignObject for the given string and adds it to the given root.
 * @since mxgraph 4.1.0
 */
addForeignObject(x: number, y: number, w: number, h: number, align: string, valign: string, wrap: string, format: string, overflow: string, clip: string, rotation: number, dir: any, div: Element, root: Element): void;

/**
 * Updates existing DOM nodes for text rendering.
 */
updateTextNodes(x: number, y: number, w: number, h: number, align: string, valign: string, wrap: string, overflow: string, clip: string, rotation: number, g: Element): void;

/**
 * Updates existing DOM nodes for text rendering.
 * @since mxgraph 4.1.0
 */
createCss(w: number, h: number, align: string, valign: string, wrap: string, overflow: string, clip: string, bg: string, border: string | number, flex: string, block: any, s: any, callback: Function): void;

/**
 * Private helper function to create SVG elements
 */
getTextCss(): string;

/**
 * Paints the given text. Possible values for format are empty string for plain
 * text and html for HTML markup. Note that HTML markup is only supported if
 * foreignObject is supported and <foEnabled> is true. (This means IE9 and later
 * does currently not support HTML text as part of shapes.)
 */
text(x: number, y: number, w: number, h: number, str: string, align: string, valign: string, wrap: string, format: string, overflow: string, clip: string, rotation: number, dir: string): void;

/**
 * Creates a clip for the given coordinates.
 */
createClip(x: number, y: number, w: number, h: number): Element;

/**
 * Paints the given text. Possible values for format are empty string for
 * plain text and html for HTML markup.
 */
plainText(x: number, y: number, w: number, h: number, str: string, align: string, valign: string, wrap: string, overflow: string, clip: string, rotation: number, dir: string): void;

/**
 * Updates the text properties for the given node. (NOTE: For this to work in
 * IE, the given node must be a text or tspan element.)
 */
updateFont(node: Element): void;

/**
 * Background color and border
 */
addTextBackground(node: Element, str: string, x: number, y: number, w: number, h: number, align: string, valign: string, overflow: string): void;

/**
 * Paints the outline of the current path.
 */
stroke(): void;

/**
 * Fills the current path.
 */
fill(): void;

/**
 * Fills and paints the outline of the current path.
 */
fillAndStroke(): void;
}

/**
* Optional global config variable to toggle loading of the two resource files in mxGraph and mxEditor.
* Default is true.
* NOTE: This is a global variable, not a variable of mxClient.
* If this is false, you can use mxClient.loadResources with its callback to load the default bundles asynchronously.
* @default true
* @example
* ```html
* <script type="text/javascript">
*   var mxLoadResources = false;
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
*/
declare let mxLoadResources: boolean;

/**
* Optional global config variable to force loading the JavaScript files in development mode.
* Default is undefined.  NOTE: This is a global variable, not a variable of mxClient.
* @default undefined
* @example
* ```html
* <script type="text/javascript">
*   var mxLoadResources = true;
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
*/
declare let mxForceIncludes: boolean;

/**
* Optional global config variable to specify the extension of resource files.
* Default is true.
* NOTE: This is a global variable, not a variable of mxClient.
* @default true
* @example
* ```html
* <script type="text/javascript">
*   var mxResourceExtension = '.txt';
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
*/
declare let mxResourceExtension: string|boolean;

/**
* Optional global config variable to toggle loading of the CSS files when the library is initialized.
* Default is true.
* NOTE: This is a global variable, not a variable of mxClient.
* @default true
* @example
* ```html
* <script type="text/javascript">
*   var mxLoadStylesheets = false;
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
*/
declare let mxLoadStylesheets: boolean;

/**
* Basepath for all URLs in the core without trailing slash.
* Default is ‘.’.
* Set mxBasePath prior to loading the mxClient library as follows to override this setting:
* @default '.'
* @example
* ```html
* <script type="text/javascript">
*   mxBasePath = '/path/to/core/directory';
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
* When using a relative path, the path is relative to the URL of the page that contains the assignment.
* Trailing slashes are automatically removed.
*/
declare let mxBasePath: string;

/**
* Basepath for all images URLs in the core without trailing slash.
* Default is mxClient.basePath + ‘/images’.
* Set mxImageBasePath prior to loading the mxClient library as follows to override this setting:
* @default mxClient.basePath + ‘/images’
* @example
* ```html
* <script type="text/javascript">
*   mxImageBasePath = '/path/to/image/directory';
* </script>
* <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
* ```
* When using a relative path, the path is relative to the URL of the page that contains the assignment.
* Trailing slashes are automatically removed.
*/
declare let mxImageBasePath: string;

/**
* Defines the language of the client, eg. en for english, de for german etc.
* The special value ‘none’ will disable all built-in internationalization and resource loading.
* See mxResources.getSpecialBundle for handling identifiers with and without a dash.
*
* Set mxLanguage prior to loading the mxClient library as follows to override this setting:
* @example
* ```html
* <script type="text/javascript">
*   mxLanguage = 'en';
* </script>
* <script type="text/javascript" src="js/mxClient.js"></script>
* ```
*/
declare let mxLanguage: string;

/**
* Defines the default language which is used in the common resource files.
* Any resources for this language will only load the common resource file,
* but not the language-specific resource file.
* Set mxDefaultLanguage prior to loading the mxClient library as follows to override this setting:
* @default 'en'
* @example
* ```html
* <script type="text/javascript">
*   mxDefaultLanguage = 'de';
* </script>
* <script type="text/javascript" src="js/mxClient.js"></script>
* ```
*/
declare let mxDefaultLanguage: string;

/**
* Defines the optional array of all supported language extensions.
* The default language does not have to be part of this list.
* @see mxResources.isLanguageSupported.
* @example
* ```html
* <script type="text/javascript">
*   mxLanguages = ['de', 'it', 'fr'];
* </script>
* <script type="text/javascript" src="js/mxClient.js"></script>
* ```
* This is used to avoid unnecessary requests to language files, ie. if a 404 will be returned.
*/
declare let mxLanguages: Array<string>;


/**
* Bootstrapping mechanism for the mxGraph thin client.
* The production version of this file contains all code required to run the mxGraph thin client,
* as well as global constants to identify the browser and operating system in use.
* You may have to load chrome://global/content/contentAreaUtils.js in your page to
* disable certain security restrictions in Mozilla.
*/
declare class mxClient {
 /**
  * Contains the current version of the mxGraph library.
  */
 static VERSION: string;
 /**
  * True if the current browser is Internet Explorer 10 or below.
  */
 static IS_IE: boolean;
 /**
  * True if the current browser is Internet Explorer 6.x.
  */
 static IS_IE6: boolean;
 /**
  * True if the current browser is Internet Explorer 11.x.
  */
 static IS_IE11: boolean;
 /**
  * True if the current browser is Microsoft Edge.
  */
 static IS_EDGE: boolean;
 /**
  * True if the current browser is Internet Explorer and it is in quirks mode.
  */
 static IS_QUIRKS: boolean;
 /**
  * True if the browser is IE11 in enterprise mode (IE8 standards mode).
  */
 static IS_EM: boolean;
 /**
  * Prefix for VML namespace in node names.
  */
 static VML_PREFIX: string;
 /**
  * Prefix for VML office namespace in node names.
  */
 static OFFICE_PREFIX: string;
 /**
  * True if the current browser is Netscape (including Firefox).
  */
 static IS_NS: boolean;
 /**
  * True if the current browser is Opera.
  */
 static IS_OP: boolean;
 /**
  * True if -o-transform is available as a CSS style, ie for Opera browsers based on a Presto engine with version 2.5 or later.
  */
 static IS_OT: boolean;
 /**
  * True if the current browser is Safari.
  */
 static IS_SF: boolean;
 /**
  * Returns true if the user agent contains Android.
  */
 static IS_ANDROID: boolean;
 /**
  * Returns true if the user agent is an iPad, iPhone or iPod.
  */
 static IS_IOS: boolean;
 /**
  * Returns the major version number for iOS devices or 0 if the device is not an iOS device.
  */
 static IOS_VERSION: string;
 /**
  * True if the current browser is Google Chrome.
  */
 static IS_GC: boolean;
 /**
  * True if the this is running inside a Chrome App.
  */
 static IS_CHROMEAPP: boolean;
 /**
  * True if the current browser is Firefox.
  */
 static IS_FF: boolean;
 /**
  * True if -moz-transform is available as a CSS style.
  */
 static IS_MT: boolean;
 /**
  * True if the browser supports VML.
  */
 static IS_VML: boolean;
 /**
  * True if the browser supports SVG.
  */
 static IS_SVG: boolean;
 /**
  * True if foreignObject support is not available.
  */
 static NO_FO: boolean;
 /**
  * True if the client is a Windows.
  */
 static IS_WIN: boolean;
 /**
  * True if the client is a Mac.
  */
 static IS_MAC: boolean;
 /**
  * True if the client is a Chrome OS.
  */
 static IS_CHROMEOS: boolean;
 /**
  * True if this device supports touchstart/-move/-end events (Apple iOS, Android, Chromebook and Chrome Browser on touch-enabled devices).
  */
 static IS_TOUCH: boolean;
 /**
  * True if this device supports Microsoft pointer events (always false on Macs).
  */
 static IS_POINTER: boolean;
 /**
  * True if the documents location does not start with http:// or https://.
  */
 static IS_LOCAL: boolean;
 /**
  * Contains the base names of the default bundles if mxLoadResources is false.
  */
 static defaultBundles: string;


 static imageBasePath;

 /**
  * Returns true if the current browser is supported, that is,
  * if <mxClient.IS_VML> or <mxClient.IS_SVG> is true.
  * @example
  * ```
  * if (!mxClient.isBrowserSupported())
  * {
  *   mxUtils.error('Browser is not supported!', 200, false);
  * }
  * ```
  */
 static isBrowserSupported(): boolean;

 /**
  * link
  * @example
  * ```
  * mxClient.link('stylesheet', filename);
  * ```
  */
 static link(rel: string, href: string, doc?: Node, id?: string): void;

 /**
  * Helper method to load the default bundles if mxLoadResources is false.
  * @param {Function} fn   Function to call after all resources have been loaded.
  * @param {string}   lan  Optional string to pass to mxResources.add.
  */
 static loadResources(fn: Function, lan?: string): void;

 /**
  * Dynamically adds a script node to the document header.
  * In production environments, the includes are resolved in the mxClient.js
  * file to reduce the number of requests required for client startup.
  * This function should only be used in development environments,
  * but not in production systems.
  */
 static include(src: string): void;

}



declare class mxCellRenderer {
constructor();

/**
 * Variable: defaultShapes
 *
 * Static array that contains the globally registered shapes which are
 * known to all instances of this class. For adding new shapes you should
 * use the static <mxCellRenderer.registerShape> function.
 */
defaultShapes: Object;

/**
 * Variable: defaultEdgeShape
 *
 * Defines the default shape for edges. Default is <mxConnector>.
 */
defaultEdgeShape: mxConnector;

/**
 * Variable: defaultVertexShape
 *
 * Defines the default shape for vertices. Default is <mxRectangleShape>.
 */
defaultVertexShape: mxRectangleShape;

/**
 * Variable: defaultTextShape
 *
 * Defines the default shape for labels. Default is <mxText>.
 */
defaultTextShape: mxText;

/**
 * Variable: legacyControlPosition
 *
 * Specifies if the folding icon should ignore the horizontal
 * orientation of a swimlane. Default is true.
 */
legacyControlPosition: boolean;

/**
 * Variable: legacySpacing
 *
 * Specifies if spacing and label position should be ignored if overflow is
 * fill or width. Default is true for backwards compatiblity.
 */
legacySpacing: boolean;

/**
 * Variable: antiAlias
 *
 * Anti-aliasing option for new shapes. Default is true.
 */
antiAlias: boolean;

/**
 * Variable: minSvgStrokeWidth
 *
 * Minimum stroke width for SVG output.
 */
minSvgStrokeWidth: number;

/**
 * Variable: forceControlClickHandler
 *
 * Specifies if the enabled state of the graph should be ignored in the control
 * click handler (to allow folding in disabled graphs). Default is false.
 */
forceControlClickHandler: boolean;

/**
 * Registers the given constructor under the specified key in this instance of the renderer.
 * @example
 * ```
 * mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE, mxRectangleShape);
 * ```
 *
 * @param key the shape name.
 * @param shape constructor of the {@link mxShape} subclass.
 */
static registerShape(key: string, shape: new(...args: any) => mxShape): void;

/**
 * Function: initializeShape
 *
 * Initializes the shape in the given state by calling its init method with
 * the correct container after configuring it using <configureShape>.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the shape should be initialized.
 */
initializeShape(state: mxCellState): void;

/**
 * Function: createShape
 *
 * Creates and returns the shape for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the shape should be created.
 */
createShape(state: mxCellState): mxShape;

/**
 * Function: createIndicatorShape
 *
 * Creates the indicator shape for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the indicator shape should be created.
 */
createIndicatorShape(state: mxCellState): void;

/**
 * Function: getShape
 *
 * Returns the shape for the given name from <defaultShapes>.
 */
getShape(name: string): mxShape;

/**
 * Function: getShapeConstructor
 *
 * Returns the constructor to be used for creating the shape.
 */
getShapeConstructor(state: mxCellState): any;

/**
 * Function: configureShape
 *
 * Configures the shape for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the shape should be configured.
 */
configureShape(state: mxCellState): void;

/**
 * Function: postConfigureShape
 *
 * Replaces any reserved words used for attributes, eg. inherit,
 * indicated or swimlane for colors in the shape for the given state.
 * This implementation resolves these keywords on the fill, stroke
 * and gradient color keys.
 */
postConfigureShape(state: mxCellState): void;

/**
 * Function: checkPlaceholderStyles
 *
 * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
 * the respective color on the shape.
 */
checkPlaceholderStyles(state: mxCellState): boolean;

/**
 * Function: resolveColor
 *
 * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
 * the respective color on the shape.
 */
resolveColor(state: mxCellState, field: string, key: string): void;

/**
 * Function: getLabelValue
 *
 * Returns the value to be used for the label.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the label should be created.
 */
getLabelValue(state: mxCellState): string;

/**
 * Function: createLabel
 *
 * Creates the label for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the label should be created.
 */
createLabel(state: mxCellState, value: string): void;

/**
 * Function: initializeLabel
 *
 * Initiailzes the label with a suitable container.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label should be initialized.
 */
initializeLabel(state: mxCellState, shape: mxShape): void;

/**
 * Function: createCellOverlays
 *
 * Creates the actual shape for showing the overlay for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the overlay should be created.
 */
createCellOverlays(state: mxCellState): void;

/**
 * Function: initializeOverlay
 *
 * Initializes the given overlay.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the overlay should be created.
 * overlay - <mxImageShape> that represents the overlay.
 */
initializeOverlay(state: mxCellState, overlay: mxImageShape): void;

/**
 * Function: installOverlayListeners
 *
 * Installs the listeners for the given <mxCellState>, <mxCellOverlay> and
 * <mxShape> that represents the overlay.
 */
installCellOverlayListeners(state: mxCellState, overlay: mxCellOverlay, shape: mxShape): void;

/**
 * Function: createControl
 *
 * Creates the control for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the control should be created.
 */
createControl(state: mxCellState): void;

/**
 * Function: createControlClickHandler
 *
 * Hook for creating the click handler for the folding icon.
 *
 * Parameters:
 *
 * state - <mxCellState> whose control click handler should be returned.
 */
createControlClickHandler(state: mxCellState): void;

/**
 * Function: initControl
 *
 * Initializes the given control and returns the corresponding DOM node.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the control should be initialized.
 * control - <mxShape> to be initialized.
 * handleEvents - Boolean indicating if mousedown and mousemove should fire events via the graph.
 * clickHandler - Optional function to implement clicks on the control.
 */
initControl(state: mxCellState, control: mxShape, handleEvents: boolean, clickHandler?: Function): Element;

/**
 * Function: isShapeEvent
 *
 * Returns true if the event is for the shape of the given state. This
 * implementation always returns true.
 *
 * Parameters:
 *
 * state - <mxCellState> whose shape fired the event.
 * evt - Mouse event which was fired.
 */
isShapeEvent(state: mxCellState, evt: MouseEvent): boolean;

/**
 * Function: isLabelEvent
 *
 * Returns true if the event is for the label of the given state. This
 * implementation always returns true.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label fired the event.
 * evt - Mouse event which was fired.
 */
isLabelEvent(state: mxCellState, evt: MouseEvent): boolean;

/**
 * Function: installListeners
 *
 * Installs the event listeners for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the event listeners should be isntalled.
 */
installListeners(state: mxCellState): void;

/**
 * Function: redrawLabel
 *
 * Redraws the label for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label should be redrawn.
 */
redrawLabel(state: mxCellState, forced?: boolean): void;

/**
 * Function: isTextShapeInvalid
 *
 * Returns true if the style for the text shape has changed.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label should be checked.
 * shape - <mxText> shape to be checked.
 */
isTextShapeInvalid(state: mxCellState, shape: mxText): boolean;

/**
 * Function: redrawLabelShape
 *
 * Called to invoked redraw on the given text shape.
 *
 * Parameters:
 *
 * shape - <mxText> shape to be redrawn.
 */
redrawLabelShape(shape: mxText): void;

/**
 * Function: getTextScale
 *
 * Returns the scaling used for the label of the given state
 *
 * Parameters:
 *
 * state - <mxCellState> whose label scale should be returned.
 */
getTextScale(state: mxCellState): number;

/**
 * Function: getLabelBounds
 *
 * Returns the bounds to be used to draw the label of the given state.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label bounds should be returned.
 */
getLabelBounds(state: mxCellState): mxRectangle;

/**
 * Function: rotateLabelBounds
 *
 * Adds the shape rotation to the given label bounds and
 * applies the alignment and offsets.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label bounds should be rotated.
 * bounds - <mxRectangle> the rectangle to be rotated.
 */
rotateLabelBounds(state: mxCellState, bounds: mxRectangle): void;

/**
 * Function: redrawCellOverlays
 *
 * Redraws the overlays for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> whose overlays should be redrawn.
 */
redrawCellOverlays(state: mxCellState, forced?: boolean): void;

/**
 * Function: redrawControl
 *
 * Redraws the control for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> whose control should be redrawn.
 */
redrawControl(state: mxCellState, forced?: boolean): void;

/**
 * Function: getControlBounds
 *
 * Returns the bounds to be used to draw the control (folding icon) of the
 * given state.
 */
getControlBounds(state: mxCellState, w: number, h: number): mxRectangle;

/**
 * Function: insertStateAfter
 *
 * Inserts the given array of <mxShapes> after the given nodes in the DOM.
 *
 * Parameters:
 *
 * shapes - Array of <mxShapes> to be inserted.
 * node - Node in <drawPane> after which the shapes should be inserted.
 * htmlNode - Node in the graph container after which the shapes should be inserted that
 * will not go into the <drawPane> (eg. HTML labels without foreignObjects).
 */
insertStateAfter(state: mxCellState, node: Element, htmlNode: HTMLElement): void;

/**
 * Function: getShapesForState
 *
 * Returns the <mxShapes> for the given cell state in the order in which they should
 * appear in the DOM.
 *
 * Parameters:
 *
 * state - <mxCellState> whose shapes should be returned.
 */
getShapesForState(state: mxCellState): mxShape[];

/**
 * Function: redraw
 *
 * Updates the bounds or points and scale of the shapes for the given cell
 * state. This is called in mxGraphView.validatePoints as the last step of
 * updating all cells.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the shapes should be updated.
 * force - Optional boolean that specifies if the cell should be reconfiured
 * and redrawn without any additional checks.
 * rendering - Optional boolean that specifies if the cell should actually
 * be drawn into the DOM. If this is false then redraw and/or reconfigure
 * will not be called on the shape.
 */
redraw(state: mxCellState, force?: boolean, rendering?: boolean): void;

/**
 * Function: redrawShape
 *
 * Redraws the shape for the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> whose label should be redrawn.
 */
redrawShape(state: mxCellState, force?: boolean, rendering?: boolean): void;

/**
 * Function: doRedrawShape
 *
 * Invokes redraw on the shape of the given state.
 */
doRedrawShape(state: mxCellState): void;

/**
 * Function: isShapeInvalid
 *
 * Returns true if the given shape must be repainted.
 */
isShapeInvalid(state: mxCellState, shape: mxShape): boolean;

/**
 * Function: destroy
 *
 * Destroys the shapes associated with the given cell state.
 *
 * Parameters:
 *
 * state - <mxCellState> for which the shapes should be destroyed.
 */
destroy(state: mxCellState): void;
}

/**
* A helper class to highlight cells. Here is an example for a given cell.
*
* @example
* ```javascript
* var highlight = new mxCellHighlight(graph, '#ff0000', 2);
* highlight.highlight(graph.view.getState(cell)));
* ```
*/
declare class mxCellHighlight {

/**
 * Constructs a cell highlight.
 *
 * @param graph
 * @param highlightColor  default {@link mxConstants.DEFAULT_VALID_COLOR}
 * @param strokeWidth     default {@link mxConstants.HIGHLIGHT_STROKEWIDTH}
 * @param dashed          default false
 */
constructor(graph: mxGraph, highlightColor?: string, strokeWidth?: number, dashed?: boolean);

/**
 * Specifies if the highlights should appear on top of everything else in the overlay pane.
 * @default false
 */
keepOnTop: boolean;

/**
 * Reference to the enclosing {@link mxGraph}.
 * @default true
 */
graph: boolean;

/**
 * Reference to the {@link mxCellState}.
 * @default null
 */
state: mxCellState;

/**
 * Specifies the spacing between the highlight for vertices and the vertex.
 * @default 2
 */
spacing: number;


/**
 * Holds the handler that automatically invokes reset if the highlight should be hidden.
 * @default null
 */
// TODO find the right type for resetHandler
resetHandler: any;

/**
 * Sets the color of the rectangle used to highlight drop targets.
 *
 * @param {string} color - String that represents the new highlight color.
 */
setHighlightColor(color: string): void;

/**
 * Creates and returns the highlight shape for the given state.
 */
drawHighlight(): void;

/**
 * Creates and returns the highlight shape for the given state.
 */
createShape(): mxShape;

/**
 * Updates the highlight after a change of the model or view.
 */
getStrokeWidth(state: mxCellState): number;

/**
 * Updates the highlight after a change of the model or view.
 */
repaint(): void;


/**
 * Resets the state of the cell marker.
 */
hide(): void;

/**
 * Marks the <markedState> and fires a <mark> event.
 */
highlight(state: mxCellState): void;

/**
 * Returns true if this highlight is at the given position.
 */
isHighlightAt(x: number, y: number): boolean;


/**
 * Destroys the handler and all its resources and DOM nodes.
 */
destroy(): void;

}



declare class mxConnectionHandler extends mxEventSource {
sourceConstraint: mxConnectionConstraint;

constructor(graph: mxGraph, factoryMethod?: (source: mxCell, target: mxCell, style?: string) => mxCell);

/**
 * Variable: graph
 *
 * Reference to the enclosing <mxGraph>.
 */
graph: mxGraph;

/**
 * Variable: factoryMethod
 *
 * Function that is used for creating new edges. The function takes the
 * source and target <mxCell> as the first and second argument and returns
 * a new <mxCell> that represents the edge. This is used in <createEdge>.
 */
factoryMethod: (source: mxCell, target: mxCell, style?: string) => mxCell;

/**
 * Variable: moveIconFront
 *
 * Specifies if icons should be displayed inside the graph container instead
 * of the overlay pane. This is used for HTML labels on vertices which hide
 * the connect icon. This has precendence over <moveIconBack> when set
 * to true. Default is false.
 */
moveIconFront: boolean;

/**
 * Variable: moveIconBack
 *
 * Specifies if icons should be moved to the back of the overlay pane. This can
 * be set to true if the icons of the connection handler conflict with other
 * handles, such as the vertex label move handle. Default is false.
 */
moveIconBack: boolean;

/**
 * Variable: connectImage
 *
 * <mxImage> that is used to trigger the creation of a new connection. This
 * is used in <createIcons>. Default is null.
 */
connectImage: mxImage;

/**
 * Variable: targetConnectImage
 *
 * Specifies if the connect icon should be centered on the target state
 * while connections are being previewed. Default is false.
 */
targetConnectImage: boolean;

/**
 * Variable: enabled
 *
 * Specifies if events are handled. Default is true.
 */
enabled: boolean;

/**
 * Variable: select
 *
 * Specifies if new edges should be selected. Default is true.
 */
select: boolean;

/**
 * Variable: createTarget
 *
 * Specifies if <createTargetVertex> should be called if no target was under the
 * mouse for the new connection. Setting this to true means the connection
 * will be drawn as valid if no target is under the mouse, and
 * <createTargetVertex> will be called before the connection is created between
 * the source cell and the newly created vertex in <createTargetVertex>, which
 * can be overridden to create a new target. Default is false.
 */
createTarget: boolean;

/**
 * Variable: marker
 *
 * Holds the <mxTerminalMarker> used for finding source and target cells.
 */
marker: any;

/**
 * Variable: constraintHandler
 *
 * Holds the <mxConstraintHandler> used for drawing and highlighting
 * constraints.
 */
constraintHandler: mxConstraintHandler;

/**
 * Variable: error
 *
 * Holds the current validation error while connections are being created.
 */
error: any;

/**
 * Variable: waypointsEnabled
 *
 * Specifies if single clicks should add waypoints on the new edge. Default is
 * false.
 */
waypointsEnabled: boolean;

/**
 * Variable: ignoreMouseDown
 *
 * Specifies if the connection handler should ignore the state of the mouse
 * button when highlighting the source. Default is false, that is, the
 * handler only highlights the source if no button is being pressed.
 */
ignoreMouseDown: boolean;

/**
 * Variable: first
 *
 * Holds the <mxPoint> where the mouseDown took place while the handler is
 * active.
 */
first: mxPoint;

/**
 * Variable: connectIconOffset
 *
 * Holds the offset for connect icons during connection preview.
 * Default is mxPoint(0, <mxConstants.TOOLTIP_VERTICAL_OFFSET>).
 * Note that placing the icon under the mouse pointer with an
 * offset of (0,0) will affect hit detection.
 */
connectIconOffset: mxPoint;

/**
 * Variable: edgeState
 *
 * Optional <mxCellState> that represents the preview edge while the
 * handler is active. This is created in <createEdgeState>.
 */
edgeState: mxCellState;

/**
 * Variable: changeHandler
 *
 * Holds the change event listener for later removal.
 */
changeHandler: any;

/**
 * Variable: drillHandler
 *
 * Holds the drill event listener for later removal.
 */
drillHandler: any;

/**
 * Variable: mouseDownCounter
 *
 * Counts the number of mouseDown events since the start. The initial mouse
 * down event counts as 1.
 */
mouseDownCounter: number;

/**
 * Variable: movePreviewAway
 *
 * Switch to enable moving the preview away from the mousepointer. This is required in browsers
 * where the preview cannot be made transparent to events and if the built-in hit detection on
 * the HTML elements in the page should be used. Default is the value of <mxClient.IS_VML>.
 */
movePreviewAway: boolean;

/**
 * Variable: outlineConnect
 *
 * Specifies if connections to the outline of a highlighted target should be
 * enabled. This will allow to place the connection point along the outline of
 * the highlighted target. Default is false.
 */
outlineConnect: boolean;

/**
 * Variable: livePreview
 *
 * Specifies if the actual shape of the edge state should be used for the preview.
 * Default is false. (Ignored if no edge state is created in <createEdgeState>.)
 */
livePreview: boolean;

/**
 * Variable: cursor
 *
 * Specifies the cursor to be used while the handler is active. Default is null.
 */
cursor: string;

/**
 * Variable: insertBeforeSource
 *
 * Specifies if new edges should be inserted before the source vertex in the
 * cell hierarchy. Default is false for backwards compatibility.
 */
insertBeforeSource: boolean;

/**
 * Function: isEnabled
 *
 * Returns true if events are handled. This implementation
 * returns <enabled>.
 */
isEnabled(): boolean;

/**
 * Function: setEnabled
 *
 * Enables or disables event handling. This implementation
 * updates <enabled>.
 *
 * Parameters:
 *
 * enabled - Boolean that specifies the new enabled state.
 */
setEnabled(enabled: boolean): void;

/**
 * Function: isInsertBefore
 *
 * Returns <insertBeforeSource> for non-loops and false for loops.
 *
 * Parameters:
 *
 * edge - <mxCell> that represents the edge to be inserted.
 * source - <mxCell> that represents the source terminal.
 * target - <mxCell> that represents the target terminal.
 * evt - Mousedown event of the connect gesture.
 * dropTarget - <mxCell> that represents the cell under the mouse when it was
 * released.
 */
isInsertBefore(edge: mxCell, source: mxCell, target: mxCell, evt: MouseEvent, dropTarget: mxCell): boolean;

/**
 * Function: isCreateTarget
 *
 * Returns <createTarget>.
 *
 * Parameters:
 *
 * evt - Current active native pointer event.
 */
isCreateTarget(evt: Event): boolean;

/**
 * Function: setCreateTarget
 *
 * Sets <createTarget>.
 */
setCreateTarget(value: boolean): void;

/**
 * Function: createShape
 *
 * Creates the preview shape for new connections.
 */
createShape(): mxShape;

/**
 * Function: init
 *
 * Initializes the shapes required for this connection handler. This should
 * be invoked if <mxGraph.container> is assigned after the connection
 * handler has been created.
 */
init(): void;

/**
 * Function: isConnectableCell
 *
 * Returns true if the given cell is connectable. This is a hook to
 * disable floating connections. This implementation returns true.
 */
isConnectableCell(cell: mxCell): boolean;

/**
 * Function: createMarker
 *
 * Creates and returns the <mxCellMarker> used in <marker>.
 */
createMarker(): mxCellMarker;

/**
 * Function: start
 *
 * Starts a new connection for the given state and coordinates.
 */
start(state: mxCellState, x: number, y: number, edgeState: mxCellState): void;

/**
 * Function: isConnecting
 *
 * Returns true if the source terminal has been clicked and a new
 * connection is currently being previewed.
 */
isConnecting(): boolean;

/**
 * Function: isValidSource
 *
 * Returns <mxGraph.isValidSource> for the given source terminal.
 *
 * Parameters:
 *
 * cell - <mxCell> that represents the source terminal.
 * me - <mxMouseEvent> that is associated with this call.
 */
isValidSource(cell: mxCell, me: mxMouseEvent): boolean;

/**
 * Function: isValidTarget
 *
 * Returns true. The call to <mxGraph.isValidTarget> is implicit by calling
 * <mxGraph.getEdgeValidationError> in <validateConnection>. This is an
 * additional hook for disabling certain targets in this specific handler.
 *
 * Parameters:
 *
 * cell - <mxCell> that represents the target terminal.
 */
isValidTarget(cell: mxCell): boolean;

/**
 * Function: validateConnection
 *
 * Returns the error message or an empty string if the connection for the
 * given source target pair is not valid. Otherwise it returns null. This
 * implementation uses <mxGraph.getEdgeValidationError>.
 *
 * Parameters:
 *
 * source - <mxCell> that represents the source terminal.
 * target - <mxCell> that represents the target terminal.
 */
validateConnection(source: mxCell, target: mxCell): string;

/**
 * Function: getConnectImage
 *
 * Hook to return the <mxImage> used for the connection icon of the given
 * <mxCellState>. This implementation returns <connectImage>.
 *
 * Parameters:
 *
 * state - <mxCellState> whose connect image should be returned.
 */
getConnectImage(state: mxCellState): mxImage;

/**
 * Function: isMoveIconToFrontForState
 *
 * Returns true if the state has a HTML label in the graph's container, otherwise
 * it returns <moveIconFront>.
 *
 * Parameters:
 *
 * state - <mxCellState> whose connect icons should be returned.
 */
isMoveIconToFrontForState(state: mxCellState): boolean;

/**
 * Function: createIcons
 *
 * Creates the array <mxImageShapes> that represent the connect icons for
 * the given <mxCellState>.
 *
 * Parameters:
 *
 * state - <mxCellState> whose connect icons should be returned.
 */
createIcons(state: mxCellState): mxImageShape[];

/**
 * Function: redrawIcons
 *
 * Redraws the given array of <mxImageShapes>.
 *
 * Parameters:
 *
 * icons - Optional array of <mxImageShapes> to be redrawn.
 */
redrawIcons(icons?: mxImageShape[], state?: mxCellState): void;

/**
 * Function: redrawIcons
 *
 * Redraws the given array of <mxImageShapes>.
 *
 * Parameters:
 *
 * icons - Optional array of <mxImageShapes> to be redrawn.
 */
getIconPosition(icon?: mxImageShape[], state?: mxCellState): mxPoint;

/**
 * Function: destroyIcons
 *
 * Destroys the connect icons and resets the respective state.
 */
destroyIcons(): void;

/**
 * Function: isStartEvent
 *
 * Returns true if the given mouse down event should start this handler. The
 * This implementation returns true if the event does not force marquee
 * selection, and the currentConstraint and currentFocus of the
 * <constraintHandler> are not null, or <previous> and <error> are not null and
 * <icons> is null or <icons> and <icon> are not null.
 */
isStartEvent(me: mxMouseEvent): boolean;

/**
 * Function: mouseDown
 *
 * Handles the event by initiating a new connection.
 */
mouseDown(sender: Event, me: mxMouseEvent): void;

/**
 * Function: isImmediateConnectSource
 *
 * Returns true if a tap on the given source state should immediately start
 * connecting. This implementation returns true if the state is not movable
 * in the graph.
 */
isImmediateConnectSource(state: mxCellState): boolean;

/**
 * Function: createEdgeState
 *
 * Hook to return an <mxCellState> which may be used during the preview.
 * This implementation returns null.
 *
 * Use the following code to create a preview for an existing edge style:
 *
 * (code)
 * graph.connectionHandler.createEdgeState(me)
 * {
 *   var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=elbowEdgeStyle');
 *
 *   return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
 * };
 * (end)
 */
createEdgeState(me: mxMouseEvent): mxCellState;

/**
 * Function: isOutlineConnectEvent
 *
 * Returns true if <outlineConnect> is true and the source of the event is the outline shape
 * or shift is pressed.
 */
isOutlineConnectEvent(me: mxMouseEvent): boolean;

/**
 * Function: updateCurrentState
 *
 * Updates the current state for a given mouse move event by using
 * the <marker>.
 */
updateCurrentState(me: mxMouseEvent, point: mxPoint): void;

/**
 * Function: isCellEnabled
 *
 * Returns true if the given cell does not allow new connections to be created.
 */
isCellEnabled(cell: mxCell): boolean;

/**
 * Function: convertWaypoint
 *
 * Converts the given point from screen coordinates to model coordinates.
 */
convertWaypoint(point: mxPoint): void;

/**
 * Function: snapToPreview
 *
 * Called to snap the given point to the current preview. This snaps to the
 * first point of the preview if alt is not pressed.
 */
snapToPreview(me: mxMouseEvent, point: mxPoint): void;

/**
 * Function: mouseMove
 *
 * Handles the event by updating the preview edge or by highlighting
 * a possible source or target terminal.
 */
mouseMove(sender: mxMouseEvent, me: mxMouseEvent): void;

/**
 * Function: updateEdgeState
 *
 * Updates <edgeState>.
 */
updateEdgeState(current: mxCellState, constraint: mxCellState): void;

/**
 * Function: getTargetPerimeterPoint
 *
 * Returns the perimeter point for the given target state.
 *
 * Parameters:
 *
 * state - <mxCellState> that represents the target cell state.
 * me - <mxMouseEvent> that represents the mouse move.
 */
getTargetPerimeterPoint(state: mxCellState, me: mxMouseEvent): mxPoint;

/**
 * Function: getSourcePerimeterPoint
 *
 * Hook to update the icon position(s) based on a mouseOver event. This is
 * an empty implementation.
 *
 * Parameters:
 *
 * state - <mxCellState> that represents the target cell state.
 * next - <mxPoint> that represents the next point along the previewed edge.
 * me - <mxMouseEvent> that represents the mouse move.
 */
getSourcePerimeterPoint(state: mxCellState, next: mxPoint, me: mxMouseEvent): mxPoint;


/**
 * Function: updateIcons
 *
 * Hook to update the icon position(s) based on a mouseOver event. This is
 * an empty implementation.
 *
 * Parameters:
 *
 * state - <mxCellState> under the mouse.
 * icons - Array of currently displayed icons.
 * me - <mxMouseEvent> that contains the mouse event.
 */
updateIcons(state: mxCellState, icons: string[], me: mxMouseEvent): void;

/**
 * Function: isStopEvent
 *
 * Returns true if the given mouse up event should stop this handler. The
 * connection will be created if <error> is null. Note that this is only
 * called if <waypointsEnabled> is true. This implemtation returns true
 * if there is a cell state in the given event.
 */
isStopEvent(me: mxMouseEvent): void;

/**
 * Function: addWaypoint
 *
 * Adds the waypoint for the given event to <waypoints>.
 */
addWaypointForEvent(me: mxMouseEvent): void;

/**
 * Function: mouseUp
 *
 * Handles the event by inserting the new connection.
 */
mouseUp(sender: mxMouseEvent, me: mxMouseEvent): void;

/**
 * Function: reset
 *
 * Resets the state of this handler.
 */
reset(): void;

/**
 * Function: drawPreview
 *
 * Redraws the preview edge using the color and width returned by
 * <getEdgeColor> and <getEdgeWidth>.
 */
drawPreview(): void;

/**
 * Function: getEdgeColor
 *
 * Returns the color used to draw the preview edge. This returns green if
 * there is no edge validation error and red otherwise.
 *
 * Parameters:
 *
 * valid - Boolean indicating if the color for a valid edge should be
 * returned.
 */
updatePreview(valid: boolean): void;

/**
 * Function: getEdgeColor
 *
 * Returns the color used to draw the preview edge. This returns green if
 * there is no edge validation error and red otherwise.
 *
 * Parameters:
 *
 * valid - Boolean indicating if the color for a valid edge should be
 * returned.
 */
getEdgeColor(valid: boolean): string;

/**
 * Function: getEdgeWidth
 *
 * Returns the width used to draw the preview edge. This returns 3 if
 * there is no edge validation error and 1 otherwise.
 *
 * Parameters:
 *
 * valid - Boolean indicating if the width for a valid edge should be
 * returned.
 */
getEdgeWidth(valid: boolean): number;

/**
 * Function: connect
 *
 * Connects the given source and target using a new edge. This
 * implementation uses <createEdge> to create the edge.
 *
 * Parameters:
 *
 * source - <mxCell> that represents the source terminal.
 * target - <mxCell> that represents the target terminal.
 * evt - Mousedown event of the connect gesture.
 * dropTarget - <mxCell> that represents the cell under the mouse when it was
 * released.
 */
connect(source: mxCell, target: mxCell, evt: MouseEvent, dropTarget: mxCell): void;

/**
 * Function: selectCells
 *
 * Selects the given edge after adding a new connection. The target argument
 * contains the target vertex if one has been inserted.
 */
selectCells(edge: mxCell, target: mxCell): void;

/**
 * Function: insertEdge
 *
 * Creates, inserts and returns the new edge for the given parameters. This
 * implementation does only use <createEdge> if <factoryMethod> is defined,
 * otherwise <mxGraph.insertEdge> will be used.
 */
insertEdge(parent: mxCell, id: string, value: any, source: mxCell, target: mxCell, style: string): mxCell;

/**
 * Function: createTargetVertex
 *
 * Hook method for creating new vertices on the fly if no target was
 * under the mouse. This is only called if <createTarget> is true and
 * returns null.
 *
 * Parameters:
 *
 * evt - Mousedown event of the connect gesture.
 * source - <mxCell> that represents the source terminal.
 */
createTargetVertex(evt: MouseEvent, source: mxCell): mxCell;

/**
 * Function: getAlignmentTolerance
 *
 * Returns the tolerance for aligning new targets to sources. This returns the grid size / 2.
 */
getAlignmentTolerance(evt: MouseEvent): number;

/**
 * Function: createEdge
 *
 * Creates and returns a new edge using <factoryMethod> if one exists. If
 * no factory method is defined, then a new default edge is returned. The
 * source and target arguments are informal, the actual connection is
 * setup later by the caller of this function.
 *
 * Parameters:
 *
 * value - Value to be used for creating the edge.
 * source - <mxCell> that represents the source terminal.
 * target - <mxCell> that represents the target terminal.
 * style - Optional style from the preview edge.
 */
createEdge(value?: any, source?: mxCell, target?: mxCell, style?: string): mxCell;

/**
 * Function: destroy
 *
 * Destroys the handler and all its resources and DOM nodes. This should be
 * called on all instances. It is called automatically for the built-in
 * instance created for each <mxGraph>.
 */
destroy(): void;

}
/**
* @class
*
* Singleton that implements a clipboard for graph cells.
*
* ### Example:
*
* @example
* ```javascript
* mxClipboard.copy(graph);
* mxClipboard.paste(graph2);
* ```
*
* This copies the selection cells from the graph to the clipboard and
* pastes them into graph2.
*
* For fine-grained control of the clipboard data the {@link mxGraph.canExportCell}
* and {@link mxGraph.canImportCell} functions can be overridden.
*
* To restore previous parents for pasted cells, the implementation for
* {@link copy} and {@link paste} can be changed as follows.
*
* @example
* ```javascript
* mxClipboard.copy = function(graph, cells)
* {
*   cells = cells || graph.getSelectionCells();
*   var result = graph.getExportableCells(cells);
*
*   mxClipboard.parents = new Object();
*
*   for (var i = 0; i < result.length; i++)
*   {
*     mxClipboard.parents[i] = graph.model.getParent(cells[i]);
*   }
*
*   mxClipboard.insertCount = 1;
*   mxClipboard.setCells(graph.cloneCells(result));
*
*   return result;
* };
*
* mxClipboard.paste = function(graph)
* {
*   if (!mxClipboard.isEmpty())
*   {
*     var cells = graph.getImportableCells(mxClipboard.getCells());
*     var delta = mxClipboard.insertCount * mxClipboard.STEPSIZE;
*     var parent = graph.getDefaultParent();
*
*     graph.model.beginUpdate();
*     try
*     {
*       for (var i = 0; i < cells.length; i++)
*       {
*         var tmp = (mxClipboard.parents != null && graph.model.contains(mxClipboard.parents[i])) ?
*              mxClipboard.parents[i] : parent;
*         cells[i] = graph.importCells([cells[i]], delta, delta, tmp)[0];
*       }
*     }
*     finally
*     {
*       graph.model.endUpdate();
*     }
*
*     // Increments the counter and selects the inserted cells
*     mxClipboard.insertCount++;
*     graph.setSelectionCells(cells);
*   }
* };
* ```
*/
declare class mxClipboard {

/**
 * Defines the step size to offset the cells after each paste operation.
 * Default is 10.
 */
static STEPSIZE: number;

/**
 * Counts the number of times the clipboard data has been inserted.
 */
static insertCount: number;

/**
 * Holds the array of {@link mxCell} currently in the clipboard.
 */
static cells: Array<mxCell>;

/**
 * Sets the cells in the clipboard. Fires a {@link mxEvent.CHANGE} event.
 */
static setCells(cells: Array<mxCell>): void;

/**
 * Returns  the cells in the clipboard.
 */
static getCells(): Array<mxCell>;

/**
 * Returns true if the clipboard currently has not data stored.
 */
static isEmpty(): boolean;

/**
 * Cuts the given array of {@link mxCell} from the specified graph.
 * If cells is null then the selection cells of the graph will
 * be used. Returns the cells that have been cut from the graph.
 *
 * @param graph - {@link mxGraph} that contains the cells to be cut.
 * @param cells - Optional array of {@link mxCell} to be cut.
 */
static cut(graph: mxGraph, cells?: Array<mxCell>): Array<mxCell>;

/**
 * Hook to remove the given cells from the given graph after
 * a cut operation.
 *
 * @param graph - {@link mxGraph} that contains the cells to be cut.
 * @param cells - Array of {@link mxCell} to be cut.
 */
static removeCells(graph: mxGraph, cells: Array<mxCell>): void;

/**
 * Copies the given array of {@link mxCell} from the specified
 * graph to {@link cells}. Returns the original array of cells that has
 * been cloned. Descendants of cells in the array are ignored.
 *
 * @param graph - {@link mxGraph} that contains the cells to be copied.
 * @param cells - Optional array of {@link mxCell} to be copied.
 */
static copy(graph: mxGraph, cells?: Array<mxCell>): Array<mxCell>;

/**
 * Pastes the {@link cells} into the specified graph restoring
 * the relation to {@link parents}, if possible. If the parents
 * are no longer in the graph or invisible then the
 * cells are added to the graph's default or into the
 * swimlane under the cell's new location if one exists.
 * The cells are added to the graph using {@link mxGraph.importCells}
 * and returned.
 *
 * @param graph - {@link mxGraph} to paste the {@link cells} into.
 */
static paste(graph: mxGraph): Array<mxCell>;

}

declare class Menubar{
  constructor(editorUi:EditorUi, container?:any);

  hideMenu():void;

  addMenu():void;

  addMenuHandler():void;

  destroy():void;
}