declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: string) => {
  window?.gtag("config", "G-T55DNTQ7Z6", {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({
  action,
  params,
}: {
  action: string;
  params: object;
}) => {
  window?.gtag("event", action, params);
};
