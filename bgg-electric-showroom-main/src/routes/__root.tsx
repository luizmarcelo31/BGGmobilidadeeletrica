import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import SchemaOrg from "@/components/seo/SchemaOrg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // TODO: substituir por domínio real antes do deploy em produção
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Compre sua scooter elétrica em Caruaru com a BGG Mobilidade. Modelos SUDU e NADO premium com suporte local no Agreste pernambucano. Financiamento facilitado.",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "BGG Mobilidade Elétrica" },
      { name: "theme-color", content: "#050505" },

      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "BGG Mobilidade Elétrica | Scooters Elétricas em Caruaru, PE",
      },
      {
        property: "og:description",
        content:
          "Concessionária de scooters e motos elétricas premium em Caruaru, PE. Conheça os modelos disponíveis e simule seu financiamento.",
      },
      {
        property: "og:image",
        content: "https://bggmobilidade.com.br/og-image.jpg",
      },
      {
        property: "og:url",
        content: "https://bggmobilidade.com.br",
      },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "BGG Mobilidade Elétrica" },

      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "BGG Mobilidade Elétrica | Caruaru, PE",
      },
      {
        name: "twitter:description",
        content:
          "Scooters elétricas premium em Caruaru. Sem IPVA. Sem combustível. Agende seu test-drive.",
      },
      {
        name: "twitter:image",
        content: "https://bggmobilidade.com.br/og-image.jpg",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: "https://bggmobilidade.com.br",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "sitemap",
        href: "https://bggmobilidade.com.br/sitemap.xml",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SchemaOrg />
      <Outlet />
    </QueryClientProvider>
  );
}
