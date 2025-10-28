import { test, expect } from '@playwright/test';

test('gen first test', async ({ page }) => {
  await page.goto('https://www.amazon.com.br/');

  await page.getByRole('searchbox', { name: 'Pesquisar Amazon.com.br' }).click();
  await page.getByRole('searchbox', { name: 'Pesquisar Amazon.com.br' }).fill('Geonav Cabo USB-C');
  await page.getByRole('searchbox', { name: 'Pesquisar Amazon.com.br' }).press('Enter');
  await page.getByRole('link', { name: 'Geonav Cabo USB-C (tipo C) para USB, carregamento rápido, nylon trançado, 1,5MT, UCC06, Cinza/Branco', exact: true }).click();

  await page.locator('#a-autoid-0-announce').getByText('1').click();
  await page.getByLabel('2', { exact: true }).getByText('2').click();
  await page.getByTitle('Adicionar ao carrinho').click();

  await expect(page.locator('#nav-cart-count')).toContainText('2');
  await page.getByRole('link', { name: 'itens no carrinho' }).click();
  await expect(page.getByRole('heading', { name: 'Carrinho de compras' })).toBeVisible();
  await expect(page.locator('h4')).toContainText('Geonav Cabo USB-C (tipo C)');
  await expect(page.getByLabel('A quantidade é')).toContainText('2');
  await page.getByRole('button', { name: 'Excluir Geonav Cabo USB-C (' }).click();

  await page.getByRole('link', { name: 'itens no carrinho' }).click();
  await expect(page.locator('#sc-empty-cart')).toContainText('Seu carrinho da Amazon está vazio');

});