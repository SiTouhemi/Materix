import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Shield, Lock, Eye, Database, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We respect your privacy and are committed to protecting your personal data. 
            This policy explains how we collect, use, and safeguard your information.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Badge variant="outline" className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              GDPR Compliant
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Privacy Policy
            </CardTitle>
            <CardDescription>
              How we collect, use, and protect your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Materix ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our project management platform and services.
              </p>
            </section>

            <Separator />

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 Personal Information</h3>
              <p className="leading-relaxed mb-3">We collect information you provide directly to us:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Name and email address when you create an account</li>
                <li>Profile information (profile picture, bio)</li>
                <li>Workspace and project data you create</li>
                <li>Task assignments and comments</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Automatically Collected Information</h3>
              <p className="leading-relaxed mb-3">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Log data (access times, error logs)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <Separator />

            {/* How We Use Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our project management services</li>
                <li>Process your account registration and manage your account</li>
                <li>Enable team collaboration and workspace management</li>
                <li>Send you important service updates and notifications</li>
                <li>Improve our services and develop new features</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <Separator />

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-3">We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With your consent:</strong> When you explicitly authorize us to share your information</li>
                <li><strong>Service providers:</strong> With trusted third-party services that help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Team collaboration:</strong> With other members of your workspace (as controlled by your settings)</li>
              </ul>
            </section>

            <Separator />

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p className="leading-relaxed mb-3">We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <Separator />

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
                When you delete your account, we will delete or anonymize your personal information within 30 days, except where we 
                are required to retain it for legal purposes.
              </p>
            </section>

            <Separator />

            {/* Your Rights (GDPR) */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights (GDPR)</h2>
              <p className="leading-relaxed mb-3">Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdraw consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, please contact us at privacy@materix.com
              </p>
            </section>

            <Separator />

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our service</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may affect 
                the functionality of our service.
              </p>
            </section>

            <Separator />

            {/* Third-Party Services */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Services</h2>
              <p className="leading-relaxed mb-3">We may use third-party services that collect, monitor, and analyze data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Analytics:</strong> Google Analytics for usage statistics</li>
                <li><strong>Email:</strong> SendGrid for email communications</li>
                <li><strong>Storage:</strong> Cloudinary for file storage</li>
                <li><strong>Security:</strong> Arcjet for fraud prevention</li>
              </ul>
              <p className="leading-relaxed mt-3">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <Separator />

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such 
                transfers comply with applicable data protection laws and implement appropriate safeguards to protect your data.
              </p>
            </section>

            <Separator />

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you are a parent or guardian and believe your child has provided us with personal 
                information, please contact us immediately.
              </p>
            </section>

            <Separator />

            {/* Changes to Policy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy 
                Policy periodically.
              </p>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Materix Privacy Team</p>
                <p className="text-gray-600">Email: privacy@materix.com</p>
                <p className="text-gray-600">Data Protection Officer: dpo@materix.com</p>
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

export default PrivacyPolicy;
