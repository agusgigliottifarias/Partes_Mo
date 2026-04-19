import { Bordero } from "./bordero"

export const BORDEROS: Bordero[] = [
    {
        id: 1,
        date: new Date(),
        customer: {
            id: 2,
            name : 'La Rosada'
        },
        performances : [
            {
                audience: 100,
                play: {
                    id: 1,
                    code: 'hamlet',
                    name: 'hamlet',
                    type: 'tragedy'
                }
            }
        ]
    },
    {
        id: 2,
        date: new Date(),
        customer: {
            id: 2,
            name : 'La escalera'
        },
        performances : [
            {
                audience: 200,
                play: {
                    id: 1,
                    code: 'hamlet',
                    name: 'Hamlet',
                    type: 'tragedy'
                }
            },
            {
                audience: 150,
                play: {
                    id: 1,
                    code: 'othello',
                    name: 'Othello',
                    type: 'tragedy'
                }
            }
        ]
    }


]