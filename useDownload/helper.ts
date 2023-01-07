type DownloadFileLink = {
  url: string;
  filename: string;
};

export const downloadFileLink = ({ filename, url }: DownloadFileLink) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
