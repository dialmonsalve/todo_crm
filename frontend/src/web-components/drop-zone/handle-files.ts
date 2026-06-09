export class HandleFiles {
  constructor() {}

  static createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  static handleFiles = (files: FileList, fileInput: HTMLInputElement) => {
    const validFiles = Array.from(files).filter((file) => {
      if (file.type.startsWith("image/")) {
        return true;
      } else {
        throw new Error("Archivo o archivos no soportados");
      }
    });

    if (fileInput && validFiles.length > 0) {
      fileInput.files = HandleFiles.createFileList(validFiles);
    }

    return validFiles.length;
  };
}