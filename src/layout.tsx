import React from 'react';
import { Provider } from '@/components/ui/provider';
import { Button, Box, Flex, Container, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

export async function getMetadata() {
  return {
    title: "Satset Documentation",
    description: "Documentation for the Satset project.",
    alternates: {
      canonical: 'https://satsetjs.indokudev.my.id',
      languages: {
        'en-US': 'https://satsetjs.indokudev.my.id/en',
        'id-ID': 'https://satsetjs.indokudev.my.id/id',
        'x-default': 'https://satsetjs.indokudev.my.id',
      },
    },
  };
}

export default function RootLayout({ children, locale = 'en-US', hasChildLayout }: { children: React.ReactNode, locale?: string, hasChildLayout?: boolean }) {
  if (hasChildLayout) {
    return (
      <html lang={locale} suppressHydrationWarning>
        <body>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Provider>
          {/* Header Section */}
          <Box as="header" borderBottomWidth="1px" py={4}>
            <Container maxW="container.xl">
              <Flex align="center" justify="space-between">
                <Heading as="h1" size="lg">
                  <ChakraLink href="/" _hover={{ textDecoration: 'none' }}>
                    Satset Docs
                  </ChakraLink>
                </Heading>
                
                <Flex as="nav" align="center" gap={4}>
                  <Button variant="ghost" as="a" href="/">Home</Button>
                  <ChakraLink href="/roadmap">Roadmap</ChakraLink>
                  <ChakraLink href="/product/sepatu-keren">Sample Product</ChakraLink>
                  <ColorModeButton />
                </Flex>
              </Flex>
            </Container>
          </Box>

          {/* Main Content */}
          <Box as="main" py={8} minH="80vh">
            <Container maxW="container.xl">
              {children}
            </Container>
          </Box>

          {/* Footer Section */}
          <Box as="footer" borderTopWidth="1px" py={6} textAlign="center">
            <Container>
              <Box fontSize="sm" color="gray.500">
                Built with ❤️ Satset
              </Box>
            </Container>
          </Box>
        </Provider>
      </body>
    </html>
  );
}