import { useState, useEffect } from 'react';
import { SolanaWallet } from './pages/SolanaWallet';
import { Button } from '@/components/ui/button';
import { Mnemonics } from './helpers/Mnemonics';
import { ShowSolBalance } from './pages/GetBalance';
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Wallet, Copy, Moon, Sun } from 'lucide-react';

// Updated import for useToast from hooks
import { useToast } from '@/hooks/use-toast';

function App() {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [mneuRaw, setMneuRaw] = useState<string>("");
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast(); // Using the updated import for useToast

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  async function generateSeedPhrase() {
    setPublicKeys([]);
    setPrivateKeys([]);
    setCurrentIndex(0);

    const { mnemonics, sepMnemonics } = await Mnemonics();
    setMneuRaw(mnemonics);
    setMnemonic(sepMnemonics);
  }

  const copyMnemonic = () => {
    navigator.clipboard.writeText(mneuRaw);
    toast({
      title: "Mnemonic Copied",
      description: "The mnemonic phrase has been copied to your clipboard.",
    });
  };

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-4 max-w-3xl">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Wallet className="w-6 h-6" />
                    Web-Based Wallet
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="rounded-full"
                  >
                    {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Button onClick={generateSeedPhrase} className="flex-grow">
                      Create Seed Phrase
                    </Button>
                    {mnemonic.length > 0 && (
                      <Button onClick={copyMnemonic} variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </div>
                  
                  {mnemonic.length > 0 && (
                    <div className="bg-muted p-4 rounded-md">
                      <Label className="text-sm font-medium mb-2 block">Mnemonic Phrase</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {mnemonic.map((word, index) => (
                          <div key={index} className="bg-background p-2 rounded border text-center">
                            {word}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <SolanaWallet 
                    mnemonic={mneuRaw}
                    publicKeys={publicKeys} 
                    privateKeys={privateKeys}
                    setPublicKeys={setPublicKeys}
                    setPrivateKeys={setPrivateKeys}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />

                  <Separator />

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                  </div>

                  <WalletInfo />
                  <ShowSolBalance />
                </CardContent>
              </Card>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function WalletInfo() {
  const wallet = useWallet();
  
  return (
    <div className="mt-4">
      {wallet.connected ? (
        <div>
          <Label className="text-sm font-medium mb-1 block">Connected Wallet Public Key</Label>
          <div className="flex">
            <Input value={wallet.publicKey?.toBase58() || "Not available"} readOnly className="flex-grow" />
            <Button variant="outline" size="icon" className="ml-2">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">Wallet not connected</div>
      )}
    </div>
  );
}

export default App;
