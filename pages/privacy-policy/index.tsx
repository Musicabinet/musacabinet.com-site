import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, Paragraph, Title } from '../../ui';
import { TITLE_SIZE } from '../../constants';
import block from 'bem-css-modules';
import style from '../common.module.sass';

const b = block(style);

type PrivacyPolicyProps = {};
type PrivacyPolicyState = {};

@inject(() => ({}))
@observer
export default class PrivacyPolicy extends React.Component<PrivacyPolicyProps, PrivacyPolicyState> {
  render() {
    return (
      <BaseLayout noStick background={'gray'}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Title size={TITLE_SIZE.FIRST} className={b('header')}>
                Privacy Policy
              </Title>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className={b('section')}>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</div>
              <Paragraph>
                When you purchase something from our store, as part of the buying and selling process, we collect the
                personal information you give us such as your name, address and email address. When you browse our
                store, we also automatically receive your computer’s internet protocol (IP) address in order to provide
                us with information that helps us learn about your browser and operating system. Email marketing (if
                applicable): occasionally we may be sending you emails about our service, new products and other
                updates.
              </Paragraph>

              <div className={b('section')}>SECTION 2 - CONSENT</div>
              <Paragraph>
                How do we get your consent? When you provide us with your personal information to complete a
                transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we
                imply that you consent to our collecting your data and using it for that specific reason only. If we ask
                for your personal information for a secondary reason, like marketing, we will either ask you directly
                for your expressed consent, or provide you with an opportunity to say no. How do you withdraw your
                consent? If after you opt-in, you change your mind, you may withdraw your consent for us to contact you,
                for the continued collection, use or disclosure of your information, at anytime, by contacting us at
                info@musicabinet.com.
              </Paragraph>

              <div className={b('section')}>SECTION 3 - DISCLOSURE</div>
              <Paragraph>
                We may disclose your personal information if we are required to do so by the lay or if you violate our
                Terms of Service.
              </Paragraph>

              <div className={b('section')}>SECTION 4 – ONLINE STORE</div>
              <Paragraph>
                Our store is hosted on our internal servers.​Your data is stored under 256 bit SSL encryption behind a
                firewall. ​Payment: If you choose a direct payment gateway to complete your purchase the transaction
                operators may collect your credit card data and store them according to their internal policies.
                Important Note: we are not in any way affiliated with the transaction operators and do not carry any
                responsibility for services’ operations, policies, and/or malfunctions. All the transactions are
                encrypted through the Payment Card Industry Data Security Standards (PCI-DSS). Your purchase transaction
                data is only stored as long as it is necessary to complete your purchase transaction. After that is
                complete, your purchase transaction information is deleted. ​All direct payment gateways adhere to the
                standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of
                brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure the secure
                handling of credit card information by our store and its service providers. For more insight, you may
                also want to read transaction operators’ Terms of Service or Privacy Statements.
              </Paragraph>

              <div className={b('section')}>SECTION 5 - THIRD-PARTY SERVICES</div>
              <Paragraph>
                In general, the third-party providers used by us will only collect, use and disclose your information to
                the extent necessary to allow them to perform the services they provide to us.​ However, certain
                third-party service providers, such as payment gateways and other payment transaction processors, have
                their own privacy policies in respect to the information we are required to provide to them for your
                purchase-related transactions.​ For these providers we recommend that you read their privacy policies so
                you can understand the manner in which your personal information will be handled by these providers. ​In
                particular, remember that certain providers may be located in or have facilities that are located in a
                different jurisdiction than either you or us. So if you select to proceed with a transaction that
                involves the services of a third-party service provider then your information may become subject to the
                laws of the jurisdiction(s) in which that service provider or its facilities are located.​ As an
                example, if you are located in Canada and your transaction is processed by a payment gateway located in
                the United States, then your personal information used in completing that transaction may be subject to
                disclosure under United States legislation, including the Patriot Act.​ Once you leave our store’s
                website or are redirected to a third-party website or application, you are no longer governed by this
                Privacy Policy or our website’s Terms of Service. ​Links when you click on links on our store may
                redirect you away from our site. We are not responsible for the privacy practices of other sites and
                encourage you to read their privacy statements.​
              </Paragraph>

              <div className={b('section')}>SECTION 6 - SECURITY</div>
              <Paragraph>
                ​To protect your personal information, we take reasonable precautions and follow industry’s best
                practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or
                destroyed.​ If you provide us with your credit card information, the information is encrypted using
                secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of
                transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements
                and implement additional generally accepted industry standards.
              </Paragraph>

              <div className={b('section')}>SECTION 7 - AGE OF CONSENT</div>
              <Paragraph>
                ​By using this site, you represent that you are at least the age of majority in your state or province
                of residence, or that you are the age of majority in your state or province of residence and you have
                given us your consent to allow any of your minor dependents to use this site.​
              </Paragraph>

              <div className={b('section')}>SECTION 8 - CHANGES TO THIS PRIVACY POLICY</div>
              <Paragraph>
                We reserve the right to modify this privacy policy at any time, so please review it regularly. Changes
                and clarifications will take effect immediately upon their posting on the website. If we make material
                changes to this policy, we will notify you here that it has been updated as well as over email you have
                provided, so that you are aware of what information we collect, how we use it, and under what
                circumstances, if any, we use and or disclose it. ​If our store is acquired or merged with another
                company, your information may be transferred to the new owners so that we may continue to sell products
                to you.
              </Paragraph>

              <div className={b('section')}>QUESTIONS AND CONTACT INFORMATION</div>
              <Paragraph>
                ​If you would like to access, correct, amend or delete any personal information we have about you,
                register a complaint, or simply want more information contact us at info@musicabinet.com.
              </Paragraph>

              <div className={b('section')} />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
