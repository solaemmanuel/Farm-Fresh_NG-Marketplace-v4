import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#2d7a3e] text-white p-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium">Terms & Conditions</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600 mb-6">
            Last updated: April 12, 2026
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Farm Fresh NG, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Use License</h2>
          <p className="text-gray-700 mb-4">
            Permission is granted to temporarily use Farm Fresh NG for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to decompile or reverse engineer any software contained on Farm Fresh NG</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
          <h3 className="text-base font-medium text-gray-900 mb-2">For Farmers:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Provide accurate and truthful information about your products</li>
            <li>Ensure all produce meets quality and safety standards</li>
            <li>Honor all confirmed orders and delivery commitments</li>
            <li>Maintain fair pricing and transparent business practices</li>
          </ul>

          <h3 className="text-base font-medium text-gray-900 mb-2">For Buyers:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Provide accurate delivery information</li>
            <li>Complete payment for confirmed orders</li>
            <li>Respect farmers and their produce</li>
            <li>Report any issues with products or service promptly</li>
          </ul>

          <h3 className="text-base font-medium text-gray-900 mb-2">For Delivery Partners:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Maintain vehicle and personal hygiene standards</li>
            <li>Handle produce with care to prevent damage</li>
            <li>Deliver orders within agreed timeframes</li>
            <li>Provide excellent customer service</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
          <p className="text-gray-700 mb-4">
            All payments are processed securely through our platform. Farmers receive payments after successful delivery confirmation. Service fees may apply as outlined in our pricing structure.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">5. Delivery and Logistics</h2>
          <p className="text-gray-700 mb-4">
            We strive to ensure timely delivery of all orders. However, delivery times may vary based on location, weather conditions, and other factors. Users are responsible for providing accurate delivery addresses.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">6. Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. We collect and use personal information only as outlined in our Privacy Policy, which is incorporated into these Terms by reference.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">7. Prohibited Activities</h2>
          <p className="text-gray-700 mb-4">
            You may not use Farm Fresh NG for any unlawful purpose or to solicit others to perform unlawful acts. Prohibited activities include but are not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
            <li>Fraudulent or deceptive practices</li>
            <li>Harassment or abuse of other users</li>
            <li>Violation of intellectual property rights</li>
            <li>Distribution of harmful or illegal content</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">8. Termination</h2>
          <p className="text-gray-700 mb-4">
            We may terminate or suspend your account and access to Farm Fresh NG immediately, without prior notice, for any violation of these Terms.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall Farm Fresh NG or its suppliers be liable for any damages arising out of the use or inability to use the platform.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">10. Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These Terms shall be interpreted and governed by the laws of Nigeria, without regard to conflict of law provisions.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these Terms at any time. Continued use of Farm Fresh NG after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">12. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: support@farmfreshng.com<br />
            Phone: +234 (0) XXX XXX XXXX
          </p>
        </div>
      </div>
    </div>
  );
}