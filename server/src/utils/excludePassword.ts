// Function for excluding password
export const excludePassword = (data: Record<string, any>) => {

    if(data){
        const {password, ...otherData} = data
        return otherData
    }

    return null

}