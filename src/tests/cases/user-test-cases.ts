import { createTestCases } from '../helpers/createTestCases';

export default createTestCases([
    {
        name: "Invalidate JSON with keys not in schema",
        matchesSchema: false,
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                },
                favNum: {
                    type: 'number'
                },
                peanutAllergy: {
                    type: 'boolean'
                }
            },
            required: ['id', 'name']
        },
        data: {
            id: 1,
            name: "surya krish",
            favNum: 7,
            favColour: "purple"
        }
    },
    {
        name: "Invalidate JSON with wrong required field",
        matchesSchema: true,
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                },
                favNum: {
                    type: 'number'
                },
                peanutAllergy: {
                    type: 'boolean'
                }
            },
            required: ['id', 'name']
        },
        data: {
            id: 1,
            name: "surya krish",
        }
    },
    {
        name: "Invalidate JSON with wrong required object type",
        matchesSchema: false,
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                },
                favNum: {
                    type: 'number'
                },
                peanutAllergy: {
                    type: 'boolean'
                }
            },
            required: ['id', 'name']
        },
        data: {
            id: "1",
            name: "surya krish",
        }
    },
    {
        name: "Invalidate list with one wrong data type",
        matchesSchema: false,
        schema: {
            type: 'array',
            items: {
                type: 'boolean'
            }
        },
        data: [true, false, 1, true, false]
    }

]);
