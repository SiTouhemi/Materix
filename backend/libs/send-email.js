// Mock email sending for development - no external dependencies needed
export const sendEmail = async (to, subject, html) => {
  try {
    // Extract verification link from HTML content
    const linkMatch = html.match(/href="([^"]+)"/);
    const verificationLink = linkMatch ? linkMatch[1] : "No link found";
    
    console.log("📧 Mock Email Sent:");
    console.log("   To:", to);
    console.log("   Subject:", subject);
    console.log("   Verification Link:", verificationLink);
    console.log("   Full HTML:", html);
    console.log("   ────────────────────────────────────────────────");
    
    return true;
  } catch (error) {
    console.error("❌ Error in mock email sending:", error);
    return false;
  }
};
