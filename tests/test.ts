import {chromium, expect, test} from '@playwright/test';


test('home page has expected table', async ({ page }) => {
	await page.goto('http://localhost:4173/');
	await expect(page.locator('table')).toBeVisible();
});

test( 'create new movie', async () => {
	// Launch Chrome with Playwright
	const browser = await chromium.launch({ headless: false, slowMo: 1000 });

	// Open a new browser page
	const page = await browser.newPage();
	// Navigate to the home page
	await page.goto('http://localhost:4173/');

	// Verify that the search button with class 'addNewMovie' is visible
	const addNewMovieButton = page.locator('.addNewMovie');
	await expect(addNewMovieButton).toBeVisible();

	// Simulate a click on the search button
	await addNewMovieButton.click({ timeout: 10000 });

	const titleInput = page.locator('input[name="title"]');
	// Verify that the input is visible
	await expect(titleInput).toBeVisible();

	// Optionally, fill the input with some text
	await titleInput.fill('My New Movie');

	// You can also check the value of the input
	await expect(titleInput).toHaveValue('My New Movie');


	const descriptionInput = page.locator('input[name="description"]');

	// Verify that the input is visible
	await expect(descriptionInput).toBeVisible();

	// Optionally, fill the input with some text
	await descriptionInput.fill('My New description');

	// You can also check the value of the input
	await expect(descriptionInput).toHaveValue('My New description');


	const submitButton = page.locator('button[type="submit"]');

	// Verify that the input is visible
	await expect(submitButton).toBeVisible();



	await submitButton.click({timeout: 3000});
	await page.goto('http://localhost:4173/');

	const sortByID = page.locator('.filter-Id')

	await expect(sortByID).toBeVisible();

	await sortByID.click({timeout: 2000});

	const rows = page.locator('.cell-row');
	console.log(rows)


	const firstRow = rows.first();


	await expect(firstRow).toBeVisible();


	const lastRowId = await firstRow.getAttribute('id');
	console.log('Create with id:', lastRowId);
});

test( 'edit last movie by id', async () => {
	// Launch Chrome with Playwright
	const browser = await chromium.launch({headless: false, slowMo: 1000});

	// Open a new browser page
	const page = await browser.newPage();
	// Navigate to the home page
	await page.goto('http://localhost:4173/');

	const sortByID = page.locator('.filter-Id')

	await expect(sortByID).toBeVisible();

	await sortByID.click({timeout: 2000});


	const rows = page.locator('.cell-row');

	// Get the last <tr> element
	const lastRow = rows.nth(0);


	await expect(lastRow).toBeVisible();
	const lastRowId = await lastRow.getAttribute('id');
	const lastHyphenIndex = lastRowId.lastIndexOf('-');
	const afterLastHyphen = lastHyphenIndex !== -1 ? lastRowId.substring(lastHyphenIndex + 1) : lastRowId;
	console.log('navigation to ', afterLastHyphen);
	await page.goto('http://localhost:4173/' + afterLastHyphen);


	const editButton = page.locator('button', { hasText: 'Update' });

	// Ensure the button is visible
	await expect(editButton).toBeVisible();

	// Click the button
	await editButton.click({ timeout: 1000 });

	const inputTitle = page.locator('input[name="title"]');

	await expect(inputTitle).toHaveAttribute('placeholder', 'My New Movie');

	await inputTitle.fill('My Rewrite movie');

	const submitButton = page.locator('button[type="submit"]');

	// Verify that the input is visible
	await expect(submitButton).toBeVisible();



	await submitButton.click({timeout: 1000});
	await page.goto('http://localhost:4173/')
})

test( 'delete last movie by id', async () => {
	// Launch Chrome with Playwright
	const browser = await chromium.launch({headless: false,  slowMo: 1000});

	// Open a new browser page
	const page = await browser.newPage();
	// Navigate to the home page
	await page.goto('http://localhost:4173/');

	const sortByID = page.locator('.filter-Id')

	await expect(sortByID).toBeVisible();

	await sortByID.click({timeout: 2000});

	const rows = page.locator('.cell-row');

	// Get the last <tr> element
	const lastRow = rows.first();


	await expect(lastRow).toBeVisible();
	const lastRowId = await lastRow.evaluate(el => el.id);

	const checkIsCreatedByTest = page.locator(`#${lastRowId} td[data-type="description"]`);

	// Assert that the <td> contains the expected text
	await expect(checkIsCreatedByTest).toHaveText('My New description');

	const parts = lastRowId.split('-');
	const afterFirstHyphen = parts.slice(1).join('-')
	const deleteButtonId = 'button-' + afterFirstHyphen
	// Log the ID to the console
	console.log('deleteButtonId:', deleteButtonId);
	const addNewMovieButton = page.locator(`button.${deleteButtonId}`);

	// Simulate a click on the search button
	await addNewMovieButton.click({ timeout: 1000 });
	await page.goto('http://localhost:4173/', { timeout: 1000 });
})
