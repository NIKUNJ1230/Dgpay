import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // user_name: '',
    // is_admin: '',
    // is_pass_available: '',
    // support_token: '',
    fname: '',

}
// export const handleLogout = createAsyncThunk('layout/getBookmarks', async () => {
//     const response = await axios.get('/api/bookmarks/data')
//     return {
//         data: response.data.suggestions,
//         bookmarks: response.data.bookmarks
//     }
// })

export const commonSlice = createSlice({
    name: 'demoSlice',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.fname = action.payload

        }
        /* setPanNumber: (state, action) => {
            state.user_pan_number = action.payload
        },
        setIsAdmin: (state, action) => {
            state.is_admin = action.payload
        },
        setSupportToken: (state, action) => {
            state.support_token = action.payload
        },
        setSelectedDatePeriod: (state, action) => {
            state.selected_date_period = action.payload
        },
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setLogoutLoader: (state, action) => {
            state.is_logout_loader = action.payload
        },
        setCompanyList: (state, action) => {
            state.company_list = action.payload
        },
        setCompleteProfile: (state, action) => {
            state.is_profile_complete = action.payload
        } */
    }
    // extraReducers: builder => {
    //     builder
    //         .addCase(handleLogout.fulfilled, (state) => {
    //             state.logout = true
    //         })
    // }
})

// Action creators are generated for each case reducer function
export const { setUserName } = commonSlice.actions

export default commonSlice.reducer