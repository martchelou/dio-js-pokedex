import { context } from 'esbuild';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runBuild()
{
  try
  {
    const entryPath = path.resolve(__dirname, 'assets', 'javascript', 'app.js');
    const outputPath = path.resolve(__dirname, 'public', 'js', 'main.min.js');
    const ctx = await context({
      entryPoints: [entryPath],
      bundle: true,
      minify: false,
      minifyWhitespace: true,
      minifySyntax: true,
      outfile: outputPath,
      sourcemap: false,
      format: 'iife',
      minifyIdentifiers: false,
    });
    await ctx.watch();
    console.log('👀 Monitorando alterações...\n');
  } catch (error) {
    console.error('❌ Falha ao iniciar o build:', error);
    process.exit(1);
  }
}
runBuild();