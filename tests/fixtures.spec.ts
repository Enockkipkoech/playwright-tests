import { test as base, expect } from "@playwright/test"

const test = base.extend({

    testData: async ({ }, use) => {
        const data = { email: "test@example.com", password: "password123" }
        await use(data)
    },
    authenticatedUser: [async ({ page, testData, }, use) => {
        await page.goto('localhost:3001/login')

        const emailInput = page.getByRole('textbox', { name: 'Email' })
        await emailInput.fill(testData.email)

        const passwordInput = page.getByRole('textbox', { name: 'Password' })
        await passwordInput.fill(testData.password)

        const signInButton = page.getByRole('button', { name: 'Sign In' })
        await signInButton.click()

        await use(page)

    }, { auto: true }]

})

test('should use test data from fixture', async ({ page, testData }) => {


    // Add assertions to verify successful login
    const url = page.url()
    await expect(page).toHaveURL(/\/login(\?|$)/)
})