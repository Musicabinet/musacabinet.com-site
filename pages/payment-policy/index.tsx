import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, Paragraph, Title } from '../../ui';
import { SERVICE_NAME, TITLE_SIZE } from '../../constants';
import block from 'bem-css-modules';
import style from '../common.module.sass';
import { CustomAppContext } from '../../interfaces';

const b = block(style);

type PaymentPolicyProps = {};
type PaymentPolicyState = {};

@inject(() => ({}))
@observer
export default class PaymentPolicy extends React.Component<PaymentPolicyProps, PaymentPolicyState> {

  static async getInitialProps({ store }: CustomAppContext) {
    store?.systemStore.setServiceName(SERVICE_NAME.SCHOOL);
    await store?.authStore.check();
    return {
      title: 'MUSICABINET | Privacy Policy',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout noStick background={'gray'}>
        <div className={b(null)}>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <Title size={TITLE_SIZE.FIRST} className={b('header')}>
                  Payment Policy
                </Title>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Payments. Payment by credit card online</div>
              <Paragraph>
                Our site is connected to Internet acquiring, and you can pay for the Service with a Visa or Mastercard
                bank card. After confirming the selected Product or service, a secure window will open with the payment
                page of the CloudPayments processing center, where you need to enter your bank card details. For
                additional authentication of the cardholder, the 3-D Secure protocol is used. If your Issuing Bank
                supports this technology, you will be redirected to its server for additional identification. For
                information on the rules and methods of additional identification, please contact the bank that issued
                your bank card.
              </Paragraph>

              <Paragraph>
                The online payment service is carried out in accordance with the rules of the Visa and MasterCard
                International payment systems on the principles of confidentiality and security of making a payment; for
                this, the most up-to-date methods of verification, encryption and data transmission through closed
                communication channels are used. Bank card data is entered in a secure window on the CloudPayments
                payment
                page
              </Paragraph>

              <Paragraph>
                You will need to enter the card number, cardholder name, expiration date and a three-digit security code
                (CVV2 for VISA or CVC2 for MasterCard) in the fields on the payment page. All the necessary data is
                displayed on the surface of the bank card.
              </Paragraph>

              <Paragraph>
                CVV2/CVC2 is a three-digit security code usually found on the back of the card. It may also be displayed
                on the front side, depending on the bank that issued your card.
              </Paragraph>

              <Paragraph>
                Further the page of your issuing bank will open for entering a 3-D Secure code in the same window. If
                you
                do not have a static 3-D Secure configured, it will be sent to your phone number via SMS or
                push-notification. If the 3-D Secure code was not delivered you should contact your issuing bank.
              </Paragraph>

              <Paragraph>
                3-D Secure is the most modern technology for ensuring the security of card payments on the Internet.
                Allows you to unambiguously identify the authenticity of the cardholder performing the transaction and
                to
                minimize the risk of fraudulent card transactions.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Security Guarantees</div>
              <Paragraph>
                The CloudPayments processing center protects and processes your bank card data according to the PCI DSS
                3.0 security standard. Information is transferred to the payment gateway using SSL encryption
                technology.
                Further information is transmitted through closed banking networks with the highest level of
                reliability.
                CloudPayments does not share your card details with us or other third parties. For additional
                authentication of the cardholder, the 3-D Secure protocol is used.
              </Paragraph>

              <Paragraph>
                If you have any questions about a processed transaction you can contact our customer support service at
                support@musicabinet.com.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Online transactions security</div>
              <Paragraph>
                The personal information you provide (name, address, phone, e-mail, credit card number) is confidential
                and not subject to disclosure. Your credit card information is transmitted only in an encrypted form and
                is not stored on our Web server. We by no means have access to your personal banking information, or to
                your bank card details.
              </Paragraph>

              <Paragraph>
                The security of processing Internet transactions is guaranteed by CloudPayments processing center. All
                transactions with payment cards take place in accordance with the requirements of VISA International,
                MasterCard and other payment systems. When transferring information, specialized security technologies
                for
                online card payments are used, data processing is carried out on a secure high-tech server of the
                processing company.
              </Paragraph>

              <h3>Paying by cards is safe because:</h3>

              <ul>
                <li>
                  The authorization system guarantees the buyer that the payment details of a bank card (number,
                  expiration date, CVV2/CVC2) will not fall into the hands of fraudsters, since this data is not stored
                  on
                  the authorization server and cannot be stolen.
                </li>
                <li>
                  The buyer enters payment details directly in the CloudPayments authorization system, and not on the
                  website you are on, therefore, the payment details of the buyer's card will not be available to third
                  parties.
                </li>
              </ul>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Refunds</div>
              <Paragraph>
                When making online payment using payment cards, cash refunds are not allowed.<br />
                When purchasing our services by making an online payment refunds are not allowed in any form, cash or
                online refund.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Payment systems we support:</div>
              <Paragraph>
                VISA, MasterCard, CloudPayments
              </Paragraph>
            </div>
          </div>


          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Confidentiality</div>

              <h3>1. Definitions</h3>
              <Paragraph>
                The platform located at https://musicabinet.com (hereinafter - URL, site, "we") takes seriously the
                issue of confidentiality of information of its customers and visitors (hereinafter - "you", "site
                visitors") to the site. We call personalized information containing personal data (for example: full
                name, login or company name) of the site visitor, as well as information about the actions you perform
                on the URL site. (for example: ordering a site visitor with his contact information). We call anonymous
                data that cannot be uniquely identified with a specific website visitor (for example: website traffic
                statistics).
              </Paragraph>

              <h3>2. The use of information</h3>
              <Paragraph>
                We use the personalized information of a specific site visitor solely to provide with high-quality
                services. We do not disclose the personalized data of visitors to the URL site to other site visitors.
                We never publish personalized information in the public domain and do not transfer it to third parties.
                The only exceptions are situations where the provision of such information to authorized state bodies is
                prescribed by the current legislation of the requesting country. We may publish and distribute only
                reports based on the collected anonymous data. At the same time, the reports do not contain information
                by which it would be possible to identify the personalized data of service users. We also use anonymous
                data for internal analysis, the purpose of which is to develop products and services of the URL site.
              </Paragraph>

              <h3>3. Links</h3>
              <Paragraph>
                The site may contain links to other sites that are not related to our company and belong to third
                parties. We are not responsible for the accuracy, completeness and reliability of the information posted
                on third-party sites, and we do not undertake any obligation to maintain the confidentiality of
                information left by you on such sites.
              </Paragraph>

              <h3>4. Disclaimer</h3>
              <Paragraph>
                We do our best to comply with this privacy policy, however, we cannot guarantee the safety of
                information in case of influence of factors beyond our control, the result of which will be the
                disclosure of information. The site and all information posted on it are presented on an "as is" basis
                without any guarantees. We are not responsible for adverse consequences, as well as for any losses
                caused due to restriction of access to the URL site or as a result of visiting the site and using the
                information posted on it.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}>Contacts</div>
              <Paragraph>
                For questions regarding this policy, please contact info@musicabinet.com
              </Paragraph>
              <Paragraph>
                Republic of Kazakhstan, Ekibastuz, M. Jusupa street, 20-24<br />
                +7 701 771 13 87<br />
                info@musicabinet.com<br />
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}> Bank details</div>
              <Paragraph>
                BIK TSESKZKA<br />
                IBAN KZ09998YTB0000444420<br />
                JSC «First Heartland Jysan Bank»<br />
                Taxpayer Number 840225350586<br />
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className={b('section')}></div>
              <Paragraph>

              </Paragraph>
            </div>
          </div>





        </div>
      </BaseLayout>
    );
  }
}
