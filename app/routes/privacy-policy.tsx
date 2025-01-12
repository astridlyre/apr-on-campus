import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import UnorderedList from "~/components/UnorderedList";
import Layout from "~/layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Section title="Privacy Policy" className="mt-8">
        <Heading className="mt-12" level={4}>
          Information We Collect
        </Heading>

        <Paragraph>
          We collect information you provide when you use our website. This
          includes:
        </Paragraph>

        <UnorderedList>
          <li>
            Contact information, such as your email address, when you provide
            it.
          </li>
          <li>Details you include in reports, such as incident submissions.</li>
          <li>
            Session data to help us understand how users interact with our
            website.
          </li>
        </UnorderedList>

        <Heading className="mt-12" level={4}>
          How We Use Your Information
        </Heading>

        <Paragraph>We use the information we collect to:</Paragraph>

        <UnorderedList>
          <li>Improve your experience on our website.</li>
          <li>Respond to your inquiries or submissions.</li>
          <li>Understand user activity to make our website better.</li>
        </UnorderedList>

        <Heading className="mt-12" level={4}>
          Sharing Your Information
        </Heading>

        <Paragraph>
          We do not share your information with third parties without your
          consent. This includes:
        </Paragraph>

        <UnorderedList>
          <li>
            <strong>Emails or contact information:</strong> These are kept
            private and used only for internal purposes.
          </li>
          <li>
            <strong>Incident reports:</strong> The details you share are never
            shared without your explicit permission.
          </li>
          <li>
            <strong>Session data:</strong> This is used solely to track how
            users interact with our website and is never shared externally.
          </li>
        </UnorderedList>

        <Heading className="mt-12" level={4}>
          Cookies
        </Heading>

        <Paragraph>
          We use cookies to track session information and understand website
          usage. These cookies:
        </Paragraph>

        <UnorderedList>
          <li>Help us improve our website.</li>
          <li>Do not collect personally identifiable information.</li>
        </UnorderedList>

        <Heading className="mt-12" level={4}>
          Your Consent
        </Heading>
        <Paragraph>
          By using our website, you agree to this privacy policy.
        </Paragraph>

        <Heading className="mt-12" level={4}>
          Changes to This Policy
        </Heading>
        <Paragraph>
          We may update this policy from time to time. Any changes will be
          posted here, and your continued use of the website means you accept
          the updated policy.
        </Paragraph>

        <Heading className="mt-12" level={4}>
          Contact Us
        </Heading>
        <Paragraph>
          If you have any questions or concerns about this policy, please
          contact us at{" "}
          <TextLink href="mailto:info@apr-on-campus.org" external>
            info@apr-on-campus.org
          </TextLink>
        </Paragraph>
      </Section>
    </Layout>
  );
}
