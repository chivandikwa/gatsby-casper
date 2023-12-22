---
layout: post
title: GDPR technological implementation research (AWS Cloud)
image: img/unsplash/towfiqu-barbhuiya-FnA5pAzqhMM-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-02-19T00:00:00.000Z
tags: [GDPR Compliance in AWS, EU Data Privacy Laws, AWS Best Practices for GDPR]
draft: false
excerpt: Explore the intricacies of implementing GDPR compliance within the AWS Cloud. This research provides in-depth technical recommendations and best practices to secure personal data and adhere to EU data protection laws on the AWS platform.
---

Photo by <a href="https://unsplash.com/@towfiqu999999?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/photos/FnA5pAzqhMM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

#  GDPR technological implementation research (AWS Cloud)

The General Data Protection Regulation (GDPR) is a European Union (EU) regulation that came into effect in 2018. It is designed to protect the privacy and personal data of EU citizens by setting strict guidelines for how data should be collected, processed, and stored. The GDPR has far-reaching implications for organizations that handle personal data, including those that use cloud services like Amazon Web Services (AWS). In this research, we aim to explore how the GDPR is translated into engineering, with a specific focus on the AWS Cloud platform. Our goal is to provide technical recommendations and best practices that will help AWS users achieve GDPR compliance and ensure the privacy and security of personal data.

## Research Goals

The purpose of this research is to provide technical recommendations and best practices for achieving GDPR compliance on the AWS Cloud platform. Specifically, I aim to answer the following questions:

- What practices are followed around data handling both at rest and in transit on AWS Cloud?
- How does GDPR impact what information we can store and how we store it, including in databases, files, logs, etc. on AWS Cloud?
- How does GDPR impact what support agents or developers can do when they need to get client data locally to reproduce issues on AWS Cloud?

By answering these questions, I hope to provide AWS Cloud users with a better understanding of how to implement GDPR requirements in their environments and ensure the privacy and security of personal data. The technical recommendations and best practices I provide are based on my analysis of the GDPR and how it can be implemented on AWS Cloud, as well as on industry standards and best practices for data security and privacy.

## Useful resources

[What is GDPR, the EU’s new data protection law?](https://gdpr.eu/what-is-gdpr/)

[Privacy and Data Protection by Design](https://www.enisa.europa.eu/publications/privacy-and-data-protection-by-design)


# Technical

- Consider client-side encryption of data before transferring to S3, using AWS SDKs that support encryption and decryption operations of objects.
- Adopt tools in AWS that aid with better security and governance posture.
  - [AWS Security Hub](https://aws.amazon.com/security-hub/)

    AWS Security Hub is a security service offered by Amazon Web Services (AWS) that provides a comprehensive view of security alerts and compliance status across an AWS account. The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy that requires organizations to take measures to protect personal data.

    AWS Security Hub can help with GDPR compliance in several ways:
    - Identifying potential security threats: AWS Security Hub provides a centralized view of security alerts from different AWS services, such as Amazon GuardDuty and AWS Inspector, which can help identify potential security threats and vulnerabilities that may impact the security of personal data.

    - Enabling compliance checks: AWS Security Hub provides compliance checks against a variety of industry standards and regulations, including GDPR. These checks can help identify non-compliant resources and provide recommendations for remediation.

    - Automating compliance monitoring: AWS Security Hub can automate compliance monitoring by continuously checking AWS resources for compliance with GDPR requirements, such as data access control, data retention policies, and data protection measures.

    - Facilitating incident response: AWS Security Hub can also help organizations respond to security incidents and breaches by providing alerts and notifications when security events occur, as well as by integrating with other AWS security services such as AWS CloudTrail and AWS Config.

  - [Amazon Guard Duty](https://aws.amazon.com/guardduty/)

    Amazon GuardDuty is a threat detection service offered by Amazon Web Services (AWS) that continuously monitors for malicious activity and unauthorized behaviour within an AWS environment. GuardDuty can help with GDPR compliance by providing enhanced security for personal data stored or processed within the AWS environment.

    Here are some specific ways that Amazon GuardDuty can help with GDPR compliance:

    - Detecting threats to personal data: Amazon GuardDuty can help detect threats to personal data stored or processed within an AWS environment. By analyzing log data and network traffic, GuardDuty can identify potential threats such as compromised instances, malware, or unauthorized access to sensitive data.

    - Providing real-time alerts: GuardDuty can provide real-time alerts when it detects suspicious activity, allowing organizations to quickly investigate and respond to potential threats.

    - Automating threat detection: GuardDuty can automatically detect and alert on potential threats, reducing the need for manual monitoring and analysis.

    - Enabling compliance with GDPR security requirements: GuardDuty can help organizations comply with GDPR security requirements by providing visibility into security threats and unauthorized behaviour that may impact personal data. GuardDuty can also be integrated with other AWS security services, such as AWS Security Hub and AWS CloudTrail, to provide a comprehensive view of security and compliance posture.

    - Offering simplified compliance reporting: GuardDuty provides a range of pre-built compliance reports that can help organizations demonstrate their compliance with GDPR and other regulations.

    In summary, Amazon GuardDuty can help organizations meet GDPR compliance requirements by providing enhanced security for personal data, automating threat detection and response, and simplifying compliance reporting.
  - [Amazon Inspector](https://aws.amazon.com/inspector/)

    Amazon Inspector is a security assessment service offered by Amazon Web Services (AWS) that helps identify security vulnerabilities and compliance issues within an AWS environment. Amazon Inspector can help with GDPR compliance by providing a range of security assessments that can help organizations identify and remediate security issues that may impact personal data.

    Here are some specific ways that Amazon Inspector can help with GDPR compliance:

    - Identifying security vulnerabilities: Amazon Inspector can help identify security vulnerabilities within an AWS environment, such as missing security patches, insecure network configurations, or weak access controls. By identifying these vulnerabilities, organizations can take steps to remediate them and reduce the risk of unauthorized access to personal data.

    - Enabling compliance assessments: Amazon Inspector can assess an organization's compliance with a variety of industry standards and regulations, including GDPR. These assessments can help identify non-compliant resources and provide recommendations for remediation.

    - Providing a range of assessment templates: Amazon Inspector provides a range of pre-built assessment templates that can help organizations assess the security of their AWS resources, including EC2 instances, network configurations, and applications.

    - Automating security assessments: Amazon Inspector can automatically perform security assessments regularly, reducing the need for manual security testing and analysis.

    - Facilitating incident response: Amazon Inspector can help organizations respond to security incidents and breaches by identifying vulnerabilities and misconfigurations that may have contributed to the incident. This information can help organizations remediate the underlying security issues and prevent similar incidents in the future.

    In summary, Amazon Inspector can help organizations meet GDPR compliance requirements by identifying security vulnerabilities and compliance issues within an AWS environment, automating security assessments, and facilitating incident response.

  - [AWS Systems Manager](https://aws.amazon.com/systems-manager/)

    AWS Systems Manager is a management service offered by Amazon Web Services (AWS) that helps manage and automate operational tasks within an AWS environment. AWS Systems Manager can help with GDPR compliance by providing visibility and control over the configuration of AWS resources, enabling organizations to ensure that personal data is processed and stored in a secure and compliant manner.

    Here are some specific ways that AWS Systems Manager can help with GDPR compliance:

    - Managing AWS resource configurations: AWS Systems Manager can help manage the configuration of AWS resources such as EC2 instances, databases, and network configurations. This can help ensure that personal data is stored and processed in a secure and compliant manner, with appropriate access controls, data retention policies, and encryption.

    - Automating security patching: AWS Systems Manager can automate the process of applying security patches and updates to AWS resources. This can help ensure that systems are up-to-date and secure, reducing the risk of security vulnerabilities that may impact personal data.

    - Enabling compliance checks: AWS Systems Manager provides compliance checks against a variety of industry standards and regulations, including GDPR. These checks can help identify non-compliant resources and provide recommendations for remediation.

    - Facilitating incident response: AWS Systems Manager can help organizations respond to security incidents and breaches by providing tools for remote management and automation. This can help organizations quickly and efficiently remediate security issues and prevent further damage to personal data.

    - Providing centralized management: AWS Systems Manager provides a centralized management console for managing AWS resources, making it easier for organizations to manage large and complex environments.

    In summary, AWS Systems Manager can help organizations meet GDPR compliance requirements by managing and automating operational tasks within an AWS environment, enabling compliance checks, and facilitating incident response.

- [AWS Macie](https://aws.amazon.com/macie/)

  AWS Macie is a security service offered by Amazon Web Services (AWS) that provides automated data discovery, classification, and protection of sensitive data in an AWS environment. AWS Macie can help with GDPR compliance by identifying and classifying personal data stored within an AWS environment, and by providing tools to protect that data.

  Here are some specific ways that AWS Macie can help with GDPR compliance:

  - Identifying personal data: AWS Macie can automatically discover and classify personal data stored within an AWS environment, including data such as names, addresses, phone numbers, and email addresses. This can help organizations better understand what personal data they have, where it is stored, and how it is being used.

  - Monitoring data access: AWS Macie can monitor data access and usage, providing visibility into who is accessing personal data and how it is being used. This can help organizations ensure that personal data is being processed and stored in a secure and compliant manner.

  - Enabling data protection: AWS Macie provides tools for protecting personal data, such as data loss prevention (DLP) policies that can help prevent data exfiltration or unauthorized access to personal data.

  - Automating compliance checks: AWS Macie can automatically perform compliance checks against a variety of industry standards and regulations, including GDPR. These checks can help identify non-compliant resources and provide recommendations for remediation.

  - Facilitating incident response: AWS Macie can help organizations respond to security incidents and breaches by providing tools for identifying and remediating data breaches or other security incidents involving personal data.

  - In summary, AWS Macie can help organizations meet GDPR compliance requirements by automatically discovering and classifying personal data, monitoring data access and usage, enabling data protection, automating compliance checks, and facilitating incident response.

- Create a plan to keep up with changes in TLS protocols and ensure support for the most secure HTTPS protocol. When vulnerabilities are discovered, a new TLS versioned protocol is released, and it is important to keep up with these updates.
- The purpose of the collection and processing of personal data should be clearly defined and documented. Be critical about reusing data for other purposes particularly if this is not communicated to the user.
  - Customer data requests have to adhere to this. For instance, if communicated indicated that specific data would stay in a given region that should not be violated and it should be clear for what duration the data would be available in another form and the intended use. Scenarios like this should be covered by the privacy policy documentation.
- Ask the following questions regarding data retention
  - What storage timescale do we communicate and adhere to?
  - Is there a need for regular deletion of data beyond that timescale?
  - Is there a need for anonymizing data beyond that timescale?
- Pay attention to potential gaps in the encryption of data, and keep data on encrypted media. For example, on data requests, the receiving machine should have encryption of drives and the data should not be transferred through means that could unreasonably expose it, like sharing via another cloud provider or messaging application. These gaps need to be identified and addressed.
- Research your data collection mechanisms to identify when it necessitates that in the EU there needs to be a consent form shown to users. This however is usually not required when data is stored only for the operation of our application.
- There is a need for regular risk assessments around the security of data. The cloud is very dynamic and adopting tooling to help keep up is recommended.
- Adopt AWS config to assess, audit, and evaluate the configuration of AWS resources to ensure compliance (compliance-as-code framework), including
  - Ensuring that configuration does not drift out of compliance. For example, someone accidentally turns off the encryption of a drive
  - Keep up with potential security weaknesses
- Choose conformance packs to get out-of-the-box best practices. General recommendation examples
  - [Operational Best Practices for Amazon S3](https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-Amazon-S3.yaml)
  - [Australian Cyber Security Centre (ACSC) Essential Eight Maturity Model and AWS managed Config rules](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-acsc_essential_8.html)
  - [Australian Cyber Security Centre (ACSC) Information Security Manual (ISM) 2020-06 and AWS managed Config rules](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-acsc-ism.html)
  - [Operational best practices for Amazon CloudWatch](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-amazon-cloudwatch.html)
  - [Operational best practices for Asset Management](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-asset-management.html)
  - [Operational best practices for AWS Identity and Access Management](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-aws-identity-and-access-management.html)
  - [Operational best practices for AWS’ Well-Architected Framework Reliability Pillar](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-wa-Reliability-Pillar.html)
  - [Operational best practices of AWS' Well-Architected Framework Security Pillar](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-wa-Security-Pillar.html)
  - [Operational best practices for business continuity and disaster recovery](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-BCP-and-DR.html)
  - [Operational best practices for Center for Internet Security (CIS) Critical Security Controls v8](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis-critical-security-controls-v8.html)
  - [Center for Internet Security (CIS) Top 20 Critical Security Controls](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_top_20.html)
  - [Cybersecurity & Infrastructure Security Agency (CISA) Cyber Essentials (CE)](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cisa-ce.html)
  - [Operational best practices for devops](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-DevOps.html)
  - [Operational best practices for EC2](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-EC2.html)
  - [Operational best practices for encryption and key management](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-Encryption-and-Keys.html)
  - [Operational best practices for GxP EU Annex 11](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-gxp-eu-annex-11.html)
  - [Operational best practices for load balancing](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-load-balancing.html)
  - [Operational best practices for logging](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-logging.html)
  - [Operational best practices for management and governance services](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-Management-and-Governance-Services.html)
  - [Operational best practices for monitoring](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-monitoring.html)
  - [Operational best practices for NIST privacy framework](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-nist_privacy_framework.html)
  - [Operational best practices for publicly accessible resources](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-Publicly-Accessible-Resources.html)
  - [Operational best practices for security, identity and compliance services](https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-Security-Identity-and-Compliance-Services.html)
  - [Operational best practices for EKS](https://docs.aws.amazon.com/config/latest/developerguide/security-best-practices-for-EKS.html)
  - [Operational best practices for AWS network firewall](https://docs.aws.amazon.com/config/latest/developerguide/security-best-practices-for-Network-Firewall.html)
  - [Operational best practices for AWS WAF](https://docs.aws.amazon.com/config/latest/developerguide/security-best-practices-for-aws-waf.html)
  - [Operational best practices for AWS Secret Manager*](https://docs.aws.amazon.com/config/latest/developerguide/security-best-practices-for-Secrets-Manager.html)
- Reduce the risk of secrets being exposed
- Consider [AWS Secret Manager](https://aws.amazon.com/secrets-manager/) with [best practices enforced](https://docs.aws.amazon.com/config/latest/developerguide/security-best-practices-for-Secrets-Manager.html)
- Adopt compliance as code in any other viable areas. For example, adopting this as part of the IaC to make sure non-compliant changes will not pass a gate and will not be rolled out.
- You need to be able to produce, delete and audit data easily as this can be `demanded`.
  - Consider [cloud trail](https://aws.amazon.com/cloudtrail/)
  - Carefully consider the logging approaches in use and their retention policies
- Anonymize data that is requested for debugging.
  > A simple approach would be to identify what data to anonymize like email addresses, phone numbers, names, etc., and have some automation that runs to apply any number of techniques like masking, encrypting, randomizing, and faking before that data is given to a support agent.

# Organizational

- There must be organisational measures in place to ensure that personal data is not compromised by accident or deliberately
  > Particularly with data transfer requests, ensure that whoever received the data does so responsibly and terminates the data after the intended usage is concluded.
- Implement awareness and training of any policies and obligations internally to anyone who has access to data, environments that contain data, the configuration of environments, and any other updates that can cause compliance issues like exposure through code updates.
- Limit who has access to data.

Internally, organizations should implement data handling and security protocols that align with GDPR. This includes establishing clear guidelines on data access, regular training programs on data protection, and emergency response plans for potential data breaches. For instance, regular workshops on handling PII (Personally Identifiable Information) and conducting mock data breach exercises can significantly enhance GDPR compliance.

# Contract related

- Ensure a clear outline of the following in your privacy policy documents
  - The subject matter and duration of data processing
  - The nature and purpose of the processing
  - The type of personal data and categories of data
 - The data controller's obligations and rights
- Summary of required policy documents
  - Information security policy
  - Business continuity plan
  - Privacy policy
  - Data retention policy

# Other recommendations

- Map out all personal data you collect and categorize it
  - Identify if any of that data needs to be anonymized
  > SQL Server allows for tagging data with classifications with useful tags out of the box and supports recommendations (which unfortunately seems to get royally wrong at times, and can be overly sensitive as shown below). These classifications are stored as extended properties on the columns so this can be scripted as part of DB creation and targeted in other scripts.
- Delete/stop collecting any data you do not need. This approach aligns with Article 25 of the GDPR, which states that `the controller shall implement appropriate technical and organizational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed`.
- Communicate intent of use and ensure that future use adheres to that. For example, if you collect phone numbers for 2-factor authentication, you cannot later use them to send bulk messages for some other reason or share those details with an external party.
- Identify sensitive data that needs to always be encrypted. For example,  credit card details that would typically fall under that category
- Anonymize production data used in other environments

# Conclusion

If a software developer is looking to research GDPR, there are a few steps they could take:

  - Start by reading the official GDPR text to gain a foundational understanding of the regulation. This will help to familiarize the developer with the key terms and concepts of GDPR. The official text of GDPR can be found on the European Union's website.

  - Explore available online resources and training materials, such as webinars, podcasts, and online courses. These can help to provide more detailed information on specific aspects of GDPR, as well as practical guidance on implementing GDPR in software development.

  - Engage with GDPR experts and legal professionals who can provide guidance and advice on GDPR compliance.   This can help to ensure that the developer has a clear understanding of how GDPR applies to their specific situation and can provide guidance on how to implement GDPR-compliant software solutions.

  - Research best practices for GDPR compliance in software development. There are several resources available online that guide how to design, develop, and implement software solutions that comply with GDPR.

  - Participate in forums and online communities to share knowledge and experiences with other software developers who are also working on GDPR compliance. This can help to provide insights into the challenges and solutions of GDPR-compliant software development.

Overall, it's important for software developers to have a comprehensive understanding of GDPR and to stay up to date on any updates or changes to the regulation. By taking these steps, a software developer can research GDPR thoroughly and gain the knowledge and skills needed to design and develop software solutions that comply with GDPR requirements.

Navigating GDPR compliance within the AWS Cloud requires a multifaceted approach that encompasses utilizing AWS's robust security services, internal organizational measures, and clear contract-related policies. By understanding the specific requirements of GDPR and leveraging AWS tools effectively, organizations can not only comply with EU data protection laws but also enhance their overall data security posture. This research serves as a starting point for AWS users to build a GDPR-compliant environment, ensuring the privacy and security of personal data in the cloud.

> ⚠️ Much of GDPR falls under contract so it can be difficult to tell if the technological interpretation is complete, this would require guidance from a qualified and certified GDPR officer.
