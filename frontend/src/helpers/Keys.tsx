import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

interface SolanaWalletProps {
    mnemonic: string; // Define the expected type for the mnemonic prop
    currentIndex: number; // Define the expected current index
}

export function KeysGen({ mnemonic, currentIndex }: SolanaWalletProps) {
    if (!mnemonic) return null;  // Ensure mnemonic is defined

    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const phantomPrivateKey = bs58.encode(secret);

    return {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: phantomPrivateKey
    };
}
