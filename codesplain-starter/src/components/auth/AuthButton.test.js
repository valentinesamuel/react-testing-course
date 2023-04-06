import { render, screen } from "@testing-library/react";
import { MemoryRouter, resolvePath } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

const renderComponent = async () => {
    render(<MemoryRouter>
        <AuthButtons />
    </MemoryRouter>)
    await screen.findAllByRole('link')
}

describe('when the user is not signed in', () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: null }
            }
        }
    ])
    test.only('sign in and signup are visible', async () => {
        
        renderComponent()
        const signInButton = screen.getByRole('link', {
            name: /sign in/i
        })
        const signUpButton = screen.getByRole('link', {
            name: /sign up/i
        })
        expect(signInButton).toBeInTheDocument()
        expect(signInButton).toHaveAttribute('href', '/signin')
        expect(signUpButton).toBeInTheDocument()
        expect(signUpButton).toHaveAttribute('href', '/signup')
    })

    test('sign out is not visible', async () => {
        renderComponent()
        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i
        })
        expect(signOutButton).not.toBeInTheDocument()
    })
})

describe('when the user is   signed in', () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: { id: 3, email: 'test@test.com' } }
            }
        }
    ])
    test.only('sign in and sign up are not visible', async () => {
        
        renderComponent()
        const signInButton = screen.queryByRole('link', {
            name: /sign in/i
        })
        const signUpButton = screen.queryByRole('link', {
            name: /sign up/i
        })
        expect(signInButton).not.toBeInTheDocument()
        expect(signUpButton).not.toBeInTheDocument()

    })

    test('sign out is visible', async () => {
        renderComponent()
        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i
        })
        expect(signOutButton).toBeInTheDocument()
        expect(signOutButton).toHaveAttribute('href', '/signout')

    })
})

const pause = () => new Promise((resolve) => {
    setTimeout(resolve, 1000);
})