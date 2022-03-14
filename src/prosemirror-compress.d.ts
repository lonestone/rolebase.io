declare module 'prosemirror-compress' {
  export declare function compressSelectionJSON(obj: object): object
  export declare function compressStateJSON(obj: object): object
  export declare function compressStepJSON(obj: object): object
  export declare function compressStepsLossy(obj: object): object
  export declare function uncompressSelectionJSON(obj: object): object
  export declare function uncompressStateJSON(obj: object): object
  export declare function uncompressStepJSON(obj: object): object
}
