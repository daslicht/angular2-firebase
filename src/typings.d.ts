// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var require: NodeRequire;
declare var module: NodeModule;

interface Document { 
	getElementById(elementId: "preview"): HTMLImageElement 
	getElementById(elementId: "hidden-img"): HTMLImageElement 
}

