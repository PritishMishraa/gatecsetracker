import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

const effectiveDate = "April 4, 2026";
const contactEmail = "pritishmishra579@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy | GATE CSE Tracker",
  description: "Privacy Policy for GATE CSE Tracker.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This Privacy Policy explains what information GATE CSE Tracker collects, how it is used, and the choices you have when you use the service."
      effectiveDate={effectiveDate}
      sections={[
        {
          title: "1. Who we are",
          content: (
            <>
              <p>
                GATE CSE Tracker is operated by Pritish Mishra. If you have a
                privacy question, a data request, or need support related to
                this policy, email {contactEmail}.
              </p>
            </>
          ),
        },
        {
          title: "2. Information we collect",
          content: (
            <>
              <p>We collect information in the following categories:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Account information, such as your name, email address, profile
                  image, authentication provider, and whether your account has
                  premium access.
                </li>
                <li>
                  Session and device information, such as session identifiers,
                  IP address, browser or user-agent details, and session expiry
                  data used to keep you signed in and protect the service.
                </li>
                <li>
                  Early-access or waitlist information, including your email
                  address and any optional name, target GATE year, or feedback
                  you submit.
                </li>
                <li>
                  Usage and analytics information collected through Beam
                  Analytics, Cloudflare Web Analytics, and Microsoft Clarity,
                  which may include page views, referral data, device and
                  browser information, approximate location inferred from IP
                  address, and interaction data such as clicks, scrolling, and
                  similar behavior signals.
                </li>
                <li>
                  Browser-side storage data, such as study-planning preferences,
                  progress-related settings, and waitlist submission state saved
                  in your browser using local storage or cookies.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "3. How we collect information",
          content: (
            <>
              <p>
                We collect information directly from you when you create an
                account, sign in, join the early-access list, or use study
                tracking features.
              </p>
              <p>
                We also collect information automatically through authentication
                sessions, analytics scripts, and browser storage used to improve
                functionality and understand how the product is used.
              </p>
            </>
          ),
        },
        {
          title: "4. How we use information",
          content: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>create and manage your account;</li>
                <li>authenticate sign-in and maintain secure sessions;</li>
                <li>provide free and premium study-tracking features;</li>
                <li>save your preferences and improve product usability;</li>
                <li>
                  monitor performance, analyze usage, and understand product
                  behavior;
                </li>
                <li>
                  respond to support, privacy, and product-related inquiries;
                </li>
                <li>
                  contact early-access users about launch updates or related
                  access information; and
                </li>
                <li>protect the service against misuse, fraud, or abuse.</li>
              </ul>
            </>
          ),
        },
        {
          title: "5. How we share information",
          content: (
            <>
              <p>
                We do not sell your personal information. We may share
                information with service providers that help operate GATE CSE
                Tracker, such as hosting, database, authentication, analytics,
                and infrastructure providers.
              </p>
              <p>
                We may also disclose information if required to comply with law,
                enforce our Terms of Service, or protect the rights, safety, or
                security of users or the service.
              </p>
            </>
          ),
        },
        {
          title: "6. Data retention",
          content: (
            <>
              <p>
                We retain personal information for as long as it is reasonably
                necessary to provide the service, maintain accounts, operate the
                waitlist, comply with legal obligations, resolve disputes, and
                enforce our agreements.
              </p>
              <p>
                Browser-side local storage remains on your device until you
                clear it or your browser removes it.
              </p>
            </>
          ),
        },
        {
          title: "7. Your choices",
          content: (
            <>
              <p>
                You can request access to, correction of, or deletion of your
                personal information by emailing {contactEmail}. We may need to
                verify your identity before acting on a request.
              </p>
              <p>
                You can also control certain browser storage and cookies through
                your browser settings, although disabling them may affect how
                some features work.
              </p>
            </>
          ),
        },
        {
          title: "8. Security",
          content: (
            <>
              <p>
                We use reasonable administrative, technical, and organizational
                measures to protect information, but no method of storage or
                transmission is completely secure. For that reason, we cannot
                guarantee absolute security.
              </p>
            </>
          ),
        },
        {
          title: "9. Children",
          content: (
            <>
              <p>
                GATE CSE Tracker is not intended for children under 13, and we
                do not knowingly collect personal information from children
                under 13.
              </p>
            </>
          ),
        },
        {
          title: "10. Changes to this policy",
          content: (
            <>
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will post the updated version on this page and revise the
                effective date above.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
