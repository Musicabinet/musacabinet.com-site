import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from '../common.module.sass';
import { BaseLayout, Paragraph, Title } from '../../ui';
import { TITLE_SIZE } from '../../constants';

const b = block(style);

type UserAgreementProps = {};
type UserAgreementState = {};

@inject(() => ({}))
@observer
export default class UserAgreement extends React.Component<UserAgreementProps, UserAgreementState> {
  render() {
    return (
      <BaseLayout noStick background={'gray'}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Title size={TITLE_SIZE.FIRST} className={b('header')}>
                User Agreement
              </Title>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <Paragraph>Effective DATE: 9 september 2019</Paragraph>
            </div>
          </div>

          <div className="col-12 mb-5">
            <div className={b(null)}>
              <ol className={b('root')}>
                <li>
                  <div className={b('title')}>General Provisions</div>

                  <ol>
                    <li>
                      The following terms and definitions shall apply in this document:
                      <ol>
                        <li>User Agreement is the present document with all the additions and changes.</li>
                        <li>
                          User is an individual who has obtained the user profile in the Application according to
                          established procedure.
                        </li>
                        <li>
                          Website is a set of integrated hardware and software available on the Internet and located at
                          the musicabinet.com domain and all the subdomain zones and/or Android or iOS app (Google Play
                          and AppStore accordingly)
                        </li>
                        <li>
                          User Account is the Authentication and Personal Information stored on the servers of the
                          Website.
                        </li>
                        <li>
                          Application is a program and/or database, including the Website and mobile applications,
                          designed to provide access to the Service using the consumer Device.
                        </li>
                        <li>
                          Musicabinet is a commercial company that provides distance learning services for the various
                          musical instruments using the Application.
                        </li>
                        <li>
                          Device is a personal computer, a tablet, a mobile phone, a communicator, a smartphone, or
                          other device that allows to use the Application based on its functional purpose.
                        </li>
                        <li>
                          Service is a set of services that are provided by Musicabinet to the User using the
                          Application.
                        </li>
                        <li>
                          Content is images, text, audio and video materials, as well as other items of copyright and/or
                          related rights, as well as information and communications of any nature other than above
                          mentioned in the Application.
                        </li>
                        <li>
                          Profile is the personal section of the Website to which the User has access after signing up
                          and authorization on the Website. My Own Cabinet is designed to store the User's personal
                          information, view and manage the available Service functionality according to the terms of use
                          of the Service.
                        </li>
                        <li>
                          Additional Website Functionality are the Application functionality provided on the website.
                        </li>
                      </ol>
                    </li>
                    <li>
                      This "User Agreement" is a proposal for granting a non-exclusive right to use the Application
                      under the terms of this User Agreement.
                    </li>
                    <li>
                      Other terms and definitions not specified in Clause 1.1 hereof may be used in this Agreement. In
                      this case the interpretation of the term shall be in accordance with the text of the Agreement.
                    </li>
                    <li>
                      The User can use the Application within their declared functionality and purpose, including:
                      <ol>
                        <li>signing up and/or authorization on the Website.</li>
                        <li>selection and payment of training programs and courses.</li>
                        <li>viewing Materials posted on the Website, including for training purposes.</li>
                        <li>viewing training statistics for self-monitoring.</li>
                        <li>sending text messages with media items to other users of the Application.</li>
                        <li>
                          placement or displaying any User's content (including his/her own) on the Website, subject to
                          the limitations of Clause 7, Section 2.
                        </li>
                        <li>selection and payment for items at the online store.</li>
                      </ol>
                    </li>

                    <li>
                      The full and unconditional acceptance by the User of the terms of the following documents
                      (hereinafter, "binding instruments") is a prerequisite for the use of the Application and the
                      provision of the Service:
                      <ol>
                        <li>
                          User Agreement (this document) that governs the procedure of the Application functionality
                          use.
                        </li>
                        <li>
                          Privacy Policy that determines the procedure of users' personal information collection,
                          processing, and storage.
                        </li>
                      </ol>
                    </li>

                    <li>
                      Using any possibility specified in Clause 1.4., you confirm that:
                      <ol>
                        <li>
                          Have read the terms of this Agreement in full before using the Application and/or the Service
                          provided based on it.
                        </li>
                        <li>
                          Accept all the terms of this Agreement in full, without any exceptions or limitations on your
                          part, and agree to abide by them or stop using the Application. If you do not agree to the
                          terms of this Agreement, you should immediately stop any use of the Application and the
                          Service provided based on it.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>General Service Use Conditions</div>

                  <ol>
                    <li>
                      Viewing the Content placed at the Application on open access does not require you to sign up
                      and/or authorize the User.
                    </li>
                    <li>
                      Any other Application functionality use is allowed only after the User has completed the signing
                      up and authorization in the Application in accordance with the established rules.
                    </li>
                    <li>
                      The list of the Application functionality that require prior signing up and authorization, as well
                      as acceptance of additional documents for the use of the Services, where necessary, is determined
                      by Musicabinet in sole discretion and may be changed.
                    </li>
                    <li>
                      Information about the User in the User Account and Profile is stored and processed by Musicabinet
                      in accordance with the Privacy Policy.
                    </li>
                    <li>
                      The registered User independently determines the use of Profile and other functionality of the
                      Application, which, however, may not, under any circumstances, contradict this Agreement.
                    </li>
                    <li>
                      The User agrees to accept the granted right to use the Application under the specified conditions,
                      as well as the right to use the Additional Functionality according to the selected tariff, and to
                      pay a fee if it is provided for in the terms of the tariff.
                    </li>
                    <li>
                      The User is not allowed to use the Application to:
                      <ol>
                        <li>
                          copy the Content of the Application, as well as the design, programs, and databases that are
                          part of the Application, decompile and modify them.
                        </li>
                        <li>place and/or distribute the pirated Content.</li>
                        <li>
                          place and/or distribute the Content of pornographic nature, as well as promote pornography and
                          child erotica, and advertising of intimate services.
                        </li>
                        <li>
                          place and/or distribute any other prohibited information, including materials of extremist
                          nature and aimed at the infringement of human rights and freedoms on the grounds of race,
                          nationality, religion, language, and sex, inciting to commitment of violent acts against a
                          person or to inhuman treatment of animals, calling for the commission of other illegal acts,
                          including clarifying the manufacture and use of weapons, narcotic drugs and their precursors,
                          etc.
                        </li>
                        <li>
                          place and/or distribute information from identity documents or private financial information.
                        </li>
                        <li>
                          distribute advertisements in personal communications to other End Users without their prior
                          consent (JUNK).
                        </li>
                        <li>
                          distribute information inducing children to commit acts that endanger their lives and/or
                          health, including the infliction of harm to their health, suicide.
                        </li>
                        <li>
                          distribute information that can call children to use narcotic drugs, psychotropic and/or
                          intoxicating substances, tobacco, alcohol and alcohol-containing products, beer and beverages
                          derived from it, take part in gambling, engage in prostitution, vagrancy or begging.
                        </li>
                        <li>
                          distribute information justifying the permissibility of violence and/or cruelty or inducing to
                          carry out violent actions against people or animals.
                        </li>
                        <li>
                          distribute information denying family values and causing disrespect for parents and/or other
                          family members.
                        </li>
                        <li>distribute information justifying unlawful conduct.</li>
                        <li>distribute information containing strong language.</li>
                      </ol>
                      <li>Violation of rules in Sub-Clause</li>
                      <li>causes a user to be blocked from using the Application</li>
                      <li>
                        Despite the prohibition, if you use the Application, you may see the Content that may be deemed
                        to contain offensive or indecent information and otherwise violate the applicable law and the
                        rights of third parties. Please contact technical support in that case. Your request will be
                        processed immediately and the corresponding Content deleted if the violations of this Agreement
                        are confirmed.
                      </li>
                    </li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>Rights and Obligations of the Parties</div>

                  <ol>
                    <li>
                      Musicabinet shall be obliged to:
                      <ol>
                        <li>
                          Notify the User of the change of tariffs to pay for the granted right to use the Additional
                          Functionality of the Website at least 10 days before the introduction of new tariffs over
                          email.
                        </li>
                        <li>Perform other obligations under applicable law as well as this Agreement.</li>
                        <li>
                          Grant the User the right to functional use of the Application within the functionality of the
                          Service, as well as the right to use the Additional Functionality according to the selected
                          tariff.
                        </li>
                        <li>Provide the Service performance and technical support to the Users.</li>
                        <li>
                          Immediately respond to claims of rights holders on intellectual property rights violation in
                          connection with the use of the Application. Musicabinet does not allow violations of
                          intellectual property rights on its Website and will remove or disable access to the Content
                          that violates intellectual property rights if the violation is properly confirmed.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Musicabinet shall be entitled to:
                      <ol>
                        <li>
                          Terminate the Agreement with the User or suspend it if the User violates the requirements of
                          this User Agreement, as well as in cases established by this Agreement and the law.
                        </li>
                        <li>
                          Withhold the right to use the Additional Functionality of the Application before it is paid.
                        </li>
                        <li>
                          Suspend the User's access to the Additional Functionality of the Website in the event of
                          expiration of the access period if such limitations are provided for by the tariff used.
                        </li>
                        <li>
                          Restrict single User's actions if such actions endanger the normal operation of the Services;
                        </li>
                        <li>Perform scheduled preventive maintenance that may disrupt the Website operation.</li>
                        <li>Modify unilaterally the terms of this User Agreement.</li>
                        <li>
                          In the case of multiple breaches of the terms of the Agreement and/or the requirements of the
                          law, Musicabinet reserves the right to fully block your profile (account) or limit (terminate)
                          the granting of the right to use the Services for a specific period.
                        </li>
                        <li>
                          Musicabinet reserves the right to unilaterally remove any Content from the Website or to
                          temporarily restrict access to it.
                        </li>
                        <li>
                          if Musicabinet removed the Content as violating someone's rights or laws and you believe that
                          the Content has been deleted incorrectly, you have the right and the ability to challenge it
                          by writing a letter to the technical support.
                        </li>
                      </ol>
                    </li>
                    <li>
                      The User shall be obliged to:
                      <ol>
                        <li>Comply with the procedures for the Application using, established by this Agreement.</li>
                        <li>Perform other obligations under applicable law as well as this User Agreement.</li>
                      </ol>
                    </li>
                    <li>
                      The User shall be entitled to:
                      <ol>
                        <li>Unilaterally withdraw from the execution of the User Agreement.</li>
                        <li>Exercise other rights under applicable law as well as this User Agreement.</li>
                      </ol>
                    </li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>Provision of the Additional Functionality and Settlement Procedure</div>

                  <ol>
                    <li>
                      The User's right to use the Additional Functionality of the Website is subject to the terms of the
                      tariff selected by the User, depending on the name, composition, and amount of rights granted.
                    </li>
                    <li>
                      Payment of the granted rights to use the Additional Functionality of the Website is made by the
                      User in the form of a one-time payment or a subscription fee, depending on the tariff selected.
                    </li>
                    <li>
                      The settlements under the Agreement are performed by means of wire transfer in the manner provided
                      by the Application.
                    </li>
                    <li>Payment for the rights to use the Additional Functionality is made by advance payments.</li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>Warranties and Liability of Musicabinet</div>

                  <ol>
                    <li>
                      Since the Services and Additional Functionality of the Website are in the process of being
                      continually updated and supplemented with new functionality and the Content, the name and
                      composition of the features provided may vary from time to day without prior notice to the User.
                      Musicabinet has the right to terminate (temporarily or permanently) any separate service functions
                      of the Service and the Additional Functionality of the Website without prior notice to the
                      specific User.
                    </li>
                    <li>
                      Musicabinet is not responsible for interruptions of the Services and the Additional Functionality
                      of the Website in the event of failure of software or third-party equipment (Internet service
                      providers and others).
                    </li>
                    <li>
                      Musicabinet is not responsible to the User for suspending the Services and Additional
                      Functionality of the Website on the basis of the requirement of the competent public authority.
                    </li>
                    <li>
                      Musicabinet is not responsible for interruptions in access and use of the Services and Additional
                      Functionality of the Website, related to the replacement of equipment, software or other works
                      caused by maintenance and development of the Application's hardware, provided the User is notified
                      of interruption of the Services and Additional Functionality of the Website.
                    </li>
                    <li>
                      Musicabinet is not responsible for the operation and accessibility of the individual segments of
                      the communication network. Musicabinet does not guarantee the ability to exchange information with
                      those nodes or servers that are temporarily or permanently unavailable through the communication
                      network.
                    </li>
                    <li>
                      Musicabinet is not responsible for ensuring the security of the User's hardware and software used
                      to operate the Services and Additional Functionality of the Website.
                    </li>
                    <li>
                      Musicabinet is not responsible for the User's actions in connection with the use of the Services
                      and Additional Functionality of the Website.
                    </li>
                    <li>
                      The cumulative liability of Musicabinet under the Agreement is in any case limited to the
                      documented damage to the User in the amount not exceeding the value of the granted rights paid for
                      the calculation period in which such damage was caused.
                    </li>
                    <li>
                      Musicabinet can send informational messages. Informational messages can be sent based on the
                      User's actions in the Application or on the occurrence of events in the interaction between the
                      User and the Application.
                    </li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>Liability of the User</div>

                  <ol>
                    <li>
                      The User is liable for the breach of his/her obligations under this Agreement in accordance with
                      the applicable law and the terms of the Agreement.
                    </li>
                    <li>
                      In the event that the User violates the requirements of the current Agreement, Musicabinet is
                      entitled to suspend unilaterally the granting of access to the Service and Additional
                      Functionality of the Website until the User completely eliminates the violations made. Restoration
                      of access to the Services and Additional Functionality of the Website is performed by Musicabinet
                      within five (5) business days from the date the User eliminates the violations.
                    </li>
                    <li>
                      In the event of the User's gross, unacceptable behavior on the Website, breach of the terms of
                      this Agreement, Musicabinet may unilaterally block the User from accessing the Services and
                      Additional Functionality of the Website. Herewith, the funds paid by the User for the Additional
                      Functionality of the Website are not returned.
                    </li>
                    <li>
                      The use by the User of the Application for specific purposes shall not violate the property and/or
                      personal non-property rights of third parties, as well as the prohibitions and restrictions
                      established by the applicable law, including without limitation: copyright and related rights,
                      trademark rights, service marks and appellations of origin, right to industrial designs, rights to
                      use images of people, living or deceased, etc. The Content placed by the User shall not contain
                      information and/or images that offend the honor, dignity and business reputation of individuals;
                      the User has obtained all necessary permissions from the authorized persons in connection with the
                      use of the Content.
                    </li>
                    <li>
                      The use of the Application in other ways, including by copying the Content on the Website as well
                      as the Website design, software and database elements, their decompilation and modification, is
                      strictly prohibited and results in blocking the User.
                    </li>
                    <li>
                      The Application is intended for personal and other, unrelated to business activities realization,
                      needs of individuals. The Application is not allowed for commercial use.
                    </li>
                    <li>
                      The User is responsible for keeping secret from third parties his/her data (login and password)
                      used for authorization on the Website. All actions performed on the Website using the User's login
                      and/or password are considered as the User's own actions.
                    </li>
                    <li>
                      The User shall use the Services properly. In particular, the User shall not interfere in their
                      work or gain access to them in contravention the standard interface and instructions. The User
                      shall use the Services only in accordance with the law.
                    </li>
                  </ol>
                </li>

                <li>
                  <div className={b('title')}>Final Conditions</div>

                  <ol>
                    <li>
                      Disputes under the Agreement shall be resolved according to the preliminary complaint procedure.
                      In the event of a failure by the Parties to reach an agreement, the dispute is to be considered by
                      the court at the location of Musicabinet governed by the local legislation.
                    </li>
                    <li>
                      Any notifications under the Agreement, unless otherwise provided by the Agreement, may be sent by
                      one Party to the other Party: (1) by electronic mail; (2) by sending an electronic message to the
                      User in My Own Cabinet; (3) by mail with a delivery notice or courier service.
                    </li>
                    <li>
                      In the event that one or more provisions of the Agreement are, for any reason, null and void, such
                      invalidity does not affect the validity of any other provision of the Agreement that remains in
                      effect.
                    </li>
                    <li>
                      In the event of a violation of your rights and/or interests by using the Application, including
                      the illegal posting of the material by another User, you should inform Musicabinet. To do this,
                      you need to send a notification detailing the circumstances of the violation and a hypertext link
                      to the Website page containing materials that violate your rights and/or interests to the
                      technical support address.
                    </li>
                    <li>
                      In the event that Musicabinet is prosecuted or set a punishment in respect of violations of the
                      rights of third parties by you and the prohibitions or restrictions imposed by law, you are
                      required to pay the full amount of damages of Musicabinet.
                    </li>
                    <li>
                      Musicabinet reserves the right to place links to other resources in special blocks on the Website,
                      upon that Musicabinet is not responsible for the availability of such resources, for their
                      content, and for any consequences arising from the use the resource data and their content.
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
