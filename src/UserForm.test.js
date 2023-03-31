import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import UserForm from "./UserForm";

test('it shows two inputs and a button', () => {
    render(<UserForm />)

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()
})

test('it calls onUserAdd when the form is submitted', async () => {
     const mock = jest.fn()
    render(<UserForm onUserAdd={mock} />)

    const nameInput = screen.getByRole('textbox', {name: /name/i})
    const emailInput = screen.getByRole('textbox', {name: /email/i})

    const button = screen.getByRole('button')

    await user.click(nameInput)
    await user.keyboard('val')

    await user.click(emailInput)
    await user.keyboard('val@val.com')


    await user.click(button)
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith({name:'val', email:'val@val.com'})
})

// test("it calls onUserAdd when the form is submitted", async () => {

//     Then, add the await keyword wherever there is a user action:

//     await user.click(nameInput);