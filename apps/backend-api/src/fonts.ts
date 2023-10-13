import { Router } from 'express';
import cors from 'cors';

const fontsRouter = Router();

// Base types
type FontStyle = 'normal' | 'ital';
type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

// A single font variant can be a combination of a style and weight
type FontVariant = {
  style: FontStyle;
  weight: FontWeight;
};

// A font family can have multiple variants
type FontFamily = {
  name: string;
  variants: FontVariant[];
};

// Families type representing an array of font families
type Families = Array<FontFamily>;

function parseFontFamilies(family: string[]): Families {
  const families: Families = [];

  for (const familyStr of family) {
    const [fontName, allVariants] = familyStr.split(':');
    const variantsStrings = allVariants.split(';');

    const variants: FontVariant[] = [];

    for (let variantStr of variantsStrings) {
      let style: FontStyle = 'normal';
      let weight: FontWeight = '400';

      if (variantStr.includes('ital,')) {
        style = 'ital';
        variantStr = variantStr.replace('ital,', ''); // remove 'ital,' from the string
      }

      if (variantStr.includes('wght@')) {
        weight = variantStr.split('wght@')[1] as FontWeight;
      }

      variants.push({ style, weight });
    }

    families.push({ name: fontName, variants });
  }
  return families;
}

fontsRouter.get('/', cors(), (req, res) => {
  if (!req.query.family) {
    return res.status(400).send('Error: "family" query parameter is required.');
  }

  let parsedFamilies: Families;
  try {
    parsedFamilies = parseFontFamilies(req.query.family as string[]);
  } catch (error) {
    return res
      .status(400)
      .send(`Error parsing "family" parameter: ${error.message}`);
  }

  let cssContent = '';
  const useSwap = req.query.display === 'swap';
  for (const family of parsedFamilies) {
    console.log(family);
    for (const variant of family.variants) {
      const fontPath = `/static/fonts/${family.name}/${family.name}-${variant.style}-${variant.weight}.woff`;
      cssContent += `
@font-face {
  font-family: "${family.name}";
  src: url(${fontPath}) format('woff');
  font-weight: ${variant.weight};
  ${useSwap ? 'font-display: swap;' : ''}
  font-style: ${variant.style === 'ital' ? 'italic' : 'normal'};
}`;
    }
  }

  res.setHeader('Content-Type', 'text/css');
  res.send(cssContent);
});

export default fontsRouter;
