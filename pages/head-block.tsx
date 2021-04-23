import * as React from 'react';
import Head from 'next/head';

type HeadBlockProps = {
  title: string,
  description: string,
  keywords: string
};
type HeadBlockState = {};

export class HeadBlock extends React.Component<HeadBlockProps, HeadBlockState> {

  static defaultProps = {
    title: 'Musicabinet | Online School',
    description: '',
    keywords: ''
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
      </Head>
    );
  }
}
