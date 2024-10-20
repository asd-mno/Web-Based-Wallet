import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Eye, EyeOff } from 'lucide-react';
import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';

interface SolanaWalletProps {
  mnemonic: string;
  publicKeys: string[];
  privateKeys: string[];
  setPublicKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setPrivateKeys: React.Dispatch<React.SetStateAction<string[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function SolanaWallet({
  mnemonic,
  publicKeys,
  privateKeys,
  setPublicKeys,
  setPrivateKeys,
  currentIndex,
  setCurrentIndex
}: SolanaWalletProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (mnemonic && publicKeys.length === 0 && privateKeys.length === 0) {
      addWallet();
    }
  }, [mnemonic]);

  const addWallet = async () => {
    setIsLoading(true);
    try {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(derivationPath, seed.toString('hex')).key;
      const keypair = Keypair.fromSeed(derivedSeed);

      const newPublicKey = keypair.publicKey.toBase58();
      const newPrivateKey = bs58.encode(keypair.secretKey);

      setPublicKeys(prevKeys => [...prevKeys, newPublicKey]);
      setPrivateKeys(prevKeys => [...prevKeys, newPrivateKey]);
      setCurrentIndex(prevIndex => prevIndex + 1);
    } catch (error) {
      console.error('Error generating wallet:', error);
      // You might want to add error handling here, such as displaying an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKeys(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  return (
    <div className="space-y-4">
      <Button onClick={addWallet} disabled={isLoading} className="w-full">
        {isLoading ? 'Adding...' : 'Add Wallet'}
      </Button>
      
      {publicKeys.map((publicKey, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Public Key</Label>
              <div className="flex">
                <Input 
                  value={publicKey} 
                  readOnly 
                  className="flex-grow font-mono text-xs" 
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => copyToClipboard(publicKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label className="text-sm font-medium">Private Key</Label>
              <div className="flex">
                <Input 
                  value={showPrivateKeys[index] ? privateKeys[index] : '•'.repeat(privateKeys[index].length)} 
                  readOnly 
                  className="flex-grow font-mono text-xs" 
                  type={showPrivateKeys[index] ? "text" : "password"}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => togglePrivateKeyVisibility(index)}
                >
                  {showPrivateKeys[index] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => copyToClipboard(privateKeys[index])}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}