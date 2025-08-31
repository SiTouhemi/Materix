import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Shield, Users } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These terms govern your use of Materix, our project management platform. 
            By using our service, you agree to these terms.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Badge variant="outline" className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Version 1.0
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Terms of Service Agreement
            </CardTitle>
            <CardDescription>
              Please read these terms carefully before using Materix
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using Materix ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator />

            {/* Description of Service */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p className="leading-relaxed mb-3">
                Materix is a project management platform that provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Team collaboration tools and workspace management</li>
                <li>Project and task tracking capabilities</li>
                <li>Real-time analytics and reporting</li>
                <li>File sharing and document management</li>
                <li>Communication and notification systems</li>
              </ul>
            </section>

            <Separator />

            {/* User Accounts */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  To access certain features of the Service, you must create an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Acceptable Use Policy</h2>
              <p className="leading-relaxed mb-3">You agree not to use the Service to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the Service's operation or other users</li>
                <li>Use the Service for spam or commercial solicitation</li>
              </ul>
            </section>

            <Separator />

            {/* Privacy and Data */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Privacy and Data Protection</h2>
              <p className="leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                <a href="/legal/privacy-policy" className="text-blue-600 hover:underline ml-1">
                  Privacy Policy
                </a>, which is incorporated into these terms by reference.
              </p>
            </section>

            <Separator />

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Materix and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="leading-relaxed">
                  You retain ownership of content you upload to the Service, but grant us a license to use, store, and display 
                  such content in connection with providing the Service.
                </p>
              </div>
            </section>

            <Separator />

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall Materix, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <Separator />

            {/* Termination */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, 
                including breach of these Terms of Service. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <Separator />

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or 
                through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="font-medium">Materix Support</p>
                <p className="text-gray-600">Email: legal@materix.com</p>
                <p className="text-gray-600">Address: [Your Business Address]</p>
              </div>
            </section>

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© {new Date().getFullYear()} Materix. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
