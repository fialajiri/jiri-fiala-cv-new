export const downloadFile = (filename: string, path: string = '/cv/'): void => {
  const link = document.createElement('a');
  link.href = `${path}${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadCV = (filename: string): void => {
  downloadFile(filename, '/cv/');
};
