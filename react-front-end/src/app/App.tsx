import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "../WalletStatus";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="3" 
        justify="between"
        align="center"
        style={{
          borderBottom: "1px solid var(--border)", 
          backgroundColor: "rgb(var(--card))", 
          top: 0,
          zIndex: 10,
        }}
      >
        <Box>
          <Heading size="5">NFT Launchpad</Heading> {/* Judul diperbarui */}
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container size="3"> {/* Membatasi lebar kontainer */}
        <Box
          mt="7" 
          pb="9" 
          px="4"
          style={{ minHeight: "calc(100vh - 80px)" }} 
        >
          <WalletStatus /> {/* Konten utama */}
        </Box>
      </Container>
    </>
  );
}

export default App;