/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test('render the correct one row per user', () => {
    const users = [
        { name: 'val', email: 'val@val.com' },
        { name: 'jane', email: 'jane@jane.com' }
    ]
    const { container } = render(<UserList users={users} />)

    const rows = container.querySelectorAll('tbody tr')
 

    expect(rows).toHaveLength(2)
})

test('render the email and name of each user', () => {

})