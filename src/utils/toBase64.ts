export function toBase64(file: File): Promise<FileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve({
        base64,
        fileName: file.name,
        fileType: file.type,
      });
    };
    reader.onerror = reject;
  });
}
export type FileData = {
  base64: string;
  fileName: string;
  fileType: string;
};
