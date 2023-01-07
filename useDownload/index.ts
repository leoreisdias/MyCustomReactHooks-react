// NOTE: Call an API and download the result as a file

import { downloadFileLink } from "./helper";

export interface IBlobError {
  response: {
    data: Blob | any;
  };
}

interface IDownloadFileProps {
  readonly apiDefinition?: {
    responseType?: ResponseType;
  };
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: (error: IBlobError) => Promise<void> | (() => void);
  readonly filename: string;
  readonly extension?: string;
}

export const useDownloadFile = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  filename,
  extension = "pdf",
}: IDownloadFileProps) => {
  const { responseType = "blob" } = apiDefinition ?? {};

  const callApi = async (link?: string) => {
    if (!!link) {
      return axios.get(link, { responseType });
    }

    return { data: null };
  };

  const downloadFile = async (_?: any, link?: string) => {
    try {
      preDownloading();
      const { data } = await callApi(link);
      const url = URL.createObjectURL(new Blob([data]));
      downloadFileLink({
        url,
        filename: `${filename}.${extension}`,
      });
      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      onError(error);
    }
  };

  return { downloadFile };
};
