
import { generateMnemonic } from "bip39";

export async function Mnemonics() {
  
    const mneo = await generateMnemonic();
    const sepMneo = mneo.split(" ");
    return {mnemonics: mneo, sepMnemonics: sepMneo}

}
