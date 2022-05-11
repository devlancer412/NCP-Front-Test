import Head from "next/head";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <style>{dom.css()}</style>
    </Head>
  );
};

Meta.defaultProps = {
  title: "WebDev Newz",
  keywords: "web development, programming news",
  description: "Get the latest news in web dev",
};
