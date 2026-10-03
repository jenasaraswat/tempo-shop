// App uses HashRouter, so routes live after "#"
export const go = (page, route) => page.goto(`/#${route}`);

export async function addToBag(page, slug, size = 'M') {
  await go(page, `/products/${slug}`);
  const sizeBtn = page.getByTestId(`size-${size}`);
  if (await sizeBtn.count()) await sizeBtn.click();
  await page.getByTestId('add-to-bag').click();
}
