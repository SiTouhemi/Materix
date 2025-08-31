import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Cookie, Settings, Shield, Info } from "lucide-react";

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onDecline: () => void;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent = ({ onAccept, onDecline }: CookieConsentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });

  const handleAcceptAll = () => {
    onAccept({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleAcceptSelected = () => {
    onAccept(preferences);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Cookie Preferences
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    We use cookies to enhance your experience and analyze site usage
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                GDPR Compliant
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Cookie Categories */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="data-[state=checked]:bg-blue-600"
                />
                <div className="flex-1">
                  <Label htmlFor="necessary" className="text-sm font-medium text-gray-900">
                    Necessary Cookies
                  </Label>
                  <p className="text-xs text-gray-600">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Always Active
                </Badge>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => 
                    handlePreferenceChange('analytics', checked as boolean)
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
                <div className="flex-1">
                  <Label htmlFor="analytics" className="text-sm font-medium text-gray-900">
                    Analytics Cookies
                  </Label>
                  <p className="text-xs text-gray-600">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={(checked) => 
                    handlePreferenceChange('functional', checked as boolean)
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
                <div className="flex-1">
                  <Label htmlFor="functional" className="text-sm font-medium text-gray-900">
                    Functional Cookies
                  </Label>
                  <p className="text-xs text-gray-600">
                    Enable enhanced functionality and personalization.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => 
                    handlePreferenceChange('marketing', checked as boolean)
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
                <div className="flex-1">
                  <Label htmlFor="marketing" className="text-sm font-medium text-gray-900">
                    Marketing Cookies
                  </Label>
                  <p className="text-xs text-gray-600">
                    Used to track visitors across websites for marketing purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Accept All Cookies
                </Button>
                <Button
                  onClick={handleAcceptSelected}
                  variant="outline"
                  className="flex-1"
                >
                  Accept Selected
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={onDecline}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Decline All
                </Button>
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>

            {/* Detailed Information */}
            {showDetails && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Cookie Information</h4>
                </div>
                <div className="space-y-3 text-sm text-blue-800">
                  <p>
                    <strong>Necessary:</strong> Session management, security, and basic functionality.
                  </p>
                  <p>
                    <strong>Analytics:</strong> Google Analytics to understand user behavior and improve our service.
                  </p>
                  <p>
                    <strong>Functional:</strong> Remember your preferences and provide enhanced features.
                  </p>
                  <p>
                    <strong>Marketing:</strong> Track effectiveness of marketing campaigns (currently not used).
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700">
                    You can change your cookie preferences at any time in your browser settings or contact us at privacy@materix.com
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                By using our website, you agree to our{" "}
                <a href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/legal/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookieConsent;
