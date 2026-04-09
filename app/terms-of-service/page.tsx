import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

const effectiveDate = "April 4, 2026";
const contactEmail = "pritishmishra579@gmail.com";

export const metadata: Metadata = {
  title: "Terms of Service | GATE CSE Tracker",
  description: "Terms of Service for GATE CSE Tracker.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      description="These Terms of Service govern your access to and use of GATE CSE Tracker. By using the service, you agree to these terms."
      effectiveDate={effectiveDate}
      sections={[
        {
          title: "1. Operator",
          content: (
            <>
              <p>
                GATE CSE Tracker is operated by Pritish Mishra. Questions about
                these terms can be sent to {contactEmail}.
              </p>
            </>
          ),
        },
        {
          title: "2. The service",
          content: (
            <>
              <p>
                GATE CSE Tracker provides tools for GATE CSE preparation,
                including subject tracking, lecture organization, planning
                features, and related premium features.
              </p>
              <p>
                The service is an independent study tool. It is not affiliated
                with, endorsed by, or sponsored by the official GATE exam
                authorities.
              </p>
            </>
          ),
        },
        {
          title: "3. Eligibility and accounts",
          content: (
            <>
              <p>
                You are responsible for the accuracy of the information you use
                to create an account and for maintaining the confidentiality of
                your login credentials.
              </p>
              <p>
                You are responsible for activity that occurs through your
                account. If you believe your account has been compromised,
                contact {contactEmail}.
              </p>
            </>
          ),
        },
        {
          title: "4. Acceptable use",
          content: (
            <>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>use the service for unlawful, fraudulent, or abusive purposes;</li>
                <li>
                  interfere with the operation, security, or availability of the
                  service;
                </li>
                <li>
                  attempt to gain unauthorized access to accounts, systems, or
                  data;
                </li>
                <li>
                  copy, scrape, resell, or commercially exploit the service in
                  a way that is not authorized by us; or
                </li>
                <li>
                  upload or submit material that infringes another person&apos;s
                  rights or violates applicable law.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "5. Paid plan",
          content: (
            <>
              <p>
                GATE CSE Tracker offers a one-time premium plan priced at Rs.
                799. A purchase gives the buying account access to the premium
                features made available as part of that plan.
              </p>
              <p>
                Premium access is personal to the purchasing account and may not
                be shared, sublicensed, or transferred without permission.
              </p>
            </>
          ),
        },
        {
          title: "6. Refunds and cancellations",
          content: (
            <>
              <p>
                Premium purchases are one-time payments and are non-refundable.
                There is no cancellation right after purchase because there is
                no recurring subscription to cancel.
              </p>
              <p>
                If applicable law requires a refund or another remedy in a
                specific case, those legal rights will still apply.
              </p>
            </>
          ),
        },
        {
          title: "7. Availability and changes",
          content: (
            <>
              <p>
                We may update, improve, suspend, or discontinue any part of the
                service at any time. We do not guarantee that every feature will
                always be available or error-free.
              </p>
              <p>
                We may also change premium features, provided that doing so does
                not remove rights already granted under applicable law.
              </p>
            </>
          ),
        },
        {
          title: "8. Intellectual property",
          content: (
            <>
              <p>
                The service, including its design, branding, code, text, and
                original content, is owned by or licensed to Pritish Mishra and
                is protected by applicable intellectual property laws.
              </p>
              <p>
                These terms do not give you ownership of the service or any
                right to use our branding except as necessary for normal use of
                the product.
              </p>
            </>
          ),
        },
        {
          title: "9. Disclaimer",
          content: (
            <>
              <p>
                The service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. To the fullest extent permitted by law,
                we disclaim warranties of merchantability, fitness for a
                particular purpose, and non-infringement.
              </p>
              <p>
                GATE CSE Tracker is a study aid, not a guarantee of exam
                results, rank, admission, or academic performance.
              </p>
            </>
          ),
        },
        {
          title: "10. Limitation of liability",
          content: (
            <>
              <p>
                To the fullest extent permitted by law, Pritish Mishra will not
                be liable for indirect, incidental, special, consequential, or
                punitive damages, or for any loss of data, profits, goodwill,
                or business opportunities arising out of or related to your use
                of the service.
              </p>
            </>
          ),
        },
        {
          title: "11. Termination",
          content: (
            <>
              <p>
                We may suspend or terminate access to the service if you violate
                these terms, misuse the platform, or create risk for the service
                or its users.
              </p>
            </>
          ),
        },
        {
          title: "12. Changes to these terms",
          content: (
            <>
              <p>
                We may update these Terms of Service from time to time. When we
                do, we will post the updated version on this page and revise the
                effective date above.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
