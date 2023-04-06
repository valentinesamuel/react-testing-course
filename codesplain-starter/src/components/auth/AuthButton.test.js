import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

const renderComponent = () => {
    render(<MemoryRouter>
        <AuthButtons />
    </MemoryRouter>)
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
    test('sign in and signup are visible', async () => {
        renderComponent()

    })

    test('sign out is not visible', async () => {
        renderComponent()

    })
})

describe('when the user is not  signed in', () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: { id: 3, email: 'test@test.com' } }
            }
        }
    ])
    test('sign in and sign up are not visible', async () => {
        renderComponent()

    })

    test('sign out is visible', async () => {
        renderComponent()

    })
})