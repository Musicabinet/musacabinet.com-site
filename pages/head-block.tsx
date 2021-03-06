import * as React from 'react';
import Head from 'next/head';

type HeadBlockProps = {
  title: string;
  description: string;
  keywords: string;
};
type HeadBlockState = {};

export default class HeadBlock extends React.Component<HeadBlockProps, HeadBlockState> {
  static defaultProps = {
    title: 'Musicabinet',
    description: '',
    keywords: ''
  };

  getGTM = (): React.ReactNode => {
    return (
      <script dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PPT365K');`
              }}
      />
    );
  };

  getGTAG = (): React.ReactNode => {
    return (
      <script dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      `
              }}
      />
    );
  };

  render() {
    const { title, description, keywords } = this.props;

    return (
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta key={'viewport'} name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={undefined} />
        <link property='stylesheet'
              resource={''}
              href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
              rel='stylesheet'
              type='text/css'
              media='all'/>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css
' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='yandex-verification' content='9cd91603377bfecd' />
        <script src='https://widget.cloudpayments.ru/bundles/cloudpayments' />
        {this.getGTM()}
        {this.getGTAG()}
      </Head>
    );
  }
}
