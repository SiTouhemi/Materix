import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import ReactQueryProvider from "./provider/react-query-provider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "canonical", href: "https://materix.com" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Meta Tags */}
        <title>Materix - Professional Web Development & Design Services</title>
        <meta name="title" content="Materix - Professional Web Development & Design Services" />
        <meta name="description" content="Transform your business with modern web applications, clean designs, and scalable solutions. Expert web development, UI/UX design, and mobile app development services." />
        <meta name="keywords" content="web development, UI/UX design, mobile apps, React, Node.js, TypeScript, portfolio, software development, digital solutions" />
        <meta name="author" content="Materix Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://materix.com" />
        <meta property="og:title" content="Materix - Professional Web Development & Design Services" />
        <meta property="og:description" content="Transform your business with modern web applications, clean designs, and scalable solutions. Expert web development, UI/UX design, and mobile app development services." />
        <meta property="og:image" content="https://materix.com/og-image.jpg" />
        <meta property="og:site_name" content="Materix" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://materix.com" />
        <meta property="twitter:title" content="Materix - Professional Web Development & Design Services" />
        <meta property="twitter:description" content="Transform your business with modern web applications, clean designs, and scalable solutions." />
        <meta property="twitter:image" content="https://materix.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Materix" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Materix",
              "url": "https://materix.com",
              "logo": "https://materix.com/logo.png",
              "description": "Professional web development and design services",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@materix.com"
              },
              "sameAs": [
                "https://linkedin.com/company/materix",
                "https://github.com/materix",
                "https://twitter.com/materix"
              ]
            })
          }}
        />
        
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ReactQueryProvider>
      <Outlet />
    </ReactQueryProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
