import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import ReactDOM from "react-dom";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from "./components/header/header";
import TopMenu from "./components/menus/top-menu";
import Footer from "./components/footer/footer";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/app/lib/theme';
import CssBaseline from '@mui/material/CssBaseline';
import QueryClientProviderWrapper from './query-client-provider';
import CartProvider from '@/app/lib/cart/cart-provider';
import ListProvider from '@/app/lib/list/list-provider';
import ProductsProvider from '@/app/lib/product/products-provider';
import ScrollUpProvider from '@/app/lib/scroll-up/scroll-up-provider';
import ScrollUpButton from '@/app/components/scroll-up-button/scroll-up-button';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '',
    default: 'MyShop app',
  },
  description: "A simple shop for clothes",
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  ReactDOM.preconnect("https://fonts.googleapis.com");
  ReactDOM.preconnect("https://fonts.gstatic.com", { crossOrigin: "anonymous" });

  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
      </Head>
      <ProductsProvider>
        <ListProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <UserProvider>
                {/*<a href="https://www.flaticon.com/free-icons/branding" title="branding icons">Branding icons created by Freepik - Flaticon</a> */}
                {/*<a href="https://www.flaticon.com/free-icons/architecture-and-city" title="architecture-and-city icons">Architecture-and-city icons created by Rendyudha - Flaticon</a>*/}
                <QueryClientProviderWrapper>
                  <body className={`${inter.className}`}>
                    <ScrollUpProvider>
                      <Header />
                      <div className="pt-1">
                        <TopMenu />
                      </div>
                      {children}
                      <div className="pt-10 pb-10 bg-slate-500">
                        <Footer />
                      </div>
                      <div className='ps-5 pb-3 bg-slate-500'> © 2024 MyShop Placeholder E-Commerce</div>

                      <ScrollUpButton />
                    </ScrollUpProvider>
                  </body>
                </QueryClientProviderWrapper>
              </UserProvider>
            </ThemeProvider>
          </CartProvider>
        </ListProvider>
      </ProductsProvider>
    </html>
  );
}
