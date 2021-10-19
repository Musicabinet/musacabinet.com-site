import * as React from 'react';
import Head from 'next/head';

type HeadBlockProps = {
  title: string,
  description: string,
  keywords: string
};
type HeadBlockState = {};

export default class HeadBlock extends React.Component<HeadBlockProps, HeadBlockState> {

  static defaultProps = {
    title: 'Musicabinet',
    description: '',
    keywords: ''
  };

  getGTM = (): React.ReactNode => {
    return (<script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PPT365K');`}}/>)
  };

  getGTAG = (): React.ReactNode => {
    return (<script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'GTM-PPT365K');`}}/>)
  };

  render() {
    const { title, description, keywords } = this.props;

    return (
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta key={'viewport'} name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <link rel='stylesheet'
              href='https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='yandex-verification' content='9cd91603377bfecd' />
        <script src="https://widget.cloudpayments.ru/bundles/cloudpayments" />
        {this.getGTM()}
        {this.getGTAG()}
      </Head>
    );
  }
}
