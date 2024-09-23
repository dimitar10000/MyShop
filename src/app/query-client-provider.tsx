'use client'
import { isServer, QueryClient, QueryClientProvider, } from '@tanstack/react-query'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
      return makeQueryClient()
    } else {
      // Browser: make a new query client if we don't already have one
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
    }
  }

  export default function QueryClientProviderWrapper({ children }: {children: any}) {
    const queryClient = getQueryClient();
  
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }