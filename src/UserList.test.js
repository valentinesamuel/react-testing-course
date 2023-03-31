import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

test('render the correct one row per user', () => {
    const users = [
        { name: 'val', email: 'val@val.com' },
        { name: 'jane', email: 'jane@jane.com' }
    ]
    render(<UserList users={users} />)
})

test('render the email and name of each user', () => {

})