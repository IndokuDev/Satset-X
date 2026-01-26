import React from 'react';
import { Provider } from '@/components/ui/provider';
import { Button, Box, Flex, Container, Heading, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

export default function RootLayout({ children }: { children: React.ReactNode, locale?: string }) {
  return (
    <Provider>
      {/* Main Wrapper with Background Gradient */}
      <Box
        minH="100vh"
        bgGradient="radial(circle at 0% 0%, gray.50, transparent), radial(circle at 100% 100%, gray.100, transparent)"
        _dark={{ bgGradient: "radial(circle at 0% 0%, gray.900, transparent), radial(circle at 100% 100%, blue.900, transparent)" }}
      >
woy kontol
        {/* Floating Header with Backdrop Blur */}
        <Box
          as="header"
          position="sticky"
          top="4"
          zIndex="sticky"
          mx="auto"
          maxW="container.lg"
          borderRadius="full"
          borderWidth="1px"
          borderColor="whiteAlpha.300"
          bg="whiteAlpha.700"
          backdropFilter="blur(10px)"
          _dark={{ bg: "blackAlpha.600", borderColor: "whiteAlpha.100" }}
          px={6}
          py={2}
          mt={4}
          boxShadow="xl"
        >
          <Flex align="center" justify="space-between">
            <Heading as="h1" size="md" fontWeight="black" letterSpacing="tight">
              <ChakraLink href="/" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
                SATSET.JS
              </ChakraLink>
            </Heading>

            <Flex as="nav" align="center" gap={6}>
              <ChakraLink fontSize="sm" fontWeight="medium" href="/roadmap">Roadmap</ChakraLink>
              <ChakraLink fontSize="sm" fontWeight="medium" href="/product/sepatu-keren">Sample</ChakraLink>
              <Button size="sm" colorScheme="blue" borderRadius="full" px={6}>
                Docs
              </Button>
              <ColorModeButton />
            </Flex>
          </Flex>
        </Box>

        {/* Main Content Area */}
        <Container maxW="container.md" pt={12} pb={20}>
          <Stack gap={8}>
            {children}
          </Stack>
        </Container>

        {/* Minimalist Footer */}
        <Box as="footer" py={10} textAlign="center">
          <Container>
            <Flex direction="column" align="center" gap={2}>
              <Box w="40px" h="1px" bg="gray.300" mb={4} />
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
                © 2026 Satset Ecosystem
              </Text>
              <Text fontSize="xs" color="gray.400">
                Built by IndokuDev with Passion
              </Text>
            </Flex>
          </Container>
        </Box>

      </Box>
    </Provider>
  );
}