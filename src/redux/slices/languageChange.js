import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: '',
    countryCode: 'US',
}

// Action creators are generated for each case reducer function
export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setCountryCode: (state, action) => {
            console.log('action', action.payload)
            state.countryCode = action.payload
        },
    },
})

export const { setLanguage, setCountryCode } = languageSlice.actions

export default languageSlice.reducer
